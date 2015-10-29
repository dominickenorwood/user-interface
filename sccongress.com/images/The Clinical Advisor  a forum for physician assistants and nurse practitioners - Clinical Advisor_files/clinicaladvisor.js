'use strict';
(
	function ($) {
	    $(document).ready(function () {
	        var header = $('#main-header'),
			    headerTop = $('.main-header-top'),
			    headerBottom = $('.main-header-bottom'),
                headerSlug = $('.main-header-slug'),
			    seconds = 5,
			    timer = false,
			    interval,
			    waitTimeIsOver = false;

	        $(window).scroll(function () {
	            var socialScroll = $(window).scrollTop();

	            if (header.length > 0) {
	                var headerScrollTop = header.offset().top,
                        headerTopHeight = (headerTop.height() + 1),
                        headerBottomHeight = (headerBottom.height() + 30);

	                if (socialScroll > 0 && !waitTimeIsOver) {
	                    header.addClass('sticky');
	                    headerSlug.css({ 'height': (headerTopHeight + headerBottomHeight) + 'px' });
	                };

	                if (socialScroll > 0 && waitTimeIsOver) {
	                    if (header.hasClass('sticky')) {
	                        headerBottom.addClass('move');
	                    }
	                    if (headerBottom.hasClass('move')) {
	                        headerSlug.css({ 'height': (headerTopHeight + headerBottomHeight) + 'px' });
	                    } else {
	                        headerSlug.css({ 'height': headerTopHeight + 'px' });
	                    }
	                    header.addClass('sticky-header-top');

	                };
	                if (socialScroll === 0) {
	                    header.removeClass('sticky sticky-header-top');
	                    headerBottom.removeClass('move');
	                    headerSlug.css({ 'height': '0' });
	                };
	            };
	        });

	        function beginInterval() {
	            interval = setInterval(function () {
	                seconds--;
	                if (seconds === 0) {
	                    var mainHeaderHasClass = header.hasClass('sticky');
	                    waitTimeIsOver = true;
	                    if (header.hasClass('sticky')) {
	                        headerBottom.addClass('move');
	                    }

	                    clearInterval(interval);
	                }
	            }, 1000);
	        };

	        googletag.cmd.push(function () {
	            googletag.pubads().addEventListener('slotRenderEnded', function (event) {
	                if (event.slot === slots['ADCALL_101']) {
	                    beginInterval();
	                }
	            });
	        });

	    });
	}
)(jQuery);

sideBarIntPos = -125;
carouselVisible = 1;
function writeMobileAd() {
    
    googletag.cmd.push(function () {
        var adTag = '/5745/CA-mobile-web';

        if (adName) {
            adTag = adTag + '/' + adName;
        }
        googletag.defineSlot(adTag, [[300, 50], [300, 250], [320, 50], [320, 350]], 'mobileAdFooter').addService(googletag.pubads());
        googletag.enableServices();
    });
}