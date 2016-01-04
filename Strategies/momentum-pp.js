var m = data.SPCPMTUP.monthly().lookback(2).returns()[0];

m >= 0.025 || m <= -0.025 ?
	weight.SPCPMTUP  = -m
	:
	weight.SPCPMTUP = 0.2;

//

var m = data.NYSEARCA_MTUM.monthly().lookback(2).returns()[0];

m >= 0.025 || m <= -0.025 ?
	weight.NYSEARCA_MTUM  = -m
	:
	weight.NYSEARCA_MTUM = 0.2;

