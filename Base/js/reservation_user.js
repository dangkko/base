/* only reservation */

$(function(){
	roomPhoto();
	roomResult();
});

$(window).load(function(){
	roomSearch();		
});

function roomSearch(){
	if(!($('.area_roomReserved').length > 0)) return;
	var quick = $('.area_roomReserved .scroll'),
		room = $('.area_roomReserved .room');	
	var scrollTop = quick.offset().top,
		scrollHig = quick.outerHeight();
	var roomBottom = room.offset().top + room.outerHeight();
	if($('.area_roomReserved .pagination').length > 0){
		var page = $('.area_roomReserved .pagination').outerHeight() + 30;
	}else{
		var page = 0;
	}
	$(window).scroll(function(){
		var winTop = $(window).scrollTop();
		var winBottom = $(window).scrollTop() + $(window).height();
		var scrollTotal = quick.offset().top + scrollHig;
		var scrollNew = quick.offset().top
		if(winTop >= scrollTop){
			quick.addClass('fix');			
		}else{
			quick.removeClass('fix');			
		}

		if(scrollTotal >= roomBottom){
			quick.addClass('none').css({'top':'auto','bottom': page});
		}
		
		if(scrollNew > winTop){
			quick.removeClass('none').css({'top':'0','bottom': 'auto'});
		}		
	});
}

function roomPhoto(){
	if(!($('.area_roomReserved').length > 0)) return;
	$('.area_roomReserved .list_item .photo .list').bxSlider({
		mode:'horizontal',
		auto:false,
		speed:1500,
	});
}

function roomResult(){
	if(!($('.area_roomReserved').length > 0)) return;
	$(".area_roomReserved.result input").bind("change paste keyup", function() {
		if($(this).val().length == 0){
			$(this).parent('li').removeClass('active');
		}else{
			$(this).parent('li').addClass('active');
		}				  
	});
	$(".area_roomReserved.result input").bind('focusin', function() {
		$(this).parent('li').addClass('in');						  
	});
	$(".area_roomReserved.result input").bind('focusout change', function() {
		$(this).parent('li').removeClass('in');						  
	});

}