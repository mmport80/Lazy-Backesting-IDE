//Two years of history
var d = data.INDEX_GSPC.daily().lookback(500).returns();
var w = data.INDEX_GSPC.weekly().lookback(100).returns();
var m = data.INDEX_GSPC.monthly().lookback(25).returns();
var q = data.INDEX_GSPC.quarterly().lookback(9).returns();

//Correlations
var cd = jStat.corrcoeff( Lazy(d).initial().toArray(), Lazy(d).rest().toArray() );
var cw = jStat.corrcoeff( Lazy(w).initial().toArray(), Lazy(w).rest().toArray() );
var cm = jStat.corrcoeff( Lazy(m).initial().toArray(), Lazy(m).rest().toArray() );
var cq = jStat.corrcoeff( Lazy(q).initial().toArray(), Lazy(q).rest().toArray() );

//Results
var result	=               cd * d[0] / Math.abs(d[0] + 0.00000000001);
result 		= result + 	cw * w[0] / Math.abs(w[0] + 0.00000000001)/5;
result 		= result + 	cm * m[0] / Math.abs(m[0] + 0.00000000001)/21;
result 		= result + 	cq * q[0] / Math.abs(q[0] + 0.00000000001)/63;

weight.INDEX_GSPC = result;