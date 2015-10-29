'use strict'
var services = angular.module('adverttracking.services', [])

services.factory('signalRSvc', ['$rootScope', function ($rootScope) {
   var proxy = null;
   var checkedGeoArray = false;
   var storedGeoMap = [];
   var storedCampaign = [];
   var test1 = 0, test2 = 0, test3 = 0, test4 = 0, test5 = 0, test6 = 0, test7 = 0, test8 = 0;

   var initialize = function () {
       //Getting the connection object
       /*var connection = $.hubConnection();
  
       //Creating proxy
       this.proxy = connection.createHubProxy('realtimeHub');
       proxy = this.proxy;
       //Starting connection
       connection.start();
       $.connection.hub.start().done(function () {
            // Call the Send method on the hub. 
            proxy.invoke('updatedashboard');
       });*/

       /*this.proxy.on('updateSpecialties', function (object) {
            if(test1 < 1){
              console.log('SPECIALTIES:');
              console.log( object);
              test1++;
            }
           $rootScope.$emit("sendSpecialtiesFromHub",object);
       });

       this.proxy.on('updateProfessions', function (object) {
          if(test2 < 1){
              console.log('PROFESSIONS:');
              console.log(object);
              test2++;
            }
           $rootScope.$emit("sendProfessionsFromHub",object);
       });

       this.proxy.on('updateViewed', function (object) {
            if(test3 < 1){
              console.log('ADVERTS VIEWED:');
              console.log(object);
              test3++;
            }
           $rootScope.$emit("sendViewedFromHub",object);
       });

       this.proxy.on('updateClicked', function (object) {
          if(test4 < 1){
              console.log('ADVERTS CLICKED:');
              console.log(object);
              test4++;
            }
           $rootScope.$emit("sendClickedFromHub",object);
       }); 

       this.proxy.on('updateAdvertHeatMap', function (object) {
          if(test5 < 1){
              console.log('HEAT MAP:');
              console.log(object);
              test5++;
            }
           $rootScope.$emit("sendHeatMapFromHub", object);
       });

       this.proxy.on('updateUserGeoMap', function (object) {
          var isEquivalent = compareArraysEquivalency(storedGeoMap, object);
          if(!isEquivalent && !checkedGeoArray){
            $rootScope.$emit("sendUsersGeoFromHub", object);
            storedGeoMap = object;
            checkedGeoArray = true;
          }
       });

       this.proxy.on('updateCampaigns', function (object) {
          var isEquivalent = compareArraysEquivalency(storedCampaign, object);
          if(!isEquivalent){
            $rootScope.$emit("sendUpdateCampaignsFromHub", object);
            storedCampaign = object.reverse();
            console.log('Load Campaign');
          }
       });

       this.proxy.on('updateDeviceStats', function (object) {
          if(test7 < 1){
              console.log('DEVICE STATS:');
              console.log(object);
              test7++;
            }
           $rootScope.$emit("sendDeviceStatsFromHub", object);
       });*/
   };

   var switchWebsite = function(website, id){
      console.log("Website : " + website + " and Id : " + id);
      proxy.invoke('updatesite', id);
      test1 = 0;
      test2 = 0;
      test3 = 0;
      test4 = 0;
      test5 = 0;
      test6 = 0;
      test7 = 0;
      test8 = 0;
   };

   var granularity = function(index){
       checkedGeoArray = false;
       console.log("Time Number : " + index);
       proxy.invoke('updatetimescale', index);
   };

   var filterByProfession = function(name){
       console.log("Filter by : " + name);
       proxy.invoke('filterByProfession', name);
   }

   var compareArraysEquivalency = function(stored, compare){
      if(stored.length != compare.length) return false;
      if(JSON.stringify(stored) != JSON.stringify(compare)) return false;
      return true;
   }

   return {
       initialize: initialize,
       switchWebsite: switchWebsite,
       granularity : granularity,
       filterByProfession : filterByProfession
   }; 
}]);
