/* 
 * module js Document
*/ 

$(window).resize(function(){ 
	calendarH();
});

$(function(){
	calendarH();
	calendarSlider();
	treeUI();
	applyResult();
});

//tree UI
function treeUI(){
	if(!($('.area_tree').length > 0)) return;
	$('.area_tree .list li').each(function(){
		if(!($(this).find("ul").length > 0)){
			$(this).children('.tree').removeClass('folder');
		}else{
			$(this).children('.tree').addClass('folder');
		}
	})
	
	$('.area_tree .list li a.folder').on('click',function(e){
		if($(this).parent().find('ul').length > 0){
			e.preventDefault();
			if($(this).parent().hasClass('active')){
				$(this).parent().removeClass('active');	
				if($(this).parent().find('ul').length > 0){
					$(this).parent().find('li').removeClass('active');
					$(this).text('열기');
				}
			}else{
				$(this).text('닫기');
				$(this).parent().addClass('active');
			}
		}else{
			$('.area_tree .list li a.tree').removeClass('on');
			$(this).addClass('on');
		}
	})
	
	$('.area_tree .btn.open').on('click',function(){
		$('.area_tree .list a.folder').parent().addClass('active');
		$(this).addClass('active');
		$('.area_tree .btn.close').removeClass('active');
		return false;
	});
	$('.area_tree .btn.close').on('click',function(){
		$('.area_tree .list a.folder').parent().removeClass('active');
		$('.area_tree .btn.open').removeClass('active');
		return false;
	});
}

//datapicker
$(function() {
	if($('*[data-form-type="datepicker"]').length > 0){

		var option = {
		showOn: "button",
		buttonText: "달력보기",
		showAnim:"slideDown",
		dateFormat:"yy.mm.dd",
		changeMonth: true,
		changeYear: true,
		monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		prevText: "이전달",
		nextText: "다음달",
		showMonthAfterYear: true,
		}

		if( $('*[data-form-type="datepicker"]').filter('[data-min-date]') ){
			var minDate = new Date($('*[data-form-type="datepicker"]').filter('[data-min-date]').data("min-date"));
			option['minDate'] = minDate;
		}

		if( $('*[data-form-type="datepicker"]').filter('[data-max-date]') ){
			var maxDate = new Date($('*[data-form-type="datepicker"]').filter('[data-max-date]').data("max-date"));
			option['maxDate'] = maxDate;
		}

		$('*[data-form-type="datepicker"]').datepicker(option);
	}
});

//shop View
$(function(){
	if($('.shopPhoto').length > 0){
		$('.shopPhoto .list').bxSlider({
			auto:true,
			mode:'horizontal',
			//adaptiveHeight:true,
			controls:false,
		});	
	}
});

//calendar
function calendarH(){	
	var calendarHeight = $('.area_calendar .calendar').outerHeight();
	$('.area_calendar .list').css('height',calendarHeight+'px');
}
function calendarSlider(){	
	if(!($('.area_calendar').length > 0)) return;
	$('.area_calendar .slide').bxSlider({
		mode:'horizontal',
		auto:false,
		controls:true,
		pager:false,
		prevText:'이전',
		nextText:'다음',
	});
}

//product
$(function(){
	$('.productView .img ul a').hover(function(){
		var proSrc = $(this).children('img').attr('src');
		$('.productView .img ul a').removeClass('active');
		$(this).addClass('active');
		$('.productView .img span').children('img').attr('src', proSrc);
	});
});

//search apply
function applyResult(){
	if(!($('.area_searchApply').length > 0)) return;
	$(".area_searchApply input").bind("change paste keyup", function() {
		if($(this).val().length == 0){
			$(this).parent('li').removeClass('active');
		}else{
			$(this).parent('li').addClass('active');
		}				  
	});
	$(".area_searchApply input").bind('focusin', function() {
		$(this).parent('li').addClass('in');						  
	});
	$(".area_searchApply input").bind('focusout change', function() {
		$(this).parent('li').removeClass('in');						  
	});

}