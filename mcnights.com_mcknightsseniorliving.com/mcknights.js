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
	            console.log('scrolling');
	            var socialScroll = $(window).scrollTop(),
	                navigation = $('#main-navigation'),
                    navigationScrollTop = navigation.offset().top,
	                navigationHeight = navigation.height(),
                    navigationTopFromTop = (navigationScrollTop - socialScroll),
                    navigationBottomFromTop = ((navigationScrollTop + navigationHeight) - socialScroll),
	                navigationSlug = $('.main-navigation-slug'),
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

	    });
	}
)(jQuery);
function writeMobileAd() {
    
    googletag.cmd.push(function () {
        var adTag = '/5745/MCK-mobile-web';

        if (adName) {
            adTag = adTag + '/' + adName;
        }
        googletag.defineSlot(adTag, [[300, 50], [300, 250], [320, 50], [320, 480]], 'mobileAdFooter').addService(googletag.pubads());
        googletag.enableServices();
    });
}