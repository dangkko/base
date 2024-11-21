/* 
 * custom js Document
*/ 

$(function(){
	scrollAni();	
	btnMotion();	  	
});

$(window).on('load',function(){
	lnbSetControl();
	gnbControl();
	gnbMobControl();
	tabControl();
	scrollSize();
	scrollPos();
});

// web mobile check
// data-mobValue 값을 선언하여 숨겨진상태에는 param값에 class mob / web 조건에 따라 부여 
// 초기 예시는 #header nav값에 선언됨.
function responsive(){
	var res = '';
	var param = $('#wrap');

	//default 
	if($('[data-mobValue]').is(":hidden")) res = "mob";
	else res = "web";  
	param.attr("class",res);
	def(param);

	$(window).resize(function(){
		if($('[data-mobValue]').is(":hidden")) res2 = "mob";
		else res2 = "web"; 
		param.attr("class",res2);
		if(res != res2){
			res = res2;  
			def(param);
		}
	}); 

	//기초설정
	function def(param){
		if(param.attr("class") == "web"){
			//모바일 메뉴열림 web에서 닫힘세팅
			//$('.gnb > li > a').unbind('click');
			$('.gnb-mob .gnb > li > a').removeClass('active');
			$('.gnb-mob li.active button.open').click();
			$('.mega-menu__btn, .mega-menu__close').removeClass('active');
			$('body, .mega-menu, .mega-menu__close').removeClass('active');
		} else if (param.attr("class") == "mob"){  
			$('.gnb > li > a').unbind('mouseenter mouseleave');
		}
	}
}

function gnbControl(){
	//gnb ori
	$('.gnb > li > a').on({
		mouseover: function(){
			$('.gnb > li').removeClass('active').find('.box').removeClass('active');
			$(this).parent().addClass('active', function(){
				$(this).addClass('active');
			}); 

			$('.gnb').hover(function() {   
			}, function(){     
				$('.gnb > li').removeClass('active').find('.box').removeClass('active');
			}); 
		},
		focus: function(){
			$(this).parent().addClass('active', function(){
				$(this).addClass('active');
			});  

			$('*').not('.gnb *').focus(function() {       
				$('.gnb > li').removeClass('active').find('.box').removeClass('active');
			}); 
		}
	});
	
	let gnbHtml = $('#header nav .gnb').html();
	//gnb add html
	$('.mega-menu .gnb-mob').append(gnbHtml);
	//li wrap ul
	$('.mega-menu .gnb-mob').children('li').wrapAll('<ul class="gnb"></ul>');
	
	//menu open
	$('.mega-menu__btn').on('click', function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('body, .mega-menu, .mega-menu__close').removeClass('active');
			posY = $('body').attr('data-scroll');
			$(window).scrollTop(posY);
		}else{
			posY = window.scrollY || document.documentElement.scrollTop;
			$(this).addClass('active');
			$('body, .mega-menu, .mega-menu__close').addClass('active');
			$('body').attr('data-scroll',posY);
		}
		return false;
	});
	
	//menu close
	$('.mega-menu__close').on('click', function(){
		$('.mega-menu__btn').click();
		return false;
	});
}

