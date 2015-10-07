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

if ( $('body').hasClass('version') ) {
  if ( $(document).width() < 470 ) {
    window.location = "landing.html";
  }
  else {
    window.location = "loading.html";
  }
}
else {

}


var heightClasses = '.video-overlay, .loop, #map, .map-overlay, .background, .popup, .on-top';

var aboutReplace = 0;
var aboutHeight = 0;
var socialHeight = 0;
var bodyHeight  = $('body').height();
var info = $('.info').height();


//heightFn();

 $(window).resize(function() {
  initMap();
   //heightFn();
});

function heightFn() {

  var highestNum = Math.max(aboutReplace, aboutHeight, info+200, bodyHeight+100);
  
  console.log ('aR'+aboutReplace +' aH'+aboutHeight+' bH'+bodyHeight+' info'+info);
  
  if (highestNum >= bodyHeight) {
    $('body').css('height', highestNum);
    $(heightClasses).css('height', '100%');
  }
  else {
    $('body').css('height', '100%');
  }

  /*
  if (highestNum <= bodyHeight) {
    $(heightClasses).css('height', '100%');
  }

  else if (highestNum === info) {
    // the padding top of .info === 128
    $(heightClasses).css('height', highestNum+128);
  }
  
  else if (highestNum > bodyHeight ) {
    // extra room for buttons

    $(heightClasses).css('height', highestNum);
    
    initMap();
    

  }
  
  else {
    $(heightClasses).css('height', '100%');
  }*/
  

  /* if ( $('body').height() <= $('body').width() && $('body').height() < 590 && $('body').width() <= 1024 ) {
    $('.on-top').addClass('font-size');
  }

  else if ( $('body').height() <= $('body').width() && $('body').height() < 800 && $('body').width() >= 1024 ) {
    $('.on-top').addClass('font-size');
  }

  else {
    $('.on-top').removeClass('font-size');
  }
*/
}

// addressing stuff //////////////
  $(document).on('click', 'a.closeit', function() {
    closeIt();
  });
  
  $('a.register, a.popup-close, a.ga16').click(function() {  
    //change the after-hash-sign-params to the value of the clicked link
    $.address.value($(this).attr('href'));

  });

  $.address.change(function(event) { 
    //define an event handler based on the params...
    if (event.value == '/venue') {
      hamburger();
    }

    else if (event.value == '/register') {
      register();
    }

    else if (event.value == '/social') {
      loadSocial();
    }

    else {}
    
  });

// end addressing stuff //////////////

////// this should integrate into the addressing stuff above

  if ( $('body').hasClass('home') ) { 
    // google maps
    //initMap();
    // animate home info in
    $('.on-top').delay(800).animate({'margin-top': '-2em', 'opacity': 1,}, 150);

  } // end body.home 
$( window ).resize(function() {
  iframeSize();
});

function iframeSize () {
    var iframeH = $('iframe').width();
  console.log(iframeH);
  $('iframe').css('height', iframeH*0.55);
}

$("#myModal").on("opened.fndtn.reveal", function(){
  iframeSize();
});


