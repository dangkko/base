/* 
 * base js Document
*/ 

$(function(){
	is_ie();
	tooltip();
	hasBtn();
	btnOpenControl();
});

$(window).on('load',function(){
	letSet();
	btnDesign();
	tableScroll();
	tableHover();
	bbsDesignLi();
	designFile();
	designValue();
	faqBtn();
	layerPop();
	controlAccor();
});

function letSet(){
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh+'px');
	
	var myTimer
	, widSize = $(window).width();
	$(window).resize(function(){
		clearTimeout(myTimer);
		myTimer = setTimeout(function(){
			var mainWid = $(window).width();
			if(widSize != mainWid){
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', vh+'px');
			}
		},350);
	});
}

//userDevice
function is_ie(){
	var agent = navigator.userAgent.toLowerCase();
	if (agent.indexOf("msie") > -1 || agent.indexOf("trident") > -1) {
	  	$('body').addClass('ie');
	  	$('body').append('<div id="update"><div>보고계신 사이트는 <b>마이크로소프트 엣지에 최적화 된</b> 사이트 입니다. Windows Internet Explorer에서 <b>업데이트</b>를 받으세요 <a href="https://www.microsoft.com/ko-kr/edge" target="_blank" title="새창">Microsoft Edge 업데이트하기</a><p>크롬, 네이버웨일, 오페라, 파이어폭스 기타 브라우저로도 확인이 가능합니다.</div></div>');
	} else if ( agent.search( "edge/" ) > -1 ){
		$('body').addClass('ie_edge');
	}
}
function is_mob(){				
	return (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera);
}
function is_mac(){
	return navigator.platform.indexOf('Mac') > -1;
}
function is_chrome(){
	return /Chrome/.test(navigator.userAgent);
}
function is_firefox(){
	return /Firefox/.test(navigator.userAgent);
}

function btnDesign(){
	//button
	$('a.button').wrapInner('<span></span>');
	$('button.button').wrapInner('<span></span>');
	$('label.button').wrapInner('<span></span>');
	
	$('a.button span').find('span').unwrap();
	$('button.button span').find('span').unwrap();
	$('label.button span').find('span').unwrap();
}

//table hover
function tableHover(){
	if(!($('table.hover').length > 0)) return;
	$('table.hover td').on('mouseover',function(){
		$('table.hover tr').removeClass('active');
		$(this).parent('tr').addClass('active');
	});
	
	$('table.hover').on('mouseleave',function(){
		$('table.hover tr').removeClass('active');
	});
}

//table scroll
function tableScroll(){
	if(!($('table.scroll').length > 0)) return;
	$('table.scroll').wrap('<div class="scrollTable"></div>');
	$('html[lang="ko"] .scrollTable').before('<p class="mob_info">좌우로 스크롤 하시면 확인이 가능합니다.</p>');
	$('html[lang="en"] .scrollTable').before('<p class="mob_info">You can check it by scrolling left and right.</p>');
	$('html[lang="ja"] .scrollTable').before('<p class="mob_info">左右にスクロールして確認できます。</p>');
	$('html[lang="zh"] .scrollTable').before('<p class="mob_info">你可以左右滚动看。</p>');
	$('html[lang="th"] .scrollTable').before('<p class="mob_info">You can check it by scrolling left and right.</p>');
	$('html[lang="ru"] .scrollTable').before('<p class="mob_info">Их можно прокручивать влево.</p>');
}

//faq
function faqBtn(){
	if(!($('.faqList').length > 0)) return;
	$('.faqList').each(function(){
		var faqLink = $('.faqList dt a');
		$('.faqList dt a').on('click',function(){
			faqLink.removeClass('on');
			$('.faqList dd').slideUp('fast');
			$(this).addClass('on').parent().next('dd').stop().slideDown('fast');
			return false;
		});
		
		faqLink.eq(0).click();
	});
}

//li bbs
function bbsDesignLi(){
	if(!($('.bbsList').length > 0)) return;
	$('ul.bbsList li').each(function(){
		var bbsLink = $(this).find('.subject');
		bbsLink.hover(function(){
			$('ul.bbsList li .more').removeClass('active');
			$(this).parent().find('.more').addClass('active');
		});
	})
	$('ul.bbsList').mouseleave(function(){
		$('ul.bbsList li .more').removeClass('active');
	});
}

function designValue(){
	if(!($('.designValue').length > 0)) return;
	//input value empty
	$(".designValue input").each(function(index, item){
		if (!($(this).val().trim() == '')) {
			$(this).parent('li').addClass('active');
        }else{
        	$(this).parent('li').removeClass('active');
        }
	});
	$(".designValue input, .designValue select, .designValue textarea").bind("change paste keyup", function() {
		if($(this).val().length == 0){
			$(this).parent().removeClass('active');
		}else{
			$(this).parent().addClass('active');
		}				  
	});
	$('.designValue select, .designValue input, .designValue textarea').bind('focusin', function() {
		$(this).parent().addClass('in');						  
	});
	$('.designValue select, .designValue input, .designValue textarea').bind('focusout change', function() {
		$(this).parent().removeClass('in');						  
	});
}

