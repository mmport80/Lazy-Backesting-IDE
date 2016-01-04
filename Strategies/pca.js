var lb = 63;

var bb = data.AMEX_TLT.daily().lookback(lb).returns();
var cc = data.AMEX_SPY.daily().lookback(lb).returns();
var dd = data.AMEX_GLD.daily().lookback(lb).returns();

var pss = [bb,cc,dd];

//demean
var pss_dm = pss.map(
  function(i){
    var m = jStat(i).mean();
    return i.map(function(j){return j-m;});
  	}
  )

//*********************************************
//find r2, and return 'goodness of spread/diversification' resul
var diversificationMeasure = function(ps){
  var r =  numeric.svd( numeric.transpose(ps) )
    	.S
    	.map(
    		function(i){
              return Math.pow(i,2)
              }
  			)
  		;
  	var sum = r.reduce(function(a,c){return a+c;});
  	
  	return r.map(function(i){return i/sum;}).reduce(function(a,c){return a * c;},1);
  	}

//*********************************************
//optimise
var objective = function(x){
  //shock
  return - diversificationMeasure( numeric.dot(numeric.diag(x), pss_dm) );
  }

//start at equal weighting
var sol = numeric.uncmin(objective,numeric.rep([pss.length],1/pss.length)).solution;
sol.print();
//*********************************************

weight.AMEX_TLT = sol[0];
weight.AMEX_SPY = sol[1];
weight.AMEX_GLD = sol[2];
//netting, in order to calculate sharpe
weight.INDEX_IRX = -sol.reduce(function(a,c){return a+c;},0)*(4/13);
