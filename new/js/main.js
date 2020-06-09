$(function(){/*HTML&CSS(Dom)を読み込み完了後に実施*/

	// ＝＝＝＝　メニュー画面表示非表示設定　＝＝＝＝
	$('#menu,#menu_list a').on('click',function(){
		menu();
	});

	//各sectionの情報を取得
	var section = $('main > section');
	console.log(section);

	//window(表示されている画面)がscrollしたら
	$(window).on('scroll',function(){

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

				//現在地のセクションIDを取得
				var this_id = $(this).attr('id');

				//対象セクションIDに対して、activeクラスをつける
				switch(this_id){
					case 'top':
						$(this).addClass('active');
						$('#background-image').removeClass();
						$('#background-image').addClass('bg_tp');
						break;
					case 'profile':
						$(this).addClass('active');
						$('#background-image').removeClass();
						$('#background-image').addClass('bg_pf');
						break;
					case 'work':
						$(this).addClass('active');
						$('#background-image').removeClass();
						$('#background-image').addClass('bg_wk');
						break;
					case 'blog':
						$(this).addClass('active');
						$('#background-image').removeClass();
						$('#background-image').addClass('bg_bg');
						break;
					case 'contact':
						$(this).addClass('active');
						$('#background-image').removeClass();
						$('#background-image').addClass('bg_ct');
						break;
					default:
						break;
				}

			}


		});



	});



});

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