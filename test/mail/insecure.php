<?php 
//脆弱性のあるphpファイル例



?>

<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
	<title>XSSテスト</title>
</head>
<body>
	<h1>XSSテスト</h1>
	<form name="xss" method="post" action="<?php echo $_SERVER['REQUEST_URI']; ?>" >
		<label for="name">名前</label>
		<input type="text" name="name" id="name">

		<label for="xss">xssTEST</label>
		<input type="text" name="xss" id="xss">

		<input type="submit" name="submit" id="submit" value=" 送信　">
	</form>
<?php
if(isset($_POST['submit'])){
	var_dump($_POST);
	//echo '<script>alert(1);</script>';
	echo $_POST['name'];
	echo $_POST['xss'];
	echo '<h1>入力パラメータの表示</h1>';
}
?>
	


</body>
</html>