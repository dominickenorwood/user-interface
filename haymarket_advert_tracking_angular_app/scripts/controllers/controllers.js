'use strict'
var app = angular.module('adverttracking', ['adverttracking.services', 'adverttracking.directives', 'adverttracking.filters', 'ngRoute', 'easypiechart', 'ui.bootstrap']);

app.config(['$locationProvider',
    function($locationProvider){
        $locationProvider.html5Mode(true);
    }
])

app.controller('AdvertViewsClicksTableSortCtrl', ['$scope',
    function($scope) {
        $scope.toggle = false;
        $scope.predicate = "";
        $scope.reverse = false;

        $scope.setSelectedAdvert = function(selected) {
          if($scope.selected != selected){
            $scope.toggle = false;
            $scope.selected = selected;
            
          }
          if($scope.selectedIndex != -1){
            $scope.getOverallClicksAndViews();
          }
        }

        $scope.sort = function(p) {
            if ($scope.predicate == p) {
                $scope.reverse = !$scope.reverse;
            } else {
                $scope.predicate = p;  
                $scope.reverse = false;
            }
        }

    }
]);

app.controller('RecentUsersTableSortCtrl', ['$scope',
    function($scope) {
        $scope.toggle = false;
        $scope.predicate = "";
        $scope.reverse = false  ;

        $scope.setSelectedUsers= function(selected) {
          if($scope.selectedUser != selected){
            $scope.toggle = false;
            $scope.selectedUser = selected;
          }
        }

        $scope.sort = function(p) {
            if ($scope.predicate == p) {
                $scope.reverse = !$scope.reverse;
            } else {
                $scope.predicate = p;  
                $scope.reverse = false;
            }
        }

    }
]);

