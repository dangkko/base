/* 
 * base js Document
 * KOWEB
*/ 

$(window).load(function(){
	btnDesign();
	tableScroll();
	tableHover();
	designFile();
	designValue();
	bbsDesignLi();
	faqBtn();
	hasBtn();
	tabCol();
	layerPop();
});

//button
function btnDesign(){
	if(!($('.button').length > 0)) return;
	$('a.button').wrapInner('<span></span>');
	$('label.button').wrapInner('<span></span>');
	$('button.button').wrapInner('<span></span>');
}

//table tr
function tableHover(){
	if(!($('.bbsList').length > 0)) return;
	$('.bbsList td').on('mouseover',function(){
		$('.bbsList tr').removeClass('active');
		$(this).parent('tr').addClass('active');
	});
	
	$('.bbsList').on('mouseleave',function(){
		$('.bbsList tr').removeClass('active');
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

//input file design
function designFile(){
	if(!($('.designFile').length > 0)) return;
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

function designValue(){
	if(!($('.designValue').length > 0)) return;
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

//sitemap
$(window).load(function(){
	if($('.area_sitemap').length > 0){
		var gnbSite = $('#header nav').html();
		$('.area_sitemap').append(gnbSite);
		$('.area_sitemap > ul > li > a').wrapInner('<span></span>');
	}
});

//snb tab 갯수로 사이즈 all 작업할경우
function tabCol(){
	if(!($('.tabCol').length > 0)) return;
	$('.tabCol ul').each(function(){
		var snbSize = $('li',this).length;
		$(this).addClass('col0'+snbSize);
	});
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
