$(function(){/*HTML&CSS(Dom)を読み込み完了後に実施*/
	$('#menu').on('click',function(){
		if($('#menu').hasClass('open')){
			//openのとき
			$('#menu').removeClass('open');
			$('#menu').addClass('close');

			$('#menu_list').addClass('active');

			$('body').css('overflow','hidden');/*今表示されてる画面のみ認識*/
		}else{
			//closeのとき
			$('#menu').removeClass('close');
			$('#menu').addClass('open');

			$('#menu_list').removeClass('active');
			$('body').css('overflow','visible');/*デフォルトの状態*/
		}
	});


	//scroll
	var section = $('main > section');

	//windowロード



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
				section.removeClass('active');
				//現在地のセクションのIDを取得
				var this_id = $(this).attr('id');

				//対象セクションIDに対して、activeクラスをつける
				switch(this_id){
					case 'top':
						$(this).addClass('active');
						break;
					case 'about':
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
				$('.background-image').addClass('active');
			}else{
				$('.background-image').removeClass('active');
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







	

})