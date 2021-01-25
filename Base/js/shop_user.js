$(function(){
	productBest();
	sliderView();
	shopViewTab();
	shopAccor();
	cartAccor();
	shopLogin();
	mypageLink();
});

$(window).load(function(){
	sliderShop();
	productList();
	optionChage();
});

//category
$(function(){
	$('*[data-category-location="list"]').each(function(){
		var categoryLi = $(this).children('li');
		var categoryLink = categoryLi.children('a');
		var categoryUl = categoryLi.children('ul');
		categoryLink.on('mouseover click',function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active').next('ul').stop().slideUp();
			}else{
				$(this).addClass('active').next('ul').stop().slideDown();
			}
			return false;
		});

		categoryLi.on('mouseleave',function(){
			$(this).children('a').removeClass('active');
			$(this).children('ul').stop().slideUp();
		});
	});


	$('*[data-category-location="tab"] .web').each(function(){
		var cateTabLi = $(this).children('li');
		var cateTabUl = $('*[data-category-location="tab"] .web li').children('ul');
		var cateTabUlLi = cateTabUl.children('li');
		var cateTabA = cateTabLi.children('a');
		var cateTabB = cateTabUl.children('li').children('a');
		cateTabUl.parent('li').addClass('sub');
		cateTabA.on('mouseover',function(){
			if($(this).next('ul').length > 0){
				var cateTop = $(this).outerHeight();
				$(this).next('ul').css('top',cateTop);
				$(this).toggleClass('active').next('ul').stop().slideDown();
			}
		});

		cateTabB.on('mouseover',function(){
			$(this).parents('ul').parent('li').addClass('active');
		});

		cateTabB.on('mouseover',function(e){
			if($(this).next('ul').length > 0){
				$(this).parent('li').toggleClass('active');
			}
		});

		cateTabLi.on('mouseleave',function(){
			$(this).children('a').removeClass('active');
			$(this).children('ul').stop().slideUp();
			$(this).children('ul').children('li').removeClass('active');
		});

		cateTabUlLi.on('mouseleave',function(){
			$(this).removeClass('active');
		});
	});
});

//default
function productList(){
	if(!($('*[data-shop-list="default"]').length > 0)) return;
	var shopLink = $('*[data-shop-list="default"] > li > a');
	var shopArr = shopLink.children('.img');
	$.each(shopArr, function(index, item){
		var listA = $(this).parents('li');
		var listImg = $(this).children().size();
		$(item).attr('data-shop-list',listImg);

		listA.on('mouseover',function(){
			if(listImg > 1){
				$(item).children('i:first').stop().fadeOut();
				$(item).children('i:last').stop().fadeIn();
			}
			$(item).parents('li').addClass('active');
		});

		listA.on('mouseleave',function(){
			if(listImg > 1){
				$(item).children('i:first').stop().fadeIn();
				$(item).children('i:last').stop().fadeOut();
			}
			$(item).parents('li').removeClass('active');
		});
	});
}

//best
function productBest(){
	if(!($('.area_shopList .best *[data-shop-list="default"]').length > 0)) return;
	var bestArr = $('.area_shopList .best *[data-shop-list="default"] > li');
	$.each(bestArr, function(index, item){
		var idx = proNumber(index + 1 , 2);
		$(item).attr('data-shop-best', idx);
	});
}

