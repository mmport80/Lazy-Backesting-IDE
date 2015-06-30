var m = data.SPCPMTUP.weekly().lookback(53).returns();

var mean = jStat.mean(m);
var sd = jStat.stdev(m,true);

//if 'large' previous return
m[0] >= sd+mean || m[0] <= -sd ?
//then 'bet' on mean reversion
//retain positive bias
weight.SPCPMTUP = -m[0]
:
//else invest a 'constant relevant' amount
weight.SPCPMTUP = 0;