// click handlers ///////////////////
  // hamburger menu
  
  function hamburger() {
    $('.popup, .popup-overlay, .popup-info').show();
    $('.popup, .popup-overlay, .popup-info').animate({
      'width': '100%',
      'height': '100%',
      'opacity': '1',
    }, 500);
  }

  // on register2 click
  function register2() {
      // load in form page / start form page
    $('.about-replace').css('display','none');
    $('.about-replace').load('register2.html #register-replace', function(){
      aboutReplace = $('.about-replace').height();
      //heightFn();
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

    }).fadeIn(); // end load in form page

  } // end on register2 click
  
  function fade() {
    $('#large-on-top .info').fadeOut(0).fadeIn(500);
  }
  function title() {
    var theTitle = $('#title').html();
    $('title').html(theTitle);
  }
  
  function loadSocial () {
    fade();
    closeIt();

    socialHeight = $('#large-bg .map-overlay .loadsocial').height();
    //heightFn();


    $('.map-overlay').show();

    $('#large-on-top .info a.ga16').hide();
    $('#large-on-top .info a.register').removeClass('left').addClass('right');
    $('#large-on-top .info').removeClass('small-8 small-offset-2 large-6 large-offset-3');
    $('#large-on-top .info').addClass('small-5');
    $('#large-on-top .info .info-buttons').css('margin','2em 0 0 0');
    $('#large-on-top .info').css('text-align','right');
  }

  function closeIt() {
    $('#large-bg .loop .video-overlay').css('overflow', 'hidden');
    $('#large-on-top .info a.register, #large-on-top .info a.ga16').show();
    $('#large-on-top .info a.ga16').addClass('right').removeClass('left');
    $('#large-on-top .info a.register').addClass('left').removeClass('right');
    $('#large-on-top .info .info-buttons, .info, .crowd').attr('style','');
    $('#large-on-top .info').removeClass('small-5 small-offset-7');
    $('#large-on-top .info').addClass('small-8 small-offset-2 large-6 large-offset-3');
    $('#large-bg .loop video').animate({'opacity': '1'}, 100);
    $('#large-bg .loop video').css({ 'height': '100%', 'width': 'auto' });

    $('#about').fadeOut();
    aboutReplace = 0;
    aboutHeight = 0;
    //heightFn();
    $('#large-bg .map-overlay').hide();
    $(heightClasses).css('style', '100%');
    $('#large-bg-loop video').css({ 'height': '100%', 'width': 'auto' });
    $('.popup').animate({'width': '0%', 'opacity': '0',}, 500);

  }

  function register() {

    $('#large-bg .map-overlay').hide();
    $('#large-on-top .info a.register').hide();
    $('#large-on-top .info a.ga16').removeClass('right').addClass('left').show();
    $('#large-on-top .info .info-buttons').css('margin','2em 0 0 0');
    $('#large-on-top .info').removeClass('small-8 small-offset-2 large-6 large-offset-3');
    $('#large-on-top .info').addClass('small-5 small-offset-7').css('text-align','left');
    $('#large-bg .loop .crowd').css('display', 'block').animate({ 'opacity': '.8'}, 'slow');
    $('#large-bg .loop .video-overlay').css('background-color', 'rgba(52,212,150,.5');
    $('#large-bg .loop video').animate({'opacity': '0'}, 100);
    $('#large-bg .loop video').css({ 'height': '0', 'width': '0' });
    $('#large-bg .video-overlay').load('register.html #about', function(){
      
      $('#about').animate({'opacity': '1'}, 2000).css('transform','translateY(0px)');
      title();
      aboutReplace = $('.about-replace').height();
      aboutHeight = $('#about').height();
      
      //heightFn();

      $(document).on("click","a.register2",function() {

        register2();
        aboutReplace = $('.about-replace').height();
        //heightFn();

      });
    });
  } // end function register

// end click functions ///////////////////

      var map, infoBubble;
      function initMap() {

        var mapCenter = new google.maps.LatLng(36.156, -86.774);
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: mapCenter,
          zoomControl: false,
          scaleControl: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          styles : [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}],
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        icon = 'assets/imgs/marker-opt.svg';
        var marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(36.156, -86.774),
          draggable: true,
          icon: icon,
        });

        var contentString = '<div class="info-content"><div class="info-content-top"><h1 style="color:black;">VENUE</h1></div><div class="info-content-bottom"><p>Music City Center</p><a id="#hamburger-button" href="signup.html" style="display:block;">Find out more &raquo;</a></div></div>';

        infoBubble = new InfoBubble({
          content: contentString,
          shadowStyle: 1,
          padding: 0,
          backgroundColor: '#38a57b',
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
          maxWidth: 150,
          maxHeight: 100,
        });

        infoBubble.open(map);

        google.maps.event.addListener(marker, 'click', function() {
          if (!infoBubble.isOpen()) {
            infoBubble.open(map, marker);
          }
        
        });
      }
      
      google.maps.event.addDomListener(window, 'load', function() {
        initMap();
      });
      
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
