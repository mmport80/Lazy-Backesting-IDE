
/*

    (c)2015 John Orford
    
    This file is part of Lazy PCA.

    Lazy PCA is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Lazy PCA is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with Lazy PCA.  If not, see <http://www.gnu.org/licenses/>.

*/


//*****************************************************

//close prices
//column 11 is 'Adjusted Close' on Y!
//column 4 is 'Close' on Goog

function getQuandlCall(source, ticker, key){

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
                ticker:ticker
                };
        }
        
        
       
//*****************************************************
//make api call
xhr = function(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", this.url, false);
        xmlhttp.send();
        return JSON.parse(xmlhttp.responseText).data;
        }
        
Object.defineProperty(
        Object.prototype, 
        'xhr',
        {
                value: xhr,
                writable: true,
                configurable: true,
                enumerable: false
                }
        );
             
