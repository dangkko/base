/* 
 * base js Document
 * 작업후 필히 변환하여 wd_base.js에 붙여주세요 http://dean.edwards.name/packer/
*/ 

$(function(){
	is_ie();
	letSet();
	tooltip();
	hasBtn();
});

$(window).on('load',function(){
	scrollBar();
	btnDesign();
	tableScroll();
	tableHover();
	designFile();
	designValue();
	faqBtn();
	tabCol();
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
	} else if ( agent.search( "edge/" ) > -1 ){
		$('body').addClass('ie_edge');
	} else {
		$('body').addClass('ie_none');
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

//scrollBar
function scrollBar(){
	if(!($('.scrollbar-inner, .scrollbar-dynamic').length > 0)) return;
	var scrollInit = $('#container').data('width'); //값선언
	jQuery('.scrollbar-inner, .scrollbar-dynamic').scrollbar();
	var widthMatch = matchMedia('all and ('+ scrollInit +')');
	var widthHandler = function(matchList) {
		if (matchList.matches) {
			jQuery('.scrollbar-inner, .scrollbar-dynamic').scrollbar('destroy');
		} else {
			jQuery('.scrollbar-inner, .scrollbar-dynamic').scrollbar();
		}
	};
	widthMatch.addListener(widthHandler);
	widthHandler(widthMatch);
}

//button
function btnDesign(){
	if(!($('.button').length > 0)) return;
	$('a.button').wrapInner('<span></span>');
	$('label.button').wrapInner('<span></span>');
	$('button.button').wrapInner('<span></span>');
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
	if(!($('.bbsList.faq').length > 0)) return;
	var faqLink = $('.bbsList.faq > li > a'),
	faqConts = $('.bbsList.faq [data-ul-list="conts"]');
	$('.bbsList.faq > li').each(function(){
		$('.bbsList.faq > li > a').on('click',function(e){
			var hrefInfo = $(this).attr('href'); 
			if(!(hrefInfo == '#' || hrefInfo == '')){
				return
			}else{
				e.preventDefault();
				if($(this).parent().hasClass('active')){
					$(this).parent().removeClass('active').children('div').stop().slideUp('',function(){
	    				$(this).removeAttr('style');
	    			});
				}else{
					faqLink.parent().removeClass('active');
					faqConts.stop().slideUp('',function(){
	    				$(this).removeAttr('style');
	    			});
					$(this).parent().addClass('active').children('div').stop().slideDown();
				}
			}
		});
	});
	
	var myTimer
	, widSize = $(window).width();
	$(window).resize(function(){
		clearTimeout(myTimer);
		myTimer = setTimeout(function(){
			var mainWid = $(window).width();
			if(widSize != mainWid){
				faqLink.parent().removeClass('active');
				faqConts.stop().slideUp('',function(){
					$(this).removeAttr('style');
				});
			}
		},350);
	});
}

function designFile(){
	if(!($('.designFile').length > 0)) return;
	if(is_mob()){
		$('.designFile').attr('class','designFile mob');
	}else{
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
			
		var widthMatch = matchMedia("all and (max-width: 768px)");
		var widthHandler = function(matchList) {
		    if (matchList.matches) {
		    	$('.designFile').attr('class','designFile mob');
		    } else {
		    	$('.designFile').attr('class','designFile');
		    }
		};
		widthMatch.addListener(widthHandler);
		widthHandler(widthMatch);
	}
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

function hasBtn(){
	$(".hasLink").on('click', function(event) {
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

//tab length
function tabCol(){
	if(!($('.tabCol').length > 0)) return;
	tabControl();
	function tabControl(){
		$('.tabCol').each( function(i){
			var tabWid = $(this).outerWidth();
			var tabSize = $(this).children('ul').outerWidth();
			
			if(tabWid < tabSize){
				$(this).addClass('full');
			}else{
				$(this).removeClass('full');
			}
	
			var tabLeft = $(this).find('a.on').position();
			if(typeof tabLeft !== 'undefined'){
				$(this).animate( { scrollLeft : tabLeft.left }, 400 );		
			}
		});
	}
	var myTimer
	, widSize = $(window).width();
	$(window).resize(function(){
		clearTimeout(myTimer);
		myTimer = setTimeout(function(){
			var mainWid = $(window).width();
			if(widSize != mainWid){
				tabControl();
			}
		},350);
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


//sitemap
$(window).on('load',function(){
	if($('.area_sitemap').length > 0){
		var gnbSite = $('#header nav').html();
		$('.area_sitemap').append(gnbSite);
		$('.area_sitemap > ul > li > a').wrapInner('<span></span>');
	}
});

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
		}
	});
}
function showPopup(el){
	var $el = $(el);
	$el.fadeIn();
	//$('body').addClass('active');
	setTimeout(function(){
		$el.addClass('active');
	}, 100);
	return false;
}
