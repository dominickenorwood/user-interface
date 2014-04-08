$(document).ready( function () {

    // ------------------------------------------------------------
    //      Initialise audio.js player
    // ------------------------------------------------------------

    $.getScript('/Style%20Library/AgAnytime/JS/audiojs/audio.min.js', function() {
        audiojs.events.ready(function() {
            var as = audiojs.createAll();
        });
    });

    //  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //      Misc. Functions / Events    
    //  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Set the scope on the search drop down to Ag Anytime
    $(".ms-sbscopes option[scope='Ag Anytime']").attr('selected', 'selected'); 

    // ------------------------------------------------------------
    //     Zip Code Functions / Events
    // ------------------------------------------------------------

    // Check if we have the team code stored in a cookie
    // If we do, hide the zip code form
    if (!$('.zip-field').hasClass('error')) {
        if (readCookie('Ag Anytime Territory Code') != null && readCookie('Ag Anytime Territory Code').length > 0) {
            $('#zip-capture').hide();
        }
    }

	// Verify zip code is 5 numeric digits
	$(document).on('click', '#zip-capture .submit-button', function () {
        var zip = $('#zip-capture .zip-field').val();
        var zipRegex = /^\d{5}$/;

        if (!zipRegex.test(zip)) {
            $('#zip-capture .zip-field').val("Invalid Zip").addClass("error");
            return false;
        }
    });
	
    // Close zip code form on click
    $(document).on('click', '#zip-capture a.close-zip', function () {
        $('#zip-capture').slideUp();
        return false;
    });

	// ------------------------------------------------------------
	//     Bookmark Functions / Events
	// ------------------------------------------------------------

	// Desktop notification
	// Check cookie
	var visited = readCookie('Ag Anytime Bookmark');

    if(visited != null) {
        $('#bookmark').hide();
    }
    else{
        $('#bookmark').show();
        createCookie('Ag Anytime Bookmark', 'yes'); 
    }
                
    // Sset cookie
    createCookie('Ag Anytime Bookmark', 'yes', 365); 

    // Close bookmark notification on click
    $(document).on('click', '#bookmark a.close-bookmark', function () {
        $('#bookmark').slideUp();
        return false;
    });


    // ------------------------------------------------------------
    //     agTools Functions / Events
    // ------------------------------------------------------------

    $(".youtube").click(function () {
        $(".youtube").fancybox({
            openEffect: 'none',
            closeEffect: 'none',
            helpers: {
                media: {}
            }
        });
    });

    $(document).on('hover', 'div.download-box', function () {
        $(this).children('.download-links').stop(true, true).slideToggle('fast');
        return false;
    });

    var agToolsHref = location.href.split('/');
    agToolsHref.pop();
    agToolsHref = agToolsHref.join('/') + '/';

    $(".exchange-link").click(function () {
        window.location = '/agtools/Pages/agExchange.aspx';
        return false;
    });

    $(".index-link").click(function () {
        window.location = '/agtools/Pages/agIndex.aspx';
        return false;
    });

    $(".seedselect-link").click(function () {
        window.location = '/agtools/Pages/agSeedSelect.aspx';
        return false;
    });


    // ------------------------------------------------------------
    //     Advanced Search Events
    // ------------------------------------------------------------

    // Toggle advanced search container on click
    // and set column height
    $(document).on('click', 'a.advanced-search', function () {
        $('#filter-holder').stop(true, true).slideToggle(600);
        set_height('.col');
        return false;
    });

    // Build our query string and redirect to the advanced search page
    $(document).on('click', '#adv-search', function () {
        var searchString = "";

        if ($(".words-container .c").length > 0) {
            searchString += "&c=";
            $(".words-container .c").each(function () {
                searchString += $(this).text() + ";";
            });
            searchString = searchString.substr(0, searchString.length - 1);
        }

        if ($(".words-container .t").length > 0) {
            searchString += "&t=";
            $(".words-container .t").each(function () {
                searchString += $(this).text() + ";";
            });
            searchString = searchString.substr(0, searchString.length - 1);
        }

        if ($(".words-container .k").length > 0) {
            searchString += "&k=";
            $(".words-container .k").each(function () {
                searchString += $(this).text() + ";";
            });
            searchString = searchString.substr(0, searchString.length - 1);
        }

        if ($(".words-container .z").length > 0) {
            searchString += "&z=";
            $(".words-container .z").each(function () {
                searchString += $(this).text() + ";";
            });
            searchString = searchString.substr(0, searchString.length - 1);
        }

        /*if ($("#by-region").val().length > 0 && $("#keyword").val().toLowerCase() != "zip code") {
        if (!isNaN($("#by-region").val())) {
        searchString += "&z=" + $("#by-region").val();
        }
        }*/

        window.location.href = "/Search/Pages/Advanced-Results.aspx?" + searchString;
        return false;
    });

    // Add words to words-container
    // Each of these words represent a search term
    $(document).on('click', '.col li a', function () {
        if (!$(this).hasClass("recent")) {
            var _text = $(this).text();
            var _type = $(this).attr("class");
            var $word = $('<span class="word-wrap"><a href=#></a><span class="' + _type + ' word">' + _text + '</span></span>');
            var exists = false;
            if ($('.word').length) {
                $('.word').each(function () {
                    if ($(this).text() == _text) {
                        exists = true;
                    }
                });
            }

            if (!exists) {
                $word.appendTo('.words-container');
            }
            exists = false;
            return false;
        }
    });

    $(document).on('click', '.add-input', function () {
        var _text = $(this).prev().val();
        var _type = $(this).attr("id");
        var $word = $('<span class="word-wrap"><a href=#></a><span class="' + _type + ' word">' + _text + '</span></span>');
        var exists = false;
        if ($('.word').length) {
            $('.word').each(function () {
                if ($(this).text() == _text) {
                    exists = true;
                }
            });
        }

        if (!exists) {
            $word.appendTo('.words-container');
        }
        exists = false;
        return false;
    });

    // Remove words from words-container
    $(document).on('click', '.word-wrap a', function () {
        $(this).parent().remove();
        return false;
    });

    // ------------------------------------------------------------
    //     Misc. Functions
    // ------------------------------------------------------------

    $(document).on('focusin', '.field, textarea', function () {
        //if (this.title == '')
        //	this.title = this.value;

        if (this.title == this.value) {
            this.value = '';
        }
    }).on('focusout', '.field, textarea', function () {
        if (this.value == '') {
            this.value = this.title;
        }
    });

    $(document).on('click', '.main-article, .article, .trending li, .box-article, .box .text, box-head, .inner-article, .article-list li, .inner-box, .banner, .small-banner, .result', function () {
        window.location = $(this).find("a").attr("href");
        return false;
    });

    $(document).on('mouseenter', '.main-article, .article, .trending li, .box-article, .box, box-head, .inner-article, .article-list li, .inner-box, .sub-nav li, .result', function () {
        $(this).addClass('hovered');
    }).on('mouseleave', '.main-article, .article, .trending li, .box-article, .box, box-head, .inner-article, .article-list li, .inner-box, .sub-nav li, .result', function () {
        $(this).removeClass('hovered');
    });

    //split menu if more than 11 links
    $(function(){ //on document ready
        var $ul = $('ul.sub_menu');
        $($ul).each(function() {
            var items = $(this).find('li');
            var rows = items.length;
            if(rows >= 11){
                $(this).addClass('two-col');
            };
         });
    });

});

