var Mc = data
  .AMEX_SPY 
  .daily()
  .lookback(21)
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

weight.AMEX_SPY = Mc/19;
