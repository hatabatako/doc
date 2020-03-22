$(function(){/*HTML&CSS(Dom)を読み込み完了後に実施*/

	$('#menu').on('click',function(){
		menu();
	});


	//scroll
	 var section = $('main > section');

	
	//window(表示されているところ)がscroll
	//検索キーワード「onイベント jquery」
	$(window).on('scroll',function(){

		//現在地の取得（Topからscrollした距離）
		var cur_pos = $(this).scrollTop();

		//main直下のセクションすべてに対して実施(each)
		section.each(function(){

			//各sectionのTopとBottomのy座標を取得
			var top = $(this).offset().top;
			var bottom = top + $(this).outerHeight();

			//表示位置のずらし
			var offset = 175;


			//現在地(画面の一番上)が各セクションのTopからBottom(+offset)の間にいたとき実施
			if(cur_pos >= top - offset && cur_pos <= bottom - offset){

				//activeクラスを全て除去
				$('section#top').removeClass('active');
				//現在地のセクションのIDを取得
				var this_id = $(this).attr('id');

				//対象セクションIDに対して、activeクラスをつける
				switch(this_id){
					case 'top':
						$(this).addClass('active');
						break;
					case 'profile':
						$(this).addClass('active');
						break;
					case 'works':
						$(this).addClass('active');
						break;
					case 'blog':
						$(this).addClass('active');
						break;
					case 'contact':
						$(this).addClass('active');
						break;
					default:
						break;
				}

			}


			//セクション#topがアクティブクラスが付与されてなかったら、付与する
			if(!$('section#top').hasClass('active')){
				$('#background-image').addClass('active');
			}else{
				$('#background-image').removeClass('active');
			}
		});


	});


	// ページ全体の読込完了後、またはリサイズ後の処理
	$(window).on('load resize', function(){
		var menuImg = $('#menu_list > img');	// メニュー画面の画像指定を変数化
		var imgWidth = menuImg.width();			// 画像の幅を取得

		var menuList = $('#menu_list > div');	// メニュー画面の項目全体のdiv指定を変数化
		var windowWidth = $(window).width();	// 表示されている画面（window）の幅を取得
		var windowHeight = menuImg.height();
		menuList.css('position','relative');

		if(windowWidth>=750){	// PC width 
			var menuListwidth = windowWidth - imgWidth;
			menuImg.width('auto');
			menuList.width(menuListwidth);
		}else{	// SP width
			menuImg.width(windowWidth);
			menuList.css('position','absolute');
			menuList.height(windowHeight);
			menuList.width(windowWidth);
		}
	});


	//メニュー画面飛ばす
	$('a[href^="#"]').on('click',function(){
		var speed=400;
		var href=$(this).attr("href");//属性値の取得　attr('属性') name,typeとか
		var cl=$(this).attr("class");
		console.log(cl);
		//(念のための)移動先を取得
		var target = $(href == "#" || href == "" ? 'html' :href);
		//移動先を数値を取得(セクションのトップの位置を取得)
		var position = target.offset().top;

		$('body,html').animate({scrollTop:position}, speed, 'swing');

		if(href!='#' && cl !="scroll"){
			menu();
		}
		return false;
	});

	//読み込み、リサイズしたら
	$(window).on('load resize',function(){
		//レスポンシブ　高さ
		$('section').each(function(i,e){
			//var height = e.height;
			var height = $(this).height();
			var windowHeight = $(window).outerHeight();


			if(height <= windowHeight){
				$('#'+ e.id).css('height','100vh');
			}else{
				$('#'+ e.id).css('height','auto');
			}
		});
	});



	//バリエーションチェック
	//activeが外れた状態がblur onイベントで調べよう
	$('input, textarea').on('blur' ,function(){
		//入力値の確認 ログ出力
		//console.log($(this).val());
		var val =$(this).val();
		var name =$(this).attr('name');
		var id = '#' + name;

		//NullCheck
		if(nullChk(val)){
			errMsg(id, '');
		}else{
			errMsg(id, '必須項目です');
			return false; //処理中断
		}

		if(name == 'tel'){ //電話形式チェック
			if(telChk(val)){
				errMsg(id,'');
			}else{
				errMsg(id,'電話番号の形式が異なります');
			}
		}else if(name == 'email'){ //メール形式チェック
			if(mailChk(val)){
			 	errMsg(id,'');
			}else{
			 	errMsg(id,'メールの形式が異なります');
			}
		}else{ //半角記号チェック
			if(hlfChk(val)){
				errMsg(id,'半角記号は使用できません');
			}else{
				errMsg(id,'');
			}
		}


		//エラーメッセージチェック
		if(errorAllChek()==0){
			// $('input[type="submit"]').attr('disabled',false);
			$('input[type="submit"]').attr('disabled',false);
		}else{
			$('input[type="submit"]').attr('disabled',true);
		}
	});

	//Ajax

	//$('.blg_list').html('') //HTMLの中身をクリア
	//for文で回す。記事数制限したほうがよいかも
	//HTML上のblg_list内を全て削除
	//HTML関数で、基盤を作って書いていく。
	$.getJSON('http://localhost:8888/portfolio/wordpress/wp-json/wp/v2/posts?_embed',{
		format:"json"
	})
	.done(function(data){
		console.log(data);

		$('.blg_list').html('');
		for(var i=0; i < data.length; i++){
			//Title
			//console.log("i="+i);
			//console.log("datalength="+data.length);
			//console.log(data[i].title.rendered);
			$('.blg_list').append('<div class="blg_block"></div>');
			var num = i + 1;
			$('.blg_block:nth-of-type('+ num +')').append('<a href="#"></a>');
			$('.blg_block:nth-of-type('+ num +')').append('<div class="blg_img" style="background-image:url('+data[i]['_embedded']['wp:featuredmedia'][0]['source_url']+')"></div>');
			$('.blg_block:nth-of-type('+ num +')').append('<div class="blg_text"></div>');
			$('.blg_block:nth-of-type('+ num +') > .blg_text').append('<p class="blg_title">'+data[i].title.rendered+'</p>');
			$('.blg_block:nth-of-type('+ num +') > .blg_text').append('<p class="blg_more">more</p>');
			//console.log(i+"Title="+data[i].title.rendered);

			//$('.blg_block > .blg_text > .blg_title').append(data[i].title.rendered);

			//内容
			//console.log(data[i].excerpt.rendered);
			//$('.blg_block > .blg_text > .blg_more').append(data[i].title.rendered);
			//アイキャッチ画像ID
			//console.log(data[i]['_embedded']['wp:featuredmedia'][0]['source_url']);
		}

	})
	//通信が失敗したとき
	.fail(function(){
		alert('通信障害が発生しました。');
	});


});


