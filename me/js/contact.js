function sendMessage(name, email, message, callback) {
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://blooming-plains-57333.herokuapp.com/submit",
		"method": "POST",
		"headers": {
			"content-type": "application/json"
		},
		"processData": false,
		"data": JSON.stringify({ 'name':name, 'email': email, 'message': message })
	}

	$.ajax(settings)
	.done(function (response) {
		callback(response);
	})
	.fail(function (xhr, response) {
		callback(response);
	});
}


function sendMessageDefault() {
	var form = new FormData();
	form.append("from", "");
	form.append("to", "");
	form.append("subject", "");
	form.append("text", "");

	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "",
	  "method": "POST",
	  "headers": {
	  	'x-requested-with': 'XMLHttpRequest'
	  },
	  xhrFields: {
        withCredentials: true
      },
      username: 'api',
      password: '',
	  "processData": false,
	  "contentType": false,
	  "mimeType": "multipart/form-data",
	  "data": form
	}

	$.ajax(settings).done(function (response) {
	  console.log(response);
	});
}


$(document).ready(function() {
	$('#contact-form').submit(function() {
		
		if($('#contact-form').hasClass('clicked')){
				return false;
			}
		
		$('#contact-form').addClass('clicked');
		
		var buttonWidth=$('#contact-form button').width();
		
		var buttonCopy = $('#contact-form button').html(),
			errorMessage = $('#contact-form button').data('error-message'),
			sendingMessage = $('#contact-form button').data('sending-message'),
			okMessage = $('#contact-form button').data('ok-message'),
			hasError = false;
		
		$('#contact-form button').width(buttonWidth);
		$('#contact-form .error-message').remove();
		
		$('.requiredField').each(function() {
			if($.trim($(this).val()) == '') {
				var errorText = $(this).data('error-empty');
				$(this).parents('.field-wrap').append('<span class="error-message" style="display:none;">'+errorText+'.</span>').find('.error-message').fadeIn('fast');
				$(this).addClass('inputError');
				hasError = true;
			} else if($(this).is("input[type='email']") || $(this).attr('name')==='email') {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,10})?$/;
				if(!emailReg.test($.trim($(this).val()))) {
					var invalidEmail = $(this).data('error-invalid');
					$(this).parents('.field-wrap').append('<span class="error-message" style="display:none;">'+invalidEmail+'.</span>').find('.error-message').fadeIn('fast');
					$(this).addClass('inputError');
					hasError = true;
				}
			}
		});
		
		if(hasError) {
			$('#contact-form button').html('<i class="fa fa-times"></i>'+errorMessage);
			setTimeout(function(){
				$('#contact-form button').html(buttonCopy);
				$('#contact-form button').width('auto');
				$('#contact-form').removeClass('clicked');
			},2000);
		}
		else {
			$('#contact-form button').html('<i class="fa fa-spinner fa-spin"></i>'+sendingMessage);
			
			/*var formInput = $(this).serialize();
			$.post($(this).attr('action'),formInput, function(data){
				$('#contact-form button').html('<i class="fa fa-check"></i>'+okMessage);
				$('#contact-form')[0].reset();
				setTimeout(function(){
					$('#contact-form button').html(buttonCopy);
					$('#contact-form button').width('auto');
					$('#contact-form').removeClass('clicked');
				},2000);
				
			});*/

			var name = $('#contact-name').val();
			var email = $('#contact-mail').val();
			var message = $('#contact-message').val();


			sendMessage(name, email, message, function(response) {
				if(response == 'success') {
					$('#contact-form button').html('<i class="fa fa-check"></i>'+okMessage);
					$('#contact-form')[0].reset();
					setTimeout(function(){
						$('#contact-form button').html(buttonCopy);
						$('#contact-form button').width('auto');
						$('#contact-form').removeClass('clicked');
					},2000);
				}
				else {
					$('#contact-form button').html('<i class="fa fa-times"></i>'+errorMessage);
					setTimeout(function(){
						$('#contact-form button').html(buttonCopy);
						$('#contact-form button').width('auto');
						$('#contact-form').removeClass('clicked');
					},2000);
				}
			});

		}
		
		return false;	
	});
});