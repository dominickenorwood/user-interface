'use strict';
(
	function ($) {
	    $(document).ready(function () {

	        var backToTop = $('.back-to-top');
	        var winWidth = $(window).width();
	        var containWidth = $(".container").width();
	        var leftPos = (winWidth - containWidth) / 2;
	        var sideBarIntPos = -134;
	        var sideBarTopPos = -38;
	        var stickyHeader = false;
	        var mainNavLi = $('#mainNav > ul > li');
	        var mobileNav = $('#mobile-navigation');
	        var hamburger = $('.hamburger-menu-button');

	        backToTop.on('click', function (event) {
	            event.preventDefault();
	            $("html, body").animate({ scrollTop: 0 }, "slow");
	        });

	        mainNavLi.each(function (index) {
	            var hasDropDown = $(this).children('div').length;
	            if (hasDropDown === 0) $(this).addClass('no-drop-down');
	        });

	        hamburger.on('click', function (event) {
	            event.preventDefault();
	            mobileNav.slideToggle('slow');
	        });

	        $(window).scroll(function () {

	            var socialScroll = $(window).scrollTop();
	            var navigation = $('#main-header-top');
	            if (navigation.length > 0) {
	                var navigationScrollTop = navigation.offset().top,
	                    navigationHeight = navigation.height(),
                        navigationTopFromTop = (navigationScrollTop - socialScroll),
                        navigationBottomFromTop = ((navigationScrollTop + navigationHeight) - socialScroll),
	                    navigationSlug = $('.main-header-slug'),
                        navigationSlugScrollTop = navigationSlug.offset().top,
	                    naviagationFromItsSlug = navigationScrollTop - navigationSlugScrollTop;

	                if (naviagationFromItsSlug <= 0) {
	                    navigation.removeClass('sticky');
	                    navigationSlug.css({ 'height': 0 });
	                }

	                if (navigationTopFromTop <= 0) {
	                    if (navigationTopFromTop != 0) {
	                        navigation.addClass('sticky');
	                        navigationSlug.css({ 'height': navigationHeight + 'px' });
	                    }
	                }
	            }

	            if (stickyHeader === true && socialScroll >= "200") {
	                $("#socialSideBar").css({ "position": "fixed", "top": "80px", "left": leftPos - 104 + "px" });
	            }
	            else if (stickyHeader === false && socialScroll >= "271") {
	                $("#socialSideBar").css({ "position": "fixed", "top": "15px", "left": leftPos - 104 + "px" });
	            }

	            //when scrolling 
	            if (stickyHeader === true && socialScroll <= "100") {
	                $("#socialSideBar").css({ "position": "absolute", "top": sideBarTopPos + "px", "left": sideBarIntPos + "px" });
	            }
	            else if (stickyHeader === false && socialScroll <= "271") {
	                $("#socialSideBar").css({ "position": "absolute", "top": sideBarTopPos + "px", "left": sideBarIntPos + "px" });
	            }

	        });
	        //Social Sidebar Positioning
	        $(window).resize(function () {
	            winWidth = $(window).width();
	            leftPos = (winWidth - containWidth) / 2;
	            var socialScroll = $(window).scrollTop();

	            if (socialScroll >= "271") {

	                $("#socialSideBar").css({ "position": "fixed", "left": leftPos - 104 + "px" });

	            }
	            if (socialScroll <= "271") {
	                $("#socialSideBar").css({ "position": "absolute", "top": "-38px", "left": sideBarIntPos + "px" });
	            }
	        });

	        googletag.cmd.push(function () {
	            console.log('REFRESH THESE FUCKING ADS!!!!!!!!!!!!!!!');
	            console.log(slots);
                googletag.pubads().refresh([slots['ADCALL_101']]);
	            //googletag.pubads().disableInitialLoad();
	            // Disable initial load, we will use refresh() to fetch ads.
	            // Calling this function means that display() calls just
	            // register the slot as ready, but do not fetch ads for it.
	            //googletag.pubads().disableInitialLoad();
	            //googletag.display();
	            //googletag.pubads().refresh();
	            googletag.pubads().addEventListener('slotRenderEnded', function (event) {
	                //console.log(slots);
	                /*if (event.slot === slots['ADCALL_301'] || event.slot === slots['ADCALL_401']) {
                        initAdSlot(targetSlide, targetSlideshow);
                        if (event.slot === slots['ADCALL_301']) console.log('301 Rendered');
                        if (event.slot === slots['ADCALL_401']) console.log('401 Rendered');
                    };*/
	            });
	        });
            
	    });
	}
)(jQuery);


/*function writeMobileAd() {
    
    googletag.cmd.push(function () {
        var adTag = '/5745/MCK-mobile-web';

        if (adName) {
            adTag = adTag + '/' + adName;
        }
        googletag.defineSlot(adTag, [[300, 50], [300, 250], [320, 50], [320, 480]], 'mobileAdFooter').addService(googletag.pubads());
        googletag.enableServices();
    });
}*/
function writeMobileAd() {

    googletag.cmd.push(function () {
        var adTag = '/5745/DMN-mobile-web';

        if (adName) {
            adTag = adTag + '/' + adName;
        } 
        googletag.defineSlot(adTag, [[300, 50], [300, 250], [320, 50], [320, 350]], 'mobileAdFooter').addService(googletag.pubads());
        googletag.enableServices();
    });
}
