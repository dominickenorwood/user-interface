       $(function () {
           // Declare a proxy to reference the hub. 
           var realtime = $.connection.realtimeHub/*,
               up = '▲',
               down = '▼',
               $stockTable = $('#stockTable'),
               $stockTableBody = $stockTable.find('tbody')*/;

           // Create a function that the hub can call to broadcast messages.
           /*insights.client.updateCountedEvents = function (countedEvent) {
               if (countedEvent.InsightEventType == 'View')
                   $('#viewcount').html(countedEvent.Count);
               if (countedEvent.InsightEventType == 'Click')
                   $('#clickcount').html(countedEvent.Count);
           };*/

           // Start the connection.
           $.connection.hub.start().done(function () {
               $('#open').click(function () {
                   // Call the Send method on the hub. 
                   //var countedEvent = realtime.server.updateProfessions();
                   //$stockTableBody.clear();
                   console.log('From JS File')
                   console.log(realtime.server.updateProfessions());
                   realtime.server.updateProfessions();
               });
           });
       });
