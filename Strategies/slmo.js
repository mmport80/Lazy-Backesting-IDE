
var r = data.INDEX_GSPC.daily().lookback(500).returns();

var c = jStat.corrcoeff( Lazy(r).initial().toArray(), Lazy(r).rest().toArray() );

weight.INDEX_GSPC = 0;

//mo
r[0] > 0 && c > 0 ? weight.INDEX_GSPC = 1 : null;

//mr
r[0] < 0 && c < 0 ? weight.INDEX_GSPC = 1 : null;
