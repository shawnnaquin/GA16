(function ($, window, document, undefined) {

	/* blockui
	------------------------------------------------------------------------------------------------------------------*/
	$.extend($.blockUI.defaults, {
		message: 'Loading...',
		css: {},
		themedCSS: {},
		growlCSS: {},
		baseZ:2000,
	});

	/* validator
	------------------------------------------------------------------------------------------------------------------*/


	$.validator.setDefaults({
		errorElement: 'label',
		errorClass: 'input__label input__label--kaede error',

    highlight: function(errorElement) {
    	$(errorElement).parent().addClass('error-border');
  	},
    unhighlight: function(errorElement) {
    	$(errorElement).parent().removeClass('error-border');
  	},

 		invalidHandler: function(form, validator) {
      var errors = validator.numberOfInvalids();

      if (validator.errorList.length > 0) {

      		$('div.error').show();
	        $('div.error p').html( errors + ' errors, see above' );
	     }

    },

		submitHandler: function(form){
			$(form).ajaxSubmit({
				dataType: 'json',
				beforeSubmit:function(){
					$.blockUI({
						message: 'Sending message...',
						blockMsgClass: 'loading'
					});
					return true;
				},
				success:function(response){
					$.blockUI({
						message: response.message,
						timeout: 3000,
						blockMsgClass: response.type,
						onUnblock: function(){
							if(response.type === 'success'){
								window.location.reload();
							}
						}
					});
				}
			});
		}
	});

	// validate signup form on keyup and submit


}(jQuery, this, this.document));