var sp = data.INDEX_GSPC.daily().lookback(500).returns();

var corr = jStat.corrcoeff(Lazy(sp).rest().toArray(),Lazy(sp).initial().toArray());

var flag = null;

sp[0] < 0 ?
  flag = -1
  : 
  flag = 1;
  ;

weight.INDEX_GSPC = flag * corr;

//13 week t-bill yield index used to calculate Sharpe ratio. Scaled for a monthly horizon
weight.INDEX_IRX = -weight.INDEX_GSPC*(4/13);
