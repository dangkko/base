<?php
	/* 
	 * 서브비쥬얼 사용방법 class="area-subVisual" 선언된 항목에 data-subLayout 값에 inc_control.html에 선언된 변수가 삽입되는 형식이다.
	 * css가 아닌 img로 처리하는 방법은 img 태그에 class="img--name" 선언하여 사용한다. 
	 * 예시 <div class="area-subVisual" data-subLayout=""><img src="" alt="" class="img--name"/></div>
	 * 이미지는 /images/content/경로안에 img_선언한페이지명_bg.jpg 으로 됩니다. about으로 선언되었다면 img_about_bg.jpg가됩니다.
	*/

	$whole_uri = $_SERVER['PHP_SELF'];
	$pageName_1depth = explode("/", $whole_uri);
	$pageName_common = substr($pageName_1depth[2],3);
	$pageName_page = explode(".", $pageName_1depth[3]);
	$pageName_file = $pageName_page[0];
?>

<?php if ($pageName_common=='archive' && $pageName_file=='sub01') { ?>
	<div class="area-subVisual archive-sub01" data-subLayout="">
		서브비쥬얼 관련 꾸미시면됩니다.
		<h2 data-subTitle="depth01"></h2><!-- 활성화된 1차메뉴명을 노출하고싶을경우 -->
		<h2 data-subTitle="depth02"></h2><!-- 활성화된 2차메뉴명을 노출하고싶을경우 -->	
		<h2 data-subTitle="current"></h2> <!-- 현재 활성화된 메뉴를 노출하고 싶을경우 -->
	</div>	
<?php } else if ($pageName_common=='archive' && $pageName_file=='sub02') { ?>
	<div class="area-subVisual archive-sub02" data-subLayout="">
		서브비쥬얼 관련 꾸미시면됩니다.
		<h2 data-subTitle="depth01"></h2><!-- 활성화된 1차메뉴명을 노출하고싶을경우 -->
		<h2 data-subTitle="depth02"></h2><!-- 활성화된 2차메뉴명을 노출하고싶을경우 -->	
		<h2 data-subTitle="current"></h2> <!-- 현재 활성화된 메뉴를 노출하고 싶을경우 -->
	</div>
<?php } else if ($pageName_common=='archive' && $pageName_file=='sub03') { ?>
	<div class="area-subVisual archive-sub03" data-subLayout="">
		서브비쥬얼 관련 꾸미시면됩니다.
		<h2 data-subTitle="depth01"></h2><!-- 활성화된 1차메뉴명을 노출하고싶을경우 -->
		<h2 data-subTitle="depth02"></h2><!-- 활성화된 2차메뉴명을 노출하고싶을경우 -->	
		<h2 data-subTitle="current"></h2> <!-- 현재 활성화된 메뉴를 노출하고 싶을경우 -->
	</div>
<?php } else if ($pageName_common=='archive' && $pageName_file=='sub04') { ?>
	<div class="area-subVisual archive-sub04" data-subLayout="">
		서브비쥬얼 관련 꾸미시면됩니다.
		<h2 data-subTitle="depth01"></h2><!-- 활성화된 1차메뉴명을 노출하고싶을경우 -->
		<h2 data-subTitle="depth02"></h2><!-- 활성화된 2차메뉴명을 노출하고싶을경우 -->	
		<h2 data-subTitle="current"></h2> <!-- 현재 활성화된 메뉴를 노출하고 싶을경우 -->
	</div>
<?php } else if ($pageName_common=='gallery') { ?>
	<div class="area-subVisual" data-subLayout="">
		서브비쥬얼 관련 꾸미시면됩니다.
		<h2 data-subTitle="depth01"></h2><!-- 활성화된 1차메뉴명을 노출하고싶을경우 -->
		<h2 data-subTitle="depth02"></h2><!-- 활성화된 2차메뉴명을 노출하고싶을경우 -->	
		<h2 data-subTitle="current"></h2> <!-- 현재 활성화된 메뉴를 노출하고 싶을경우 -->
	</div>
<?php } else if ($pageName_common=='story') { ?>
	<div class="area-subVisual" data-subLayout="">
		서브비쥬얼 관련 꾸미시면됩니다.
		<h2 data-subTitle="depth01"></h2><!-- 활성화된 1차메뉴명을 노출하고싶을경우 -->
		<h2 data-subTitle="depth02"></h2><!-- 활성화된 2차메뉴명을 노출하고싶을경우 -->	
		<h2 data-subTitle="current"></h2> <!-- 현재 활성화된 메뉴를 노출하고 싶을경우 -->
	</div>
<?php } else if ($pageName_common=='contest') { ?>
	<div class="area-subVisual" data-subLayout="">
		서브비쥬얼 관련 꾸미시면됩니다.
		<h2 data-subTitle="depth01"></h2><!-- 활성화된 1차메뉴명을 노출하고싶을경우 -->
		<h2 data-subTitle="depth02"></h2><!-- 활성화된 2차메뉴명을 노출하고싶을경우 -->	
		<h2 data-subTitle="current"></h2> <!-- 현재 활성화된 메뉴를 노출하고 싶을경우 -->
	</div>
<?php } else if ($pageName_common=='event' && $pageName_file=='sub01') { ?>
	<div class="area-subVisual event-sub01" data-subLayout="">
		서브비쥬얼 관련 꾸미시면됩니다.
		<h2 data-subTitle="depth01"></h2><!-- 활성화된 1차메뉴명을 노출하고싶을경우 -->
		<h2 data-subTitle="depth02"></h2><!-- 활성화된 2차메뉴명을 노출하고싶을경우 -->	
		<h2 data-subTitle="current"></h2> <!-- 현재 활성화된 메뉴를 노출하고 싶을경우 -->
	</div>
<?php } else if ($pageName_common=='event' && $pageName_file=='sub02') { ?>
	<div class="area-subVisual event-sub02" data-subLayout="">
		서브비쥬얼 관련 꾸미시면됩니다.
		<h2 data-subTitle="depth01"></h2><!-- 활성화된 1차메뉴명을 노출하고싶을경우 -->
		<h2 data-subTitle="depth02"></h2><!-- 활성화된 2차메뉴명을 노출하고싶을경우 -->	
		<h2 data-subTitle="current"></h2> <!-- 현재 활성화된 메뉴를 노출하고 싶을경우 -->
	</div>
<?php } else if (($pageName_common=='event' && $pageName_file=='sub03') || ($pageName_common=='event' && $pageName_file=='sub0302')) { ?>
	<div class="area-subVisual event-sub03" data-subLayout="">
		서브비쥬얼 관련 꾸미시면됩니다.
		<h2 data-subTitle="depth01"></h2><!-- 활성화된 1차메뉴명을 노출하고싶을경우 -->
		<h2 data-subTitle="depth02"></h2><!-- 활성화된 2차메뉴명을 노출하고싶을경우 -->	
		<h2 data-subTitle="current"></h2> <!-- 현재 활성화된 메뉴를 노출하고 싶을경우 -->
	</div>
<?php } else if ($pageName_common=='event' && $pageName_file=='sub04') { ?>
	<div class="area-subVisual event-sub04" data-subLayout="">
		서브비쥬얼 관련 꾸미시면됩니다.
		<h2 data-subTitle="depth01"></h2><!-- 활성화된 1차메뉴명을 노출하고싶을경우 -->
		<h2 data-subTitle="depth02"></h2><!-- 활성화된 2차메뉴명을 노출하고싶을경우 -->	
		<h2 data-subTitle="current"></h2> <!-- 현재 활성화된 메뉴를 노출하고 싶을경우 -->
	</div>
<?php } else if ($pageName_common=='event' && $pageName_file=='sub05') { ?>
	<div class="area-subVisual event-sub05" data-subLayout="">
		서브비쥬얼 관련 꾸미시면됩니다.
		<h2 data-subTitle="depth01"></h2><!-- 활성화된 1차메뉴명을 노출하고싶을경우 -->
		<h2 data-subTitle="depth02"></h2><!-- 활성화된 2차메뉴명을 노출하고싶을경우 -->	
		<h2 data-subTitle="current"></h2> <!-- 현재 활성화된 메뉴를 노출하고 싶을경우 -->
	</div>
<?php }?>



<? include("inc_lnb.html") ?>