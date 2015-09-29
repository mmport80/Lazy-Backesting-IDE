weight.INDEX_DJI = 0;
var is = data.INDEX_DJI.lookback(21).returns();
var var_i = jStat(is).variance(true);

Object
  .keys(data)
  .forEach(
  	function(k){
      	var vol = jStat.stdev(rs,true);
      	var cov = jStat.covariance(rs,is);
        var b = cov / var_i;
    	weight[k] = 1/vol;
      	weight.INDEX_DJI = weight.INDEX_DJI - weight[k];
    	}
	);



var rs = data.AMEX_SPY.daily().lookback(21).returns();

var vol = jStat(rs).stdev(true);

//Ensure average weight is ~1
var avVol = 0.0080444403;

//Set weighting for upcoming period
weight.AMEX_SPY = avVol/vol;

//13 week t-bill yield index (via Yahoo) used to calculate Sharpe ratio.
//Scaled for a monthly horizon
weight.INDEX_IRX = -weight.AMEX_SPY*(4/13);
