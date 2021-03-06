(function($){
	$(document).ready(function(){ 
		

/* -------------------- user login form -------------------- */

		$('.user').click(function(e){
			e.preventDefault();
			$(this).toggleClass('active');
			$('.login').toggleClass('active');
			$('body').toggleClass('lock');
		});


		$('.login-close').click(function(){
			$('.user').toggleClass('active');
			$('.login').toggleClass('active');
			$('body').toggleClass('lock');
		});

	/* --- input placeholder --- */

		function inputValue(form){
			var inputsValue = [],
				input = $('.login-form__item');

			/* Перебираем все инпуты из формы контактов 
			и сохраняем значение value в массив */

			input.each(function(){
				var 
					inputName = $(this).attr('name');

				inputsValue[inputName] = $(this).val();	
			});


			/* Поведение при фокусе. 
			Если input.value совпадает с исходным значением, то стираем */

			input.focus(function(){
				
				var 
					inputName  = $(this).attr('name'),
					inputValue = $(this).val();

				if(inputValue === inputsValue[inputName]) {
					$(this).val('');
				}
			});

			/* Поведение при потери фокуса. 
			Если input.value пустой, то вписываем исходное значение */

			input.blur(function(){
				
				var
					inputName  = $(this).attr('name'),
					inputValue = $(this).val();

				if(inputValue === '') {
					$(this).val(inputsValue[inputName]);
				}

			});
		}

		inputValue($('#loginForm'));

	/* --- END input placeholder --- */


	const userLoginForm = document.getElementById('loginForm');

	userLoginForm.addEventListener('submit', formSend);

	async function formSend(e) {

		e.preventDefault(); 

		let error = formValidate(userLoginForm);

		let formData = new FormData(userLoginForm); 

		if(error === 0){
			 $(userLoginForm).addClass('_sending'); 
			
			 setTimeout(() => {
	 			userLoginForm.reset();
	 			$(userLoginForm).removeClass('_sending'); 
	 			alert('Форма успешно отправлена!');
			 }, 2000);

			/*let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});

			if(response.ok) {
				let result = await response.json();
				alert(result.message);
				userLoginForm.reset();
				 userLoginForm.classList.remove('_sending'); //userLoginForm.removeClass('_sending'); 
			} else {
				alert('Send error');
				userLoginForm.classList.remove('_sending'); //userLoginForm.removeClass('_sending');
			}*/

		} else {
			alert('Необходимо корректно заполнить все обязательные поля формы!');
		}
	}

	function formValidate(userLoginForm){
		let error   = 0;

		let formReq = $(userLoginForm).find('._req');

		for (let index = 0; index < formReq.length; index++){
			const input = formReq[index];

			formRemoveError(input);
		
			if($(input).hasClass('_email')){ 
				if(emailValidate(input)){
					formAddError(input);
					error++;
				}
			} else if($(input).hasClass('_password')){ // input.classList.contains('className')
				if(passwordValidate(input)){
					formAddError(input);
					error++;
				}
			}
		}

		return error;
	}

	function formAddError(input){
		$(input).addClass('_error');
	}

	function formRemoveError(input){
		$(input).removeClass('_error'); // input.classList.remove('className')
	}

	function emailValidate(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	function passwordValidate(input) {
		return !/^[\w]{8,}$/gi.test(input.value); 
	}

	/*
		function nameValidate(input) {
			return !/^[\wа-я]{3,10}$/gi.test(input.value);
		}
	*/



	/* ---------- catalog-menu ---------- */

		
		let 
			wW = $(window).width(),
			wH = $(window).height();

		let menu                 = $('.catalog-menu'),
			container            = menu.parent(),
			containerYOffset     = container.offset().top,
			containerHeight      = $('.main').height(),
			stopPoint            = ($('.footer').offset().top) - (wH / 3);
		/*	stopPoint            = (containerHeight + containerYOffset) - (wH / 3);*/


			/*console.log('menu ' + menu);
			console.log('container ' + container);
			console.log('containerYOffset ' + containerYOffset);
			console.log('stopPoint ' + stopPoint);*/

		function fixedMenu(){
			if(pageYOffset > containerYOffset && pageYOffset < stopPoint) {
				container.addClass('fixed');
				container.removeClass('stopPoint');
			} else if(pageYOffset > containerYOffset && pageYOffset > stopPoint){
				container.addClass('stopPoint');
			} else if(pageYOffset < containerYOffset){
				container.removeClass('fixed');
			}
		}

		$(window).on('scroll', function(e){

			fixedMenu();

			/*console.log(stopPoint);*/			
		});

		$(window).on('resize', function(){
			/*stopPoint = (containerHeight + containerYOffset);*/
			stopPoint = ($('.footer').offset().top) - (wH / 3);
		});

		

	/* ---------- colorpic ---------- */	

		let 
			colorpicItem      = $('.colorpic').find('.colorpic-list-item'),
			catalogItem       = $('.catalog-list-item'),
			catalogItemWidth  = catalogItem.width(),
			catalogItemHeight = catalogItemWidth,
			pickedColor       = [];



		/*

			function getOffset(){
				let itemsXOffset = (
					$(catalogItem[1]).offset().left - $(catalogItem[0]).offset().left
				) - $(catalogItem[0]).outerWidth();

				catalogItem.css({'margin-bottom':itemsXOffset});
			}

			getOffset();


			function goSize(){
				catalogItem.height(catalogItemHeight);	
			}

		*/


		colorpicItem.on('click', function(){

			if($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}
			
			pickedColor      = getPicked();
			pickedColorArray = Object.values(pickedColor);

			if($.inArray(true, pickedColorArray) != -1) {
				selectPicked(pickedColor);

				/*stopPoint = ($('.footer').offset().top) - (wH / 3);*/
			} else {
				catalogItem.removeClass('active disabled');
			}

			if($.inArray(false, pickedColorArray) === -1) {
				catalogItem.removeClass('active disabled');
			}
			

		});

	/* Перебираем колорпики,
		если есть класс актив - добавляем в массив выбранных элементов
		pickedColor[color] = true/false.
	*/

		function getPicked(){

			colorpicItem.each(function(){
				if($(this).hasClass('active')) {
					pickedColor[$(this).attr('data')] = true; 
				} else {
					pickedColor[$(this).attr('data')] = false;
				}
			});

			return pickedColor;
		}


	/* Перебираем элементы списка каталога,
		атрибут data="color" проверяем в массиве отмеченных колорпиков,
		если значение для него равно true, то отображаем соответствующие элементы
		из списка каталога, иначе - скрываем.
		
	*/

		function selectPicked(pickedColor){

			catalogItem.each(function(){
				if(pickedColor[$(this).attr('data')]){
					$(this).removeClass('disabled').addClass('active');
				} else {
					$(this).removeClass('active').addClass('disabled');
				}
			});
		}

		$(window).on('load', function(){

			//catalogItem.addClass('active');

			/*//pickedColor = getPicked();

			//pickedColorArray = Object.values(pickedColor);

			if($.inArray(true, pickedColorArray) != -1) {
				selectPicked(pickedColor);
			} else {
				//colorpicItem.addClass('active');
				catalogItem.addClass('active');
				//pickedColor = getPicked();
				selectPicked(pickedColor);
			}*/

		});

		/*$(window).on('resize', function(){
			setTimeout(function(){
				let catalogConteinerWidth = catalogList.width(),
				catalogItemWidth      = catalogConteinerWidth / 4.3;

				catalogItem.width(catalogItemWidth);
			}, 0);
		});*/
	
	});
})(jQuery);
