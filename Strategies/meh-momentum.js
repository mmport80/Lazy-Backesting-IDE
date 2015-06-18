//loop keys
//find max

var maxAsset = Object
	.keys(data)
	.reduce(
		function(a,k){
          	var m = data[k].period(252).lookback(2).returns()[0];
          	a.currentMax < m ? r = {key:k, currentMax: m} : r = a;
            return r;
        	}
      	,{key:"",currentMax:-Infinity}
    	)
	.key;

weight[maxAsset] = 1;

weight.INDEX_IRX = -1*(4/13);

