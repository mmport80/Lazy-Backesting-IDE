var vix = data.INDEX_VIX.daily().lookback(1).prices()[0];

var realisedVol = jStat( data.INDEX_GSPC.daily().lookback(5).returns() ).stdev(true)*100*Math.sqrt(252);

weight.INDEX_VIX = 1/realisedVol;
 
weight.INDEX_GSPC = 1;

//13 week t-bill yield index used to calculate Sharpe ratio. Scaled for a monthly horizon
weight.INDEX_IRX = -(weight.INDEX_GSPC+weight.INDEX_VIX)*(4/13);

//
