var m = data.SPCPMTUP.daily().lookback(90).returns();

var c = jStat.corrcoeff( Lazy(m).initial().toArray(), Lazy(m).rest().toArray() );

var f = 0;
m[0] < 0 ? f = -1 : f = 0;

weight.SPCPMTUP  = c*f;

