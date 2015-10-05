(function ($, window, document, undefined) {

	App.small = (function () {

		var elements = {
		};

		var settings = {
		};

		var pages = {
			sample: {
				init: function(){

				},
				destroy: function(){

				},
			}
		};

		function init() {
			for(var key in pages){
				if($('body').hasClass(key)){
					pages[key].init();
				}
			}
		}

		function destroy() {
			for(var key in pages){
				if($('body').hasClass(key)){
					pages[key].destroy();
				}
			}
		}

		// Reveal public methods
		return {
			init    : init,
			destroy : destroy,
		};
	}());

	$('body').css('overflow','hidden');

// end addressing stuff //////////////
	

	$(document).on('click', 'a.register', function() {
		$('.on-top').hide();
	});
/*
	$(document).on('click', 'a.closeit', function() {
		$('.on-top, div.arrow-container').show();
		$('.loop').show();
	});
*/
	$(document).on('click', 'a.ga16', function() {
		$('.on-top, div.arrow-container').hide();
		$('.loop').hide();
	});

	$(document).on('click', 'a.closeit', function() {
		$('.on-top, div.arrow-container, .loop').show();
	});

}(jQuery, this, this.document));