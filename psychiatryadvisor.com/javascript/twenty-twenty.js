'use strict';
googletag.cmd.push(function () {
    googletag.pubads().addEventListener('slotRenderEnded', function (event) {
        if (event.slot === slots['ADCALL_101']) {
            (
	            function ($) {
	                $(document).ready(function () {
	                    var header = $('#main-header'),
			                headerTop = $('.main-header-top'),
			                headerBottom = $('.main-header-bottom'),
                            headerSlug = $('.main-header-slug'),
			                seconds = 15,
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
	                    beginInterval();
	                });
	            }
            )(jQuery);
        }
    });
});