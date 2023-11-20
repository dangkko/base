/* 
 * custom js Document
*/ 


$(window).on('load',function(){
	lnbSetControl();
});

//lnb load
function lnbSetControl(){
	if(!($('.lnb').length > 0))	return;	
	//gnb 1depth on check
	if($('#header nav .gnb > li').children('a').hasClass('on')){
		//1depth on true 2depth save
		var gnbHtml = $('#header nav .gnb > li > a.on').next('.box').html();
		//lnb add Html
		$('.lnb').append(gnbHtml);
		//nav.lnb ul add html
		$.each($('.lnb'),function(){
			$(this).children("li").wrapAll('<ul></ul>');
		})
		//lnb link #container add
		$('.lnb ul > li').each(function(){
			var lnbLink = $(this).find('a').attr('href');
			$(this).find('a').attr('href',lnbLink + '#content');
		});	

		//gnb menu on text
		var gnbTitle = $('.gnb > li > a.on').text();
		$('경로').text(gnbTitle);
		//lnb menu on text
		var lnbTitle = $('.lnb ul > li > a.on').eq(0).text();
		$('경로').text(lnbTitle);
	}else{
		//1차가 on이 없는경우 2차가 없음을 간주하고 lnb자체를 숨김처리함 불필요할때 삭제가능
		$('.lnb').hide();
	}
}

