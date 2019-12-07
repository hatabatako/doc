$(function(){
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

	// 以下 CSS追加項目



})