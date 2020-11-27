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

		
		let menu                 = $('.catalog-menu'),
			container            = menu.parent(),
			containerYOffset     = container.offset().top,
			stopPoint            = ($('.footer').offset().top) - 300;

			/*console.log('menu ' + menu);
			console.log('container ' + container);
			console.log('containerYOffset ' + containerYOffset);
			console.log('stopPoint ' + stopPoint);*/

		$(window).on('scroll', function(e){
			
			if(pageYOffset > containerYOffset && pageYOffset < stopPoint) {
				menu.addClass('fixed');
				menu.removeClass('stopPoint');
			} else if(pageYOffset > containerYOffset && pageYOffset > stopPoint){
				menu.addClass('stopPoint');
			} else if(pageYOffset < containerYOffset){
				menu.removeClass('fixed');
			}

		});


	/* ---------- colorpic ---------- */	

		let 
			colorpicItem = $('.colorpic').find('.colorpic-list__item'),
			catalogItem  = $('catalog-list__item'),
			pickedColor  = new Array();


		colorpicItem.on('click', function(e){
			$(this).addClass('active');
		});

		function showPicked(){
			colorpicItem.each(function(){
				if($(this).hasClass('active')) {
						
				}
			});
		}

		

	});
})(jQuery);
