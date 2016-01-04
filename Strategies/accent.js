//AMEX_SPY
//MMM,AXP,AAPL,BA,CAT,CVX,CSCO,KO,DD,XOM,GE,GS,HD,INTC,IBM,JPM,JNJ,MCD,MRK,MSFT,NKE,PFE,PG,TRV,UTX,UNH,VZ,V,WMT,DIS

weight.AMEX_SPY = 0;
var is = data.AMEX_SPY.lookback(21).returns();
var var_i = jStat(is).variance(true);

Object
  .keys(data)
  .filter(
  	function(k){
      return k != 'AMEX_SPY';
      }
	)
  .forEach(
  	function(k){
      	var rs = data[k].lookback(21).returns();
      	var vol = jStat(rs).stdev(true);
      	var cov = jStat.covariance(rs,is);
        var b = cov / var_i;
    	weight[k] = 1/vol;
      	weight.AMEX_SPY = weight.AMEX_SPY - b * weight[k];
    	}
	);
