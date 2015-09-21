var Mc = data
  .AMEX_SPY 
  .daily()
  .lookback(20)
  .returns()
  .reduce(
  	function(a,c){
      	//increment in the prescence of momentum
      	a[0]*c > 0 ? a[1] = a[1]+1 : null;
        //update 'prev' return
      	a[0] = c;
      	return a;
    	}
    //[prev return, mo count]
	,[0,0]
	)
  [1];

//copy over previous weight
if (history.AMEX_SPY_weight != null) {
  weight.AMEX_SPY = history.AMEX_SPY_weight[0]
  }
else {
  //default
  weight.AMEX_SPY = 0;
  }

//buy
Mc/19 < 0.3 ? weight.AMEX_SPY = 1 : null;

//sell
Mc/19 > 0.7 ? weight.AMEX_SPY = 0 : null;