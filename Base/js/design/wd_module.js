/* 
 * module js Document
 * copyright 3KKANG
 * 작업후 필히 변환하여 wd_module.js에 붙여주세요 http://dean.edwards.name/packer/
*/ 

$(window).on('load',function(){
	treeUI();
	productView();
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

//productView
function productView(){
	if(!($('[data-bbs-view="imgView"]').length > 0)) return;
	$('[data-bbs-view="imgView"] ul a').on('click mouseover',function(){
		var proSrc = $(this).children('img').attr('src');
		$('[data-bbs-view="imgView"] ul a').removeClass('active');
		$('[data-bbs-view="imgView"] span').removeClass('spanNone');
		$(this).addClass('active');
		$('[data-bbs-view="imgView"] span').children('img').attr('src', proSrc);
		
		var proSrcNo = proSrc.split('/');
		if(proSrcNo.indexOf('no_image.png') != -1){
			$('[data-bbs-view="imgView"] span').addClass('spanNone');
		}

		return false;
	});
}