// ------------------------------------------------------------
//     Advanced-Search Functions
// ------------------------------------------------------------

// Get the recent searchs from our cookie
// and display them on the page
function GetRecentSearches() {
    // Grab the cookie
    var existingSearches = readCookie("Ag Anytime Recent Searches");

    // Check if it has a value
    if (existingSearches) {
        existingSearches = unescape(existingSearches);

        // Split the existing searches into an array
        var searches = existingSearches.split("!");

        for (var i = 0; i < (searches.length - 1); i++) {
            $("#recent-searches ol").append("<li><a class='recent' href='" + FormatRecentSearchTermURL(searches[i]) + "'>" + BeautifyRecentSearchTerm(searches[i]) + "</a></li>");
        }

        $("#recent-searches").show();
    }
}

function BeautifyRecentSearchTerm(search) {
    //search~c=Corn;Soybean~t=Corn Rootworm;Earth worm
    var cleanSearchTerm = search;
    cleanSearchTerm = cleanSearchTerm.replace("search", "");
    cleanSearchTerm = cleanSearchTerm.replace("~c=", ", ");
    cleanSearchTerm = cleanSearchTerm.replace("~t=", ", ");
    cleanSearchTerm = cleanSearchTerm.replace("~k=", ", ");
    cleanSearchTerm = cleanSearchTerm.replace("~z=", ", ");

    var intIndexOfMatch = cleanSearchTerm.indexOf(";");
    while (intIndexOfMatch != -1) {
        cleanSearchTerm = cleanSearchTerm.replace(";", ", ")
        intIndexOfMatch = cleanSearchTerm.indexOf(";");
    }

    if (cleanSearchTerm.substring(0, 2) == ", ") {
        cleanSearchTerm = cleanSearchTerm.substring(2);
    }

    return cleanSearchTerm.toLowerCase();
}

