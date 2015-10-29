(function($) {
    $(function() {
    	var mainNav = $('nav#mainNav'),
            mainNavLinks = $("#mainNav a"),
            logo = $(".main-logo a"),
            section = $("#contentColumn > section"),
            hamburger = $(".hamburger-menu-button .button"),
            mobileAndTabletView = false,
            inMobileCheck = false,
            speaker = $('.speaker'),
            speakerCenter = 1000,
            speakerMiddle = 680,
            speakerWidth = 590,
            spearkerHeight = 320,
            multiplier = 1,
            reposition = 0,
            mobileView = false;

    	$('a').on('click', function(e){
    		e.preventDefault();
    	});

    	mainNavLinks.on('click', function(e){
    		var anchor = $(this).attr('title');
    		if(anchor) scrollThatBody(anchor);
    	});

    	logo.on('click', function(e){
    		var anchor = $(this).attr('title');
    		if(anchor) scrollThatBody(anchor);
    		mainNavLinks.removeClass("current");
    	});

    	hamburger.on('click', function(e){
    		mainNav.slideToggle();
    	});

    	speaker.on('click', function(e){
    		e.stopPropagation();
    		var position = $(this).position();
    		var center = (((speakerCenter - speakerWidth) / 2) - position.left);
    		var middle = (((speakerMiddle - spearkerHeight ) / 2) - position.top) * multiplier - reposition;
    		var active = $(this).hasClass('view-details');
    		if(!active){
				speaker.css({"left" : 0, "top" : 0});
	    		speaker.removeClass('view-details');
	    		speaker.addClass('inactive');
	    		$(this).addClass('view-details');
	    		$(this).removeClass('inactive');
	    		$(this).css({"left" : center + "px", "top" : middle + "px"});
    		}	
    	});

    	$('html').click(function() {
    		speaker.css({"left" : 0, "top" : 0});
    		speaker.removeClass('view-details');
    		speaker.removeClass('inactive');
		});

    	function scrollThatBody(anchor){
    		var scrollTop = $(window).scrollTop();
    		var anchorScrollTop = $('section#' + anchor).offset().top;
    		var distanceFromTop = (anchorScrollTop - scrollTop);
    		var slugHeight = $('.header-slug').height();
    		$('html,body').animate({scrollTop: '+=' + (distanceFromTop - slugHeight) + 'px'},700)
    	}

    	$( window ).scroll(function() {
    		var scrollTop = $(window).scrollTop();
    		var slugHeight = $('.header-slug').height();
    		section.each(function(){
    			var sectionScrollTop = $(this).offset().top;
    			var sectionHeight = $(this).height();
    			var sectionTopFromTop = (sectionScrollTop - scrollTop);
    			var sectionBottomFromTop = ((sectionScrollTop + sectionHeight) - scrollTop);
    			var sectionId = $(this).attr("id");
    			if(sectionTopFromTop <= 70 && sectionBottomFromTop >= 0){
					setStateOfNavigationLinks(sectionId);
    			}   			
    		});
    		if(mobileAndTabletView) mainNav.slideUp();
		});

		function setStateOfNavigationLinks(id){
			mainNavLinks.removeClass("current");
			$("#mainNav a[title=" + id + "]").addClass("current");
		};

		$(window).resize(function(){
			checkScreenSize();
		});

		function checkScreenSize(){
			if($(".hamburger-menu-button").css("display") == "none"){
				mobileAndTabletView = false;
				inMobileCheck = true;
				mainNav.css({"display" : "block"});
				speakerCenter = 1000;
				multiplier = 1;
				reposition = 0
			}else{
				mobileAndTabletView = true;
				if($('.agenda .left').css("font-size") == "28px"){
					speakerCenter = 530;
					mobileView = true;
				}else{
					speakerCenter = 480;
				}
				multiplier = 0;
				reposition = 80;

				if(inMobileCheck){
					inMobileCheck = false;
					mainNav.css({"display" : "none"});
				}
			}
		};

		checkScreenSize();


        var time = '2016/05/01';
        var expiration = '<h3>This offer has expired!</h3>';
        $('#clock').countdown(time)
            .on('update.countdown', function (event) {
                var format = '<li><span>weeks</span><span class="count">%-w</span></li>' +
                             '<li><span>days</span><span class="count">%-d</span></li>' +
                             '<li><span>hours</span><span class="count">%-H</span></li>' +
                             '<li><span>mins</span><span class="count">%-M</span></li>' +
                             '<li><span>secs</span><span class="count last">%-S</span></li>';
                $(this).html(event.strftime('<ul>' + format + '</ul>'));
            })
            .on('finish.countdown', function (event) {
                $(this).html(expiration)
                    .parent().addClass('disabled');
            });
    });
})(jQuery);
