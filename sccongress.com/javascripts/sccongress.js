'use strict';
(function($) {
    $(function() {
        $(document).ready(function(){
            var backToTop = $('.back-to-top'),
                emailLink = $('.utility-email a'),
                pageTitle = $('#contentColumn header h1').text(),
                twitterAccount = "SCCongressNewYork";

            backToTop.on('click', function(event){
                event.preventDefault();
                $("html, body").animate({ scrollTop: 0 }, "slow");
            });

            emailLink.attr('href', "mailto:?subject=" + pageTitle + "&body=" + window.location.href)

            shareWindow($(".share-tools > li > a"))

            function getShareUrl(share){
                var facebookURL = "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href,
                    twitterURL = "https://twitter.com/share?url=" + window.location.href + "&text=" + pageTitle + "&via=" + twitterAccount,
                    linkedinURL = "http://www.linkedin.com/shareArticle?mini=true&url=" + window.location.href + "&title=" + pageTitle,
                    googleplusURL = "https://plus.google.com/share?url=" + window.location.href,
                    href;
                switch(share){
                    case "facebook" :
                        href = facebookURL;
                        break;
                    case "twitter" :
                        href = twitterURL;
                        break;
                    case "linkedin" :
                        href = linkedinURL;
                        break;
                    case "googleplus" :
                        href = googleplusURL;
                        break;
                    default :
                        console.log("Something went wrong and could not get social share URL")
                }
                return href;
            }

            function shareWindow(e) {
                e.each(function() {
                    $(this).on("click", function(event) {
                        event.preventDefault();
                        var share = $(this).attr('class');
                        return window.open(getShareUrl(share), "Share", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600");
                    })
                })
            }

        });

    });
})(jQuery);
