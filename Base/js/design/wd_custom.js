/* 
 * custom js Document
*/ 


$(window).on('load',function(){
	lnbSetControl();
});

//lnb load
function lnbSetControl(){
	if(!($('.lnb').length > 0))	return;	

	//gnb 1차메뉴가 on이 있는경우 구문실행
	if($('#header nav .gnb > li').children('a').hasClass('on')){
		//1차메뉴 on일때 2차 하위저장
		let gnbHtml = $('#header nav .gnb > li > a.on').next('.box').html();

		//lnb add Html
		$('.lnb').append(gnbHtml);

		//1차메뉴 on일때 2차저장 / 3차 저장
		let gnbHtml1_Title= $('#header nav .gnb > li > a.on').html(), //1depth 메뉴명저장
			gnbHtml2 = $('#header nav .gnb > li > a.on').next('.box').html(),
			gnbHtml2_Title = $('#header nav .gnb > li > .box > ul > li').children('a.on').html(), //2depth 메뉴명저장
			gnbHtml3 = $('#header nav .gnb > li ul > li > a.on').next('.box').html(),
			gnbHtml3_Title = $('#header nav .gnb > li ul > li > .box > ul > li').children('a.on').html(); //3depth 메뉴명저장
			
		//활성화 메뉴명뿌리기	
		$('경로').append(gnbHtml1_Title);
		$('경로').append(gnbHtml2_Title);
		$('경로').append(gnbHtml3_Title);

		//nav.lnb ul이나 마크업이 더 필요할경우 추가 - 필요없을시 삭제하면됨.
		$.each($('.lnb'),function(){
			$(this).children("li").wrapAll('<ul></ul>');
		})

		//lnb link #content lnb 링크시점만 추가함. - 필요없으시 삭제하면됨.
		$('.lnb ul > li').each(function(){
			var lnbLink = $(this).find('a').attr('href');
			$(this).find('a').attr('href',lnbLink + '#content');
		});			

		//활성화 값이 없는경우 숨김
		if(typeof gnbHtml2_Title == '' || typeof gnbHtml2_Title == 'undefined'){
			$('경로').remove();
		}
		if(typeof gnbHtml3_Title == '' || typeof gnbHtml3_Title == 'undefined'){
			$('경로').remove();
		}
		
	}else{
		//1차가 on이 없는경우 2차가 없음을 간주하고 lnb자체를 숨김처리함 불필요할때 삭제가능
		$('.lnb').hide();
	}
}