importScripts('lib/lazy.js');
importScripts('lib/strategyHelpers.js');
importScripts('lib/dataHelpers.js');
importScripts('lib/networking2.js');
importScripts('lib/utility.js');




//*****************************************************

self.addEventListener(
        'message',
        function(e) {
                var d = e.data;   
                
                var prices =
                        //map data from quandl
                        getQuandlCall(
                                d.source,
                                d.ticker,
                                d.key
                                )
                        .xhr()
                        .map(
                                function(i){
                                        var r = null;
                                        d.y == true ?
                                                r = {ticker: d.ticker, date: new Date(i[0]), datum:i[1].yieldToDsft()} 
                                                :
                                                r = {ticker: d.ticker, date: new Date(i[0]), datum:i[1]};
                                        return r;
                                        }
                                )
                        ;
                        
                //console.log(prices);
                
                self.postMessage({ticker:d.ticker,prices:prices,horizon:d.horizon});
                },
        false
        );
        

//*****************************************************