function gnbMobControl(){
	$('.gnb-mob .gnb li').each(function(){		
		var cateLink = $(this).children('a'),
		cateLi = cateLink.parent();
		if(cateLink.next('.box').length > 0){
			$('<button type="button" class="open">메뉴열림</button>').appendTo(cateLi);
		}
	});
	let gnbRoot = $('.gnb-mob'),
		gnbMenu = $('.gnb-mob .gnb li button'),
		gnbLink = gnbMenu.siblings('a'),
		gnbBox = $('.gnb-mob .gnb').find('.box');

	function gnbShow(){		
		let openText = $(this).text();
		$(this).parent().siblings().find('button, a').removeClass('active').end().removeClass('active').children('.box').stop().slideUp('');
		$(this).toggleClass('active').siblings('button, a').toggleClass('active');
		$(this).parent("li:first").toggleClass('active').children('.box').stop().slideToggle('');			
		if($(this).hasClass('open')){
			$(this).text(openText == '메뉴열림' ? '메뉴닫기' : '메뉴열림');
		}
		return false;
	}

	/* !!pc+모바일 둘다 사용할때 
	 * 단, 아코디언 형식으로 사용된다.
	 * 아래 !!모바일 가동시 사용할경우 해당 구문은 주석 or 삭제한다.
	*/	
	gnbLink.unbind('mouseenter mouseleave mouseover focus');
	gnbMenu.click(gnbShow);
	gnbLink.click(gnbShow);

	
	/* !!모바일에서만 가동시킬때
	 * max-width 원하느 모바일 가동사이즈를 선언하면 접기펴기 모드를 골라서 사용가능함. 
	 * 해당 주석을 풀고 사용하면 되며, 위에 선언된 !!pc+모바일 둘다 사용할때는 주석 or 삭제한다.
	 * css는 아코디언으로 코딩되어있으니 수정해서 사용하세요.
	*/
	/*	
	var widthMatch = matchMedia("all and (max-width: 1024px)");
	var widthHandler = function(matchList) {
		if (matchList.matches) {	
			//true
			gnbLink.unbind('mouseenter mouseleave mouseover focus');
			gnbMenu.click(gnbShow);
			gnbLink.click(gnbShow);
		} else {
			//false
			gnbBox.removeAttr('style');
			gnbMenu.unbind('click');
		}
	};
	widthMatch.addListener(widthHandler);
	widthHandler(widthMatch);
	*/
}

//page title, lnb load
function lnbSetControl(){  
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
			
		//활성화 메뉴명뿌리기 - 앞에 필요시 경로 더 추가해서 하면됨.	
		$('[data-subTitle="depth01"], [data-subTitle="current"]').append(gnbHtml1_Title);
		$('[data-subTitle="depth02"]').append(gnbHtml2_Title);
		$('[data-subTitle="depth03"]').append(gnbHtml3_Title);

		if((typeof gnbHtml2_Title =='' || typeof gnbHtml2_Title == 'undefined') && (typeof gnbHtml3_Title =='' || typeof gnbHtml3_Title == 'undefined')){	
			$('[data-subTitle="current"] span').remove();
			$('[data-subTitle="current"]').append(gnbHtml1_Title);
		}else if(typeof gnbHtml3_Title =='' || typeof gnbHtml3_Title == 'undefined'){
			$('[data-subTitle="current"] span').remove();
			$('[data-subTitle="current"]').append(gnbHtml2_Title);
		}else{
			$('[data-subTitle="current"] span').remove();
			$('[data-subTitle="current"]').append(gnbHtml3_Title);
		} 

		//nav.lnb ul이나 마크업이 더 필요할경우 추가
		$.each($('.lnb'),function(){
			$(this).children("li").wrapAll('<ul></ul>');
		});
		//lnb안에 3차메뉴 숨김
		$('.lnb .box').remove();

		//lnb link #content lnb 링크시점만 추가함. - 필요없을시 주석하세요.
		$('.lnb ul > li').each(function(){
			var lnbLink = $(this).find('a').attr('href');
			$(this).find('a').attr('href',lnbLink + '#content');
		});			

		//활성화 2차 메뉴가 없는경우 숨김
		if(typeof gnbHtml2_Title == '' || typeof gnbHtml2_Title == 'undefined'){
			$('경로').remove();
		}
		//활성화 3차 메뉴가 없는경우 숨김
		if(typeof gnbHtml3_Title == '' || typeof gnbHtml3_Title == 'undefined'){
			$('경로').remove();
		}
		
		//lnb갯수가 2개 미만일경우 lnb영역을 숨김 - 필요없을시 주석하세요.
		let lnbSize = $('.lnb li').length;
		if(lnbSize < 2){
			$('.area_lnb').remove();
		}		
	}else{
		//1차가 on이 없는경우 2차가 없음을 간주하고 lnb자체를 숨김처리함 불필요할때 삭제가능
		$('.lnb').hide();
	}
}

