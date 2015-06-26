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
//*****************************************************
                
function addAsset(source, ticker, yield){
        var key = document.getElementById('key').value;
        
        
        Lazy(ticker)
                .split(',')
                .value()
                .forEach(
                        function(t){
                                getQuandlCall(source, t, key, yield)
                                        .tap2("Requesting prices for:","availableData")
                                        //from networking.js
                                        .getData()
                                        ;
                                }
                        );
        }


function setAddAssetListener(no){
        document.getElementById('addAsset'+no)
                .addEventListener("click", 
                        function(){
                                addAsset(
                                        document.getElementById('source'+no).value,
                                        document.getElementById('ticker'+no).value,
                                        document.getElementById('yield'+no).checked
                                        );
                                }
                        );
        }

setAddAssetListener(1);
setAddAssetListener(2);
setAddAssetListener(3);


//*****************************************************

function setBackTestListener(){
        var code = editor.getValue();
        var js = 
                "var strategyLogic = function(data){var weight = new Object();\n"+
                code+"\n"+
                "return weight;}\n"+
                "backTest();\n";
        var s = document.createElement('script');
        s.textContent = js;
        document.body.appendChild(s);
        }

//after pushing 'calc' button
document
        .getElementById('BackTest')
        .addEventListener("click",
                function(){ 
                        //myWorker.postMessage("backtest");
                        setBackTestListener();
                        }
                );

//*****************************************************


function setHorizonListener(){
        horizon = +document.getElementById('horizon').value;
        if (cd.length != 0){
                fd = cd.formatData().toArray();
                }
        }


//after pushing 'calc' button
//changehorizon, means changing clean data also - if not []
document
        .getElementById('horizon')
        .addEventListener("change", 
                function(){ 
                        setHorizonListener();
                        }
                );

//*****************************************************

//*****************************************************
