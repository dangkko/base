<?
ini_set('memory_limit','512M');
//php 에러 error
if($mode != "delete" && $mode != "comment_proc"){
	include_once  $_SERVER['DOCUMENT_ROOT'] . "/head.php";
}

// 필드 체크
foreach (array_keys($_POST) as $value) {
	${$value} = sqlin($_POST[$value]);
	// ${$value} = sanitizeMySQL($_POST[$value]);
}
//echo $comments;exit;
//$comm_comments = $_POST[comm_comments];
$comments = $_POST[comments];

$board = mysqli_fetch_array(mysqli_query($dbp, "SELECT * FROM koweb_board_config WHERE id='$board_id' LIMIT 1"));
//$password = hash("sha256", $password);
$view_count = 0;
$ip = $REMOTE_ADDR;
if (!$reg_date) $reg_date = date("Y-m-d H:i:s");

$return_url = explode("?", $return_url);
$dir = $_SERVER['DOCUMENT_ROOT'] . "/upload/".$board_id."/";

// 관리자 페이지 체크
/*
if ($PHP_SELF ==  "/ko_admin/board/manager_board.php" || $return_url[0] == "/ko_admin/board/manager_board.php") {
	$is_admin = true;
} else {
	$is_admin = false;
}
*/
if($mode == "modify"){

	//============================== 수정 ============================== //

	if (isblank($board_id)) error("비정상적 접근");
	if (isblank($name)) error("이름을 입력해 주세요.");
	// 멤버번호 37 = 관리자, 멤버번호 2 = koweb
	if($_SESSION[member_no] != "37" && $_SESSION[member_no] != "2") {
		if ($board[is_membership] != "Y"){ if(isblank($password)) error("비밀번호를 입력해 주세요."); }
	}
	if (isblank($title)) error("제목을 입력해 주세요.");
	if ($board[spam_auth] == "Y"){
		if (isblank($_SESSION[rand_auth])) error("비정상적 접근");

		if($_SESSION[rand_auth] != $rand_auth_ ){
			error("스팸방지번호가 올바르지 않습니다.");
			exit;
		}
	}

	if($board[is_membership] != "Y"){
		if($_SESSION[member_no] != "37" && $_SESSION[member_no] != "2") {
			$password = hash("sha256", $password);
		} else {
			$password = hash("sha256", $_SESSION[member_id]);
		}
	} else {
		$password = hash("sha256", $_SESSION[member_id]);
	}


	if(!$_SESSION[is_admin]){
		if($board[is_membership] == "Y"){
			$check_query = "SELECT * FROM $board_id WHERE no='$no' LIMIT 1";
			$check_result = mysqli_query($dbp, $check_query);
			$check_row = mysqli_fetch_array($check_result);

			if($_SESSION[member_id] != $check_row[id] ){
				error("해당게시물은 관리자 및 작성자만 수정 가능합니다.");
				exit;
			}

		}
	}


	//파일업로드
	$modify_row = mysqli_fetch_array(mysqli_query($dbp, "SELECT * FROM $board_id WHERE no = '$no' LIMIT 1"));
	for($i = 1; $i <= $board[file_count]; $i++){
		if(${'del_'.$i} == "Y"){
			$add_query .= "file_".$i." =  '',";
			@unlink($dir . $modify_row['file_'.$i]);
			@unlink($dir . "thumb_".$modify_row['file_'.$i]);
		}
	}
	for($i = 1; $i <= $board[file_count]; $i++){
		if($_FILES["file_".$i][size] > 0){
			if ($_FILES["file_".$i][size] > $board[file_limit_size] * 1024 * 1024) {
				error("첨부파일 ".$i."의 용량 제한은 $board[file_limit_size]M 입니다.");
				exit;
			} else {
				${'file_'.$i} = upload_file($dir, $_FILES["file_".$i][tmp_name], $_FILES["file_".$i][name]);
				$add_query .= "file_".$i." =  '". ${'file_'.$i} . "',";
			}
		}
	}


	$update_query = "UPDATE $board_id SET id='$_SESSION[member_id]',
											CI='$_SESSION[CI]',
											DI='$_SESSION[DI]',
											name='$name',
											password='$password',
											phone='$phone',
											email='$email',
											zip='$zip',
											address1='$address1',
											address2='$address2',
											category='$category',
											title='$title',
											comments_type='$comments_type',
											tag_type='$tag_type',
											comments='$comments',
											etc='$etc',
											notice='$notice',
											secret='$secret',
											file_type='$file_type',
											$add_query
											ip='$ip',
											reply_state='$reply_state',
											reply_id='$reply_id',
											reply_name='$reply_name',
											reply_phone='$reply_phone',
											reply_email='$reply_email',
											reply_comments='$reply_comments',
											reply_ip='$reply_ip',
											reply_date='$reply_date',
											reply_file_1='$reply_file_1',
											reply_file_2='$reply_file_2',
											reply_file_3='$reply_file_3',
											reply_file_4='$reply_file_4',
											reply_file_5='$reply_file_5',
											hidden='$hidden',
											link='$link'
										WHERE no='$no' LIMIT 1";

	$result = mysqli_query($dbp, $update_query);

	alert("수정되었습니다.");
	url($return_url[0]."?board_id=$board_id&amp;mode=list&amp;no=$no&amp;start=$start");

	//============================== 수정 끝 ============================== //

} else if($mode == "delete"){

	//============================== 삭제 ============================== //

	if(!$_SESSION[is_admin]){
		if($board[is_membership] != "Y"){
			//비밀번호가 없음
			if($password == "" ){
				url("$PHP_SELF?board_id=$board_id&amp;start=$start&amp;mode=check&amp;return_mode=$mode&amp;no=$no");
				exit;
			}
			$password = hash("sha256", $password);
			$check_query = "SELECT * FROM $board_id WHERE no='$no' AND password='$password' LIMIT 1";
			$check_result = mysqli_query($dbp, $check_query);
			$check_row = mysqli_num_rows($check_result);

			if($check_row < 1 ){
				error("해당게시물은 관리자 및 작성자만 삭제 가능합니다.");
				exit;
			}
			$delete_query = "DELETE FROM $board_id WHERE no='$no' AND password='$password'";
		} else {
			$check_query = "SELECT * FROM $board_id WHERE no='$no' LIMIT 1";
			$check_result = mysqli_query($dbp, $check_query);
			$check_row = mysqli_fetch_array($check_result);

			if($_SESSION[member_id] != $check_row[id] ){
				error("해당게시물은 관리자 및 작성자만 삭제 가능합니다.");
				exit;
			} else {
				$delete_query = "DELETE FROM $board_id WHERE no='$no' AND id='$_SESSION[member_id]'";
			}
		}
	} else {
		$delete_query = "DELETE FROM $board_id WHERE no='$no'";
	}
	boardAttachRemove($dir, $board_id, $no);
	$result = mysqli_query($dbp, $delete_query);

	alert("삭제되었습니다.");
	url($return_url[0]."?board_id=$board_id");

	//============================== 삭제 끝 ============================== //


} else if($mode == "comment_proc"){
foreach (array_keys($_GET) as $value) {
	${$value} = sqlin($_GET[$value]);
	// ${$value} = sanitizeMySQL($_POST[$value]);
}
$comm_comments = $_GET[comm_comments];
	//============================== 코멘트 ============================== //

	if($comment_mode != "delete"){
		if (isblank($board_id)) error("비정상적 접근");
		if (isblank($comm_name)) error("이름을 입력해 주세요.");
		//if (!$auth_comment) error("코멘트 등록 권한이 없습니다.");
	}

	if($board[is_membership] != "Y"){
		if (isblank($comm_password)) error("비밀번호를 입력해 주세요.");
	}

	if($comment_mode == "delete"){

		//=========== 코멘트삭제 ===========//
		if(!$_SESSION[is_admin]){
			if($board[is_membership] != "Y"){
				$comm_password = hash("sha256", $comm_password);
				$check_row = mysqli_fetch_array(mysqli_query($dbp, "SELECT * FROM board_comment WHERE no = '$comm_no' LIMIT 1"));
				if($check_row[password] != $comm_password) error("비밀번호를 확인해주세요.");
				$DEL_WHERE = "AND password='$comm_password'";
			} else {
				if(!$_SESSION[member_id]){ error("로그인 해주세요."); }
				$check_row = mysqli_fetch_array(mysqli_query($dbp, "SELECT * FROM board_comment WHERE no = '$comm_no' LIMIT 1"));
				if($check_row[id] != $_SESSION[member_id]) error("자신이 등록한 댓글만 삭제 할 수 있습니다.");
				$DEL_WHERE = "AND id = '$_SESSION[member_id]'";
			}
		}

		$comment_query = "DELETE FROM board_comment  WHERE no='$comm_no' AND board_id='$board_id' $DEL_WHERE";
		$comment_result = mysqli_query($dbp, $comment_query);

		if($comment_result){
			alert("댓글이 삭제 되었습니다.");
			url($return_url[0]."?board_id=$board_id&mode=view&no=$ref_board_no");
		} else {
			alert("에러가 발생하여 댓글삭제가 실패하였습니다.");
			url($return_url[0]."?board_id=$board_id&mode=view&no=$ref_board_no");
		}

		//=========== 코멘트삭제 끝===========//

	} else if ($comment_mode == "append"){

		//=========== 코멘트의 코멘트 (코멘트추가)===========//

		if ($board[is_membership] != "Y"){
			$comm_password = hash("sha256", $comm_password);
		} else {
			$comm_password = hash("sha256", $_SESSION[member_id]);
		}

		$comment_query = "INSERT INTO board_comment VALUES('', '$_SESSION[member_id]', '$board_id', '$ref_board_no', '', '', '', '$CI', '$DI', '$comm_name', '$comm_password', '$comm_phone', '$comm_email', '$comm_zip', '$comm_address1', '$comm_address2', ' $comm_title', '$comm_comments', '$comm_file_1', '$comm_file_2' ,'$comm_file_3', '$reg_date' , '$REMOTE_ADDR')";
		$comment_result = mysqli_query($dbp, $comment_query);
		$bref = mysqli_insert_id($dbp);
		$check_row = mysqli_fetch_array(mysqli_query($dbp, "SELECT * FROM board_comment WHERE ref_group = '$ref_group' ORDER BY ref_depth DESC LIMIT 1"));
		if($check_row[ref_depth]){
			$ref_depth = $check_row[ref_depth] + 1;
		} else {
			$ref_depth = 1;
		}

		$update_query = "UPDATE board_comment SET ref_no = '$ref_no', ref_depth='$ref_depth', ref_group='$ref_group' WHERE no='$bref'";
		$update_result = mysqli_query($dbp, $update_query);

		if($update_query){
			alert("댓글이 등록 되었습니다.");
			url($return_url[0]."?board_id=$board_id&mode=view&no=$ref_board_no");
		} else {
			alert("에러가 발생하여 댓글등록이 실패하였습니다.");
			url($return_url[0]."?board_id=$board_id&mode=view&no=$ref_board_no");
		}

		//=========== 코멘트의 코멘트 (코멘트추가) 끝===========//

	} else {

		//=========== 코멘트등록 ===========//

		if ($board[is_membership] != "Y"){
			$comm_password = hash("sha256", $comm_password);
		} else {
			$comm_password = hash("sha256", $_SESSION[member_id]);
		}

		$comment_query = "INSERT INTO board_comment VALUES('', '$_SESSION[member_id]', '$board_id', '$ref_board_no', '', '', '', '$CI', '$DI', '$comm_name', '$comm_password', '$comm_phone', '$comm_email', '$comm_zip', '$comm_address1', '$comm_address2', ' $comm_title', '$comm_comments', '$comm_file_1', '$comm_file_2' ,'$comm_file_3', '$reg_date' , '$REMOTE_ADDR')";
		$comment_result = mysqli_query($dbp, $comment_query);
		$bref = mysqli_insert_id($dbp);
		$update_query = "UPDATE board_comment SET ref_no = '$bref', ref_group = '$bref', ref_depth = '1' WHERE no='$bref'";
		$update_result = mysqli_query($dbp, $update_query);

		if($comment_result){
			alert("댓글이 등록 되었습니다.");
			url($return_url[0]."?board_id=$board_id&mode=view&no=$no");
		} else {
			alert("에러가 발생하여 댓글등록이 실패하였습니다.");
			url($return_url[0]."?board_id=$board_id&mode=view&no=$no");
		}
	}
	//=========== 코멘트등록 끝===========//

	//============================== 코멘트 끝 ============================== //

} else if($mode == "reply") {

	//=========== 답변등록 ===========//

	$depth = 1;
	//$ref_group = $ref_no;

	if(!$ref_no){
		error("정상적인 접근이 아닙니다.");
		exit;
	}

	//파일 업로드
	for($i = 1; $i <= $board[file_count]; $i++){
		if($_FILES["file_".$i][size] > 0){
			if ($_FILES["file_".$i][size] > $board[file_limit_size] * 1024 * 1024) {
				alert("첨부파일".$i." 의 용량 제한은 $board[file_limit_size]M 입니다.");
			} else {
				${'file_'.$i} = upload_file($dir, $_FILES["file_".$i][tmp_name], $_FILES["file_".$i][name]);
			}
		}
	}
	
	$check_ = mysqli_fetch_array(mysqli_query($dbp, "SELECT * FROM $board_id WHERE no='$ref_no' ORDER BY depth DESC LIMIT 1"));
	$ref_group = $check_['ref_group'];
	if($check_[depth] != 0){
		$depth = $check_[depth] + 1;
	} else {
		$depth = 1;
	}

	if ($board[is_membership] != "Y"){
		$password = hash("sha256", $password);
	} else {
		$password = hash("sha256", $_SESSION[member_id]);
	}

	$insert_query = "INSERT $board_id SET depth='$depth',
											ref_no='$ref_no',
											ref_group='$ref_group',
											id='$_SESSION[member_id]',
											CI='$_SESSION[CI]',
											DI='$_SESSION[DI]',
											name='$name',
											password='$password',
											phone='$phone',
											email='$email',
											zip='$zip',
											address1='$address1',
											address2='$address2',
											category='$category',
											title='$title',
											comments_type='$comments_type',
											tag_type='$tag_type',
											comments='$comments',
											etc='$etc',
											notice='$notice',
											secret='$secret',
											file_type='$file_type',
											file_1='$file_1',
											file_2='$file_2',
											file_3='$file_3',
											file_4='$file_4',
											file_5='$file_5',
											file_6='$file_6',
											file_7='$file_7',
											file_8='$file_8',
											file_9='$file_9',
											file_10='$file_10',
											reg_date = '$reg_date',
											ip='$ip',
											reply_state='$reply_state',
											reply_id='$reply_id',
											reply_name='$reply_name',
											reply_phone='$reply_phone',
											reply_email='$reply_email',
											reply_comments='$reply_comments',
											reply_ip='$reply_ip',
											reply_date='$reply_date',
											reply_file_1='$reply_file_1',
											reply_file_2='$reply_file_2',
											reply_file_3='$reply_file_3',
											reply_file_4='$reply_file_4',
											reply_file_5='$reply_file_5',
											view_count='$view_count',
											hidden='$hidden',
											link='$link'";
	mysqli_query($dbp, $insert_query);
	alert("등록되었습니다.");

	url($return_url[0]."?board_id=$board_id");

	//=========== 답변등록 끝 ===========//

} else {

	//============================== 등록 ============================== //

	if (isblank($board_id)) error("비정상적 접근");
	if (isblank($name)) error("이름을 입력해 주세요.");
	// 멤버번호 37 = 관리자, 멤버번호 2 = koweb
	if($_SESSION[member_no] != "37" && $_SESSION[member_no] != "2") {
		if ($board[is_membership] != "Y"){ if(isblank($password)) error("비밀번호를 입력해 주세요."); }
	}
	if (isblank($title)) error("제목을 입력해 주세요.");
	if ($board[spam_auth] == "Y"){
		if (isblank($_SESSION[rand_auth])) error("비정상적 접근");

		if($_SESSION[rand_auth] != $rand_auth_ ){
			error("스팸방지번호가 올바르지 않습니다.");
			exit;
		}
	}

	//파일 업로드
	for($i = 1; $i <= $board[file_count]; $i++){
		if($_FILES["file_".$i][size] > 0){
			if ($_FILES["file_".$i][size] > $board[file_limit_size] * 1024 * 1024) {
				alert("첨부파일 ".$i." 의 용량 제한은 $board[file_limit_size]M 입니다.");
			} else {
				${'file_'.$i} = upload_file($dir, $_FILES["file_".$i][tmp_name], $_FILES["file_".$i][name]);
			}
		}
	}

	if($board[is_membership] != "Y"){
		if($_SESSION[member_no] != "37" && $_SESSION[member_no] != "2") {
			$password = hash("sha256", $password);
		} else {
			$password = hash("sha256", $_SESSION[member_id]);
		}
	} else {
		$password = hash("sha256", $_SESSION[member_id]);
	}

	$insert_query = "INSERT $board_id SET depth='$depth',
											ref_no='$ref_no',
											ref_group='$ref_group',
											id='$_SESSION[member_id]',
											CI='$_SESSION[CI]',
											DI='$_SESSION[DI]',
											name='$name',
											password='$password',
											phone='$phone',
											email='$email',
											zip='$zip',
											address1='$address1',
											address2='$address2',
											category='$category',
											title='$title',
											comments_type='$comments_type',
											tag_type='$tag_type',
											comments='$comments',
											etc='$etc',
											notice='$notice',
											secret='$secret',
											file_type='$file_type',
											file_1='$file_1',
											file_2='$file_2',
											file_3='$file_3',
											file_4='$file_4',
											file_5='$file_5',
											file_6='$file_6',
											file_7='$file_7',
											file_8='$file_8',
											file_9='$file_9',
											file_10='$file_10',
											reg_date = '$reg_date',
											ip='$ip',
											reply_state='$reply_state',
											reply_id='$reply_id',
											reply_name='$reply_name',
											reply_phone='$reply_phone',
											reply_email='$reply_email',
											reply_comments='$reply_comments',
											reply_ip='$reply_ip',
											reply_date='$reply_date',
											reply_file_1='$reply_file_1',
											reply_file_2='$reply_file_2',
											reply_file_3='$reply_file_3',
											reply_file_4='$reply_file_4',
											reply_file_5='$reply_file_5',
											view_count='$view_count',
											hidden='$hidden',
											link='$link'";
	mysqli_query($dbp, $insert_query);
	$ref_no = mysqli_insert_id($dbp);

	mysqli_query($dbp, "UPDATE $board_id SET ref_no = '$ref_no', ref_group = '$ref_no' WHERE no='$ref_no' LIMIT 1");


	alert("등록되었습니다.");
	url($return_url[0]."?board_id=$board_id");

	//============================== 등록 끝 ============================== //
}