function scrollAni(){
	jQuery.fn.motionA = function(){
		var bottom_of_object = this.offset().top + this.outerHeight()/2;
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		
		if( bottom_of_window > bottom_of_object ){                
			this.addClass("motion__in");	                    
		}else{
			this.removeClass('motion__in');
		}		
	}
	
	jQuery.fn.motionB = function(){
		var bottom_of_object = this.offset().top;
		var bottom_of_window = $(window).scrollTop() + $(window).height()/4;
		
		if( bottom_of_window > bottom_of_object ){                
			this.addClass("motion__in");	                    
		}else{
			this.removeClass('motion__in');
		}
	}
	
	$('[data-motion]:not(.fast)').each( function(i){		
		let $el = $(this);
		$el.motionA();
	}); 
	
	$('[data-motion].fast').each( function(i){		
		let $el = $(this);
		$el.motionB();		
	});
	
	$(window).scroll(function(){
		$('[data-motion]:not(.fast)').each( function(i){		
			let $el = $(this);
			$el.motionA();
		});   
		
		$('[data-motion].fast').each( function(i){		
			let $el = $(this);
			$el.motionB();	
		});   
	});
}

function btnMotion(){
	if(!($('.primary-button').length > 0)) return;
	
	let button = document.querySelector(".primary-button");
	let item = document.querySelector(".primary-button .round");

	button.addEventListener("mouseenter", function(event) {
		this.classList += " animate";
		let buttonX = event.offsetX;
		let buttonY = event.offsetY;

		if (buttonY < 24) {
			item.style.top = 0 + "rem";
		} else if (buttonY > 30) {
			item.style.top = 60 + "rem";
		}

		item.style.left = buttonX + "rem";
		item.style.width = "1rem";
		item.style.height = "1rem";
	});

	button.addEventListener("mouseleave", function() {
		this.classList.remove("animate");

		let buttonX = event.offsetX;
		let buttonY = event.offsetY;

		if (buttonY < 24) {
			item.style.top = 0 + "rem";
		} else if (buttonY > 30) {
			item.style.top = 60 + "rem";
		}
		item.style.left = buttonX + "rem";
	});
}

function scrollSize(){
	/* div.scroll_control
	 *		div.inner or nav.inner
	 *			ul
	*/
	let scrollWidth = 0
	$('.scroll_control .inner li').each(function(index){
		scrollWidth += Number($(this).outerWidth());			
	});
	let scrollSize = $('.scroll_control .inner').outerWidth();

	if(scrollWidth > scrollSize){
		$('.scroll_control').addClass('full'); 		
	}else{
		$('.scroll_control').removeClass('full');
	}
}	  
function scrollPos(){
	$('.scroll_control').each(function(i){
		let thisName = $(this);
		setTimeout(function(){
			let tabLeft = thisName.find('ul > li > a.on').position();
			if(typeof tabLeft !== 'undefined'){
				thisName.children('.inner').animate( { scrollLeft : tabLeft.left }, 400 );		
			}
		}, 200);
	});
}
$(window).resize(function(){
	let widSize = $(window).outerWidth,
		mainWid = $(window).innerWidth();		
	if(widSize != mainWid){
		scrollSize();
	}
});

function tabControl(){
	/* div.tab-area 
	 *     ul.tab-control
	 *       li a data-tab="이름"
	 *   div.tab-conts
	 *     div.tab-box id="이름"
	 * */
	$('.tab-control').each(function(){
		const tabParent = $(this).parents('.tab-area'),
			tabLi = $(this).children('li'),
			tabBtn = tabLi.children('a'),
			tabConts = tabParent.find('.tab-box'),
			ContsHig = '';
		
		tabConts.css({'opacity':'0','visibility':'hidden', 'display':'none'});
	
		tabBtn.click(function(){
			if($(this).parent().hasClass('active')) return;
			let contTab = $(this).data('tab');
			if(typeof contTab !== 'undefined'){
				let tabHig = $(this).outerHeight(),
					ContsHig = tabParent.find('#'+contTab).outerHeight() + tabHig;
				tabLi.removeClass('active');
				$(this).parent().addClass('active');				
				$(this).parents('.tab-area').css('height',ContsHig);  
				tabConts.removeClass('active').css({'opacity':'0','visibility':'hidden', 'display':'none'});
				tabParent.find('#'+contTab).addClass('active').css({'opacity':'1','visibility':'visible', 'display':'block'});				
			}
			return false;
		});
		tabBtn.eq(0).click();
	});
}