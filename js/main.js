$(function(){/*HTML&CSS(Dom)を読み込み完了後に実施*/


	//＝＝＝＝背景のActive化＝＝＝＝＝
	//Dom読み込み時（初期表示）
	active();
	//window(表示されている画面)がscrollしたら
	$(window).on('scroll',function(){
		active();
	});

	// ＝＝＝＝　メニュー画面表示非表示設定　＝＝＝＝
	$('#menu,#menu_list a').on('click',function(e){
		menu();
	 });

	$(document).on('click',function(e){
		if($('#menu').hasClass('open')){
			//メニューリストかハンバーガーメニューを押下しなかったら、以下を実行
			if(!$(e.target).closest('#menu_list').length && !$(e.target).closest('#menu').length){
				$('#menu').removeClass('open');
				$('#menu_list').removeClass('open');
				$('#menu').addClass('close');
				$('#menu_list').addClass('close');
			}
		}
	});

	//メニュースクロール表示
	$('a[href^="#"]').on('click',function(){
		var speed = 400;//速度
	    var href = $(this).attr("href");//場所
	    var target = $(href == "#" || href == "" ? 'html' : href);
	    var position = target.offset().top;
	    $('html, body').animate({scrollTop:position}, speed, "swing");
	    return false;
	});


	//バリデーションチェック
	//blur：フォーカスが外れたタイミングで実行
	$('input,textarea').on('blur',function(){

		var val  =$(this).val(); //値を取得
		var name =$(this).attr('name'); //nameを取得
		var id   ='#' + name;//idを作成
		console.log(val);
		console.log(name);
		console.log(id);


		//NullCheck 値がNullだったら
		if(nullChk(val)){ //Nullチェック関数
			//エラーメッセージを空欄に上書き
			errMsg(id,''); 
		}else{
			errMsg(id,'必須項目です');
			return false;//処理中断
		}

		//電話、メール、半角記号チェック
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

		//Workポップアップ
		$('#work a').on('click',function(){
			if($('#menu').hasClass('open')){
				$('#menu').removeClass('open');
				$('#menu').addClass('close');
			}else{
				$('#menu').removeClass('close');
				$('#menu').addClass('open');
			}
		});

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
		//blog_list内を空っぽにする
		$('.blog_list').html('');
		for(var i=0; i < data.length; i++){
			$('.blog_list').append('<div class="blog_box"></div>');

			var num_block = i + 1;
			$('.blog_box:nth-of-type('+ num_block +')').append('<a class="blog_link" href="#"></a>')
			$('.blog_box:nth-of-type('+ num_block +') > .blog_link').append('<div class="blog_img"></div>')
			$('.blog_box:nth-of-type('+ num_block +') > .blog_link').append('<div class="blog_text"></div>')
			$('.blog_box:nth-of-type('+ num_block +') > .blog_link > .blog_img').append('<img src="'+data[i]['_embedded']['wp:featuredmedia'][0]['source_url']+'"></img>')
			$('.blog_box:nth-of-type('+ num_block +') > .blog_link > .blog_text').append('<div class="blog_title"></div>')
			$('.blog_box:nth-of-type('+ num_block +') > .blog_link > .blog_text').append('<div class="blog_memo"></div>')
			$('.blog_box:nth-of-type('+ num_block +') > .blog_link > .blog_text > .blog_title').append('<p>'+data[i].title.rendered+'</p>');
			$('.blog_box:nth-of-type('+ num_block +') > .blog_link > .blog_text > .blog_memo').append('<p>'+data[i].excerpt.rendered+'</p>');

		}

	})
	//通信が失敗したとき
	.fail(function(){
		alert('通信障害が発生しました。');
	});

	slick();


});


function slick(){
	$('.Works_photoSlider').slick({
		dots:true,
		variableWidth:true,//スライド幅の自動計算
		arrows: false, //矢印の有無
		autoplay:true,
		autoplaySpeed:2000,
		speed: 600,
		pauseOnHover:true,
		infinite: true,
		adaptiveHeight:true,
	});
}

// メニュー画面表示非表示
function menu(){
	if($('#menu').hasClass('open')){
		//openのとき
		$('#menu').removeClass('open');
		$('#menu_list').removeClass('open');
		$('#menu').addClass('close');
		$('#menu_list').addClass('close');
	}else{
		$('#menu').removeClass('close');
		$('#menu_list').removeClass('close');
		$('#menu').addClass('open');
		$('#menu_list').addClass('open');
	}
}

//背景のActive化
function active(){
	//各sectionの情報を取得
	var section = $('main > section');
	//現在地の取得(Topからscrollした距離)
	var cur_pos = $(this).scrollTop();

	//section全てに対して実施(each)
	section.each(function(){

		//各sectionのTopとBottomのy座標を取得
		var top = $(this).offset().top;
		//TopにSectionの高さを足す
		var bottom = top + $(this).outerHeight();

		//ずらし
		var offset = 175;

		//現在地が各セクションのTopからBottom(+offset)の間にいるとき
		if(cur_pos >= top - offset && cur_pos <= bottom - offset){

			//activeクラスを全て除去
			$('section').removeClass('active');
			$('div.bgImg').removeClass('active');

			//現在地のセクションIDを取得
			var this_id = $(this).attr('id');

			//対象セクションIDに対して、activeクラスをつける
			switch(this_id){
				case 'top':
				$(this).addClass('active');
				$('.bg_tp').addClass('active');
				break;
				case 'profile':
				$(this).addClass('active');
				$('.bg_pf').addClass('active');
				break;
				case 'work':
				$(this).addClass('active');
				$('.bg_wk').addClass('active');
				break;
				case 'blog':
				$(this).addClass('active');
				$('.bg_bg').addClass('active');
				break;
				case 'contact':
				$(this).addClass('active');
				$('.bg_ct').addClass('active');
				break;
				default:
				break;
			}

		}
	});

}


//=============================
//    バリデーションチェック関数    
//=============================
//Null Check
function nullChk(val){
	//三項演算子（条件式） ? 真の場合：偽の場合;
	//値がNullまたは空白または変数定義がなかった場合
	return (val == null || val == '' || val == undefined) ? false :true;
}

//Output Error Message
function errMsg(id, msg){
	$(id + ' > p').text(msg);
}

//Telephone Number Check
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


//==========
//  Vue.js
//==========
var WorksView = new Vue({
	el:'#WorkTop',
	data:{
		Works:'Maki',
	},
	methods:{
		swithWorks(Value){
			this.Works = Value;
		},
		Loading(){
			console.log('Loading display');

		},
		removeLoading(){
			console.log('RemoveLoading display');
		}
	},
	updated(){
		var _self= this;
		this.Loading();
		$(window).on('load',function(){
			slick();
			_self.removeLoading();
		});
	}
});
