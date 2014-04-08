jQuery(document).ready(function($) {
    // Please note that autoHeight option has some conflicts with options like imageScaleMode, imageAlignCenter and autoScaleSlider
    // it's recommended to disable them when using autoHeight module
    $('#slider1').royalSlider({
              autoScaleSlider       : false
            , keyboardNavEnabled    : false
            , arrowsNavAutoHide     : false
            , arrowsNavHideOnTouch  : false
            , fadeinLoadedSlide     : false
            , controlNavigation     : 'none'
            , imageScaleMode        : 'none'
            , imageAlignCenter      : false
            , loop                  : false
            , loopRewind            : false
            , navigateByClick       : false
            , sliderDrag            : false
            , sliderTouch           : false
			, slidesSpacing         : 0
            ,    deeplinking: {
                    // deep linking options go gere
                    enabled: true,
                    change: true,
                    prefix: 'history-'
                }
        });
    $('#slider2').royalSlider({
        autoScaleSlider       : false
        , keyboardNavEnabled    : false
        , arrowsNavAutoHide     : false
        , arrowsNavHideOnTouch  : false
        , fadeinLoadedSlide     : false
        , controlNavigation     : 'none'
        , imageScaleMode        : 'none'
        , imageAlignCenter      : false
        , loop                  : false
        , loopRewind            : false
        , navigateByClick       : false
        , sliderDrag            : false
        , sliderTouch           : false
		, slidesSpacing         : 0
        ,    deeplinking: {
            // deep linking options go gere
            enabled: true,
            change: true,
            prefix: 'facts-'
        }
    });
    $('#slider3').royalSlider({
        autoScaleSlider       : false
        , keyboardNavEnabled    : false
        , arrowsNavAutoHide     : false
        , arrowsNavHideOnTouch  : false
        , fadeinLoadedSlide     : false
        , controlNavigation     : 'none'
        , imageScaleMode        : 'none'
        , imageAlignCenter      : false
        , loop                  : false
        , loopRewind            : false
        , navigateByClick       : false
        , sliderDrag            : false
        , sliderTouch           : false
		, slidesSpacing         : 0
        ,    deeplinking: {
            // deep linking options go gere
            enabled: true,
            change: true,
            prefix: 'germplasm-'
        }
    });
    $('#slider4').royalSlider({
        autoScaleSlider       : false
        , keyboardNavEnabled    : false
        , arrowsNavAutoHide     : false
        , arrowsNavHideOnTouch  : false
        , fadeinLoadedSlide     : false
        , controlNavigation     : 'none'
        , imageScaleMode        : 'none'
        , imageAlignCenter      : false
        , loop                  : false
        , loopRewind            : false
        , navigateByClick       : false
        , sliderDrag            : false
        , sliderTouch           : false
		, slidesSpacing         : 0
        ,    deeplinking: {
            // deep linking options go gere
            enabled: true,
            change: true,
            prefix: 'breeders-'
        }
    });


    $('#slider5').royalSlider({
        autoScaleSlider       : false
        , keyboardNavEnabled    : false
        , arrowsNavAutoHide     : false
        , arrowsNavHideOnTouch  : false
        , fadeinLoadedSlide     : false
        , controlNavigation     : 'none'
        , imageScaleMode        : 'none'
        , imageAlignCenter      : false
        , loop                  : false
        , loopRewind            : false
        , navigateByClick       : false
        , sliderDrag            : false
        , sliderTouch           : false
		, slidesSpacing         : 0
        ,    deeplinking: {
            // deep linking options go gere
            enabled: true,
            change: true,
            prefix: 'technology-'
        }
    });
    $('#slider6').royalSlider({
        autoScaleSlider       : false
        , keyboardNavEnabled    : false
        , arrowsNavAutoHide     : false
        , arrowsNavHideOnTouch  : false
        , fadeinLoadedSlide     : false
        , controlNavigation     : 'none'
        , imageScaleMode        : 'none'
        , imageAlignCenter      : false
        , loop                  : false
        , loopRewind            : false
        , navigateByClick       : false
        , sliderDrag            : false
        , sliderTouch           : false
		, slidesSpacing         : 0
        ,    deeplinking: {
            // deep linking options go gere
            enabled: true,
            change: true,
            prefix: 'future-'
        }
    });
    var slider1 =  $('#slider1').data('royalSlider');
    var slider2 =  $('#slider2').data('royalSlider');
    var slider3 =  $('#slider3').data('royalSlider');
    var slider4 =  $('#slider4').data('royalSlider');
    var slider5 =  $('#slider5').data('royalSlider');
    var slider6 =  $('#slider6').data('royalSlider');

    $('#slider1 .rsArrowLeft').appendTo('#section1 .ArrowLeft');
    $('#slider1 .rsArrowRight').appendTo('#section1 .ArrowRight');

    $('#slider2 .rsArrowLeft').appendTo('#section2 .ArrowLeft');
    $('#slider2 .rsArrowRight').appendTo('#section2 .ArrowRight');

    $('#slider3 .rsArrowLeft').appendTo('#section3 .ArrowLeft');
    $('#slider3 .rsArrowRight').appendTo('#section3 .ArrowRight');

    $('#slider4 .rsArrowLeft').appendTo('#section4 .ArrowLeft');
    $('#slider4 .rsArrowRight').appendTo('#section4 .ArrowRight');

    $('#slider5 .rsArrowLeft').appendTo('#section5 .ArrowLeft');
    $('#slider5 .rsArrowRight').appendTo('#section5 .ArrowRight');

    $('#slider6 .rsArrowLeft').appendTo('#section6 .ArrowLeft');
    $('#slider6 .rsArrowRight').appendTo('#section6 .ArrowRight');


    $('.accordion-header').each(function() {
        $(this).click(function(e) {
            var sliderHash = $(this).attr("data-slide");
            location.hash = sliderHash + '-1'
            slider1.updateSliderSize(true)
            slider1.goTo(0);
            slider2.updateSliderSize(true)
            slider2.goTo(0);
            slider3.updateSliderSize(true)
            slider3.goTo(0);
            slider4.updateSliderSize(true)
            slider4.goTo(0);
            slider5.updateSliderSize(true)
            slider5.goTo(0);
            slider6.updateSliderSize(true)
            slider6.goTo(0);
        });
    });
});