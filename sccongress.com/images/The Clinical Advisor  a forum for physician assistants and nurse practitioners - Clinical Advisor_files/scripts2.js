var timer;
if (!dc_tile) {
    var dc_tile = 1;
    var axel = Math.random() + "";
    var ord = axel * 1000000000000000000;
}
var sideBarIntPos = -116;
var sideBarTopPos = -38;
var stickyHeader = false;
var isNewsletterLightBox = false;
var ismobile = navigator.userAgent.match(/(iPhone)|(iPad)|(iPod)|(android)|(blackberry)|(webOS)/i);
var isIpad = navigator.userAgent.match(/(iPad)/i);
var isIOS4 = navigator.userAgent.match(/OS [1-4](.*) like Mac OS X/i);
var androidAgent = navigator.userAgent.toLowerCase();
var androidMobile;
if ((androidAgent.search("android") > -1) && (androidAgent.search("mobile") > -1)) {
    androidMobile = true;
}
else if ((androidAgent.search("android") > -1) && (androidAgent.search("mobile") <= -1)) {
    androidMobile = false;
}
var carouselVisible = 2;


$(document).ready(function () {
    var containWidth = $('.container').width();
    var containerMargin = $('.container').css('margin-left');
    if (containerMargin == "0px") {
        var winWidth = containWidth;
    } else {
        var winWidth = $(window).width();
    }

    var leftPos = (winWidth - containWidth) / 2;
    //Gutter Ad Positioning
/*    var gutterAds = $('.adZoneFixedLeftContainer, .adZoneFixedRightContainer');
    if ($('.main-header-top').length > 0) {
        var gutterAdsAnchor = $('.main-header-top').offset().top;
        var gutterAdsAnchorHeight = $('.main-header-top').height();
        gutterAds.css({ "top": (gutterAdsAnchor + gutterAdsAnchorHeight) + "px", "position": "fixed" });
        console.log('MEASUREMENT : ' + (gutterAdsAnchor + gutterAdsAnchorHeight));
    }*/
    if ($('#socialSideBar').length > 0 && $('.adZoneFixedLeftContainer').length > 0) {
        $('.adZoneFixedLeftContainer').addClass('social-left-fix ad-wider');
        $('.adZoneFixedRightContainer').addClass('ad-wider');
    }

    if (ismobile && !isIpad) {

        if (isIOS4 && !isIpad) {

            mobileFooterOrientation();
            window.onorientationchange = function () {
                OnOrientationChange();
            };
        }
    }

    deleteCookie("isActChecked");

    $(document).delegate("#navMobileDropArrow, #navMobileMycmeDropArrow, .navMobileMycmeDropArrow", "click", function () {
        $("#navMobileMore").slideToggle();
        $("#navMobileMoreMyCME, #navMobileMoreMyCPD, .navMobileMycmeDropArrow").toggle();
        $(this).children("a").toggleClass("open");
        //for MIMS
        if ($("#navMobileMoreMyCPD").css('display') == 'block') {
            $(".showRespSrch .nav-search-wrapper").addClass('disBlockImp');
            $("li#navMobileMycmeDropArrow div").addClass('mycmeDropArrowBGpos');
        } else {
            $("li#navMobileMycmeDropArrow div").removeClass('mycmeDropArrowBGpos');
        }
    });

    //change background position for li#navMobileMycmeDropArrow div for MIMS
    $("#loginStatusContainer, .shopShift").on('click hover', function() {
        $("li#navMobileMycmeDropArrow div").removeClass('mycmeDropArrowBGpos');
        $("#navMobileMoreMyCPD").hide();
    });

    $(".lightboxTrigger").live("click", function (event) {
        event.preventDefault();
        var lightboxName = $(this).attr("data-lightbox");
        var header = $(this).attr("data-header");
        var width = $(this).attr("data-width");
        var height = $(this).attr("data-height") ? $(this).attr("data-height") : 0;
        var contentUrl = $(this).attr("data-contentUrl") ? $(this).attr("data-contentUrl") : "";
        var content = $(this).attr("data-content") ? $(this).attr("data-content") : "";
        LigthBox(lightboxName, header, width, height, contentUrl, content);
    });

    //check if tabbed asset exists on page
    if ($(".tabbedAssetNav").length != 0) {
        tabbedAsset();
    }

    $(".googleTextAds .GoogleAd span").css({ 'font-size': '16px' });

    if (!ismobile && winWidth > 1024) {
        $("#socialSideBar").delay(1000).fadeIn(300);

    }
    if ($(window).width() < 360) {
        var noArrsPrev = $('.buttonTextPrev').text().replace(/[^a-z, A-Z \.]+/g, '');
        $('.buttonTextPrev').text(noArrsPrev);
        var noArrsNext = $('.buttonStyleNext').text().replace(/[^ a-z, A-Z\.]+/g, '');
        //$('.buttonStyleNext').text(noArrsNext);
        if ($(".accProvSet img, .commSupSet img, .genField img").width() > "210px") {
            $(this).css({ width: "100%" });
        }
    }
    $(window).scroll(function () {
        var socialScroll = $(window).scrollTop();

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

        //Gutter Ad Positioning
        /*if ($('.main-header-top').length > 0) {
            var gutterAdsAnchor = $('.main-header-top').offset().top;
            var gutterAdsAnchorHeight = $('.main-header-top').height();
            var scrollTop = $(window).scrollTop();
            var gutterAdsFromTop = gutterAdsAnchor - scrollTop;
            if (gutterAdsFromTop <= -70) {
                gutterAds.css({ "top": "15px", "position": "fixed" });
            } else {
                gutterAds.css({ "top": (gutterAdsAnchor + gutterAdsAnchorHeight) + "px", "position": "absolute" });
            }
        }*/
    });

    $(".container").on("click", ".actionMessage", function () {
        var thisEl = $(this);
        var message = $(this).attr("data-message");
        displayMessage(thisEl, message);
    });

    //Social Section Icons
    $(".socialIcons").live({
        mouseenter: function (event) {
            var articleURL = $(this).attr("data-url");
            var articleTitle = $(this).attr("data-title");
            var disqusCount = $(this).children("span.disqusSectionCount").text();
            disqusCount = disqusCount.replace(" Comments", " ");
            var iconsOffset = $(this).position();
            var iconsLeft = iconsOffset.left;
            var iconsTop = iconsOffset.top + 35;
            $("#socialIconsHover li.facebookPlug").append('<div class="fb-like" data-send="false" data-layout="box_count" data-width="55" data-show-faces="true" data-font="arial" href="' + articleURL + '"></div>');
            $("#socialIconsHover li.twitterPlug").append('<a href="https://twitter.com/share" class="twitter-share-button" data-lang="en" data-count="vertical" data-text="' + articleTitle + '" data-url="' + articleURL + '">Tweet</a>');
            $("#socialIconsHover li.linkedPlug").append('<script type="IN/Share" data-url="' + articleURL + '" data-counter="top"></script>');
            if ($("#socialIconsHover li.linkedPlug span").length > 0) {
                $("#socialIconsHover li.linkedPlug .IN-widget").hide();
                $("#socialIconsHover li.linkedPlug .IN-widget:last-child").show();
            }
            //$("#socialIconsHover li.googlePlug").append('<div class="g-plusone" data-size="tall" href="' + articleURL + '"></div>');
            $.ajax({ url: 'http://platform.twitter.com/widgets.js', dataType: 'script', cache: true });
            jQuery.getScript('http://connect.facebook.net/en_US/all.js', function () {
                FB.init({ status: true, cookie: true, xfbml: true });
            });
            jQuery.getScript('https://apis.google.com/js/plusone.js', function () {
                gapi.plusone.render('googlePLusRender', {
                    "href": articleURL,
                    "size": 'tall'
                });
            });
            IN.parse(document);
            $("#socialIconsHover .commentsPlug a").text(disqusCount).attr({ 'href': articleURL + "#disqus_thread" });
            $("#socialIconsHover").appendTo(this);
            $("#socialIconsHover").css({ "top": iconsTop - 10 + "px" }).stop(true, true).fadeIn();

        },
        mouseleave: function () {
            $("#socialIconsHover").hide();
            $("this").empty();
            $("#socialIconsHover li.facebookPlug, #socialIconsHover li.twitterPlug").empty();
        }
    });

    //Main Nav Hover  
    $("nav ul li").on('mouseenter click', function () {
        var thisEl = $(this);

        $(thisEl).children("div").show();

        if ($(this).children("div.dropdown1col").length) {
            var navItemOffset = $(this).position();
            var navItemLeft = navItemOffset.left;
            var setArrw = $(this).width() / 1.2;
            var arrowPos = navItemOffset.left + setArrw;
            $('.cpdArrowUp').css('margin-left', arrowPos + 'px');
            //$(this).children("div.dropdown1col").css({ "left": navItemLeft - 1 });
        }
        //$(this).children("a.topNavItem").addClass("current");
    }).mouseleave(function () {

        $(this).children("div").hide();
        //clearTimeout(timer);
        //$(this).children("a.topNavItem").removeClass("current");
    });

    //ipad dropdown nav
    if (isIpad || ismobile || androidMobile === false) {

        $("#contentColumn, #rightColumn, footer, header").bind("touchend", function (event) {
            $("nav ul li").children("div").hide();
            $("nav ul li a.topNavItem").attr("data-clicked", "false");
        });

        var $navSelect = $("nav ul li a.topNavItem");
        $navSelect.attr("data-clicked", "false");
        $navSelect.on("click", function (event) {
            $navSelect.not(this).attr("data-clicked", "false");
            var clicked = $(this).attr("data-clicked");
            if (clicked == "false") {
                $(this).attr("data-clicked", "true");
                //clickThrough = true;
            } else {
                //clickThrough = false; 
            }
        });

    }
   
    // Print Issue Dropdown
    $("#printMagButton").mouseover(function () {
        $(this).children("#printDropdown").stop(true, true).slideDown(400);
    }).mouseleave(function () {
        $(this).children("#printDropdown").stop(true, true).slideUp(400);
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

    //Directory Accordian
    $("div.directoryAccordian .directoryToggle").click(function () {
        $(this).next("ul.directoryItems").slideToggle(400);
        $(this).toggleClass("open");
    });

    /*mycme expand collapse*/
    $('.expandCollapse').click(function () {
        $(this).parent().next('div').slideToggle("slow");
    });

    /*mycme expand collapse*/
    $('.showhide').click(function () {
        $(this).parent().next('p').slideToggle("slow");
    });

    if (getCookie("ukCookieAgree")) {
        $("#UKCookieWarning").remove();
    } else {
        $("#UKCookieWarning").show();
        $("#cookieUkOptOut").on("click", function () {
            setCookie("ukCookieAgree", "1", "99999");
            $("#UKCookieWarning").slideUp();
        });
    }

}); //end document ready

function OnOrientationChange() {

    switch (window.orientation) {

        //landscape   
        case 0:
            mobileFooterOrientation();
            break;
        case 90:
            mobileFooterOrientation();
            break;
        case -90:
            mobileFooterOrientation();
            break;
        case 180:
            mobileFooterOrientation();
            break;
    }
}

function mobileFooterOrientation() {
   /* var winScrollTop = $(window).scrollTop();
    var winHeight = $(window).height();
    $("#mobileAdFooter").hide();
    if (winScrollTop == 0) {

        $("#mobileAdFooter").css({ 'position': 'absolute', 'top': (winHeight + winScrollTop) - 50 }).fadeIn(300);
    } else {
        $("#mobileAdFooter").css({ 'position': 'absolute', 'top': (winHeight + winScrollTop) + 10 }).fadeIn(300);
    }

    $(window).scroll(function () {
        var winScrollTop = $(window).scrollTop();
        $("#mobileAdFooter").hide();

        if (winScrollTop == 0) {

            $("#mobileAdFooter").css({ 'position': 'absolute', 'top': (winHeight + winScrollTop) - 50 }).fadeIn(300);
        } else {
            $("#mobileAdFooter").css({ 'position': 'absolute', 'top': (winHeight + winScrollTop) + 10 }).fadeIn(300);
        }

    });*/

}

//Light Box
function openLightbox(winHeight, winWidth, docHeight, docScrollTop, lightboxWidth, lightboxHeight, lightboxID, maskOpacity, topPos) {
    positionLightbox(winHeight, winWidth, docHeight, docScrollTop, lightboxWidth, lightboxHeight, lightboxID, maskOpacity, topPos);
    $("#lightboxMask,#lightbox" + lightboxID).fadeIn("400");
}

function closeLightbox(lightboxID) {

    $("#lightboxMask,#lightbox" + lightboxID).fadeOut("400", function () {
        $("#lightboxContent .dynaForm").css({ "display": "none" });
        $("#lightboxContentWrapper" + lightboxID).remove();
    });
}

function positionLightbox(winHeight, winWidth, docHeight, docScrollTop, lightboxWidth, lightboxHeight, lightboxID, maskOpacity, topPos) {

    if (maskOpacity !== undefined && maskOpacity.length !== 0) {
        $("#lightboxMask").css({ "opacity": maskOpacity, "height": docHeight });
    } else {
        $("#lightboxMask").css({ "opacity": "0.8", "height": docHeight });
    }
    var topPosition;

    if (topPos !== undefined && topPos.length != 0) {
        topPosition = topPos + docScrollTop;
    } else {

        topPosition = 125 + docScrollTop;
    }
    var leftPosition = winWidth / 2 - lightboxWidth / 2;
    if (isIpad || androidMobile === false) {
        $("#lightbox" + lightboxID).css({ "width": "97.5%", "left": "10px", "top": "15px" });
    } else {
        $("#lightbox" + lightboxID).css({ "width": lightboxWidth, "left": leftPosition, "top": topPosition });

        $(window).resize(function () {
            var containerWidth = $('.container').width();
            var containerMargin = $('.container').css('margin-left');
            if (containerMargin == "0px") {
                var winWidth = containerWidth;
            } else {
                var winWidth = $(window).width();
            }
            
            winHeight = $(window).height();
            topPosition = (winHeight / 2 - $("#lightbox" + lightboxID).height() / 2) + docScrollTop;
            leftPosition = winWidth / 2 - lightboxWidth / 2;
            $("#lightbox" + lightboxID).css({ "left": leftPosition, "top": topPosition });
        });
    }
}

//NCCPA Connect window pop up
var nccpaConnectPortal;//needed for close function
var nccpaUserClose = false;

function nccpaFirstConnect(connectIntroURL) {
    var ncW = 430, ncH = 590, ncLeft = (screen.width - ncW) / 2, ncTop = (screen.height - ncH) / 2, nccpaUrl = connectIntroURL;
    nccpaConnectPortal = window.open(nccpaUrl,
                "myCME EXPRESS REPORTING",
                "status=0," +
                "location=no," +
                "directories=no,"+
                "menubar=0,"+
                "scrollbar=0," +
                "width=" + ncW +
                ",height=" + ncH +
                ",top=" + ncTop +
                ",left=" + ncLeft +
                ",toolbar=1," +
                "resizable=0");
    return false;
}


//makes a call to Madison Logic (ml314) when email textbox loses focus, if it contains a valid email  
function addMadisonLogicScriptforRegisterEmail() {

    var g = document.createElement('script');
    var s = document.getElementsByTagName('script')[0];
    g.text = "try {_ml.addToList([\'#txtEmail_Reg_field\']);} catch(e) {}";
    s.parentNode.insertBefore(g, s);
}

//this uses Omniture's Link Tracking (tl) function to track a link click.
//the obj parameter expects the id of the link
function addOmniture(obj, eventname) {

    if (OmnitureAccount) {
        var s = s_gi(OmnitureAccount);

        s.linkTrackVars = 'events';
        s.linkTrackEvents = eventname;
        s.events = eventname;
        s.tl(obj, 'o', '');
    }
}

//this uses Omniture's Link Tracking (tl) function to track a button click with an event
//the friendlyname parameter expects text identifying which button was clicked
function addOmnitureEventForButtonClick(friendlyname, eventname) {
    if (OmnitureAccount) {
        var s = s_gi(OmnitureAccount);

        s.linkTrackVars = 'events';
        s.linkTrackEvents = eventname;
        s.events = eventname;
        s.tl(true, 'o', friendlyname);
    }
}

//this uses Omniture's Link Tracking (tl) function to track a button click with an event, along with props and evars
//the friendlyname parameter expects text identifying which button was clicked
function addOmnitureEventForButtonClickWithProps(friendlyname, eventname, props, propvalues) {

    if (OmnitureAccount) {
        var s = s_gi(OmnitureAccount);
        var arPropsAndEvars = props.split(",");
        var arPropAndEvarValues = propvalues.split(",");

        //converts the object to an array
        Array.prototype.slice.call(arPropsAndEvars);
        Array.prototype.slice.call(arPropAndEvarValues);

        s.linkTrackVars = arPropsAndEvars.join(",") + ',events';
        s.linkTrackEvents = eventname;
        s.events = eventname;

        var arlength = (arPropsAndEvars.length < arPropAndEvarValues.length ? arPropsAndEvars.length : arPropAndEvarValues.length);

        for (var i = 0; i < arlength; i++) {
            if (arPropsAndEvars[i] != '' && arPropAndEvarValues[i] != undefined && arPropAndEvarValues[i] != '') {
                s[arPropsAndEvars[i]] = arPropAndEvarValues[i];
            }
        }
        s.tl(true, 'o', friendlyname);
    }
}

//this function can be called within script tags from the CMS with strings of pipe delimited props and values ex: addOmnitureProps(nameoflink, 'prop2|prop4|prop6', 'register|login|true');
//this works for props only, not eVars or events
function addOmnitureProps(obj, props, propvalues) {

    if (OmnitureAccount) {
        var s = s_gi(OmnitureAccount);

        var arProps = props.split("|");
        var arPropvalues = propvalues.split("|");

        //converts the object to an array
        Array.prototype.slice.call(arProps);
        Array.prototype.slice.call(arPropvalues);

        s.linkTrackVars = arProps.join(",");

        var arlength = (arProps.length < arPropvalues.length ? arProps.length : arPropvalues.length);

        for (var i = 0; i < arlength; i++) {
            if (arProps[i] != '' && arPropvalues[i] != undefined && arPropvalues[i] != '') {
                s[arProps[i]] = arPropvalues[i];
            }
        }
        s.tl(obj, 'o', '');
    }
}

function AddJanrainOmnitureEvents() {

    if (OmnitureAccount) {
        var submitOmnitureEvent = function (eventname, provider, linktitle) {
            var s = s_gi(OmnitureAccount);
            s.linkTrackVars = 'prop29,events,eVar29';
            s.linkTrackEvents = eventname;
            s.events = eventname;
            s.prop29 = provider;
            s.eVar29 = provider;
            s.tl(true, 'o', linktitle);
        };
        janrain.events.onProviderLoginStart.addHandler(function (response) {
            submitOmnitureEvent('event29', response.provider, 'onProviderLoginStart');
        });
        janrain.events.onProviderLoginError.addHandler(function (response) {
            submitOmnitureEvent('event30', response.provider, 'onProviderLoginError');
        });
        janrain.events.onProviderLoginSuccess.addHandler(function (response) {
            submitOmnitureEvent('event31', response.provider, 'onProviderLoginSuccess');
        });
        janrain.events.onProviderLoginComplete.addHandler(function (response) {
            submitOmnitureEvent('event32', response.provider, 'onProviderLoginComplete');
        });
        janrain.events.onReturnExperienceFound.addHandler(function (response) {
            submitOmnitureEvent('event34', response.returnProvider, 'onReturnExperienceFound');
        });
        janrain.events.onProviderLoginCancel.addHandler(function (response) {
            submitOmnitureEvent('event37', response.returnProvider, 'onProviderLoginCancel');
        });
    }
}

function google_ad_request_done(google_ads) {
    /*
    * This function is required and is used to display
    * the ads that are returned from the JavaScript
    * request. You should modify the document.write
    * commands so that the HTML they write out fits
    * with your desired ad layout.
    */
    var s = '';
    var i;
    /*
    * Verify that there are actually ads to display.
    */
    if (google_ads.length == 0)
        return;
    /*
    * If an image or Flash ad is returned, display that ad.
    * If a rich media ad is returned, display that as "as is."
    * Otherwise, build a string containing all of the ads and
    * then use a document.write() command to print that string.
    */
    if (google_ads[0].type == "image") {
        s += '<a href="' + google_ads[0].url +
'" target="_top" title="go to ' + google_ads[0].visible_url +
'"><img border="0" src="' + google_ads[0].image_url +
'"width="' + google_ads[0].image_width +
'"height="' + google_ads[0].image_height + '"></a>';
    }
    else if (google_ads[0].type == "flash") {
        s += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"' +
' WIDTH="' + google_ad.image_width +
'" HEIGHT="' + google_ad.image_height + '">' +
'<PARAM NAME="movie" VALUE="' + google_ad.image_url + '">' +
'<PARAM NAME="quality" VALUE="high">' +
'<PARAM NAME="AllowScriptAccess" VALUE="never">' +
'<EMBED src="' + google_ad.image_url +
'" WIDTH="' + google_ad.image_width +
'" HEIGHT="' + google_ad.image_height +
'" TYPE="application/x-shockwave-flash"' +
' AllowScriptAccess="never" ' +
' PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>';
    }
    else if (google_ads[0].type == "html") {
        s += google_ads[0].snippet;
    }
    else if (google_ads[0].type == "text") {
        s += '<div class="googleTextAds"><div class="googleTextAdsByGoogle"><a href="' + google_info.feedback_url + '">Ads by Google</a></div>';
        if (google_ads.length == 1) {
            /*
            * Partners should adjust text sizes
            * so ads occupy the majority of ad space.
            */
            s += '<div class="GoogleAd"><a href="' + google_ads[0].url + '" ' +
'onmouseout="window.status=\'\'" ' +
'onmouseover="window.status=\'go to ' +
google_ads[0].visible_url + '\';return true;" ' +
'style="text-decoration:none">' +
'<span style="text-decoration:underline;font-size:20pt">' +
'<b>' + google_ads[0].line1 + '</b><br></span>' +
'<span style="color:#000000;font-size:16pt">' +
google_ads[0].line2 + ' ' +
google_ads[0].line3 + '<br></span>' +
'<span style="color:#008000;font-size:14pt">' +
google_ads[0].visible_url + '</span></a></div>';
        }
        else if (google_ads.length > 1) {
            /*
            * For text ads, append each ad to the string.
            */
            for (i = 0; i < google_ads.length; ++i) {
                s += '<div class="GoogleAd"><a href="' + google_ads[i].url + '" ' +
	'onmouseout="window.status=\'\'" ' +
	'onmouseover="window.status=\'go to ' +
	google_ads[i].visible_url + '\';return true;" ' +
	'style="text-decoration:none">' +
	'<span class="GoogleAdLink">' +
	google_ads[i].line1 + '</span></a><br>' +
	'<span class="GoogleAdText">' + google_ads[i].line2 + ' ' +
	google_ads[i].line3 + '<br></span>' +
	'<span class="GoogleAdURL">' +
	'<a href="' + google_ads[i].url + '" ' +
	'onmouseout="window.status=\'\'" ' +
	'onmouseover="window.status=\'go to ' +
	google_ads[i].visible_url + '\';return true;" ' +
	'style="text-decoration:none">' +
	google_ads[i].visible_url + '</a></span></div>';
            }
        }
        s += '</div>';
    }
    document.write(s);
    return;
}

function setCookie(cookiename, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cookiename + "=" + escape(value) + ";path=/" +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
function deleteCookie(cookiename) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() - 1);
    document.cookie = cookiename += "=;path=/;expires=" + exdate.toGMTString();
}
function getCookie(visited) {
    var results = document.cookie.match('(^|;) ?' + visited + '=([^;]*)(;|$)');
    if (results) {
        return (unescape(results[2]));

    }
    else {
        return null;
    }
}

function IsValidEmail(email) {
    var filter = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*(\s)*$/;
    return filter.test(email);
}

function AdvDirRedirect(elementName, searchUrl) {
    var q = document.getElementsByName(elementName)[0].value;
    q = q.replace(/^\s+|\s+$/g, '');
    q = q.replace(/\s+/g, ' ');
    q = q.replace(/ /g, '+');
    q = q.replace('/', '|');

    if (q != '') {
        window.location = searchUrl + escape(q) + '/';
    }
}

function AdvDirRedirectWithElement(element, searchUrl) {
    var q = $(element).val();
    q = q.replace(/^\s+|\s+$/g, '');
    q = q.replace(/\s+/g, ' ');
    q = q.replace(/ /g, '+');
    q = q.replace('/', '|');

    if (q != '') {
        window.location = searchUrl + escape(q) + '/';
    }
}

function AdvDirRedirectOnEnterWithElement(e, element, searchUrl) {
    var key;

    if (window.event)
        key = window.event.keyCode;
    else
        key = e.which;

    if (key == 13)
        AdvDirRedirectWithElement(element, searchUrl);
}

function AdvDirRedirectOnEnter(e, elementName, searchUrl) {
    var key;

    if (window.event)
        key = window.event.keyCode;
    else
        key = e.which;

    if (key == 13)
        AdvDirRedirect(elementName, searchUrl);
}

function displayMessage(thisElement, messageText) {

    //thisElement = $("#" + thisElement);
    $("#actionText").html(messageText);
    var messageOffset = thisElement.offset();
    var messageLeft = messageOffset.left;
    var messageTop = messageOffset.top;
    var elHeight = thisElement.height();
    var messageWidth = $("#actionMessage").width();
    messageTop = (messageTop - 30) + "px";
    messageLeft = (messageLeft - (messageWidth - 14)) + "px";
    $("#actionMessage").css({ 'top': messageTop, 'left': messageLeft }).stop(true, true).fadeIn(200).delay(1500).fadeOut(200);
}

function tabbedAsset() {

    var tabbedElement = $(".tabbedAssetNav");
    tabbedElement.each(function (index, element) {
        var numTabs = tabbedElement.eq(index).children("li").length;
        var tabsWidth = 100 / numTabs;
        tabbedElement.eq(index).children("li").css({ 'width': tabsWidth + "%", 'display': 'block' });

    });

}

function getArticleImgWidth() {

    var articleDivWidth = $("div.articleImage-right").width();
    if (articleDivWidth == 0) {
        var articleImageWidth = $("div.articleImage-right img").width();
        $("div.articleImage-right").css({ 'width': articleImageWidth, 'position': '', 'top': '', 'float': '' });
    }

}

//Replace Ads on Slideshow and Monograph
function replaceAds(adCall, adCallPrefix) {
    if ($("div[data-prefix|='" + adCallPrefix + "']") != null) {
        $("div[data-prefix|='" + adCallPrefix + "'] * iframe").length ? $("div[data-prefix|='" + adCallPrefix + "'] * iframe")[0].src = adCall : $("div[data-prefix|='" + adCallPrefix + "']").html(adCall);
    }
}

//Set New Slideshow Ad Properties
function replaceOrd(adCallPrefix, ordNew) {
    var adCallHtml = '';

    if ($("div[data-prefix|='" + adCallPrefix + "']") != null) {

        $("div[data-prefix|='" + adCallPrefix + "'] * iframe").length ? adCallHtml = $("div[data-prefix|='" + adCallPrefix + "'] * iframe")[0].src : adCallHtml = unescapeHtml($("div[data-prefix|='" + adCallPrefix + "']").html()); //get ad call string from DOM
        var ordExp = new RegExp('ord=(.*)\?', 'gi'); //
        adCallHtml = adCallHtml.replace(ordExp, 'ord=' + ordNew + "?");

    }

    return adCallHtml;
}

//Set New Drug Monograph Ad Properties
function replaceAdProperties(adProperties, adCallPrefix, ordNew) {
    var adCallHtml = '';
    if ($("div[data-prefix|='" + adCallPrefix + "']") != null) {
        var ordExp = new RegExp('ord=(.*)\?', 'gi');
        $("div[data-prefix|='" + adCallPrefix + "'] * iframe").length ? adCallHtml = $("div[data-prefix|='" + adCallPrefix + "'] * iframe")[0].src : adCallHtml = unescapeHtml($("div[data-prefix|='" + adCallPrefix + "']").html()); //get ad call string from DOM
        adCallHtml = adCallHtml.replace(ordExp, 'ord=' + ordNew + "?");
        for (var key in adProperties) {
            if (adProperties.hasOwnProperty(key)) {
                var regularExpression = new RegExp(key + '=(.*?);', 'gi');
                adCallHtml = adCallHtml.replace(regularExpression, key + '=' + adProperties[key] + ';');
            }
        }
    }

    return adCallHtml;
}

//Drug Monograph Get Current Ad Properties
function getAdProperties(id, pageTypeId) {
    if (typeof window.googletag != "undefined") {
        window.RefreshGptAdCalls(id, pageTypeId);
    }
    else {
        $("div[data-refresh|='true']").each(function (index) {
            var adClass = $(this).attr("data-class");
            var adPrefix = $(this).attr("data-prefix");
            GetAdCall(adPrefix, adClass, id, pageTypeId);
        });
    }

}

//Escape Bad Characters in Ad String
function unescapeHtml(str) {
    return String(str)
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, '\'')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
}

