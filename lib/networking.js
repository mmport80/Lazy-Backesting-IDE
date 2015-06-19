
/*
    (c)2015 John Orford
    
    This file is part of Lazy Backtesting.

    Lazy Backtesting is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Lazy Backtesting is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with Lazy Backtesting.  If not, see <http://www.gnu.org/licenses/>.

*/


//close prices
//column 11 is 'Adjusted Close' on Y!
//column 4 is 'Close' on Goog
function getQuandlCall(source, ticker, key, yield){

        if (source == "GOOG"){
                var column = 4;
                }
        else if (source == "YAHOO") {
                var column = 6;
                }
        else if (source == "CBOE") {
                var column = 1;
                }
        else if (source == "SPDJ") {
                var column = 1;
                }

        return {
                url:'https://www.quandl.com/api/v1/datasets/'+source+'/'+ticker+'.json?column='+column+'&auth_token='+key,
                ticker:ticker,
                yield:yield
                };
        }




        
//*****************************************************
//make api call
getData = function(){
 
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", this.url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");

        var _this = this;

        xmlhttp.onload = 
                function(){
                        //console.log(this);
                        var r = {ticker: _this.ticker, prices: JSON.parse(this.responseText).data};
                        
                        globalInputs = r.addToGlobalData(_this.yield);
                
                        //keep track fof number sof assets added
                        assetKeys = globalInputs.pluck('ticker').uniq().toArray();
                        
                        noOfAssets = assetKeys.length;
                        
                        //kill both of these if another process starts with extra data...
                        cd = globalInputs.cleanData();
                        fd = cd.formatData().toArray();
                        
                        
                        this.statusText.write("Status:","availableData");
                        }

        xmlhttp.send();

        }
        
Object.defineProperty(
        Object.prototype, 
        'getData',
        {
                value: getData,
                writable: true,
                configurable: true,
                enumerable: false
                }
        );
