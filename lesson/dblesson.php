<?php

//DBの接続
//mamp
//$マークがつくと変数の認識。宣言はそれだけでよい
$pdo = new PDO('mysql:dbname=login_db;host=localhost;charset=utf8','root','root');
//Query関数：SQLの要素が全て固定値の場合に使える
//SQL文を用意する
//$statement = $pdo->query('SELECT * FROM login_table;');
$statement = $pdo->query('INSERT INTO login_table VALUES("4","test4","test4");');
var_dump($statement);

//SQL文を実行した結果をとってくるとき
$row = $statement->fetchAll(PDO::FETCH_ASSOC);
var_dump($row);

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device_width, initial-scale=1.0">
	<title>DB LESSON</title>
</head>
<body>

</body>
</html>