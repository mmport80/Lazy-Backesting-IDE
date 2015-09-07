var v = data.INDEX_GSPC.daily().lookback(43).returns();
weight.INDEX_GSPC = 1/jStat.stdev(v,true);
weight.INDEX_IRX = -weight.INDEX_GSPC * (4/13);