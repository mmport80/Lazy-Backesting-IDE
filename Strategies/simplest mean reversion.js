
var f = data.NYSEARCA_FXI.daily().lookback(2).returns()[0];
weight.NYSEARCA_FXI = -f/Math.abs(f+0.0000000001);

<<<<<<< HEAD
//13 week t-bill yield index used to calculate Sharpe ratio. Scaled for a monthly horizon
weight.INDEX_IRX = -weight.NYSEARCA_FXI*(4/13);
=======
//13 week t-bill yield index used to calculate Sharpe ratio. Scaled for a daily horizon
weight.INDEX_IRX = -weight.NYSEARCA_FXI/(5*13);
>>>>>>> addf4672b6b714b22df7b38bbfc9d3c3986500a1