app.controller('RecentActivity',['$scope', '$http', '$location', '$route',
    function($scope, $http, $location, $route){
        var hoursArray = [1, 24, 168, 744];
        var recentName = $location.search().name;
        var recentID = $location.search().webid;
        var recentHours = $location.search().hours;
        $scope.recentData = {name : recentName, value : recentID, hours : hoursArray[recentHours]}
        //$scope.recentData = {name : 'Clinical Advisor', value : 6, hours : hoursArray[3]};
        $scope.disabledButton = "disabled";

        var myDate = new Date();
        $scope.date = myDate.setHours(myDate.getHours() - $scope.recentData.hours);
        $scope.fromDate = myDate; //Recent Activity From Date
        $scope.toDate = new Date(); //Recent Activity To Date
        
        //Recent Activity
        //DATE
        $scope.fromOpen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.fromOpened = true;
        };
        $scope.toOpen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.toOpened = true;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            //return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];


        //TIME
        $scope.hstep = 1;
        $scope.mstep = 1;
        $scope.ismeridian = true;

        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.advertExportFromDate = '';
        $scope.advertExportToDate = '';

        $scope.getOverallClicksAndViews = function() {
            var responsePromise = $http.post('/home/OverallClicksAndViews', { publicationId: $scope.recentData.value, publicationName: $scope.recentData.name, from: $scope.fromDate.getTime(), to: $scope.toDate.getTime() });
            $scope.advertExportFromDate = $scope.fromDate.getTime();
            $scope.advertExportToDate = $scope.toDate.getTime();
            $scope.advertOverlay = "show-overlay";
            $scope.userOverlay = "show-overlay";
            $scope.selectedIndex = -1;
            console.log('MAKE CLICKS VIEWS AJAX CALL');
            console.log('SCOPE FROM : ' + $scope.fromDate);
            console.log('SCOPE TO   : ' + $scope.toDate);
            console.log('AJAX FROM : ' + $scope.fromDate.getTime());
            console.log('AJAX TO   : ' + $scope.toDate.getTime());

            responsePromise.success(function (data) {
                $scope.myData = data;
                $scope.advertOverlay = "hide-overlay";
                $scope.disabledButton = "disabled";
                console.log('CLICKS VIEWS AJAX SUCCESS');
                console.log(data)
                $scope.getRecentUsers();
            });

            responsePromise.error(function(data){
                console.log('CLICKS VIEWS AJAX FAILED')
            });
        }

        $scope.getRecentUsers = function(){
            var responsePromise = $http.post('/home/RecentUsers', { publicationId: $scope.recentData.value, lineItemId: null, from: $scope.fromDate.getTime(), to: $scope.toDate.getTime() });

            console.log('MAKE RECENT USERS AJAX CALL');
            responsePromise.success(function (data) {
                $scope.recentUsers = data;
                $scope.userOverlay = "hide-overlay";
                console.log('RECENT USERS AJAX SUCCESS');
                console.log(data);
            });

            responsePromise.error(function(data){
                console.log('RECENT USERS AJAX FAILED')
            });
        }

        $scope.selectedIndex = -1;

        $scope.getAdvertRecentUsers = function(lineItemId, $index){
            if($index != $scope.selectedIndex){
                var responsePromise = $http.post('/home/RecentUsers', { publicationId: $scope.recentData.value, lineItemId: lineItemId, from: $scope.fromDate.getTime(), to: $scope.toDate.getTime() });
                $scope.selectedIndex = $index;
                $scope.userOverlay = "show-overlay";
                console.log('Advert ID : ' + lineItemId);
                console.log($index);

                responsePromise.success(function (data) {
                    $scope.recentUsers = data;
                    $scope.userOverlay = "hide-overlay";
                    console.log(data);
                });

                responsePromise.error(function(data){
                    console.log('ADVERT RECENT USERS AJAX FAILED')
                });
            }else{
                $scope.selectedIndex = -1;
                $scope.getRecentUsers();
            }
        };

        $scope.changed = function(){
            $scope.disabledButton = "";
        }

        $scope.downloadClicksViewsCSV = function(){
            console.log($scope.recentData.value);
            console.log($scope.recentData.name);
            console.log($scope.advertExportFromDate);
            console.log($scope.advertExportToDate);
            window.open("/home/ExportClicksViewsToCsv?publicationId=" + $scope.recentData.value + 
                        "&publicationName=" + $scope.recentData.name + 
                        "&from=" + $scope.advertExportFromDate + 
                        "&to=" + $scope.advertExportToDate,
                        "_self"
                        );
        }

        $scope.downloadRecentUsersCSV = function(){
            window.open("/home/ExportRecentUsersToCsv?publicationId=" + $scope.recentData.value + 
                        "&publicationName=" + $scope.recentData.name + 
                        "&from=" + $scope.advertExportFromDate + 
                        "&to=" + $scope.advertExportToDate,
                        "_self"
                        );
        }

        $scope.backToDashboard = function(){
            window.open("/", "_self")
        }

        $scope.jsonDateConversion = function(jsonDate){
            var date = new Date(parseInt(jsonDate.substr(6)));
            var utcString = date.toUTCString();;
            return utcString;
        }

        $scope.sortedtest = 100;
        $scope.getOverallClicksAndViews();

    }
]);

