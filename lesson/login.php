<?php
////セッションスタート
session_start();
var_dump($_SESSION);
//スーパーグローバル変数　$_SESSIN

//セッションチェック
//セッションが定義されているかどうか　isset
if(isset($_SESSION['login'])){
	//loginが空白かどうか　empty
	if(!empty($_SESSION['login'])){
		//DB接続
		$pdo = new PDO('mysql:dbname=login_db;host=localhost;charset=utf8','root','root');

		//SELECT文の設定
		$statement = $pdo -> query('SELECT NAME FROM login_table');

		$xxx = $statement -> execute();
		$row = $statement -> fetchAll(PDO::FETCH_ASSOC);
		var_dump($row);

		
		foreach($row as $val){
			foreach($val as $k => $v){
				if($k === 'NAME'){
					if($_SESSION['login'] == $v){
						header('location:http://localhost:8888/portfolio/lesson/success.php');
						exit();
					}
				}
			}
		}
	}
}

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device_width, initial-scale=1.0">
	<title>LOGIN LESSON</title>
	<style type="text/css">
		p{
			font-size:14px;
		}
	</style>
</head>
<body>
	<form action="login_check.php" method="post" autocomplete="off">
		<p>ID</p>
		<input type="text" name="name">			

		<p>Pass</p>
		<input type="text" name="password">

		<input type="submit" name="login" value="login">
	</form>
</body>
</html>