        
//*****************************************************
//ensure all data has a matching date
var cleanData = function(){
        var _this = this;
        return Lazy(this)
                .reduce(function(acc,c){return acc.concat(c.prices);},Lazy([]))
                //ensure dates are matched for every assetall the way down the line
                .groupBy(function(i){return i.date })
                .filter(function(i){return i.length === _this.length;})
                .toArray()
                .map(
                        function(i){
                                return i[1];
                                }
                        )
                .reverse()
                ;
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
        
                        