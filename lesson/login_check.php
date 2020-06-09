<?php
//session:制限なしの時（期間とか）、恒久的
// ↑ログイン状態を保持してるとき使われたり。する。らしい。
//cookies:一時的

/*
スーパーグローバル変数
$_POST
$_GET
$_SESSION
$_SERVER
$_GLOBAL
*/

session_start();

$post = $_POST;
$name = $post['name'];

//POSTの名前　または　パスワード　が空白であれば
if(empty($post['name']) || empty($post['password'])){
	header('location:http://localhost:8888/portfolio/lesson/login.php');
	exit();
}

//DB接続
$pdo = new PDO('mysql:dbname=login_db;host=localhost;charset=utf8','root','root');


//プリペアドステートメント
//SQL文が完成されてるもの 指定されてるもの↓
//$pdo -> query()
//変数などを用いてSQL。汎用性のあるもの。UPDATEなど
//$pdo -> prepare() 

//SELECT文の設定
$statement = $pdo -> query('SELECT * FROM login_table');
//var_dump($statement);

//SELECT文の代入（変数有）
$query = 'SELECT * FROM login_table WHERE NAME = :name';
//var_dump($query);

//SQL文の設定（変数有）
$stmt = $pdo -> prepare($query);
//var_dump($stmt);

//変数に値を設定
$ddd = $stmt -> bindParam(':name',$name);
//var_dump($ddd);

//SQLを実行 true or false
$aaa = $stmt -> execute();
//var_dump($aaa);

//SQL実行結果を取得
$row = $stmt -> fetchAll(PDO::FETCH_ASSOC);
//var_dump($row);


//var_dump($row[0]['password']);
//echo('<br>');
//var_dump($post['password']);


if($row[0]['password'] == $post['password']){

	//セッション（ログイン用の）追加
	$_SESSION['login'] = $row[0]['name'];
	//var_dump($_SESSION);
	session_write_close();
	header('location:http://localhost:8888/portfolio/lesson/success.php');
	exit();
}else{
	//セッションを削除(初期化)
	$_SESSION = array();

	header('location:http://localhost:8888/portfolio/lesson/failed.php');

	exit();
}







?>
