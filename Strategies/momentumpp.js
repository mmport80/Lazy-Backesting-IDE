
var m = data.NYSEARCA_MTUM.monthly().lookback(2).returns()[0];

var mean = 0.013;
var sd = 0.03;

m >= 2*sd || m <= -2*sd+mean ?
weight.NYSEARCA_MTUM = -m
:
weight.NYSEARCA_MTUM = mean;

