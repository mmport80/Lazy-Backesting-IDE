importScripts('lib/lazy.js');
importScripts('lib/strategyHelpers.js');
importScripts('lib/dataHelpers.js');

//*****************************************************

self.addEventListener(
        'message',
        function(e) {
                var data = e.data[0];
                var horizon = e.data[1];
                
                //clean
                cd = data.cleanData();
                //format
                //fd = cd.formatData(horizon);
                self.postMessage(cd);
                },
        false
        );
        

//*****************************************************

