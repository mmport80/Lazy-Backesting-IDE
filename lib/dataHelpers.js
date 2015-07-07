        
//*****************************************************
        
var cleanData = function(){
        var _this = this;
        return Lazy(this)
                .reduce(function(acc,c){return acc.concat(c.prices);},Lazy([]))
                //ensure dates are matched for every assetall the way down the line
                .groupBy(function(i){return i.date })
                //make sure the lengths fo arrays at every date are the same
                .filter(function(i){return i.length === _this.length;})
                //bring objects together into one big array
                .flatten()
                //.filter(function(i){return i.ticker != undefined;})
                .groupBy(function(j){return j.ticker})
                //convert to object -> {ticker:prices,...}
                .reduce(
                        function(acc,c){
                                //console.log(c);
                                acc[c[0].ticker] = c;
                                return acc;  
                                }
                        , {}
                        );
        }

Object.defineProperty(
        Object.prototype, 
        'cleanData',
        {
                value: cleanData,
                writable: true,
                configurable: true,
                enumerable: false
                }
        );  
        
                        
//*****************************************************
                
var formatData = function(horizon){
        var _this = this;
        
        var rr = new Object();
        rr = Lazy.generate(
                function() {
                        //update
                        return function() {
                                //convert to future/history object
                                var ret = Object
                                        .keys(_this)
                                        .reduce(
                                                function(acc,k){
                                                        //horizon +1 of prices in order to get horizon's worth of returns
                                                        //generate return
                                                        if(_this[k][horizon] != undefined) {
                                                                acc.date = _this[k][0].date;
                                                                acc.future[k] = [ _this[k][0], _this[k][horizon] ].returns();;
                                                                acc.history[k] = _this[k].slice(horizon, _this[k].length );
                                                                }
                                                        else {
                                                                console.log("koko");
                                                                }
                                                        return acc;
                                                        }
                                                ,{date:"", future:{}, history:{}}
                                                );
                                //knock off tops of each time series
                                _this = Object
                                        .keys(_this)
                                        .reduce(
                                                function(acc,k){
                                                        acc[k] = _this[k].slice(horizon, _this[k].length );
                                                        return acc;
                                                        }
                                                ,{}
                                                );
                                return ret;
                                };
                        }()
                //number of backtests with current horizon
                //horizon worth of return require horizon+1 of prices
                , Math.floor((_this[Object.keys(_this)[0]].length-1)/horizon)
                );
            
        return rr;
        
        }
                
Object.defineProperty(
        Object.prototype, 
        'formatData',
        {
                value: formatData,
                writable: true,
                configurable: true,
                enumerable: false
                }
        );     
