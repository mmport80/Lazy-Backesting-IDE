
var s = data.INDEX_GSPC.daily().lookback(2).returns()[0];
weight.INDEX_GSPC = Math.abs(s)/(s+0.00000001);
weight.INDEX_IRX = -weight.INDEX_GSPC/(5*13);

