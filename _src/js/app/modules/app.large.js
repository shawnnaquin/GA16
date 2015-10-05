(function ($, window, document, undefined) {

	App.large = (function () {

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
$('.on-top, div.arrow-container, #map, .map-overlay, .loadsocial').show();

$( window ).resize(function() {
	$('.on-top, div.arrow-container, #map, .map-overlay, .loadsocial').show();
});

$(document).on('click', 'a.register, a.closeit, a.ga16', function(){
	$('.on-top, div.arrow-container, #map, .map-overlay, .loadsocial').show();
});
}(jQuery, this, this.document));