function FormatRecentSearchTermURL(search) {
    //search~c=Corn~t=Drought
    var cleanSearchTerm = search;
    cleanSearchTerm = cleanSearchTerm.replace("search", "");
    cleanSearchTerm = cleanSearchTerm.replace("~", "?"); //replace first ~ with ?
    var intIndexOfMatch = cleanSearchTerm.indexOf("~");
    while (intIndexOfMatch != -1) {
        cleanSearchTerm = cleanSearchTerm.replace("~", "&amp;") //replace every other ~ with &
        intIndexOfMatch = cleanSearchTerm.indexOf("~");
    }

    return "/Search/Pages/Advanced-Results.aspx" + cleanSearchTerm;
}

function GetTimelyInformation() {
    var tQuery = "\
            <Query>\
                <Where>\
                    <IsNotNull>\
                        <FieldRef Name='agTimelyTag' />\
                    </IsNotNull>\
                </Where>\
                <OrderBy>\
                    <FieldRef Name='agDisplayOrder' Ascending='True' />\
                </OrderBy>\
            </Query>";

    var tViewFields = "\
            <ViewFields>\
                <FieldRef Name='agTimelyTag' />\
            </ViewFields>";

    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "Ag Anytime Timely Information List",
        CAMLViewFields: tViewFields,
        CAMLQuery: tQuery,
        webURL: "/",
        completefunc: function (xData, Status) {
            // Building two equal length lists and appending to DOM
            var totalItems = $(xData.responseXML).SPFilterNode("z:row").length;
            var halfItems = Math.round(parseFloat(totalItems / 2));
            $(".timely-lists").append("<ul class='left'></ul>");
            $(xData.responseXML).SPFilterNode("z:row").each(function (i) {
                var tag = $(this).attr("ows_agTimelyTag").substring($(this).attr("ows_agTimelyTag").indexOf("#") + 1);
                if (i < (halfItems))
                    $(".timely-lists ul:eq(0)").append("<li><a class='t' href='#'>" + tag + "</a></li>");
                else if (i == halfItems) {
                    $(".timely-lists").append("<ul class='left'></ul>");
                    $(".timely-lists ul:eq(1)").append("<li><a class='t' href='#'>" + tag + "</a></li>");
                }
                else
                    $(".timely-lists ul:eq(1)").append("<li><a class='t' href='#'>" + tag + "</a></li>");
            });
        }
    });
}

// ------------------------------------------------------------
//     Global Helper Functions
// ------------------------------------------------------------

function setTheme(c) {
    switch (c) {
        case "Corn":
            return "yellow-theme";
        case "Soybean":
            return "brown-theme";
        case "Cotton":
            return "grey-theme";
        case "Sorghum":
            return "purple-theme";
        case "Alfalfa":
            return "blue-theme";
        case "Spring Canola":
            return "mustard-theme";
        case "Winter":
            return "orange-theme";
        default:
            return "grey-theme";
    }
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function set_height(_obj) {
    var _max = 0;

    $(_obj).each(function () {
        var elem_h = $(this).outerHeight();
        if (elem_h >= _max) {
            _max = elem_h;
        };
    });

    $(_obj).css('height', _max + 'px');
}

function printCurrentDate() {
    var today = new Date();
    var year = today.getFullYear();
    var day = today.getDate();
    var month = today.getMonth();
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    document.write(months[month] + " " + day + ", " + year);
}

function isValidUSZip(strValue) {
    var regExp = /(^\d{5}$)/;
    return regExp.test(strValue);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function back() {
    window.history.back();
    return false;
}

function union_arrays(x, y) {
    var obj = {};
    for (var i = x.length - 1; i >= 0; --i)
        obj[x[i]] = x[i];
    for (var i = y.length - 1; i >= 0; --i)
        obj[y[i]] = y[i];
    var res = []
    for (var k in obj) {
        if (obj.hasOwnProperty(k))  // <-- optional
            res.push(obj[k]);
    }
    return res;
}	