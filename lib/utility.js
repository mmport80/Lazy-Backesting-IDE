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


//*****************************************************

Number.prototype.yieldToDsft = function(){
        return Math.exp(-this/100);
        }



//*****************************************************
        
        
write = function(desc,id){

        if (id === undefined){
                id = "messages";
                }

        var p = document.createElement('p');
        var text = document.createTextNode(desc+" "+this);
        p.appendChild(text);
        document.getElementById(id).appendChild(p);
        
        }

Object.defineProperty(
        Object.prototype, 
        'write',
        {
                value: write,
                writable: true,
                configurable: true,
                enumerable: false
                }
        );

//*****************************************************


//print between dot passing
tap2 = function(desc,id,status){
        this.ticker.write(desc,id);
        return this;
        }


Object.defineProperty(
        Object.prototype, 
        'tap2',
        {
                value: tap2,
                writable: true,
                configurable: true,
                enumerable: false
                }
        );

//*****************************************************

        
function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }

