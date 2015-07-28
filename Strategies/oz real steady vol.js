var a = data.INDEX_AORD.daily().lookback(6).returns();
weight.INDEX_AORD  = 0.005/jStat.stdev(a,true);