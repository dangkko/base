/* 
 * base js Document
 * DaeguWeb kimhynho 
*/ 

//button
$(function(){
	$('a.button').wrapInner('<span></span>');
	$('label.button').wrapInner('<span></span>');
	$('button.button').wrapInner('<span></span>');
});

//table tr
$(function(){
	$('.bbsList td').on('mouseover',function(){
		$('.bbsList tr').removeClass('active');
		$(this).parent('tr').addClass('active');
	});
	
	$('.bbsList').on('mouseleave',function(){
		$('.bbsList tr').removeClass('active');
	});
});

//table scroll
$(function(){
	$('.table.scroll').wrap('<div class="scrollTable"></div>');
});

//faq
$(function(){
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
});

//li bbs
$(function(){
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
});

//input file design
$(window).load(function(){
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
		$(this).siblings('input[type="text"]').val(filename);
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
});

//top
$(function(){
	$(".btn_top").on('click', function(event) {
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
});

//sitemap
$(window).load(function(){
	if($('.area_sitemap').length > 0){
		var gnbSite = $('#header nav').html();
		$('.area_sitemap').append(gnbSite);
		$('.area_sitemap > ul > li > a').wrapInner('<span></span>');
	}
});

//snb tab 갯수로 사이즈 all 작업할경우
$(function(){
	$('.tabCol ul').each(function(){
		var snbSize = $('li',this).length;
		$(this).addClass('col0'+snbSize);
	});
});