function menu(){
	if($('#menu').hasClass('open')){
		//openのとき
		$('#menu_list').removeClass('first');
		$('#menu').removeClass('open');
		$('#menu_list').addClass('active');
		$('#menu').addClass('close');
		$('body').css('overflow','hidden');/*今表示されてる画面のみ認識*/
	}else{
		$('#menu').removeClass('close');
		$('#menu_list').removeClass('active');
		$('#menu').addClass('open');
		$('#menu_list').addClass('first');
		$('body').css('overflow','visible');/*デフォルトの状態*/
	}
}

function removeClass(){

}

//Null Check
function nullChk(val){
	//参考演算子 (条件式) ? 真の場合 : 偽の場合;
	return (val == null || val == '' || val == undefined) ? false :true;
}

//Output Error Message
function errMsg(id, msg){
	//#name > p
	//name > pをmsgに書き換える
	$(id + ' > p').text(msg);
}

// Telephone Number Check
function telChk(val){
	//\d{3,5}-\d{3,4}-\d{3,5}
	/*
	console.log(val.match(/^\d{10,11}$/)); //配列で値が返ってくる
	*/
	return (val.match(/^\d{10,11}$/)) ? true : false;
}

// E-mail Check
function mailChk(val){
	return (val.match(/^[A-Za-z0-9]+[\w-]+@\w{1}[\w.-]+\w{2,}$/)) ? true : false;
}

//半角記号チェック
function hlfChk(val){
	return (val.match(/[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]/g)) ? true : false;
}

//エラーメッセージチェック
function errorAllChek(){
	var cnt = 0;
	$('form p').each(function(i,e){
		var txt = $(this).text(); //カッコの中身が記載されてない場合、その中身が取り出される
		if(txt !=''){
			cnt++;
		}
	});
	return cnt;
}