//Clean Drug Monograph Ad Properties

function cleanAdProperty(propertyValue) {
    return propertyValue.replace(/ /g, "_").toLowerCase();
}

function ExpandAsset(assetFormatName, el) {

    $("div[name='" + assetFormatName + "']").each(function () {
        if ($(this).attr("expand")) {
            if ($(this).attr("expand") == "down") {
                $(this).slideDown(300);
                $(this).attr({ expand: "none" });
                $(el).text("Show Less");
            }
            else {
                $(this).slideUp(300);
                $(this).attr({ expand: "down" });
                $(el).text("Show More");
            }
        }
    });
}

function ShowHideAsset(assetFormatContentName) {
    if ($("#" + assetFormatContentName + "").is(":visible")) {
        $("#" + assetFormatContentName + "").hide();
    }
    else {
        $("#" + assetFormatContentName + "").show();
    }
}

function LoadLightBox(name, header, content) {
    var lightBoxHtml =  '<div id="lightboxContentWrapper' + name + '">' +
                            '<div id="lightbox' + name + '"  class="dynamicLightboxMVC" style="display:none;/*width:750px !important;#1#*/">' +
                                '<div id="lightboxHeader">' +
                                    '<h3 id="lightboxHeaderText">' +
                                        header +
                                    '</h3>' +
                                    '<span id="lightboxClose"></span>' +
                                '</div>' +
                                '<div id="lightboxContent">' +
                                    content +
                                '</div>' +
                            '</div>' +
                        '</div>';

    //append lightbox to body if it doesn't exist
    if (!$("#lightboxContentWrapper" + name).length) {
        $('body').append(lightBoxHtml);
    }

}

