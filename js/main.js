$(function(){
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
})