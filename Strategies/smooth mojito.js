var vxv = data.VXV.daily().lookback(1).prices()[0];
var vix = data.INDEX_VIX.daily().lookback(1).prices()[0];

var ivts = vix/vxv;

weight.VXX = 11*Math.pow(ivts,2)-17*ivts+5.8;
weight.NYSEARCA_VXZ = 11*Math.pow(ivts,2)-17*ivts+6.8;

//13 week t-bill yield index used to calculate Sharpe ratio. Scaled for a monthly horizon
weight.INDEX_IRX = -(weight.VXX+weight.NYSEARCA_VXZ)*4/13;