/* 
 * estate js Document
*/

$(function(){
	estateOneSlide();
	estateTwoSlide();
	newsSlide();
});

$(window).load(function(){	
	clickMove();	
	estateBar();
});

// a click smoothing move
function clickMove(){
	$('a[data-scroll-index]').on('click', function(){
		var index = $(this).data('scroll-index');
		$(this).parent().addClass('active').siblings().removeClass('active')
		fnMove(index);
		return false;
	});
	function fnMove(seq){
		var offset = $('#index' + seq).offset();
		if(typeof offset !== 'undefined'){
			$('html, body').stop().animate({scrollTop : offset.top}, 600);
		}	
	}
}

//gallery slide
function estateOneSlide(){
	if(!($('.OneSlider .list').length > 0)) return;
	$('.OneSlider .list').bxSlider({
		mode:"horizontal",
		auto:true,		
		controls:true,
		pager:true,
		pause:5000,
		speed:1000,
	});
}

//banner slide
function estateTwoSlide(){
	if(!($('.TwoSlider .list').length > 0)) return;
	var twoSlider = $('.TwoSlider .list').bxSlider();
	var widthMatch = matchMedia("all and (max-width: 768px)");
	var widthHandler = function(matchList) {
	if (matchList.matches) {		
			twoSlider.reloadSlider({
				mode:"horizontal",
				auto:true,		
				controls:false,
				pager:true,
				pause:5000,
				speed:1000,		
				adaptiveHeight:true,
				onSliderLoad: function(){				
					var count = $('.TwoSlider .bx-pager .bx-pager-item').size();
					if(count > 1){
						$('.TwoSlider .bx-pager').css('display','block');
					}
				},
			});
		}else{			
			twoSlider.reloadSlider({
				mode:"horizontal",
				auto:true,		
				controls:false,
				pager:true,
				pause:5000,
				speed:1000,
				minSlides:2,
				maxSlides:2,
				slideWidth:535,
				slideMargin:30,
				onSliderLoad: function(){				
					var count = $('.TwoSlider .bx-pager .bx-pager-item').size();
					if(count > 1){
						$('.TwoSlider .bx-pager').css('display','block');
					}
				},
			});
		}
	}; 
	widthMatch.addListener(widthHandler);
	widthHandler(widthMatch);
}

//news slide
function newsSlide(){
	if(!($('.estate_news .list').length > 0)) return;
	var newSlider = $('.estate_news .list').bxSlider();
	var widthMatch = matchMedia("all and (max-width: 1024px)");
	var widthHandler = function(matchList) {
	if (matchList.matches) {		
			newSlider.reloadSlider({
				mode:"horizontal",
				auto:true,
				controls:false,
				pager:true,
				pause:5000,
				speed:1000,
				minSlides:1,
				maxSlides:3,
				moveSlides:1,
				slideWidth:350,
				slideMargin:15,
				touchEnabled:true,
				onSliderLoad: function(currentIndex){				
					$('.estate_news .list > li').eq(currentIndex + 3).addClass('active-slide');
				},
				onSlideBefore:function($slideElement){			
					$('.estate_news .active-slide').removeClass('active-slide');
					$slideElement.addClass('active-slide');
				},
			});
		}else{			
			newSlider.reloadSlider({
				mode:"horizontal",
				auto:true,
				controls:true,
				pager:false,
				pause:5000,
				speed:1000,
				minSlides:1,
				maxSlides:4,
				moveSlides:1,
				slideWidth:360,
				slideMargin:20,
				touchEnabled:false,
				onSliderLoad: function(currentIndex){				
					$('.estate_news .list > li').eq(currentIndex + 4).addClass('active-slide');
				},
				onSlideBefore:function($slideElement){			
					$('.estate_news .active-slide').removeClass('active-slide');
					$slideElement.addClass('active-slide');
				},
			});
		}
	}; 
	widthMatch.addListener(widthHandler);
	widthHandler(widthMatch);		
}

//sideBar scroll
function estateBar(){
	if(!($('.estateSideBar').length > 0)) return;
	var quick = $('.estateSideBar'),
		conts = $('.single_content');	
	var scrollTop = Math.floor(quick.offset().top),
		scrollHig = quick.outerHeight();
	var contsBottom = Math.floor(conts.offset().top) + conts.outerHeight();
	
	$(window).scroll(function(){
		var winTop = $(window).scrollTop();
		var winBottom = $(window).scrollTop() + $(window).height();
		var scrollTotal = Math.floor(quick.offset().top) + scrollHig;
		if(winTop >= scrollTop){
			quick.addClass('fix').css({'top':winTop - scrollTop ,'bottom': 'auto'});			
		}else{
			quick.removeClass('fix').removeAttr('style');			
		}

		if(scrollTotal >= contsBottom){
			quick.addClass('none').css({'top':'auto','bottom': '0'});
		}

		if(quick.hasClass('none')){
			var scrollNew = Math.floor(quick.offset().top);
			if(scrollNew > winTop){
				quick.removeClass('none').css({'top':winTop - scrollTop ,'bottom': 'auto'});
			}
		}			
	});
}
