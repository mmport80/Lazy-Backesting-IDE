var lb = 300;

var v = data.INDEX_GSPC.daily().lookback(lb+1).returns();

//find max poss range per lookback size
//ensure bulletproofness
var xx = Lazy.range(2,12);
var yy = xx
  	.map(
		function(n){
        	var rs = Lazy(v)
              .chunk(lb/n)
              .map(
              	function(t){
                    var y = numeric.subVS(t,jStat.mean(t));
                  	var s = jStat.stdev(y,true);
                    var z = y.reduce(
                      	function(a,t){
                          	if (a.length === 0) {
                              return [t];
                              }
                          	else {
                              return a.concat(t+a[a.length-1]);
                              }
                          	}
                      	, []
                    	);
                  	var r = Lazy(z).max() - Lazy(z).min();
                  	return r/s;
                	}
              	)
            	.toArray();
          	return Math.log(jStat.mean(rs));
            }
	    )
        .toArray()
	;

var ln_xx = xx.map(
  function(i){
     return Math.log(i);
     }
    )
  .toArray();

var h = 
  jStat.covariance(
  	yy,
    ln_xx
  	)
  /
  jStat.variance(
    ln_xx
  	);

//h.print();

var signal = (Math.abs(h)-0.5)/0.5;

//var r2 = Math.pow(jStat.corrcoeff(yy,ln_xx),2);

var flag = 0;

v[0] < 0 ? flag = -1 : flag = 1;

weight.INDEX_GSPC = signal * flag

