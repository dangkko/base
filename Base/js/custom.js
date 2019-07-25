/* 
 * custom js Document
*/ 

$(window).load(function(){
	var agent = navigator.userAgent.toLowerCase();
	if (agent.indexOf("msie") > -1 || agent.indexOf("trident") > -1) {
	  	$('body').addClass('ie');
	} else if ( agent.search( "edge/" ) > -1 ){
		$('body').addClass('ie_edge');
	} else {
		//나머지브라우저 컨트롤
	}
});