//INDEX_DJI,MMM,AXP,AAPL,BA,CAT,CVX,CSCO,KO,DD,XOM,GE,GS,HD,INTC,IBM,JPM,JNJ,MCD,MRK,MSFT,NKE,PFE,PG,TRV,UTX,UNH,VZ,V,WMT,DIS

weight.INDEX_DJI = 0;
var is = data.INDEX_DJI.lookback(21).returns();
var var_i = jStat(is).variance(true);

Object
  .keys(data)
  .filter(
  	function(k){
      return k != 'INDEX_DJI';
      }
	)
  .forEach(
  	function(k){
      	var rs = data[k].lookback(21).returns();
      	var vol = jStat(rs).stdev(true);
      	var cov = jStat.covariance(rs,is);
        var b = cov / var_i;
    	weight[k] = 1/vol;
      	weight.INDEX_DJI = weight.INDEX_DJI - b * weight[k];
    	}
	);