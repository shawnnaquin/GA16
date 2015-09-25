(function ($, window, document, undefined) {

	App.main = (function () {

		var elements = {
			$win      : $(window),
			$doc      : $(document),
			$body     : $('body'),
			$nav      : $('#main-nav'),
		};

		var settings = {

		};

		var pages = {
			contact: {
				init: function(){
					$('.js-form-contact').validate({
						rules: {
							first_name: 'required',
							last_name: 'required',
							email: {
								required: true,
								email: true
							},
							message: 'required'
						},

						messages: {
							first_name: '',
							last_email: '',
							email: {
								required: '',
								email: ''
							},
							message: ''
						},
					});
				}
			}
		};

		function init() {
			__init_foundation();

			for(var key in pages){
				if($('body').hasClass(key)){
					pages[key].init();
				}
			}
		}

		function __init_foundation() {
			$(document).foundation();
		}

		// Reveal public methods and global elements, settings
		return {
			elements : elements,
			settings : settings,
			init    : init
		};
	}());
$('div.gm-style-iw').parent().css('background-color','blue');
}(jQuery, this, this.document));

function initMap() {
  // Create a map object and specify the DOM element for display.
  var myLatLng = {lat: 36.156571, lng: -86.774734};

  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
		zoom: 13,
    zoomControl: false,
    disableDoubleClickZoom: false,
    mapTypeControl: false,
    scaleControl: false,
    scrollwheel: false,
    panControl: false,
    streetViewControl: false,
    draggable : false,
    overviewMapControl: false,
    overviewMapControlOptions: {
        opened: false,
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles : [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
  });
/*
  var contentString = 'hello';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
*/
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Uluru (Ayers Rock)',
    icon: 'http://localhost:3000/assets/imgs/marker-opt.svg'
  });
/*
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
*/
infoBubble = new InfoBubble({
      map: map,
      content: '<div class="mylabel">hello</div>',
      position: new google.maps.LatLng(-30, 151),
      shadowStyle: 1,
      padding: 0,
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      arrowSize: 15,
      borderWidth: 5,
      borderColor: '#38a57b',
      disableAutoPan: true,
      hideCloseButton: false,
      arrowPosition: 30,
      backgroundClassName: 'transparent',
      arrowStyle: 0,
      minWidth: 150,
      minHeight: 100
    });

    marker.addListener('click', function() {
      infoBubble.open(map, marker);
    });

}
