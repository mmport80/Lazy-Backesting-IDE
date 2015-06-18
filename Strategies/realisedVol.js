var realisedVol = jStat( data.INDEX_GSPC.daily().lookback(11).returns() ).stdev(true)*100*Math.sqrt(21);
//var vix = data.INDEX_GSPC.daily().lookback(1).prices();

weight.INDEX_GSPC = 1/realisedVol;
//weight.INDEX_GSPC = 1/vix;

//13 week t-bill yield index used to calculate Sharpe ratio. Scaled for a monthly horizon
weight.INDEX_IRX = -weight.INDEX_GSPC*(4/13);