app.controller('SignalRAngularCtrl', ['$scope', '$rootScope', '$http', 'signalRSvc',
    function($scope, $rootScope, $http, signalRSvc) {
        //DROP DOWN MENU
    	$scope.websites = [
            { name: 'Cancer Therapy Advisor', 'value': 18 },
            { name: 'Clinical Advisor', 'value': 6 },
            { name: 'Endocrinology Advisor', 'value': 28 },
          //  {name : 'Compliance Week', 'value' : 11},
           // {name : 'Direct Marketing News', 'value' : 5},
         //   {name : 'McKnights', 'value' : 8},
        //    {name : 'MMM', 'value' : 4},
            { name: 'MPR', 'value': 13 },
            { name: 'myCME.com', 'value': 10 },
            { name: 'ONA', 'value': 19 },
           // {name : 'PRWeek US', 'value' : 1},
            { name: 'Psychiatry Advisor', 'value': 27 },
         //   {name : 'SC Magazine', 'value' : 2},
          //  {name : 'Racer', 'value' : 17},
            { name: 'RUN', 'value': 3 }
          //  {name : 'SC Magazine UK', 'value' : 9},
          //  {name : 'TheHubComms', 'value' : 26},
         //   {name : 'ThePMD', 'value' : 22},
          //  {name : 'WebHelp', 'value' : 23}
            /*{name : 'DigitalTrends', 'value' : 14},*/
    	];

        
        $scope.websiteSelect = $scope.websites[0];

        $scope.changeSites = function(){
            $scope.overlay = "show-overlay";
            $scope.showHideScroll = 'hide-scroll';
            signalRSvc.switchWebsite($scope.websiteSelect.name,$scope.websiteSelect.value);
        }

        //GRANULARITY
        $scope.selectedGranularity = 1;
        var selectedIndex = 1;
        var dateSet = false;

        $scope.granularityArray = [
                                   {name : '1 Hour', title : 'As Per Hour', hours : 1}, 
                                   {name : '1 Day', title : 'As Per 24 Hours', hours : 24}, 
                                   {name : '7 Days', title : 'As Per 7 Days', hours : 168}, 
                                   {name : '31 Days', title : 'As Per 31 Days', hours : 744}
                                  ]

        var setDate = function(index){
            var myDate = new Date();
            $scope.date = myDate.setHours(myDate.getHours() - $scope.granularityArray[index].hours);
            $scope.fromDate = myDate; //Recent Activity From Date
            $scope.toDate = new Date(); //Recent Activity To Date
        }

        $scope.switchTime = function(index){
            if( index != selectedIndex ){
                dateSet = false;
                selectedIndex = index;
                $scope.overlay = "show-overlay";
                $scope.showHideScroll = 'hide-scroll';
                $scope.selectedGranularity = index;
                signalRSvc.granularity(index);
            }  
        }

        $scope.setCurrentClass = function(index){
            if( index === selectedIndex ){
                $scope.granularityTitle = $scope.granularityArray[index].title;
                if(!dateSet){
                    dateSet = true;
                    setDate(index);  
                }
                return "selected";
            }
        }
        
        //PROFESSIONS & SPECIALTIES MODULES
        $scope.specialtiesOptions = {
            animate: {
                duration: 500,
                enabled: true
            },
            barColor: '#abd3dd',
            scaleColor: false,
            lineWidth: 6,
            lineCap: 'circle',
            size: 60,
            trackColor: '#FFF'
        };

        $scope.professionOptions = {
            animate: {
                duration: 500,
                enabled: true
            },
            barColor: '#58CAED',
            scaleColor: false,
            lineWidth: 7,
            lineCap: 'circle',
            size: 70,
            trackColor: '#FFF'
        };

        var currentPie = '';
        var previousPie = -1;
        $scope.pieChartClicked = function(name, number){
            var pieChange = "currentPie" + number;
            var previous = "currentPie" + previousPie;
            if(name != currentPie){
                currentPie = name;
                $scope[pieChange] = 'current';
                if(previousPie != -1){
                    $scope[previous] = '';
                    previousPie = number;
                }else{
                    previousPie = number;
                }
                signalRSvc.filterByProfession(name);
            }else{
                $scope[previous] = '';
                currentPie = '';
                previousPie = -1;
                signalRSvc.filterByProfession(currentPie); 
            }
        }

        var updateSpecialtiesMethod = function(object) {
            if(object == ''){
                var i;
                for (i = 0; i <= 6; i++) { 
                    var percent = 'specialtiesPercent' + i;
                    var name = 'specialtiesName' + i;
                    var pieClass = 'pieChartSpecialties' + i;
                    var count = 'specialtiesCount' + i;
                    $scope[percent] = 0;
                    $scope[count] = 0;
                    $scope[name] = '';
                    $scope[pieClass] = 'hide-pie';
                }
            }else{
                var i,
                x = 0;
                for (i in object) {
                    var percent = 'specialtiesPercent' + i;
                    var name = 'specialtiesName' + i;
                    var pieClass = 'pieChartSpecialties' + i;
                    var count = 'specialtiesCount' + i;
                    $scope[percent] = object[i].Percent;
                    $scope[count] = object[i].Count;
                    $scope[name] = object[i].Name;
                    $scope[pieClass] = 'show-pie';
                    x++;
                }
                hideUndrawnSpecialtiesPieCharts(x);
            }
            
        }

        var hideUndrawnSpecialtiesPieCharts = function(number){
            for (var i = number; i <= 6; i++) { 
                    var percent = 'specialtiesPercent' + i;
                    var name = 'specialtiesName' + i;
                    var pieClass = 'pieChartSpecialties' + i;
                    var count = 'specialtiesCount' + i;
                    $scope[percent] = 0;
                    $scope[count] = 0;
                    $scope[name] = '';
                    $scope[pieClass] = 'hide-pie';
                }
        }

        $scope.$parent.$on("sendSpecialtiesFromHub", function(e, object) {
            $scope.$apply(function() {
                updateSpecialtiesMethod(object);
            });
        });

        var updateProfessionsMethod = function(object) {    
            if(object == ''){
                var i;
                for (i = 0; i <= 4; i++) { 
                    var percent = 'professionPercent' + i;
                    var count = 'professionCount' + i;
                    var name = 'professionName' + i;
                    var pieClass = 'pieChart' + i;
                    $scope[percent] = 0;
                    $scope[count] = 0;
                    $scope[name] = '';
                    $scope[pieClass] = 'hide-pie';
                }
            }else{
                var i,
                x = 0;
                for (i in object) {
                    var percent = 'professionPercent' + i;
                    var count = 'professionCount' + i;
                    var name = 'professionName' + i;
                    var pieClass = 'pieChart' + i;
                    $scope[percent] = object[i].Percent;
                    $scope[count] = object[i].Count;
                    $scope[name] = object[i].Name;
                    $scope[pieClass] = 'show-pie';
                    x++;
                }
                hideUndrawnProfessionsPieCharts(x);
            }  
        }

        var hideUndrawnProfessionsPieCharts = function(number){
            for (var i = number; i <= 4; i++) { 
                    var percent = 'professionPercent' + i;
                    var count = 'professionCount' + i;
                    var name = 'professionName' + i;
                    var pieClass = 'pieChart' + i;
                    $scope[percent] = 0;
                    $scope[count] = 0;
                    $scope[name] = '';
                    $scope[pieClass] = 'hide-pie';
                }
        }

        $scope.$parent.$on("sendProfessionsFromHub", function(e, object) {
            $scope.$apply(function() { 
                updateProfessionsMethod(object);
            });
        });

        //CLICKED VS VIEWS MODULE
        $scope.$parent.$on("sendViewedFromHub", function(e, object) {
            $scope.$apply(function() {
                $scope.advertsViewedArray = object;
            });
        });

        $scope.$parent.$on("sendClickedFromHub", function(e, object) {
            $scope.$apply(function() {
                $scope.advertsClickedArray = object;
                $scope.showHideScroll = 'show-scroll';
                $scope.overlay = "hide-overlay";
            });
        });

        //TOP CAMPAIGNS MODULE

        var testArray = [
                            {Name : 'ty1', Count : 3664},
                            {Name : 'ca_update', Count : 1745},
                            {Name : 'ca_dermdx', Count : 576},
                            {Name : 'stela', Count : 357},
                            {Name : 'eliqcard', Count : 90}
                        ]  

        var divideBarChart = function(object){
            if(object.length > 0){
                var sortedArray = object.sort(dynamicSort("Count")).reverse();
                var topNumber = sortedArray[0].Count;
                var multiplier = (topNumber > 100) ? 100 : 10;
                //y = (y != undefined) ? y : x;
                var roundedUpLargestNumber = Math.ceil(sortedArray[0].Count / multiplier) * multiplier;
                var calculated = [];

                for (var i = 0; i <= sortedArray.length - 1; i++) {
                    var name = sortedArray[i].Name;
                    var count = sortedArray[i].Count;
                    var percent = Math.round((count / roundedUpLargestNumber) * 100);
                    calculated.push({Name : name, Count : count, Percent : percent})
                }
                $scope.campaignHighest = roundedUpLargestNumber;
                $scope.campaignHalf = Math.round(roundedUpLargestNumber / 2);
                $scope.campaignLowest = Math.round(roundedUpLargestNumber * 0.1);
                $scope.professionsBarChartArray = calculated;
            }
        }

        $scope.$parent.$on("sendUpdateCampaignsFromHub", function (e, object) {
            $scope.$apply(function () {
                divideBarChart(object);
            });
        }); 

        //HEAT MAP MODULE
        var availableAdSlots = [
                                'ADCALL_101',
                                'ADCALL_801',
                                'ADCALL_301',
                                'ADCALL_401',
                                'ADCALL_402',
                                'ADCALL_501',
                                'ADCALL_502',
                                'ADCALL_503',
                                'ADCALL_1001',
                                'ADCALL_1601',
                                'ADCALL_1701'
                                ];
        var heatClasses = [
                            'heat-low',
                            'heat-md-low',
                            'heat-medium',
                            'heat-md-high',
                            'heat-high',
                            'heat-max'
                          ];

        /*var heatSlug = [
                        {Count : 6, Name : "ADCALL_1701"},
                        {Count : 9, Name : "ADCALL_402"},
                        {Count : 1, Name : "ADCALL_1601"},
                        {Count : 4, Name : "ADCALL_101"},
                        {Count : 15, Name : "ADCALL_401"},
                        {Count : 7, Name : "ADCALL_501"},
                        {Count : 1, Name : "ADCALL_601"},
                        {Count : 3, Name : "ADCALL_502"},
                        {Count : 14, Name : "ADCALL_801"},
                        {Count : 9, Name : "ADCALL_1001"},
                        {Count : 22, Name : "ADCALL_301"}
                       ]*/

        function dynamicSort(property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }

        var getHeatMapIndex = function(array, key){
            var index = array.indexOf(key);
            return index;
        }

        var setHeatMapColors = function(object){
            var sortedHeatMap = object.sort(dynamicSort("Count"));
            var reversedHeatMap = sortedHeatMap.reverse();
            var heatNumber = 0;
            var heatMax = heatClasses.length - 1;
            for (var i = 0; i <= reversedHeatMap.length - 1; i++) {
                var index = getHeatMapIndex(availableAdSlots,reversedHeatMap[i].Name) + 1;
                var className = 'heat' + index;
                if(reversedHeatMap[i].Count == 0){ //If count is 0 apply class of 'low-heat'
                    $scope[className] = heatClasses[0];
                }else{
                    if(reversedHeatMap[i].Count > heatNumber){ //Set highest count number and class 'heat-max'
                        $scope[className] = heatClasses[heatMax];
                        heatNumber = reversedHeatMap[i].Count;
                    }else{
                        if(reversedHeatMap[i].Count == heatNumber){ //If count is equal to previous ad value set same class
                            $scope[className] = heatClasses[heatMax];
                        }else{
                            if(heatMax == 1){ //If colors run out then default to class 'low-md-heat'
                                $scope[className] = heatClasses[heatMax];
                            }else{ //Change class color 
                                heatMax--;
                                $scope[className] = heatClasses[heatMax];
                                heatNumber = reversedHeatMap[i].Count;
                            }
                        }
                    }
                }
            };
        };

        var updateTopAdPositions = function(object){
            var maxNumberOfAdsOnPage = 11;
            var reformattedArray = [];
            var colorCodeArray = [];
            for (var i = 0; i <= maxNumberOfAdsOnPage - 1; i++) {
                var adCount = 0;
                for (var j = 0; j <= object.length - 1; j++) {
                    if(availableAdSlots[i] === object[j].Name){
                        adCount = object[j].Count;
                    }
                }
                reformattedArray.push({'Name' : availableAdSlots[i] , 'Count' : adCount})
                colorCodeArray.push({'Name' : availableAdSlots[i] , 'Count' : adCount})
            }
            $scope.topAdPositionsArray = reformattedArray;
            setHeatMapColors(colorCodeArray);
        };

        $scope.$parent.$on("sendHeatMapFromHub", function (e, object) {
            $scope.$apply(function () {
                updateTopAdPositions(object); 
            });
        });  

        //PLATFORM MODULE
        $scope.desktopPercentage = 0;
        $scope.mobilePercentage = 0;

        var updatePlatformMethod = function(object) {   
            if(object == ''){
                $scope.desktopPercentage = 0;
                $scope.mobilePercentage = 0;
            }else{
               var i;
               for (i in object) {
                    if(object[i].Name === 'desktop'){
                        $scope.desktopPercentage = (object[i].Count) ? object[i].Count : 0;
                    }else{
                        $scope.mobilePercentage = (object[i].Count) ? object[i].Count : 0;
                    }
                } 
            }
            
        }

        $scope.$parent.$on("sendDeviceStatsFromHub", function (e, object) {
            $scope.$apply(function () {
                updatePlatformMethod(object);
            });
        });

        //GEO TRACKING MODULE
        $scope.easternPercentage = 0;
        $scope.centralPercentage = 0;
        $scope.mountainPercentage = 0;
        $scope.pacificPercentage = 0;

        var geoSlug = [
                        {Count : 2, Latitude : 43.174001, Longitude : -77.563701, Name : "14609"},
                        {Count : 1, Latitude : 40.797466, Longitude : -73.968312, Name : "10025"},
                        {Count : 1, Latitude : 40.797466, Longitude : -73.968312, Name : "10025"},
                        {Count : 1, Latitude : 25.669437, Longitude : -80.408501, Name : "30906"},
                        {Count : 2, Latitude : 33.402024, Longitude : -82.038358, Name : "14609"},
                        {Count : 5, Latitude : 39.441285, Longitude : -84.365196, Name : "45050"},
                        {Count : 6, Latitude : 40.74838, Longitude : -73.996705, Name : "10001"}
                      ]
	    

        var updateGeoTrackingMethod = function(object) {
            var i;
            for (i in object) {
                switch (object[i].Name) {
                case 'eastern':
                    $scope.easternPercentage = object[i].Count;
                case 'central':
                    $scope.centralPercentage = object[i].Count;
                case 'mountain':
                    $scope.mountainPercentage = object[i].Count;
                case 'pacific':
                    $scope.pacificPercentage = object[i].Count;
                }
            }
        }

        $scope.$parent.$on("sendUsersGeoFromHub", function (e, object) {
            $scope.$apply(function() {
                console.log("Change Geo Map");
                console.log(object);
                google.load('visualization', '1', { 'packages': ['geochart'] });
                var i;
                var data = new google.visualization.DataTable();
                
                data.addColumn('number', 'LATITUDE', 'Latitude');                                
                data.addColumn('number', 'LONGITUDE', 'Longitude');
                data.addColumn('number', 'VALUE', 'Value');
                data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
                //data.addColumn({type:'string', role:'tooltip', label : 'City'});

                /*if(object.length > 0){
                    for (i in object) {
                        data.addRows([[geoSlug[i].Latitude,geoSlug[i].Longitude,geoSlug[i].Count, createCustomHTMLContent(geoSlug[i].Name,geoSlug[i].Count)]]);
                    };
                }else{
                    console.log('NO GEO ARRAY');
                    data.addRows([[0,0,0,'']]);
                }*/
                if(object.length > 0){
                    for (i in object) {
                        data.addRows([[object[i].Latitude,object[i].Longitude,object[i].Count, createCustomHTMLContent(object[i].Name,object[i].Count)]]);
                    };
                }else{
                    console.log('NO GEO ARRAY');
                    data.addRows([[0,0,0,'']]);
                }
                var options = {
                    sizeAxis: { minValue: 0, maxValue: 10 },
                    region: 'US',
                    displayMode: 'markers',
                    /*colorAxis: { colors: ['#aadded', '#1091ba'] }, Light Blue to Medium Blue*/
                    colorAxis: { colors: ['#aadded', '#5cb85c'] },
                    backgroundColor: { fill: 'transparent' },
                    datalessRegionColor: 'transparent',
                    enableRegionInteractivity : false,
                    legend: 'none',
                    keepAspectRatio : true,
                    width: 400,/*,
                    tooltip : {trigger : 'none'},*/
                    tooltip: { isHtml: true }
                };
                var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
                chart.draw(data, options);
            });
        });
        
        function createCustomHTMLContent(zipcode, count) {
            return '<div class="zipcode"><b>Zipcode:</b> ' + zipcode + '</div>' +
                   '<div class="zipcode"><b>Count:</b> ' + count + '</div>';
        }
        //START signalR HUB
        //signalRSvc.initialize();
    }
]);