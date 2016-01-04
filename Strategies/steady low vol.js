var a = data.SP5LVI.daily().lookback(6).returns();
weight.SP5LVI = 0.0057/jStat.stdev(a,true);