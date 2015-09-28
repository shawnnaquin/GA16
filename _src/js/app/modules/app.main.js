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

if ( $('body').hasClass('home') ) { 
  initMap();
  
  $('.on-top').delay(800).animate({
    'margin-top': '-50px', 'opacity': 1,
  }, 150);
}

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

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Uluru (Ayers Rock)',
    icon: 'http://localhost:3000/assets/imgs/marker-opt.svg'
  });

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
/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

  var support = { animations : Modernizr.cssanimations },
    container = document.getElementById( 'ip-container' ),
    header = container.querySelector( 'header.ip-header' ),
    loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
    animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
    // animation end event name
    animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

  function initAnimate() {
    var onEndInitialAnimation = function() {
      if( support.animations ) {
        this.removeEventListener( animEndEventName, onEndInitialAnimation );
      }

      startLoading();
    };

    // disable scrolling
    window.addEventListener( 'scroll', noscroll );

    // initial animation
    classie.add( container, 'loading' );

    if( support.animations ) {
      container.addEventListener( animEndEventName, onEndInitialAnimation );
    }
    else {
      onEndInitialAnimation();
    }
  }

  function startLoading() {
    // simulate loading something..
    var simulationFn = function(instance) {
      var progress = 0,
        interval = setInterval( function() {
          progress = Math.min( progress + Math.random() * 0.1, 1 );

          instance.setProgress( progress );

          // reached the end
          if( progress === 1 ) {
            classie.remove( container, 'loading' );
            classie.add( container, 'loaded' );
            window.location.href = "home.html";
            clearInterval( interval );
            $('body.loading').css('background-color', '#444444');


            var onEndHeaderAnimation = function(ev) {
              if( support.animations ) {
                if( ev.target !== header ) return;
                this.removeEventListener( animEndEventName, onEndHeaderAnimation );
              }

              classie.add( document.body, 'layout-switch' );
              window.removeEventListener( 'scroll', noscroll );
            };

            if( support.animations ) {
              header.addEventListener( animEndEventName, onEndHeaderAnimation );
            }
            else {
              onEndHeaderAnimation();
            }
          }
        }, 80 );
    };

    loader.setProgressFn( simulationFn );
  }
  
  function noscroll() {
    window.scrollTo( 0, 0 );
  }

  initAnimate();

})();



}(jQuery, this, this.document));




