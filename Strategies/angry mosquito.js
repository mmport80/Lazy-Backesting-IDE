var vxv = data.VXV.daily().lookback(1).prices()[0];
var vix = data.INDEX_VIX.daily().lookback(1).prices()[0];

var ivts = vix/vxv;

if(ivts < 0.91){
  	weight.VXX = -0.7;
  	weight.NYSEARCA_VXZ = 0.3;
	}
else if (ivts < 0.94){
  	weight.VXX = -0.32;
  	weight.NYSEARCA_VXZ = 0.68;
	}
else if (ivts < 0.97){
  	weight.VXX = -0.32;
  	weight.NYSEARCA_VXZ =0.68;
	}
else if (ivts < 1.005){
  	weight.VXX = -0.28;
  	weight.NYSEARCA_VXZ = 0.72;
	}
else {
  	weight.VXX = 0;
  	weight.NYSEARCA_VXZ = 1;
	}

weight.INDEX_GSPC = weight.NYSEARCA_VXZ+weight.VXX;

//13 week t-bill yield index used to calculate Sharpe ratio. Scaled for a daily horizon
weight.INDEX_IRX = -(weight.INDEX_GSPC+weight.VXX+weight.NYSEARCA_VXZ)/(5*13);