//number
function proNumber(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

//slider
function sliderShop(){
	if(!($('.shopSliderGroup').length > 0)) return;
	var slider = $('.shopSliderGroup').bxSlider();
	var widthMatch = matchMedia("all and (max-width: 1024px)");
	var widthHandler = function(matchList) {
		if (matchList.matches) {
			slider.reloadSlider({
				mode:'horizontal',
				auto:false,
				speed:1000,
				pager:true,
				controls:false,
				minSlides:2,
				maxSlides:3,
				slideWidth:200,
				slideMargin:20,
				touchEnabled:true,
				wrapperClass:'bx-wrapper-shop',
			})
		} else {
			slider.reloadSlider({
				mode:'horizontal',
				auto:false,
				speed:1000,
				pager:false,
				minSlides:4,
				maxSlides:4,
				slideWidth:270,
				slideMargin:40,
				touchEnabled:false,
				wrapperClass:'bx-wrapper-shop',
			})
		}
	};
	widthMatch.addListener(widthHandler);
	widthHandler(widthMatch);

	function bxInit(){
		var winSize = $(window).width(),
			sizeID;
		if(winSize < 1023){
			sizeID = true;
		}else{
			sizeID = false;
		}
	}

	bxInit();
	$(window).resize(function(){
		slider.stopAuto(true);
		bxInit();
	});
}

function sliderView(){
	if(!($('.shopSliderView').length > 0)) return;
	//default setting
	$('.shopSliderView').attr('data-view-slide','00');
	var slideArr = $('.shopSliderView > li');
	$.each(slideArr, function(index, item){
		var idx = proNumber(index, 2); //자릿수선언
		$(item).attr('data-view-index', idx);
	});

	//slider
	var slider = $('.shopSliderView').bxSlider();
	function bxInit(){
		var winSize = $(window).width(),
			sizeID;
		if(winSize < 1023){
			sizeID = true;
		}else{
			sizeID = false;
		}

		slider.reloadSlider({
			mode:'horizontal',
			auto:false,
			pager:false,
			minSlides:4,
			maxSlides:6,
			slideWidth:112,
			slideMargin:10,
			moveSlides:1,
			touchEnabled:sizeID,
			wrapperClass:'bx-wrapper-view',
			onSlideBefore:function(currentSlideNumber, totalSlideQty, currentSlideHtmlObject){
				var slideidx = proNumber(currentSlideHtmlObject, 2);
				$('.shopSliderView').attr('data-view-slide', slideidx);
				var slideViewTop = $('.shopSliderView').attr('data-view-slide');

				$('.shopSliderView > li').each(function(){
					var slideViewNum = $(this).attr('data-view-index');
					if(slideViewTop == slideViewNum){
						var slideImg = $(this).find('img').attr('src');
						$('*[data-shop-view="photo"] .img img').attr('src',slideImg);
					}
				});
			},
			onSliderLoad:function(){
				var slideImgFrist = $('.shopSliderView li[data-view-index="00"]').find('img').attr('src');
				$('*[data-shop-view="photo"] .img img').attr('src',slideImgFrist);
			},

		});

		$('.shopSliderView > li > a').on('mouseover click',function(){
			var slideImgOver = $(this).find('img').attr('src');
			$('*[data-shop-view="photo"] .img img').attr('src',slideImgOver);
			return false;
		});
	}

	bxInit();
	$(window).resize(function(){
		slider.stopAuto(true);
		bxInit();
	});	
}

function shopViewTab(){
	if(!($('*[data-shop-view="tab"]').length > 0)) return;

	var sections = $('div[id^="shopView"]')
	, nav = $('[data-shop-view="tab"]')
	, nav_height = nav.outerHeight();

	var tabTop = $('[data-shop-view="tab"]').offset().top + 10;
	$(window).on('scroll', function () {
		var scrollTop = $(window).scrollTop();
		var cur_pos = $(this).scrollTop();

		if(tabTop <= scrollTop){
			$('[data-shop-view="tab"]').addClass('fix');
		}else{
			$('[data-shop-view="tab"]').removeClass('fix');
		}
		
		sections.each(function() {
			var top = Math.floor($(this).offset().top) - nav_height
			, bottom = top + $(this).outerHeight();
		
			if(cur_pos >= top && cur_pos <= bottom) {
				nav.find('a').removeClass('active');
				sections.removeClass('active');		  
				$(this).addClass('active');
				nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
			}
		});
	});

	nav.find('a').on('click', function(){
		var $el = $(this)
		, id = $el.attr('href');
	  
		$('html, body').animate({
			scrollTop: Math.floor($(id).offset().top) - nav_height
		}, 500);

		return false;
	});
}


//accordian list
function shopAccor(){
	if(!($('.list_shop_accordion').length > 0)) return;
	$('.list_shop_accordion li').each(function(){
		var liLink = $(this).find('a[data-shop-accordion="subject"]');
		liLink.off('click');
		liLink.on('click',function(){
			$(this).parents('li').toggleClass('active').children('.tbody').stop().slideToggle();
			return false;
		});
	});
}
function cartAccor(){
	if(!($('*[data-shop-view="addcordion"]').length > 0)) return;
	$('*[data-shop-view="addcordion"]').on('click',function(){
		$(this).toggleClass('active').next('*[data-shop-view="addcordion_conts"]').slideToggle();
		if($(this).hasClass('show')){
			$(this).toggleClass('show active');
		}
		return false;
	});

	var widthMatch = matchMedia("all and (min-width: 1221px)");
	var widthHandler = function(matchList) {
	    if (matchList.matches) {
	    	$('*[data-shop-view="addcordion"]').removeClass('active');
	    	$('*[data-shop-view="addcordion_conts"]').removeAttr('style');
	    }
	};
	widthMatch.addListener(widthHandler);
	widthHandler(widthMatch);
}

function optionChage(){
	$('a[data-shop-layer="view"]').on('click',function(){
		$(this).parent().find('*[data-shop-layer="pop"]').show();
		return false;
	});
	$('*[data-shop-layer="pop"] .close').on('click',function(){
		$(this).parent().hide();
		return false;
	});
}

function shopLogin(){
	if(!($('.area_shopLogin').length > 0)) return;
	$(".area_shopLogin input").bind("change paste keyup", function() {
		if($(this).val().length == 0){
			$(this).parent('li').removeClass('active');
		}else{
			$(this).parent('li').addClass('active');
		}
	});
	$(".area_shopLogin input").bind('focusin', function() {
		$(this).parent('li').addClass('in');
	});
	$(".area_shopLogin input").bind('focusout change', function() {
		$(this).parent('li').removeClass('in');
	});

	//login tab
	$('.area_shopLogin').each(function(){
		var tabLink = $(this).children('a.tab'),
			tabConts = $(this).children('div[data-login-tab]');
		tabLink.on('click',function(e){
			e.preventDefault();
			var linkTabNum = $(this).attr('href').split("#");
			tabLink.removeClass('active');
			$(this).addClass('active');
			tabConts.hide();
			$('.area_shopLogin').find('div[data-login-tab='+linkTabNum[1]+']').show();
		});
		tabLink.eq(0).click();
	});
}

function mypageLink(){
	if(!($('.area_shopMypage .link').length > 0)) return false;
    $('.area_shopMypage .link').each(function(){
		var linkSize = $('a',this).length;
		$(this).addClass('col0'+linkSize);
	});
}