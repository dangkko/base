/* 
 * custom js Document
*/ 

$(window).load(function(){
	var agent = navigator.userAgent.toLowerCase();
	if (agent.indexOf("msie") > -1 || agent.indexOf("trident") > -1) {
	  	console.log('익스');
	} else if ( agent.search( "edge/" ) > -1 ){
		console.log('엣지');
	} else {
		console.log('기타');
	}
});