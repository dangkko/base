/* 
 * custom js Document
 * copyright 3KKANG
 * 작업후 필히 변환하여 wd_custom.js에 붙여주세요 http://dean.edwards.name/packer/
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
		var gnbHtml = $('#header nav .gnb > li > a.on').next('ul').html();
		//lnb add Html
		$('.lnb').append(gnbHtml);
		//nav.lnb ul add html
		$.each($('.lnb'),function(){
			$(this).children("li").wrapAll('<ul></ul>');
		})
		//lnb link #container add
		$('.lnb ul > li').each(function(){
			var lnbLink = $(this).find('a').attr('href');
			$(this).find('a').attr('href',lnbLink + '#container');
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

//달력테스트 지울예정
$(function() {
	$( ".datepicker" ).datepicker({
		dateFormat: 'yy-mm-dd',
		showOn: "button",		
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		showMonthAfterYear: true,
		changeMonth: true,
		changeYear: true,
		//yearSuffix: '년'
	});
});