function marketPlaceQuickView() {
    var wWidth = $(window).width();
    var hHeigth = $(window).height();
    $('.marketPlacePopBg').css('width', wWidth, 'height', hHeigth);
    var openSeseme = '<div class="marketPlacePopBg"></div>';
}

//load, get lighbox content,  open lightbox  and set close event
function LigthBox(name, header, width, height, contentUrl, content, maskOpacity, topPos) {
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    var docHeight = $(document).height();
    var docScrollTop = $(document).scrollTop();
    var lightboxWidth = width;
    var lightboxHeight = height;

    if (content.length > 0) {
        if (name === 'NewsLetterSignup') {
            isNewsletterLightBox = true;
            LoadLightBox(name, header, content);
            openLightbox(winHeight, winWidth, docHeight, docScrollTop, lightboxWidth, lightboxHeight, name, maskOpacity, topPos);
            LightBoxCloseEvent(name);

        } else {
            LoadLightBox(name, header);
        }
    }else {
        //get lightbox content from Url
        $.ajax({
            url: contentUrl,
            type: 'get',
            dataType: "html",
            success: function (result) {
                LoadLightBox(name, header);
                $("#lightboxContentWrapper" + name + " #lightboxContent").html(result);
            },
            complete: function () {
                openLightbox(winHeight, winWidth, docHeight, docScrollTop, lightboxWidth, lightboxHeight, name, maskOpacity, topPos);
                LightBoxCloseEvent(name);
            }
        });
    }
}

function LightBoxCloseEvent(lightboxName) {
    $("#lightboxClose").click(function (event) {
        event.preventDefault();
        closeLightbox(lightboxName);
    });

    if (isNewsletterLightBox) {
        $("#lightboxMask").click(function(event) {
            event.preventDefault();
            closeLightbox(lightboxName);
        });
    }

    if (typeof exitSurvey == 'undefined' || !exitSurvey) {
        $("#lightboxMask").click(function (event) {
            event.preventDefault();
            closeLightbox(lightboxName);
        });
    }
}

function ChangeDateTimeFormat(date) {
    var d = new Date(date);
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[d.getMonth()].toUpperCase() + ' ' + d.getDate() + ', ' + d.getFullYear();
}
