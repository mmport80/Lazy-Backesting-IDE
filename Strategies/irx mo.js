var i = data.INDEX_IRX.daily().lookback(2).returns()[0];
weight.INDEX_IRX = Math.abs(i)/(i+0.00000000001);