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

//***************************************************************************
  
Array.prototype.returns = function(){
        return this
                .reduce(
                        function(acc,cur){
                                if(acc.prev===null){
                                        return {result:[],prev:cur.datum};
                                        }
                                else{
                                
                                        
                                        return {result: acc.result.concat( Math.log(acc.prev/cur.datum) ),
                                                prev:cur.datum
                                                };
                                        }
                                }
                        ,{result:[],prev:null}
                        )
                .result;
        }
        
Array.prototype.prices = function(){
        return this
                .map(
                        function(cur){
                                return cur.datum;
                                }
                        );
        }
        
Array.prototype.dsfct = function(){
        return this
                .map(
                        function(cur){
                                return Math.exp(-cur.datum/100);
                                }
                        );
        }

Array.prototype.prices = function(){
        return this
                .map(
                        function(cur){
                                return cur.datum;
                                }
                        );
        }
        
Array.prototype.period = function(p){
        return this
                .reduce(
                        function(acc,cur){
                                
                                if (acc.counter%p === 0){
                                        return {result:acc.result.concat(cur),counter:acc.counter+1};
                                        }
                                else {
                                        return {result:acc.result,counter:acc.counter+1};
                                        }
                                }
                        ,{result:[],counter:0}
                        )
                .result;
        }

Array.prototype.quarterly = function(){
        return this.period(63);
        }
Array.prototype.monthly = function(){
        return this.period(21);
        }
Array.prototype.weekly = function(){
        return this.period(5);
        }
Array.prototype.daily = function(){
        return this;
        }

Array.prototype.lookback = function(p){
        //take a number of elements
        //throw error if number of elements is less than amount requested
        var r = Lazy(this).take(p).toArray();
        
        if (r.length === p){return r;}
        else {throw "Not enough data left";}
        }
//***************************************************************************
