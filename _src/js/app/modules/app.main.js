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


 $(window).resize(function() {
  heightFn();
});

function heightFn() {

  var heightClasses = '.video-overlay, .loop, #map, #map-overlay, .on-top';
  var aboutReplace = $('.about-replace').height();
  var aboutHeight = $('#about').height();
  var onTop = $('.on-top').height();
  var bodyHeight  = $('body').height();
  console.log ('aR'+aboutReplace+' aH'+aboutHeight+' oT'+onTop+' bH'+bodyHeight);

  var highestNum = Math.max(aboutReplace, aboutHeight, onTop);

  if (highestNum >= $(document).height() ) {
    
    $(heightClasses).css('height', highestNum);
    
    initMap();
    
  }
  
  else {
    $(heightClasses).css('height', '100%');
    
  }


  if ( $('body').height() <= $('body').width() && $('body').height() < 590 && $('body').width() <= 1024 ) {
    $('.on-top').addClass('font-size');
  }

  else if ( $('body').height() <= $('body').width() && $('body').height() < 800 && $('body').width() >= 1024 ) {
    $('.on-top').addClass('font-size');
  }

  else {
    $('.on-top').removeClass('font-size');
  }

}

// addressing stuff //////////////

  $('a').click(function() {  
    //change the after-hash-sign-params to the value of the clicked link
    $.address.value($(this).attr('href'));
    setTimeout(heightFn, 100);

  });

  $.address.change(function(event) { 
    //define an event handler based on the params...
    if (event.value == '/deep-link') {
      loadSocial();
    }
    
  });

// end addressing stuff //////////////



////// this should integrate into the addressing stuff above

  if ( $('body').hasClass('home') ) { 
    
    // google maps
    initMap();
    heightFn();

    // animate home info in
    $('.on-top').delay(800).animate({'margin-top': '-2em', 'opacity': 1,}, 150);

  } // end body.home 

///////////////////////////////////////


// click handlers ///////////////////

  // hamburger menu 
  $('a.gradient-icon').click(function() {
    $('.popup, .popup-overlay, .popup-info').show();
    $('.popup, .popup-overlay, .popup-info').animate({
      'width': '100%',
      'height': '100%',
      'opacity': '1',
    }, 500);
  });

  // popup close button
  $('.popup a.closeit').click(function() {
    $('.popup').animate({
      'width': '0%',
      'opacity': '0',
    }, 500);
  });
  
  // since following pages are reloaded must use 'on'

  // close button
  $(document).on('click', '#loadsocial a.closeit, #about a.closeit', function(e) {
    closebtn();

  });
  $(document).on('click', 'a.register', function(e) {
    registbtn();
  });

  // on register click
  $(document).on('click', 'a.register2', function(e) {

      // load in form page / start form page
    $('.about-replace').load('register2.html #register-replace', function (){
    
      $('button-row').html('Step 3 | Checkout');
      
      // validation rules

      $('#register-form').validate({

        rules: {
          name: "required",
          email: "required",
        },
        messages: {
          name: "Please enter your name",
          email: "Invalid Email",
        }

      }); // end validate rules

      

      // tympanus input forms
      
      (function() {
        // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!String.prototype.trim) {
        
          (function() {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            
            String.prototype.trim = function() {
              return this.replace(rtrim, '');
            };

          })();
        }

        [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
          // in case the input is already filled..
          if( inputEl.value.trim() !== '' ) {
            classie.add( inputEl.parentNode, 'input--filled' );
          }

          // events:
          inputEl.addEventListener( 'focus', onInputFocus );
          inputEl.addEventListener( 'blur', onInputBlur );
        } );

        function onInputFocus( ev ) {
          classie.add( ev.target.parentNode, 'input--filled' );
        }

        function onInputBlur( ev ) {
          if( ev.target.value.trim() === '' ) {
            classie.remove( ev.target.parentNode, 'input--filled' );
          }
        }
      })(); // end tympanus input forms

    }); // end load in form page

  }); // end on register click

// end click handlers ////////////////


// click functions ///////////////////
  
  function fade() {
    $('div.info').fadeOut(0).fadeIn(500);
  }
  function title() {
    var theTitle = $('#title').html();
    $('title').html(theTitle);
  }
  
  function loadSocial () {
    fade();
    closebtn();
    $('#map-overlay').load('social.html #loadsocial').css('color', 'white');
    $('#map-overlay').show();

    $('a.ga16').hide();
    $('a.register').removeClass('left').addClass('right');
    $('.info').removeClass('small-8 small-offset-2 large-6 large-offset-3');
    $('.info').addClass('small-5');
    $('.info-buttons').css('margin','2em 0 0 0');
    $('.info').css('text-align','right');
  }

  function closebtn() {
    
    $('a.register, a.ga16').show();
    $('a.ga16').addClass('right').removeClass('left');
    $('a.register').addClass('left').removeClass('right');
    $('.info-buttons, .info, .crowd').attr('style','');
    $('.info').removeClass('small-5 small-offset-7');
    $('.info').addClass('small-8 small-offset-2 large-6 large-offset-3');
    $('video').animate({'opacity': '1'}, 100);
    $('#about').animate({'opacity': '0'}, 100).css('transform','translateY(100px)');
    $('#map-overlay').hide();
    $('#about').html('');
    heightFn();

  }

  function registbtn() {
    $('#map-overlay').hide();
    $('a.register').hide();
    $('a.ga16').removeClass('right').addClass('left').show();
    $('.info-buttons').css('margin','2em 0 0 0');
    $('.info').removeClass('small-8 small-offset-2 large-6 large-offset-3');
    $('.info').addClass('small-5 small-offset-7').css('text-align','left');
    $('.crowd').css('display', 'block').animate({ 'opacity': '.8'}, 'slow');
    $('.video-overlay').css('background-color', 'rgba(52,212,150,.5');
    $('video').animate({'opacity': '0'}, 100);
    $('.video-overlay').load('register.html #about', function(){
      title();

      $(this).children(':first').animate({'opacity': '1'}, 'slow').css('transform','translateY(0)');
    });
    setTimeout(heightFn, 100);
  } // end function register

// end click functions ///////////////////


///////////////// start google maps function ////
/*
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

}*/

var map, infoBubble, infoBubble2;
      function initMap() {
        var mapCenter = new google.maps.LatLng(36.156571, -86.774734);
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: mapCenter,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles : [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
        });

        var marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(36.156571, -86.774734),
          draggable: true
        });

        var contentString = '<div id="content">'+
        '<h1>Uluru</h1>'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>';

        infoBubble = new InfoBubble({
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
          minHeight: 100,
          content: div

        });

        infoBubble.open(map, marker);

        var div = document.createElement('DIV');
        div.innerHTML = contentString;

        google.maps.event.addListener(marker, 'click', function() {
          if (!infoBubble.isOpen()) {
            infoBubble.open(map, marker);
          }
        });
      }
      google.maps.event.addDomListener(window, 'load', initMap);

///// end google maps function

if ( document.title === 'Loading') {
////// tympanus loading animation
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
    // window.addEventListener( 'scroll', noscroll );

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
}

}(jQuery, this, this.document));