//input file design
function designFile(){
	if(!($('.designFile').length > 0)) return;
	if(is_mob()){
		$('.designFile').attr('class','designFile mob');
	}else{
		$('.designFile').attr('class','designFile');
	}
	var uploadFile = $('.designFile input[type="file"]');
	uploadFile.on('change', function(){
		if(window.FileReader){
			if($(this)[0].files[0]){
				var filename = $(this)[0].files[0].name;
			} else {
				var filename = "";
			}
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		$(this).siblings('input[type="text"]').eq(0).val(filename);
	});
}

//top
function hasBtn(){
	$(".btn_top, .hasLink").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 400, function(){   
				window.location.hash = hash;
			});
		} 
	});
}

//accordion
function controlAccor(){
	if(!($('[data-control="accordion"]').length > 0)) return;
	$('[data-control="accordion"]').on('click',function(){
		$(this).toggleClass('active').next('[data-control="accordion_conts"]').slideToggle();
		if($(this).hasClass('show')){
			$(this).toggleClass('show active');
		}
		return false;
	});
	var widthMatch = matchMedia("screen and (min-width: 1025px)");
	var widthHandler = function(matchList) {
	    if (matchList.matches) {
	    	$('[data-control="accordion"]').removeClass('active');
	    	$('[data-control="accordion_conts"]').removeAttr('style');
	    }
	};
	widthMatch.addListener(widthHandler);
	widthHandler(widthMatch);
}

//tooltip
function tooltip(){
	var toolLink = $('[data-tooltip="explan"]');
	var widthMatch = matchMedia("screen and (max-width: 768px)");
	var widthHandler = function(matchList) {
	    if (matchList.matches) {
	    	toolLink.parent().css('position','relative');
	    	toolLink.on('click',function(){
	    		if($(this).hasClass('active')){
	    			$(this).removeClass('active').find('.box').stop().slideUp('',function(){
	    				$(this).removeAttr('style');
	    			});
	    		}else{
	    			toolLink.removeClass('active').find('.box').stop().slideUp('',function(){
	    				$(this).removeAttr('style');
	    			});
	    			$(this).addClass('active').children('.box').stop().slideDown().css('display','block');
	    		}
	    		return false;
	    	});
	    	
	    	$(document).on('mouseup', function(e){
	    		if(toolLink.parent().has(e.target).length == 0){
	    			toolLink.removeClass('active').find('.box').stop().slideUp('',function(){
	    				$(this).removeAttr('style');
	    			});
	    		}
	    	});
	    }else{
	    	toolLink.parent().removeAttr('style');
	    	toolLink.off('click');
	    }
	};
	widthMatch.addListener(widthHandler);
	widthHandler(widthMatch);
}

//layer popup
function layerPop(){
	if(!($('[data-pop-layer]').length > 0)) return;
	$('[data-pop-layer] .popBox').append('<button type="button" class="btn_close"><span>레이어닫기</span></button>');
	$('[data-pop-layer] .btn_close ,[data-pop-layer] .close').on('click',function(){
		 $('[data-pop-layer] .popBox').parent('div').removeClass('active').fadeOut();
		 //$('body').removeClass('active');
		 return false;
	});
	$(document).mouseup(function(e){
		var container = $('[data-pop-layer] .popBox').parent('div'); 
		if(container.has(e.target).length == 0){
			container.removeClass('active').fadeOut();
			//$('body').removeClass('active');
			$('html,body').off('scroll touchmove mousewheel');
		}
	});
}
function showPopup(el){
	var $el = $(el);
	$el.fadeIn();
	//$('body').addClass('active');
	$('html, body').on('scroll touchmove mousewheel', function(event) {
		event.preventDefault();
		event.stopPropagation();
		return false;
	});
	setTimeout(function(){
		$el.addClass('active');
	}, 100);
	return false;
}

//click open control
/* div.open-control
 *     button.open-control__btn
 *     div.list or ul.list
 * */
function btnOpenControl(){
	if(!($('.open-control').length > 0)) return;
	
	$('.open-control').each(function(){
		var sliteLi = $(this)
		, siteBtn = sliteLi.children('.open-control__btn')
		, siteList = sliteLi.children('.list');
		siteBtn.on({
			click: function(){
				if($(this).hasClass('active')){
					$(this).removeClass('active').siblings('.list').stop().slideUp();
				}else{
					$(this).addClass('active').siblings('.list').stop().slideDown();
				}
			},
		});
		sliteLi.on({
			mouseleave: function(){
				$(this).children('button').removeClass('active').end().children('.list').stop().slideUp();
			},
		});
		$('*').not('.open-control *').on({
			focus: function(){
				siteBtn.removeClass('active');
				siteList.stop().slideUp();
			},
		})
	});
}
