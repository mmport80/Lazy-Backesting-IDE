var v = data.SPVXTSTR.daily().lookback(1).prices()[0];
weight.SPVXTSTR  = 360000/v;
weight.INDEX_GSPC = 1;
weight.INDEX_IRX = -(weight.INDEX_GSPC+weight.SPVXTSTR)*(4/13);