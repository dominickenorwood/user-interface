var generalPractitioner = "general practitioner";

$(document).ready(function () {
    var exitSurvey = false;
    var delayTimeout = {};
    var lightboxID = 0;

    var containerWidth = $('.container').width();
    var containerMargin = $('.container').css('margin-left');
    if (containerMargin == "0px") {
        var winWidth = containerWidth;
    } else {
        var winWidth = $(window).width();
    }

    var winHeight = $(window).height();
    var docHeight = $(document).height();
    var docWidth = $(document).width();
    var lightboxHeight = 0;
    var timer;
    var containWidth = $(".container").width();
    var leftPos = (winWidth - containWidth) / 2;
    var formLinkVal = 0;
    var htadjust;
    
    var buildTipHTML = function () {
        var toolTip =
            "<div class='toolTipContainer'>" +
                "<div class='toolTipMid'>" +
                "</div>" +
                "<div class='toolTipBtm'></div>" +
                "</div>";
        return toolTip;
    };
    $("body").prepend(buildTipHTML());
    $("#lightboxLoginForm #divLoginLoading").hide();
    $("#lightboxPasswordForm #divForgotLoading").hide();

    $(".openLightbox").live("click", function (event) {

        event.preventDefault();
        lightboxID = $(this).attr("data-lightbox");
        formLinkVal = $(this).attr("data-form");
        var docScrollTop = $(document).scrollTop();
        var lightboxWidth = $(this).attr("data-width");
        var header = $(this).attr("data-header");
        var contentUrl = $(this).attr("data-contentUrl");

        //get lightbox content
        $.ajax({
            url: contentUrl,
            type: 'get',
            dataType: "html",
            success: function (result) {
                LoadLightBox(lightboxID, header);
                $("#lightboxContentWrapper" + lightboxID + " #lightboxContent").html(result);
            },
            complete: function () {

                // if lightbox is already opened, then kill the delay pop-up timer
                if (delayTimeout != null && delayTimeout != undefined) {
                    clearTimeout(delayTimeout);
                }

                //open lightbox
                DynamicLoadForms(formLinkVal, winHeight, winWidth, docHeight, docScrollTop, lightboxWidth, lightboxHeight, lightboxID);

                //close lightbox event
                $("#lightboxClose").click(function () {
                    checkAdvisorEmail();
                });

                if (!exitSurvey) {
                    $("#lightboxMask").click(function () {
                        checkAdvisorEmail();
                    });
                }
                function checkAdvisorEmail() {
                    event.preventDefault();
                    closeLightbox(lightboxID);
                    if (!getCookie(customModalRegistrationSwitch)) {
                        setCookie(customModalRegistrationSwitch, 1, 8);
                    }
                }

                //form switch event
                $("#formSwitch, #lightboxLoginForm .forgotPassLink").click(function () {

                    formLinkVal = $(this).attr("data-form");
                    showForm(formLinkVal);

                    //Turned off auto scrolling, scrolling is taking the lightbox off screen

                    var loginhtadjust = $("#lightboxLogin").height() - 200; //adjust for positioning when form is switched.
                    var reghtadjust = $("#lightboxLogin").height() - 750;
                    //if < IE 8 open alert
                    if ($.browser.msie && parseInt($.browser.version, 10) < 9) {
                        if (formLinkVal == "register") {
                            htadjust = $("#lightboxLogin").height() - 600;
                            paddingHght(htadjust);
                        } else if (formLinkVal == "login") {
                            htadjust = $("#lightboxLogin").height() - 500;
                            paddingHght(htadjust);
                        }
                    } else {
                        event.preventDefault();
                        if (formLinkVal == "register") {
                            htadjust = reghtadjust;
                            paddingHght(htadjust);
                        } else if (formLinkVal == "login") {
                            htadjust = loginhtadjust;
                            paddingHght(htadjust);
                        }
                    }


                    function paddingHght(htadjust) {
                        $('html, body').animate({
                            scrollTop: $("#lightboxLogin").offset().top - htadjust // without this window scrolls to top outside of form view
                        }, 500);
                    }

                });
            }
        });

    });

    $(".toolTip").live({
        mouseenter: function (event) {
            $(".toolTipContainer").hide();
            var toolTipText = $(this).attr("data-tooltip");
            var tipOffset = $(this).offset();
            var tipLeft = tipOffset.left;
            var tipTop = tipOffset.top;
            var elHeight = $(this).height();
            $(".toolTipContainer .toolTipMid").html(toolTipText);
            var tipHeight = $(".toolTipContainer").height();
            tipTop = (tipTop - tipHeight - 10) + "px";
            timer = setTimeout(function () {
                $(".toolTipContainer").css({ 'top': tipTop, 'left': tipLeft }).stop(true, true).fadeIn(300);

            }, 200);
        },
        mouseleave: function () {
            $(".toolTipContainer").hide();
            clearTimeout(timer);
        }
    });
    
});

function SetGmcNumberInputEvent() {
    if ($("#txtGmcnumber_Reg_field").length > 0) {
        $("#txtGmcnumber_Reg_field").attr('maxlength', '7');
        $("#txtGmcnumber_Reg_field").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.keyCode == 110) || ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))) {
                e.preventDefault();
            }
        });
    }
}

function showGatedForm(formLinkVal, janrainInfo) {

    switch (formLinkVal) {
        case "register":
            $("#gatedLoginWrapper, #gatedPasswordWrapper, #gatedAccountLinkWrapper, #gatedAlmostDoneWrapper, #gatedConfirmWrapper, #gatedPasswordResetWrapper").hide();
            $("#gatedRegisterWrapper").fadeIn();
            GetGatedDynamicRegisterForm();

            break;

        case "password":
            $("#gatedConfirmSendPassword").empty();
            $("#gatedPasswordFormContent").show();
            $("#gatedLoginWrapper, #gatedRegisterWrapper, #gatedAccountLinkWrapper, #gatedAlmostDoneWrapper, #gatedConfirmWrapper, #gatedPasswordResetWrapper").hide();
            $("#gatedPasswordWrapper").fadeIn();
            break;

        case "accountLink":
            $('#gatedAccountLinkWrapper [id$="divIntroText"]').hide();
            $("#gatedAccountLinkWrapper .accountLinkEmail").text(janrainInfo.Email);
            $("#gatedAccountLinkWrapper .accountLinkProvider").text(janrainInfo.SocialSignInProvider.Value);
            $("#gatedAccountLinkWrapper .accountLinkPublication").text(janrainInfo.PublicationName);
            $("#gatedLoginWrapper, #gatedRegisterWrapper, #gatedPasswordWrapper, #gatedAlmostDoneWrapper, #gatedConfirmWrapper, #gatedPasswordResetWrapper").hide();
            $("#gatedAccountLinkWrapper").fadeIn();

            break;
        case "almostDone":
            $('#gatedAlmostDoneWrapper #lightboxContent [id$="divIntroText"]').hide();
            $("#gatedAlmostDoneWrapper #lightboxHeader h3").text(regHeaderText);
            $("#gatedAlmostDoneWrapper #lightboxRightCol .signupPrompt, #lightboxRightCol #formSwitch").hide();
            $("#gatedLoginWrapper, #gatedRegisterWrapper, #gatedPasswordWrapper, #gatedAccountLinkWrapper, #gatedConfirmWrapper, #gatedPasswordResetWrapper").hide();
            $("#gatedAlmostDoneWrapper").fadeIn();
            break;

        case "confirm":
            $("#gatedLoginWrapper, #gatedPasswordWrapper, #gatedAccountLinkWrapper, #gatedAlmostDoneWrapper, #gatedRegisterWrapper, #gatedLoginWrapper, #gatedPasswordResetWrapper").hide();
            $("#gatedConfirmWrapper").fadeIn();
            break;

        case "resetPassword":
            $("#gatedRegisterWrapper, #gatedPasswordWrapper, #gatedAccountLinkWrapper, #gatedAlmostDoneWrapper, #gatedConfirmWrapper, #gatedLoginWrapper").hide();
            $("#gatedPasswordResetWrapper").fadeIn();
            break;

        default:
            $("#gatedRegisterWrapper, #gatedPasswordWrapper, #gatedAccountLinkWrapper, #gatedAlmostDoneWrapper, #gatedConfirmWrapper, #gatedPasswordResetWrapper").hide();
            $("#gatedLoginWrapper").fadeIn();

    }

}

function GetGatedDynamicRegisterForm() {
    var ajaxUrl = dynamicUrl + "?loadreg=true&pagetypeid=130";

    //alert("GetGatedDynamicRegisterForm: " + ajaxUrl);

    $.ajax({
        global: false,
        type: "GET",
        url: ajaxUrl,
        success: function (res) {
            $("#gatedDynamicRegistrationContainer").html(res.JsonResult);

            $('#gatedDynamicRegistrationContainer #ddlCountry_Reg_field').each(function () {
                //for default country selection other than US
                if (userCountryCode == "UK") {
                    $(this).val("UK");
                    selectedCountryCode = "UK";
                    CountryOnChangeEventHandler("US", "UK", false);
                    ProfessionOnChangeEventHandler();
                    ToggleReceiveEmail("UK");
                } else {
                    $(this).val("US");
                }

                if ($(this).hasClass("fieldError")) {
                    $(this).removeClass("fieldError");
                }
            });

            CountryOnChangeEvent();
            ProfessionOnChangeEvent();
            submitOnEnter("register", true);
        }
    });
}

function showForm(formLinkVal, janrainInfo) {

    $("#lightboxContent .dynaForm").css({ "display": "none" });
    $('#lightboxContent .dynaForm[data-form="' + formLinkVal + '"]').fadeIn(600);
    $('#lightboxContent .errorMessage').hide();
    $('#lightboxContent #divRegistrationSuccessMsg').hide();
    $('#lightboxRightCol').show();
    submitOnEnter(formLinkVal, false);
    switch (formLinkVal) {

        case "register":
            // clear register form
            ClearRegistrationForm();
            if (regIntroText != null && regIntroText != undefined && regIntroText != "") {

                $('#lightboxContent [id$="divIntroText"]').html(regIntroText);
                $('#lightboxContent [id$="divIntroText"], #divRegistrationEmail, #divRegistrationPassword').show();
            }
            else {
                $('#lightboxContent [id$="divIntroText"]').hide();
            }
            $("#lightboxRightCol #formSwitch").html("Sign in now &raquo;").attr("data-form", "login");
            $("#lightboxHeader h3").text(regHeaderText);
            $("#lightboxRightCol p.signupPrompt").text("Already have a " + pubName + " account?");
            $("#registerJanRain .janrainButton:nth-child(3n)").addClass("janrainLast");
            $("#lightboxRightCol p.signupPrompt, #lightboxRightCol #formSwitch").show();

            //log event2 for registration pop-up
            addOmniture(hrefDynamicRegister, 'event2');

            //makes a call to Madison Logic (ml314) when email textbox loses focus if it's enabled in web config and field contains a valid email  
            enableMadisonLogic = enableMadisonLogic == 'True' ? true : false;
            if (enableMadisonLogic) {
                addMadisonLogicScriptforRegisterEmail();
            }
            break;

        case "password":
            // clear password form
            ClearForgotPWDForm();
            $('#lightboxContent [id$="divIntroText"]').html(forgotPwdIntroText);
            $('#lightboxContent [id$="divIntroText"]').show();
            $("#lightboxRightCol #formSwitch").html("Sign in now &raquo;").attr("data-form", "login");
            $("#lightboxHeader h3").text("Forgot your password?");
            $("#lightboxRightCol p.signupPrompt").text("Already have a " + pubName + " account?");
            break;
        case "accountLink":
            $('#lightboxContent [id$="divIntroText"]').hide();
            $(".accountLinkEmail").text(janrainInfo.Email);
            $(".accountLinkProvider").text(janrainInfo.SocialSignInProvider.Value);
            $(".accountLinkPublication").text(janrainInfo.PublicationName);
            //$(".accountLinkBtn[data-providerid|=" + janrainInfo.SocialSignInProvider.Key + "]").show();
            $("#lightboxRightCol .signupPrompt, #lightboxRightCol #formSwitch").hide();
            //$("#formSwitch").html("&laquo; CANCEL AND GO BACK").attr("data-form", "login");
            //console.log(janrainInfo);

            break;
        case "almostDone":
            $('#lightboxContent [id$="divIntroText"]').hide();
            $("#lightboxHeader h3").text(regHeaderText);
            $("#lightboxRightCol .signupPrompt, #lightboxRightCol #formSwitch").hide();
            //console.log(janrainInfo);
            break;

        case "ResetPassword":
            $('#lightboxContent [id$="divIntroText"]').hide();
            $("#lightboxHeader h3").text('Reset Password');
            $("#lightboxRightCol .signupPrompt, #lightboxRightCol #formSwitch").hide();
            //console.log(janrainInfo);
            break;

        default:
            // clear login form
            ClearLoginForm();

            $('#lightboxContent [id$="divIntroText"]').hide();

            $("#lightboxHeader h3").text(loginHeaderText);
            $("#lightboxRightCol #formSwitch").html("Create a " + pubName + " account for free &raquo;").attr("data-form", "register");
            $("#lightboxRightCol p.signupPrompt").text("Don’t have one of these accounts?");
            $("#lightboxRightCol p.signupPrompt, #lightboxRightCol #formSwitch").show();
            $("#loginJanRain .janrainButton:nth-child(3n)").addClass("janrainLast");
            if (isJanrainCookieDetected === "True") {
                $("#loginJanRain").hide();
                $("#janranBackUser").show();
            }
            break;
    }
}

function LoadAlmostDoneFormFields(janrainInfo) {

    var ajaxUrl = dynamicUrl + "?loadreg=true";

    $.ajax({
        global: false,
        type: "GET",
        //dataType: 'json',
        url: ajaxUrl,
        success: function (res) {

            $("#phDynamicAlmostDoneContainer").html(res.JsonResult);
            //$("#divRegistrationEmail, #divRegistrationPassword").hide();
            $("#divRegistrationPassword").hide();

            SetRegistrationFields(janrainInfo);

            $('#almostDoneContainer [id$="_Reg_field"]').each(function () {
                $(this).blur(function () {
                    var fieldId = $(this).attr("Id");
                    var fieldVal = new String();
                    fieldVal = $(this).val();
                    var fieldTitle = $(this).attr("default-watermarktext");

                    if ($(this).hasClass("watermark-textbox") && fieldVal != null && fieldVal != "" && fieldVal != undefined && fieldVal == fieldTitle) {
                        fieldVal = "";
                    }

                    var rfvText = $(this).attr('rfvaltext');
                    if (rfvText != undefined && rfvText != "") {
                        if (fieldId.indexOf("ddlProfession_Reg_field") != -1) {
                            if (fieldVal == "-1") {
                                $(this).addClass("fieldError");
                                return;
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }
                        else {
                            if (fieldId.indexOf("ddlSpecialty_Reg_field") != -1) {
                                var specReq = $('[id$="ddlProfession_Reg_field"] option:selected').attr("sr");
                                if (specReq == "True") {
                                    if (fieldVal == "") {
                                        $(this).addClass("fieldError");
                                        return;
                                    }
                                    else {
                                        if ($(this).hasClass("fieldError")) {
                                            $(this).removeClass("fieldError");
                                        }
                                    }
                                }
                                else {
                                    if ($(this).hasClass("fieldError")) {
                                        $(this).removeClass("fieldError");
                                    }
                                }
                            }
                            else if (fieldId.indexOf("txtYearofGraduation_Reg_field") != -1) {
                                var yrReq = $('[id$="ddlProfession_Reg_field"] option:selected').attr("yr");
                                if (yrReq == "True") {
                                    if (fieldVal == "") {
                                        $(this).addClass("fieldError");
                                        return;
                                    }
                                    else {
                                        if ($(this).hasClass("fieldError")) {
                                            $(this).removeClass("fieldError");
                                        }
                                    }
                                }
                                else {
                                    if ($(this).hasClass("fieldError")) {
                                        $(this).removeClass("fieldError");
                                    }
                                }
                            }
                            else {
                                if (fieldVal == "") {
                                    $(this).addClass("fieldError");
                                    return;
                                }
                                else {
                                    if ($(this).hasClass("fieldError")) {
                                        $(this).removeClass("fieldError");
                                    }
                                }
                            }
                        }
                    }

                    var revEx = $(this).attr('regexvalidationexpression');
                    var revText = $(this).attr('regexvaltext');
                    if (revEx != undefined && revEx != "") {
                        var regexExpression = new RegExp(revEx);
                        if (!regexExpression.test(fieldVal)) {
                            $(this).addClass("fieldError");
                            return;
                        }
                        else {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                    }

                    var compareText = $(this).attr('comparevaltext');
                    var compareTo = $(this).attr('compareto');
                    var compareToVal = $('#almostDoneContainer [id$=\"' + compareTo + '\"]').val();
                    if (compareText != undefined && compareText != "") {
                        if (fieldVal != compareToVal) {
                            $(this).addClass("fieldError");
                            return;
                        }
                        else {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                    }

                    var rangeText = $(this).attr('rangevalidation-int');
                    if (rangeText != undefined && rangeText != "") {
                        var rangeVals = rangeText.split("-");
                        var minVal = rangeVals[0];
                        var maxVal = rangeVals[1];

                        if (fieldVal != null && fieldVal != undefined && fieldVal != "") {
                            var valueOfField = parseInt(fieldVal);

                            if (minVal != undefined && minVal != "" && maxVal != undefined && maxVal != "") {
                                minVal = parseInt(minVal);
                                maxVal = parseInt(maxVal);

                                if (valueOfField >= minVal && valueOfField <= maxVal) {
                                    if ($(this).hasClass("fieldError")) {
                                        $(this).removeClass("fieldError");
                                    }
                                }
                                else {
                                    $(this).addClass("fieldError");
                                    return;
                                }
                            }
                        }
                        else {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                    }
                });
            });

            $('#phDynamicAlmostDoneContainer #ddlCountry_Reg_field').each(function () {
                //for default country selection other than US
                if (userCountryCode == "UK") {
                    $(this).val("UK");
                    selectedCountryCode = "UK";
                    CountryOnChangeEventHandler("US", "UK", false);
                    ProfessionOnChangeEventHandler();
                    ToggleReceiveEmail("UK");
                } else {
                    $(this).val("US");
                }

                if ($(this).hasClass("fieldError")) {
                    $(this).removeClass("fieldError");
                }
            });

            CountryOnChangeEvent();
            ProfessionOnChangeEvent();
        }
    });
}

function LoadAccountLinkFormFields(janrainInfo) {

    var ajaxUrl = dynamicUrl + "?loadreg=true";

    $.ajax({
        global: false,
        type: "GET",
        //dataType: 'json',
        url: ajaxUrl,
        success: function (res) {

            $("#accountLinkContainer #phDynamicAccountLinkContainer").html(res.JsonResult);
            $("#accountLinkContainer #newsletterItemDynamicReg").hide();
            $('#accountLinkContainer #tbNewsletters tr td input').prop('checked', false);
            //$.each(janrainInfo.SubscriberNewsletterIds, function(key, value) {
            //    $('#tbNewsletters tr td input[id$=' + value + ']').prop('checked', true);
            //});

            //$("#divRegistrationEmail, #divRegistrationPassword").hide();
            $("#accountLinkContainer #divRegistrationPassword").hide();

            SetRegistrationFields(janrainInfo);

            $('#accountLinkContainer [id$="_Reg_field"]').each(function () {
                $(this).blur(function () {
                    var fieldId = $(this).attr("Id");

                    if (fieldId.indexOf("txtEmail_Reg_field") != -1 || fieldId.indexOf("txtPassword_Reg_field") != -1) {
                        return;
                    }

                    var fieldVal = new String();
                    fieldVal = $(this).val();
                    var fieldTitle = $(this).attr("default-watermarktext");

                    if ($(this).hasClass("watermark-textbox") && fieldVal != null && fieldVal != "" && fieldVal != undefined && fieldVal == fieldTitle) {
                        fieldVal = "";
                    }

                    var rfvText = $(this).attr('rfvaltext');
                    if (rfvText != undefined && rfvText != "") {
                        if (fieldId.indexOf("ddlProfession_Reg_field") != -1) {
                            if (fieldVal == "-1") {
                                $(this).addClass("fieldError");
                                return;
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }
                        else {
                            if (fieldId.indexOf("ddlSpecialty_Reg_field") != -1) {
                                var specReq = $('[id$="ddlProfession_Reg_field"] option:selected').attr("sr");
                                if (specReq == "True") {
                                    if (fieldVal == "") {
                                        $(this).addClass("fieldError");
                                        return;
                                    }
                                    else {
                                        if ($(this).hasClass("fieldError")) {
                                            $(this).removeClass("fieldError");
                                        }
                                    }
                                }
                                else {
                                    if ($(this).hasClass("fieldError")) {
                                        $(this).removeClass("fieldError");
                                    }
                                }
                            }
                            else if (fieldId.indexOf("txtYearofGraduation_Reg_field") != -1) {
                                var yrReq = $('[id$="ddlProfession_Reg_field"] option:selected').attr("yr");
                                if (yrReq == "True") {
                                    if (fieldVal == "") {
                                        $(this).addClass("fieldError");
                                        return;
                                    }
                                    else {
                                        if ($(this).hasClass("fieldError")) {
                                            $(this).removeClass("fieldError");
                                        }
                                    }
                                }
                                else {
                                    if ($(this).hasClass("fieldError")) {
                                        $(this).removeClass("fieldError");
                                    }
                                }
                            }
                            else {
                                if (fieldVal == "") {
                                    $(this).addClass("fieldError");
                                    return;
                                }
                                else {
                                    if ($(this).hasClass("fieldError")) {
                                        $(this).removeClass("fieldError");
                                    }
                                }
                            }
                        }
                    }

                    var revEx = $(this).attr('regexvalidationexpression');
                    var revText = $(this).attr('regexvaltext');
                    if (revEx != undefined && revEx != "") {
                        var regexExpression = new RegExp(revEx);
                        if (!regexExpression.test(fieldVal)) {
                            $(this).addClass("fieldError");
                            return;
                        }
                        else {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                    }

                    var compareText = $(this).attr('comparevaltext');
                    var compareTo = $(this).attr('compareto');
                    var compareToVal = $('#accountLinkContainer [id$=\"' + compareTo + '\"]').val();
                    if (compareText != undefined && compareText != "") {
                        if (fieldVal != compareToVal) {
                            $(this).addClass("fieldError");
                            return;
                        }
                        else {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                    }

                    var rangeText = $(this).attr('rangevalidation-int');
                    if (rangeText != undefined && rangeText != "") {
                        var rangeVals = rangeText.split("-");
                        var minVal = rangeVals[0];
                        var maxVal = rangeVals[1];

                        if (fieldVal != null && fieldVal != undefined && fieldVal != "") {
                            var valueOfField = parseInt(fieldVal);

                            if (minVal != undefined && minVal != "" && maxVal != undefined && maxVal != "") {
                                minVal = parseInt(minVal);
                                maxVal = parseInt(maxVal);

                                if (valueOfField >= minVal && valueOfField <= maxVal) {
                                    if ($(this).hasClass("fieldError")) {
                                        $(this).removeClass("fieldError");
                                    }
                                }
                                else {
                                    $(this).addClass("fieldError");
                                    return;
                                }
                            }
                        }
                        else {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                    }
                });
            });

            $('#phDynamicAccountLinkContainer #ddlCountry_Reg_field').each(function () {
                //for default country selection other than US
                if (userCountryCode == "UK") {
                    $(this).val("UK");
                    selectedCountryCode = "UK";
                    CountryOnChangeEventHandler("US", "UK", false);
                    ProfessionOnChangeEventHandler();
                    ToggleReceiveEmail("UK");
                } else {
                    $(this).val("US");
                }

                if ($(this).hasClass("fieldError")) {
                    $(this).removeClass("fieldError");
                }
            });

            CountryOnChangeEvent();
            ProfessionOnChangeEvent();
        }
    });
}

function SetRegistrationFields(janrainInfo) {
    SetCommonRegistrationFields(janrainInfo);
    SetProviderSpecificRegistrationFields(janrainInfo);
}

function SetProviderSpecificRegistrationFields(janrainInfo) {
    switch (janrainInfo.SocialSignInProvider.Key) {
        // Facebook
        case 2:
            break;
            // Google+
        case 3:
            break;
            // LinkedIn
        case 4:
            SetLinkedInUserFields(janrainInfo);
            break;
            // Yahoo 
        case 5:
            break;
            // Twitter
        case 6:
            break;
            // Windows Live
        case 7:
            break;
    }
}

function SetCommonRegistrationFields(janrainInfo) {
    var firstName = janrainInfo.FirstName;
    var lastName = janrainInfo.LastName;
    var email = janrainInfo.Email;

    if ((firstName != undefined && firstName != "") || (lastName != undefined && lastName != "") || (email != undefined && email != "")) {
        if (janrainInfo.SocialSignInUserState == 1) {
            if ($("#phDynamicAlmostDoneContainer div.region111").length > 0) {
                if (email != undefined && email != "") {
                    if ($("#phDynamicAlmostDoneContainer div.region111 #txtEmail_Reg_field").length > 0) {
                        $("#phDynamicAlmostDoneContainer div.region111 #txtEmail_Reg_field").attr({ value: email, disabled: "disabled" });
                    } else {
                        var emailHtml = '<p id="divRegistrationEmail"><label for="txtEmail_Reg_field">Email*</label><input name="txtEmail_Reg_field" id="txtEmail_Reg_field" class="textbox" sid="PrimaryEmailAddress" rfvaltext="Email address required" regexvalidationexpression="^\\w+([-+.\']\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*(\\s)*$" type="text" value="' + email + '" disabled="disabled"></p>';
                        $("#phDynamicAlmostDoneContainer div.region111").prepend(emailHtml);
                    }
                }

                if ((firstName != undefined && firstName != "") || (lastName != undefined && lastName != "")) {
                    if ($("#phDynamicAlmostDoneContainer div.region111 #txtFirstName_Reg_field").length > 0 && $("#phDynamicAlmostDoneContainer div.region111 #txtLastName_Reg_field").length > 0) {
                        $("#phDynamicAlmostDoneContainer div.region111 #txtFirstName_Reg_field").val(firstName);
                        $("#phDynamicAlmostDoneContainer div.region111 #txtLastName_Reg_field").val(lastName);
                    } else {
                        var userNameHtml = '<div class="formRows2"><p id="divRegistrationFirstName" class="left-form-element"><label for="txtFirstName_Reg_field">First Name*</label><input name="txtFirstName_Reg_field" id="txtFirstName_Reg_field" class="textbox" sid="FirstName" rfvaltext="First name required" type="text" value="' + firstName + '"></p><p id="divRegistrationLastName"><label for="txtLastName_Reg_field">Last Name*</label><input name="txtLastName_Reg_field" id="txtLastName_Reg_field" class="textbox" sid="LastName" rfvaltext="Last name required" type="text" value="' + lastName + '"></p></div>';
                        $("#phDynamicAlmostDoneContainer div.region111").prepend(userNameHtml);
                    }
                }
            }
        }
        else if (janrainInfo.SocialSignInUserState == 3) {
            if ($("#phDynamicAccountLinkContainer div.region111").length > 0) {
                if (email != undefined && email != "") {
                    if ($("#phDynamicAccountLinkContainer div.region111 #txtEmail_Reg_field").length > 0) {
                        $("#phDynamicAccountLinkContainer div.region111 #txtEmail_Reg_field").attr({ value: email, disabled: "disabled" });
                    } else {
                        emailHtml = '<p id="divRegistrationEmail"><label for="txtEmail_Reg_field">Email*</label><input name="txtEmail_Reg_field" id="txtEmail_Reg_field" class="textbox" sid="PrimaryEmailAddress" rfvaltext="Email address required" regexvalidationexpression="^\\w+([-+.\']\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*(\\s)*$" type="text" value="' + email + '" disabled="disabled"></p>';
                        $("#phDynamicAccountLinkContainer div.region111").prepend(emailHtml);
                    }
                }

                if ((firstName != undefined && firstName != "") || (lastName != undefined && lastName != "")) {
                    if ($("#phDynamicAccountLinkContainer div.region111 #txtFirstName_Reg_field").length > 0 && $("#phDynamicAccountLinkContainer div.region111 #txtLastName_Reg_field").length > 0) {
                        $("#phDynamicAccountLinkContainer div.region111 #txtFirstName_Reg_field").val(firstName);
                        $("#phDynamicAccountLinkContainer div.region111 #txtLastName_Reg_field").val(lastName);
                    } else {
                        userNameHtml = '<div class="formRows2"><p id="divRegistrationFirstName" class="left-form-element"><label for="txtFirstName_Reg_field">First Name*</label><input name="txtFirstName_Reg_field" id="txtFirstName_Reg_field" class="textbox" sid="FirstName" rfvaltext="First name required" type="text" value="' + firstName + '"></p><p id="divRegistrationLastName"><label for="txtLastName_Reg_field">Last Name*</label><input name="txtLastName_Reg_field" id="txtLastName_Reg_field" class="textbox" sid="LastName" rfvaltext="Last name required" type="text" value="' + lastName + '"></p></div>';
                        $("#phDynamicAccountLinkContainer div.region111").prepend(userNameHtml);
                    }
                }
            }
        }
    }
}

function SetLinkedInUserFields(janrainInfo) {
    var companyName = janrainInfo.Company;
    var jobTitle = janrainInfo.JobTitle;
    if ((companyName != undefined && companyName != "") || (jobTitle != undefined && jobTitle != "")) {

        if (janrainInfo.SocialSignInUserState == 1) {
            if ($("#phDynamicAlmostDoneContainer div.region111").length > 0) {

                if (companyName != undefined && companyName != "") {
                    if ($("#phDynamicAlmostDoneContainer div.region111 #txtCompanyName_Reg_field").length > 0) {
                        $("#phDynamicAlmostDoneContainer div.region111 #txtCompanyName_Reg_field").val(companyName);
                    } else {
                        var companyHtml = '<p id="divRegistrationCompanyName"><label for="txtCompanyName_Reg_field">Company Name</label><input name="txtCompanyName_Reg_field" id="txtCompanyName_Reg_field" class="textbox" sid="Company" type="text" value="' + companyName + '"></p>';
                        $("#phDynamicAlmostDoneContainer div.region111").append(companyHtml);
                    }
                }

                if (jobTitle != undefined && jobTitle != "") {
                    if ($("#phDynamicAlmostDoneContainer div.region111 #txtJobTitle_Reg_field").length > 0) {
                        $("#phDynamicAlmostDoneContainer div.region111 #txtJobTitle_Reg_field").val(jobTitle);
                    } else {
                        var jobTitleHtml = '<p id="divRegistrationJobTitle"><label for="txtJobTitle_Reg_field">Job Title</label><input name="txtJobTitle_Reg_field" id="txtJobTitle_Reg_field" class="textbox" sid="JobTitle" type="text" value="' + jobTitle + '"></p>';
                        $("#phDynamicAlmostDoneContainer div.region111").append(jobTitleHtml);
                    }
                }

            }
        }
        else if (janrainInfo.SocialSignInUserState == 3) {
            if ($("#phDynamicAccountLinkContainer div.region111").length > 0) {

                if (companyName != undefined && companyName != "") {
                    if ($("#phDynamicAccountLinkContainer div.region111 #txtCompanyName_Reg_field").length > 0) {
                        $("#phDynamicAccountLinkContainer div.region111 #txtCompanyName_Reg_field").val(companyName);
                    } else {
                        companyHtml = '<p id="divRegistrationCompanyName"><label for="txtCompanyName_Reg_field">Company Name</label><input name="txtCompanyName_Reg_field" id="txtCompanyName_Reg_field" class="textbox" sid="Company" type="text" value="' + companyName + '"></p>';
                        $("#phDynamicAccountLinkContainer div.region111").append(companyHtml);
                    }
                }

                if (jobTitle != undefined && jobTitle != "") {
                    if ($("#phDynamicAccountLinkContainer div.region111 #txtJobTitle_Reg_field").length > 0) {
                        $("#phDynamicAccountLinkContainer div.region111 #txtJobTitle_Reg_field").val(jobTitle);
                    } else {
                        jobTitleHtml = '<p id="divRegistrationJobTitle"><label for="txtJobTitle_Reg_field">Job Title</label><input name="txtJobTitle_Reg_field" id="txtJobTitle_Reg_field" class="textbox" sid="JobTitle" type="text" value="' + jobTitle + '"></p>';
                        $("#phDynamicAccountLinkContainer div.region111").append(jobTitleHtml);
                    }
                }

            }
        }
    }
}

function DynamicLoadForms(formLinkVal, winHeight, winWidth, docHeight, docScrollTop, lightboxWidth, lightboxHeight, lightboxID) {
    var isLogin;
    if (formLinkVal == "login") {
        isLogin = true;
    }
    else {
        isLogin = false;
    }
    var divContents = $("#lightboxRegisterForm").html();
    var hasRegContent = divContents.indexOf("dynRegistrationFormContainer");
    var ajaxUrl = dynamicUrl + "?loadreg=true";
    if (isLogin) {
        ajaxUrl += "&pagetypeid=131";
    }
    else {
        ajaxUrl += "&pagetypeid=130";
    }


    //if (hasRegContent == -1) {
    if (hasRegContent != -1) {
        $.ajax({
            global: false,
            type: "GET",
            //dataType: 'json',
            url: ajaxUrl,
            success: function (res) {
                if (!res.DisplayDynamicRegPanel) {
                    $("#dynRegistrationFormContainer").hide();
                }
                else {
                    $("#phDynamicRegistrationContainer").html(res.JsonResult);

                }

                /*hide/show search box watermark*/
                $(".dynDefaultText").focus(function (srcc) {
                    if ($(this).val() == $(this).attr("default-watermarktext")) {
                        $(this).removeClass("medRegisterInactive");
                        $(this).val("");
                    }
                });

                $(".dynDefaultText").blur(function () {
                    if ($(this).val() == "") {
                        $(this).addClass("medRegisterInactive");
                        $(this).val($(this).attr("default-watermarktext"));
                    }
                });

                $(".dynDefaultText").blur();

                // Client-side validation
                $('#lightboxPasswordForm #ForgotPWDContainer [id$="_ForgotPWD_field"]').each(function () {
                    $(this).blur(function () {
                        var fieldVal = new String();
                        fieldVal = $(this).val();

                        var rfvText = $(this).attr('rfvaltext');
                        if (rfvText != undefined && rfvText != "") {
                            if (fieldVal == "") {
                                $(this).addClass("fieldError");
                                return;
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }

                        var revEx = $(this).attr('regexvalidationexpression');
                        var revText = $(this).attr('regexvaltext');
                        if (revEx != undefined && revEx != "") {
                            var regexExpression = new RegExp(revEx);
                            if (!regexExpression.test(fieldVal)) {
                                $(this).addClass("fieldError");
                                return;
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }

                        var compareText = $(this).attr('comparevaltext');
                        var compareTo = $(this).attr('compareto');
                        var compareToVal = $('#ForgotPWDContainer [id$=\"' + compareTo + '\"]').val();
                        if (compareText != undefined && compareText != "") {
                            if (fieldVal != compareToVal) {
                                $(this).addClass("fieldError");
                                return;
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }

                        var rangeText = $(this).attr('rangevalidation-int');
                        if (rangeText != undefined && rangeText != "") {
                            var rangeVals = rangeText.split("-");
                            var minVal = rangeVals[0];
                            var maxVal = rangeVals[1];

                            if (fieldVal != null && fieldVal != undefined && fieldVal != "") {
                                var valueOfField = parseInt(fieldVal);

                                if (minVal != undefined && minVal != "" && maxVal != undefined && maxVal != "") {
                                    minVal = parseInt(minVal);
                                    maxVal = parseInt(maxVal);

                                    if (valueOfField >= minVal && valueOfField <= maxVal) {
                                        if ($(this).hasClass("fieldError")) {
                                            $(this).removeClass("fieldError");
                                        }
                                    }
                                    else {
                                        $(this).addClass("fieldError");
                                        return;
                                    }
                                }
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }
                    });
                });

                $('#lightboxLoginForm #LoginContainer [id$="_Login_field"]').each(function () {
                    $(this).blur(function () {
                        var fieldVal = new String();
                        fieldVal = $(this).val();
                        var rfvText = $(this).attr('rfvaltext');
                        if (rfvText != undefined && rfvText != "") {
                            if (fieldVal == "") {
                                $(this).addClass("fieldError");
                                return;
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }

                        var revEx = $(this).attr('regexvalidationexpression');
                        var revText = $(this).attr('regexvaltext');
                        if (revEx != undefined && revEx != "") {
                            var regexExpression = new RegExp(revEx);
                            if (!regexExpression.test(fieldVal)) {
                                $(this).addClass("fieldError");
                                return;
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }

                        var compareText = $(this).attr('comparevaltext');
                        var compareTo = $(this).attr('compareto');
                        var compareToVal = $('#LoginContainer [id$=\"' + compareTo + '\"]').val();
                        if (compareText != undefined && compareText != "") {
                            if (fieldVal != compareToVal) {
                                $(this).addClass("fieldError");
                                return;
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }

                        var rangeText = $(this).attr('rangevalidation-int');
                        if (rangeText != undefined && rangeText != "") {
                            var rangeVals = rangeText.split("-");
                            var minVal = rangeVals[0];
                            var maxVal = rangeVals[1];

                            if (fieldVal != null && fieldVal != undefined && fieldVal != "") {
                                var valueOfField = parseInt(fieldVal);

                                if (minVal != undefined && minVal != "" && maxVal != undefined && maxVal != "") {
                                    minVal = parseInt(minVal);
                                    maxVal = parseInt(maxVal);

                                    if (valueOfField >= minVal && valueOfField <= maxVal) {
                                        if ($(this).hasClass("fieldError")) {
                                            $(this).removeClass("fieldError");
                                        }
                                    }
                                    else {
                                        $(this).addClass("fieldError");
                                        return;
                                    }
                                }
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }
                    });
                });

                $('#RegistrationContainer [id$="_Reg_field"]').each(function () {
                    $(this).blur(function () {
                        var fieldId = $(this).attr("Id");
                        var fieldVal = new String();
                        fieldVal = $(this).val();
                        var fieldTitle = $(this).attr("default-watermarktext");

                        if ($(this).hasClass("watermark-textbox") && fieldVal != null && fieldVal != "" && fieldVal != undefined && fieldVal == fieldTitle) {
                            fieldVal = "";
                        }

                        var rfvText = $(this).attr('rfvaltext');
                        if (rfvText != undefined && rfvText != "") {
                            if (fieldId.indexOf("ddlProfession_Reg_field") != -1) {
                                if (fieldVal == "-1") {
                                    $(this).addClass("fieldError");
                                    return;
                                }
                                else {
                                    if ($(this).hasClass("fieldError")) {
                                        $(this).removeClass("fieldError");
                                    }
                                }
                            }
                            else {
                                if (fieldId.indexOf("ddlSpecialty_Reg_field") != -1) {
                                    var specReq = $('[id$="ddlProfession_Reg_field"] option:selected').attr("sr");
                                    if (specReq == "True") {
                                        if (fieldVal == "") {
                                            $(this).addClass("fieldError");
                                            return;
                                        }
                                        else {
                                            if ($(this).hasClass("fieldError")) {
                                                $(this).removeClass("fieldError");
                                            }
                                        }
                                    }
                                    else {
                                        if ($(this).hasClass("fieldError")) {
                                            $(this).removeClass("fieldError");
                                        }
                                    }
                                }
                                else if (fieldId.indexOf("txtYearofGraduation_Reg_field") != -1) {
                                    var yrReq = $('[id$="ddlProfession_Reg_field"] option:selected').attr("yr");
                                    if (yrReq == "True") {
                                        if (fieldVal == "") {
                                            $(this).addClass("fieldError");
                                            return;
                                        }
                                        else {
                                            if ($(this).hasClass("fieldError")) {
                                                $(this).removeClass("fieldError");
                                            }
                                        }
                                    }
                                    else {
                                        if ($(this).hasClass("fieldError")) {
                                            $(this).removeClass("fieldError");
                                        }
                                    }
                                }
                                else {
                                    if (fieldVal == "") {
                                        $(this).addClass("fieldError");
                                        return;
                                    }
                                    else {
                                        if ($(this).hasClass("fieldError")) {
                                            $(this).removeClass("fieldError");
                                        }
                                    }
                                }
                            }
                        }

                        var revEx = $(this).attr('regexvalidationexpression');
                        var revText = $(this).attr('regexvaltext');
                        if (revEx != undefined && revEx != "") {
                            var regexExpression = new RegExp(revEx);
                            if (!regexExpression.test(fieldVal)) {
                                $(this).addClass("fieldError");
                                return;
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }

                        var compareText = $(this).attr('comparevaltext');
                        var compareTo = $(this).attr('compareto');
                        var compareToVal = $('#RegistrationContainer [id$=\"' + compareTo + '\"]').val();
                        if (compareText != undefined && compareText != "") {
                            if (fieldVal != compareToVal) {
                                $(this).addClass("fieldError");
                                return;
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }

                        var rangeText = $(this).attr('rangevalidation-int');
                        if (rangeText != undefined && rangeText != "") {
                            var rangeVals = rangeText.split("-");
                            var minVal = rangeVals[0];
                            var maxVal = rangeVals[1];

                            if (fieldVal != null && fieldVal != undefined && fieldVal != "") {
                                var valueOfField = parseInt(fieldVal);

                                if (minVal != undefined && minVal != "" && maxVal != undefined && maxVal != "") {
                                    minVal = parseInt(minVal);
                                    maxVal = parseInt(maxVal);

                                    if (valueOfField >= minVal && valueOfField <= maxVal) {
                                        if ($(this).hasClass("fieldError")) {
                                            $(this).removeClass("fieldError");
                                        }
                                    }
                                    else {
                                        $(this).addClass("fieldError");
                                        return;
                                    }
                                }
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }
                    });
                });

                CountryOnChangeEvent();

                ProfessionOnChangeEvent();

                $('#RegistrationContainer .watermark-textbox').each(
                    function () {
                        toggleWaterMarksStep1("#" + $(this).attr("Id"), $(this).attr("default-watermarktext"));
                        setDisplayEventsForStep1Control("#" + $(this).attr("Id"), $(this).attr("default-watermarktext"));
                    }
                );

                showForm(formLinkVal);
                openLightbox(winHeight, winWidth, docHeight, docScrollTop, lightboxWidth, lightboxHeight, lightboxID);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //alert(xhr.status);
                //alert(thrownError);
            }
        });

    }
    else {
        showForm(formLinkVal);
        openLightbox(winHeight, winWidth, docHeight, docScrollTop, lightboxWidth, lightboxHeight, lightboxID);
    }
}

function setDisplayEventsForStep1Control(control, defaultText) {
    $(control).focus(function (e) {
        $(this).removeClass("medRegisterInactive");
        $(this).addClass("dynDefaultText");
    });

    $(control).focusout(function (e) {
        var trimLast = ($(this).val()).trim();
        if (trimLast != null && trimLast != "" && trimLast == defaultText) {
            $(this).removeClass("dynDefaultText");
            $(this).addClass("medRegisterInactive");
        }
    });
}


function toggleWaterMarksStep1(control, defaultText) {
    //var textValue = ($(control).val()).trim();
    var textValue = $.trim($(control).val());
    if (textValue != null && textValue != "" && textValue != defaultText) {
        $(control).removeClass("medRegisterInactive");
        $(control).addClass("dynDefaultText");
    }
}

function UserLogin(isGatedContent) {
    var content = "lightboxContent";
    var loginForm = "lightboxLoginForm";
    if (isGatedContent) {
        loginForm = "gatedLoginForm";
        content = "gatedContent";
    }

    if (ValidateLoginForm(isGatedContent)) {
        $("#" + loginForm + " #divLoginButton").hide();
        $("#" + loginForm + " #divLoginLoading").show();

        $("#" + content + " .errorMessage").html("");
        $("#" + content + " .errorMessage").hide();

        var u = $('#' + loginForm + ' [id$="txtEmail_Login_field"]').val();
        var p = $('#' + loginForm + ' [id$="txtPassword_Login_field"]').val();
        var r = $('#' + loginForm + ' [id$="chkRememberMe"]').attr("checked");
        if (r == "checked") {
            r = true;
        }
        else {
            r = false;
        }

        $('#' + loginForm + '[id$="txtEmail_Login_field"]').attr("disabled", true);
        $('#' + loginForm + '[id$="txtPassword_Login_field"]').attr("disabled", true);
        $('#' + loginForm + '[id$="chkRememberMe"]').attr("disabled", true);

        var dynamicLoginData =
            {
                Username: u,
                Password: p,
                RememberMe: r
            };
        var dynRegUrl;
        // if it's a social sign in then use the social sign in url
        if (isSocialSignInRegistration) {
            // include janrain 
            if ($('#janrain_ssisid').val()) {
                dynamicLoginData.SSISId = $('#janrain_ssisid').val();
            }
            dynRegUrl = dynamicUrl + "?action=5&returl=" + returnUrl;
        } else {
            dynRegUrl = dynamicUrl + "?action=1&returl=" + returnUrl;
        }
        $("#lightboxFormWrapper").prepend('<img src="./simages/ajax-loader.png" class="ajaxLoader"/>');
        $.ajax({
            global: false,
            type: "POST",
            url: dynRegUrl,
            data: JSON.stringify(dynamicLoginData),
            contentType: "application/json;charset=utf-8",
            async: true,
            success: function (response) {
                $("#" + loginForm + " #divLoginButton").show();
                $('#' + loginForm + '#divLoginLoading').hide();
                $('#' + loginForm + '[id$="txtEmail_Login_field"]').attr("disabled", false);
                $('#' + loginForm + '[id$="txtPassword_Login_field"]').attr("disabled", false);
                $('#' + loginForm + '[id$="chkRememberMe"]').attr("disabled", false);

                var resultCode = response.JsonResult.toString();

                if (resultCode == "5") {
                    // Set cookies to prevent custom modal registration
                    setCookie(customModalRegistrationCookieName, 0, customModalRegisteredExpireDays);

                    if (returnUrl && returnUrl.length > 0) {
                        window.location.href = returnUrl;
                    }
                    else {
                        location.reload(true);
                    }
                    $(".ajaxLoader").remove();
                }
                else if (resultCode == "2") {
                    $("#" + content + " .errorMessage").html("An account with this email address already exists in our system, but a password has yet to be established. In order to establish one, and to protect your privacy, please use the <a href=\"#\" title=\"forgot password link\" onclick=\"ShowForgotPWDForm(); return false;\">forgot password link</a> to set one up.  The system will auto-generate a password reset link for you and send it to the email address provided.  You will be able to set a new password, and update your profile, including email newsletter subscriptions.  If you have any questions, please contact <a href='mailto:" +
                    adminEmail + "'>customer service</a>.");
                    $("#" + content + " .errorMessage").show();
                }
                else if (resultCode == "3") {
                    $("#" + content + " .errorMessage").html("Login failed. This account has been suspended.");
                    $("#" + content + " .errorMessage").show();
                }
                else if (resultCode == "4") {
                    $("#" + content + " .errorMessage").html("Login failed. This account has been deactivated.");
                    $("#" + content + " .errorMessage").show();
                }
                else if (resultCode == "1") {
                    $("#" + content + " .errorMessage").html("<span>Login failed. Please check your email address and password and try again. For further assistance, please contact <a href='mailto:" +
                        adminEmail + "'>admin</a>.</span>");
                    $("#" + content + " .errorMessage").show();
                }
                    // For existing inactive user
                else {
                    $("#" + content + " .errorMessage").html(resultCode);
                    $("#" + content + " .errorMessage").show();
                }

            },
            error: function () {
                $("#" + loginForm + " #divLoginButton").show();
                $('#' + loginForm + '#divLoginLoading').hide();
                $("#" + loginForm + "[id$='txtEmail_Login_field']").attr("disabled", false);
                $("#" + loginForm + "[id$='txtPassword_Login_field']").attr("disabled", false);
                $("#" + loginForm + "[id$='chkRememberMe']").attr("disabled", false);

                $("#" + content + " .errorMessage").html("<span>Login failed. Please check your email address and password and try again. For further assistance, please contact <a href='mailto:" +
                        adminEmail + "'>admin</a>.</span>");
                $("#" + content + " .errorMessage").show();
            }
        });
    }
    else {
        var password = $("#txtPassword_Login_field").val();
        var Email = $("#txtEmail_Login_field").val();
        if (Email.length > 0 && password.length < 5) {
            $("#" + content + " p.errorMessage").html(passwordErrMsg);
            $("#" + content + " p.errorMessage").show();
        } else {
            $("#" + content + " p.errorMessage").html(genericErrMsg);
            $("#" + content + " p.errorMessage").show();
        }
    }

}

function SendForgottenPassword(isGatedContent) {
    var content = "lightboxContent";
    var passwordForm = "lightboxPasswordForm";
    if (isGatedContent) {
        passwordForm = "gatedPasswordForm";
        content = "gatedContent";
    }

    if (ValidateForgotPWDForm(isGatedContent)) {

        $("#divForgotPWDButton").hide();
        $("#divForgotLoading").show();

        $("#" + content + " .errorMessage").html("");
        $("#" + content + " .errorMessage").hide();
        $('#' + passwordForm + ' [id$="txtEmail_ForgotPWD_field"]').val();
        var email = $('#' + passwordForm + ' [id$="txtEmail_ForgotPWD_field"]').val();
        $('#' + passwordForm + ' [id$="txtEmail_ForgotPWD_field"]').attr("disabled", true);


        $.ajax({
            global: false,
            type: "POST",
            url: dynamicUrl + "?action=3",
            data: JSON.stringify({ Email: email }),
            contentType: "application/json;charset=utf-8",
            async: true,
            success: function (response) {

                $('#' + passwordForm + ' [id$="txtEmail_ForgotPWD_field"]').attr("disabled", false);
                $("#divForgotPWDButton").show();
                $("#divForgotLoading").hide();

                var resultCode = response.JsonResult.toString();

                if (resultCode == "1") {
                    var msg = "Password resets have been disabled because this account controls access for a group of users.  Please contact your " +
                                        pubName + " group subscription manager for login information ";
                    if (!(adminEmail === "")) {
                        msg += "or email " + adminEmail;
                    }
                    msg += " for further assistance.";

                    $("#" + content + " .errorMessage").html(msg);
                    $("#" + content + " .errorMessage").show();
                }
                else if (resultCode == "2") {
                    //                    $("#divForgotPWDButton").hide();
                    //                    $("#divForgotLoading").hide();
                    //                    $("#divForgotPWDEmail").hide();

                    $('[id$="divIntroText"]').hide();

                    $('#lightboxRightCol').hide();
                    $('#lightboxFormWrapper').css("border-right", "none");

                    $("#" + content + " .errorMessage").html("");
                    $("#" + content + " .errorMessage").hide();

                    $("#lightboxPasswordForm").hide();
                    //$("#ChangePWDSuccessful").show();

                    //$("#lightboxHeader h3").text("New Password Sent");
                    $("#lightboxHeader h3").text("New Password Reset Link Sent");
                    if (isGatedContent) {
                        $("#gatedConfirmSendPassword").empty();

                        $("#gatedConfirmSendPassword").html('<div class="gatedFormText"><h3>NEW PASSWORD RESET LINK SENT</h3><p>A new password reset link has been sent to:</p><p>' + email + '</p></div>');
                        $("#gatedPasswordFormContent").hide();

                        window.setTimeout(function () {
                            $("#gatedPasswordWrapper").slideUp(800, function () {
                                $("#gatedLoginWrapper").fadeIn();
                            });
                        }, 5000);

                    }
                    else {
                        $("#lightboxContent #divRegistrationSuccessMsg").empty();
                        $("#lightboxContent #divRegistrationSuccessMsg").html("A new password reset link has been sent to:<br /><strong>" + email + "</strong>");
                        $("#lightboxContent #divRegistrationSuccessMsg").show();

                        window.setTimeout(function () {
                            showForm("login");

                            //                        $("#divForgotPWDButton").show();
                            //                        $("#divForgotLoading").hide();
                            //                        $("#divForgotPWDEmail").show();

                            //                        $('#lightboxRightCol').show();
                            //                        $('#lightboxFormWrapper').css("border-right", "1px solid #e4e4e4");

                            $("#lightboxContent #divRegistrationSuccessMsg").hide();

                        }, 5000);
                    }

                }
                else if (resultCode == "3") {
                    $("#" + content + " .errorMessage").html("Unable to email your new password. Admin Email is not found in our database.");
                    $("#" + content + " .errorMessage").show();
                }
                else if (resultCode == "4") {
                    $("#" + content + " .errorMessage").html("We're sorry, we cannot find a record of this email address in our database.  Please try again.");
                    $("#" + content + " .errorMessage").show();
                }

            },
            error: function () {
                $('[id$="txtEmail_ForgotPWD_field"]').attr("disabled", false);

                $("#divForgotPWDButton").show();
                $("#divForgotLoading").hide();

                $("#" + content + " .errorMessage").html("Internal error.");
                $("#" + content + " .errorMessage").show();
            }
        });
    }
    else {
        $("#" + content + " p.errorMessage").html(genericErrMsg);
        $("#" + content + " p.errorMessage").show();
    }
}

function UserRegistration(isGatedContent) {

    var content = "lightboxContent";
    var registerForm = "RegistrationContainer";

    if (isGatedContent) {
        registerForm = "gatedRegisterForm";
        content = "gatedContent";
    }

    if (ValidateRegistrationForm(isGatedContent)) {

        $("#dynRegistrationFormContainer").hide();
        $("#RegistrationLoadingDiv").show();

        $("#" + content + " .errorMessage").html("");
        $("#" + content + " .errorMessage").hide();

        var registrationObj = {};
        var questionAnswerIds = "0";

        $('#' + registerForm + ' [id$="_Reg_field"]').each(function () {
            var sid = $(this).attr("sid");
            var controlType = $(this).attr("controltype");
            var fieldVal = $(this).val();

            if (sid != undefined && sid != null && !(sid == "StateCode" && controlType == "dropdownlist") && !(sid == "StateCode" && controlType == "textdropdown") && sid != "Password") {
                var rqIndex = sid.indexOf("RegistrationQuestion");

                if (rqIndex != -1 && fieldVal != "") {
                    var qid = sid.substr(rqIndex + 20);
                    questionAnswerIds += "," + qid + "-" + fieldVal;
                }
                else {
                    registrationObj[sid] = fieldVal;
                }
            }
            else if (sid == "StateCode" && controlType == "dropdownlist") {
                registrationObj[sid] = fieldVal;
                if (fieldVal != "" && $('#' + registerForm + ' [id$="ddlCountry_Reg_field"]').length <= 0) {
                    registrationObj.CountryCode = 'US';
                } else {
                    registrationObj.CountryCode = '';
                }
            }
            else if (sid == "StateCode" && controlType == "textdropdown") {
                var controlId = $(this).attr("id");
                if ($('#' + registerForm + ' [id$="ddlCountry_Reg_field"]').length) {
                    if ($('#' + registerForm + ' [id$="ddlCountry_Reg_field"]').val() == "US") {
                        if (controlId.indexOf("ddlState_Reg_field") != -1) {
                            registrationObj[sid] = fieldVal;
                        }
                    } else {
                        if (controlId.indexOf("txtState_Reg_field") != -1) {
                            registrationObj[sid] = fieldVal;
                        }
                    }
                } else {
                    if (controlId.indexOf("ddlState_Reg_field") != -1) {
                        registrationObj[sid] = fieldVal;
                        if (fieldVal != "") {
                            registrationObj.CountryCode = 'US';
                        } else {
                            registrationObj.CountryCode = '';
                        }
                    }
                }
            } else if (sid == "Password") {
                var p = $(this).val();
                registrationObj[sid] = p;
            }
        });

        var topics = "topicIds:0";
        $(".RegTopics").each(function () {
            if ($(this).prop("checked")) {
                topics += ("," + $(this).attr("data-Id"));
            }
        });

        if ($(".otherTopicsText").length > 0) {
            topics += "|otherTopic:" + $(".otherTopicsText").val();
        }
        if ($(".otherJobRoleText").length > 0) {
            topics += "|otherJobRole:" + $(".otherJobRoleText").val();
        }

        registrationObj["TopicsAndOthers"] = topics;
        
        if (questionAnswerIds != "0") {
            registrationObj.QuestionAnswerIds = questionAnswerIds;
        }

        var isMyCme;
        var newsletterIds;
        if (mycmeNewsletterIds != null && mycmeNewsletterIds != undefined && mycmeNewsletterIds != "") {
            isMyCme = true;
            newsletterIds = mycmeNewsletterIds.split(',');
        }
        var newsletters = "0";
        $('#tbNewsletters tr td input').each(function () {
            var r = $(this).attr("checked");
            if (r == "checked") {
                r = true;
            }
            else {
                r = false;
            }
            if (r == true) {
                var i = $(this).attr('id').indexOf("ChkNewsletter_DynamicReg_");
                if (i != -1) {
                    var newsletterId = $(this).attr("id").substr(i + 25);
                    if (isMyCme == true) {
                        if ($.inArray(newsletterId, newsletterIds) != -1) {
                            newsletters += "," + newsletterId;
                        }
                    } else {
                        newsletters += "," + newsletterId;
                    }
                }
            }
        });

        $('#tbRelatedNewsletters tr td input').each(function () {
            var r = $(this).attr("checked");
            if (r == "checked") {
                r = true;
            }
            else {
                r = false;
            }
            if (r == true) {
                var i = $(this).attr('id').indexOf("ChkNewsletter_DynamicReg_");
                if (i != -1) {
                    var newsletterId = $(this).attr("id").substr(i + 25);
                    newsletters += "," + newsletterId;
                }
            }
        });

        var specialOffers = "0";
        $('#tbSpecialOffers tr td input').each(function () {
            var r = $(this).attr("checked");
            if (r == "checked") {
                r = true;
            }
            else {
                r = false;
            }
            if (r == true) {
                var i = $(this).attr('id').indexOf("ChkSpecialOffer_DynamicReg_");
                if (i != -1) {
                    var specialOfferId = $(this).attr("id").substr(i + 27);
                    specialOffers += "," + specialOfferId;
                }
            }
        });

        var email = $('[id$="txtEmail_Reg_field"]').val();


        var dynRegUrl = dynamicUrl + "?action=2&pagetypeid=132";

        // if it's a social sign in then use the social sign in url
        if (isSocialSignInRegistration) {
            registrationObj.SSISId = $('#janrain_ssisid').val();
            dynRegUrl = dynamicUrl + "?action=4&pagetypeid=132";
        }
        
        if ($("#divRegistrationReceiveEmail .chk_Registration_ReceiveScreenedWorkRelatedEmails").length) {
            if ($("#divRegistrationReceiveEmail .chk_Registration_ReceiveScreenedWorkRelatedEmails").attr("checked") === "checked") {
                registrationObj.ReceiveScreenedWorkEmail = true;
            } else {
                registrationObj.ReceiveScreenedWorkEmail = false;
            }
        }
        
        if ($("#divRegistrationReceiveEmail .chk_Registration_OptOutRelevantWorkRelatedEmails").length) {
            if ($("#divRegistrationReceiveEmail .chk_Registration_OptOutRelevantWorkRelatedEmails").attr("checked") === "checked") {
                registrationObj.OptOutRelevantWorkEmail = true;
            } else {
                registrationObj.OptOutRelevantWorkEmail = false;
            }
        }

        if ($("#divRegistrationReceiveEmail .chk_Registration_ReceiveEmail").length) {
            if ($("#divRegistrationReceiveEmail .chk_Registration_ReceiveEmail").attr("checked") === "checked") {
                registrationObj.ReceiveEmail = true;
            } else {
                registrationObj.ReceiveEmail = false;
            }
        } else if ($("#divRegistrationQuestions #chk_Registration_ReceiveEmail").length) {
            if ($("#divRegistrationQuestions #chk_Registration_ReceiveEmail").attr("checked") === "checked") {
                registrationObj.ReceiveEmail = true;
            } else {
                registrationObj.ReceiveEmail = false;
            }
        }
        else
        {
            registrationObj.ReceiveEmail = false;
        }

        if ($("#chk_Registration_ReceivePromotions").length) {
            if ($("#chk_Registration_ReceivePromotions").attr("checked") === "checked") {
                registrationObj.ReceivePromotions = true;
            } else {
                registrationObj.ReceivePromotions = false;
            }
        } else {
            registrationObj.ReceivePromotions = false;
        }

        registrationObj.NewsletterIds = newsletters;
        registrationObj.SpecialOfferIds = specialOffers;
        
        $.ajax({
            global: false,
            type: "POST",
            url: dynRegUrl,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(registrationObj),
            async: true,
            success: function (data) {
                var responseCode = data.JsonResult;
                if (responseCode != null && responseCode != "") {
                    if (responseCode == "4") {
                        // Set cookies to prevent custom modal registration
                        setCookie(customModalRegistrationCookieName, 0, customModalRegisteredExpireDays);

                        $('#lightboxRightCol, #lightboxFormWrapper').hide();
                        $('#lightboxFormWrapper').css("border-right", "none");

                        $("#" + content + " .errorMessage").html("");
                        $("#" + content + " .errorMessage").hide();

                        if (isGatedContent) {
                            $("#gatedRegisterWrapper").slideUp(800, function () {
                                $("#gatedConfirmWrapper").fadeIn();
                            });

                            //change login status
                            $("#loginStatus").load(publicationUrl + "/login/loginstatus");
                        }
                        else {
                            $('[id$="divIntroText"]').hide();
                            $("#lightboxHeader h3").text("Registration Successful");
                            $("#lightboxRegisterForm").hide();
                            $("#lightboxContent #divRegistrationSuccessMsg").empty();
                            $("#lightboxContent #divRegistrationSuccessMsg").html("An email confirmation has been sent to:<br /><strong>" + email + "</strong><br /><br />You will now be redirected to " + pubName + " for full access.");
                            $("#lightboxContent #divRegistrationSuccessMsg").show();

                            //log event3 for successful registration
                            addOmniture(hrefDynamicRegister, 'event3');
                        }

                        if (data.returnUrl) {
                            window.setTimeout(function () { window.location.href = data.returnUrl; }, 5000);
                        }
                        else {
                            window.setTimeout(function () { location.reload(true); }, 5000);
                        }
                    }

                    else {
                        //                    $('#lightboxRightCol').show();
                        //                    $('#lightboxFormWrapper').css("border-right", "1px solid #e4e4e4");

                        if (responseCode == "1") {

                            //$("#RegistrationSuccessful").hide();
                            $("#RegistrationLoadingDiv").hide();

                            $("#dynRegistrationFormContainer").show();
                            $("#" + content + " .errorMessage").html("This email address already exists in our system, please provide a different email address.");
                            $("#" + content + " .errorMessage").show();
                        }
                        else if (responseCode == "2") {
                            //$("#RegistrationSuccessful").hide();
                            $("#RegistrationLoadingDiv").hide();

                            $("#dynRegistrationFormContainer").show();
                            $("#" + content + " .errorMessage").html("This email address already exists in our system but with a blank password, please change the password.");
                            $("#" + content + " .errorMessage").show();
                        }
                        else if (responseCode == "3") {
                            //$("#RegistrationSuccessful").hide();
                            $("#RegistrationLoadingDiv").hide();

                            $("#dynRegistrationFormContainer").show();
                            $("#" + content + " .errorMessage").html("Registration failed, please email <a href='mailto:"
                         + adminEmail + "'>admin</a> for further assistance.");
                            $("#" + content + " .errorMessage").show();
                        }
                    }
                }
            },
            error: function () {
                //$('id$="txtEmail_Reg_field"').val("Error");

                //                $('#lightboxRightCol').show();
                //                $('#lightboxFormWrapper').css("border-right", "1px solid #e4e4e4");

                //$("#RegistrationSuccessful").hide();
                $("#RegistrationLoadingDiv").hide();

                $("#dynRegistrationFormContainer").show();
                $("#" + content + " .errorMessage").html("Registration failed, please email <a href='mailto:"
                    + adminEmail + "'>admin</a> for further assistance.");
                $("#" + content + " .errorMessage").show();
            }
        });

    }
    else {
        var passwordLength = $("#txtPassword_Reg_field").val();
        if (passwordLength != "" && passwordLength.length < 5) {
            $("#" + content + " p.errorMessage").html(passwordErrMsg);
            $("#" + content + " p.errorMessage").show();
        } else {
            $("#" + content + " p.errorMessage").html(genericErrMsg);
            $("#" + content + " p.errorMessage").show();
        }
    }
}

function ValidateLinkAccounts(isGatedContent, linkAccounts) {

    var result = true;
    var registerFields;
    if (linkAccounts) {
        registerFields = $('#accountLinkContainer  [id$="_Reg_field"]');
    } else {

        registerFields = $('#almostDoneContainer  [id$="_Reg_field"]');
    }
    if (isGatedContent) {
        registerFields = $('#gatedRegisterForm  [id$="_Reg_field"]');
    }

    registerFields.each(function () {

        var validateState = false;
        var fieldId = $(this).attr("id");
        var ctlType = $(this).attr("controltype");
        var isStateField = fieldId.indexOf("ddlState_Reg_field");
        var countryVal = $('[id$="ddlCountry_Reg_field"]').val();
        if (ctlType == "textdropdown" && isStateField != -1) {
            validateState = true;
        }
        else {
            validateState = false;
        }

        var fieldVal = new String();
        fieldVal = $(this).val();
        var fieldTitle = $(this).attr("default-watermarktext");
        if ($(this).hasClass("watermark-textbox") && fieldVal != null && fieldVal != "" && fieldVal != undefined && fieldVal == fieldTitle) {
            fieldVal = "";
        }


        if (fieldId.indexOf("txtEmail_Reg_field") != -1 || fieldId.indexOf("txtPassword_Reg_field") != -1) {
        } else {
            if ((validateState && countryVal == "US") || (!validateState)) {
                var innerResult = true;

                var rfvText = $(this).attr('rfvaltext');
                if (rfvText != undefined && rfvText != "") {
                    if (fieldId.indexOf("ddlProfession_Reg_field") != -1) {
                        if (fieldVal == "-1") {
                            $(this).addClass("fieldError");
                            innerResult = false;
                            result = false;
                        }
                        else {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                    }
                    else {
                        if (fieldId.indexOf("ddlSpecialty_Reg_field") != -1) {
                            var specReq = $('[id$="ddlProfession_Reg_field"] option:selected').attr("sr");
                            if (specReq == "True") {
                                if (fieldVal == "") {
                                    $(this).addClass("fieldError");
                                    innerResult = false;
                                    result = false;
                                }
                                else {
                                    if ($(this).hasClass("fieldError")) {
                                        $(this).removeClass("fieldError");
                                    }
                                }
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }
                        else if (fieldId.indexOf("txtYearofGraduation_Reg_field") != -1) {
                            var yrReq = $('[id$="ddlProfession_Reg_field"] option:selected').attr("yr");
                            if (yrReq == "True") {
                                if (fieldVal == "") {
                                    $(this).addClass("fieldError");
                                    innerResult = false;
                                    result = false;
                                }
                                else {
                                    if ($(this).hasClass("fieldError")) {
                                        $(this).removeClass("fieldError");
                                    }
                                }
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }
                        else {
                            if (fieldId == 'txtPassword_Reg_field' && requirePasswordDynReg == false) {

                            } else {
                                if (fieldVal == "") {
                                    $(this).addClass("fieldError");
                                    innerResult = false;
                                    result = false;
                                } else {
                                    if ($(this).hasClass("fieldError")) {
                                        $(this).removeClass("fieldError");
                                    }
                                }
                            }
                        }
                    }
                }

                if (innerResult) {
                    var revEx = $(this).attr('regexvalidationexpression');
                    var fieldID = $(this).attr('id');
                    if (revEx != undefined && revEx != "" && fieldID != "txtEmail_Reg_field" && fieldID != "txtPassword_Reg_field") {

                        var regexExpression = new RegExp(revEx);
                        if (!regexExpression.test(fieldVal)) {

                            $(this).addClass("fieldError");
                            innerResult = false;
                            result = false;
                        } else {

                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                    }

                }

                if (innerResult) {
                    var compareText = $(this).attr('comparevaltext');
                    var compareTo = $(this).attr('compareto');
                    var compareToVal = $('#almostDoneContainer [id$=\"' + compareTo + '\"]').val();
                    if (compareText != undefined && compareText != "") {
                        if (fieldVal != compareToVal) {
                            $(this).addClass("fieldError");
                            innerResult = false;
                            result = false;
                        }
                        else {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                    }
                }

                if (innerResult) {
                    var rangeText = $(this).attr('rangevalidation-int');
                    if (rangeText != undefined && rangeText != "") {
                        var rangeVals = rangeText.split("-");
                        var minVal = rangeVals[0];
                        var maxVal = rangeVals[1];

                        if (fieldVal != null && fieldVal != undefined && fieldVal != "") {
                            var valueOfField = parseInt(fieldVal);

                            if (minVal != undefined && minVal != "" && maxVal != undefined && maxVal != "") {
                                minVal = parseInt(minVal);
                                maxVal = parseInt(maxVal);

                                if (valueOfField >= minVal && valueOfField <= maxVal) {
                                    if ($(this).hasClass("fieldError")) {
                                        $(this).removeClass("fieldError");
                                    }
                                }
                                else {
                                    $(this).addClass("fieldError");
                                    innerResult = false;
                                    result = false;
                                }
                            }
                        }
                        else {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                    }
                }
            }
        }
    });

    if (!linkAccounts) {
        if ($("#chk_Registration_VerifyAgeQuestion").length) {
            if (!($("#chk_Registration_VerifyAgeQuestion").attr("checked") === "checked")) {
                $("#div_Registration_VerifyAgeQuestion").addClass("registrationQuestionError");
                result = false;
            } else {
                if ($("#div_Registration_VerifyAgeQuestion").hasClass("registrationQuestionError")) {
                    $("#div_Registration_VerifyAgeQuestion").removeClass("registrationQuestionError");
                }
            }
        }
    }

    return result;
}

function LinkAccounts(isGatedContent, linkAccounts) {

    var content = "lightboxContent";

    if (ValidateLinkAccounts(isGatedContent, linkAccounts)) {
        $("#" + content + " p.errorMessage").html('');
        $("#" + content + " p.errorMessage").hide();

        var registerForm;
        var thankyouText;
        var questionAnswerIds = "0";
        var linkAccountsObj = {};
        if (linkAccounts) {
            registerForm = "accountLinkContainer";
            thankyouText = "Thank you for linking your accounts..<br /><br />You will now be redirected to " + pubName + " for full access or click <a style=\"text-decoration:underline\" href=\"" + publicationUrl + "\">here</a> to go to the site.<br/><br/>You can manage your accounts via the My Account page at any time.";
        } else {
            registerForm = "almostDoneContainer";
            thankyouText = "Thank you for registering.<br /><br />You will now be redirected to " + pubName + " for full access.";
        }


        $('#' + registerForm + ' [id$="_Reg_field"]').each(function () {
            var sid = $(this).attr("sid");
            var controlType = $(this).attr("controltype");
            var fieldID = $(this).attr("id");
            var fieldVal = $(this).val();
            if (sid != undefined && sid != null && !(sid == "StateCode" && controlType == "dropdownlist") && !(sid == "StateCode" && controlType == "textdropdown") && sid != "Password" && fieldID != "txtPassword_Reg_field") {
                var rqIndex = sid.indexOf("RegistrationQuestion");

                if (rqIndex != -1 && fieldVal != "") {
                    var qid = sid.substr(rqIndex + 20);
                    questionAnswerIds += "," + qid + "-" + fieldVal;
                } else {
                    linkAccountsObj[sid] = fieldVal;
                }
            }
            else if (sid == "StateCode" && controlType == "dropdownlist") {
                linkAccountsObj[sid] = fieldVal;
                if (fieldVal != "" && $('#RegistrationContainer [id$="ddlCountry_Reg_field"]').length <= 0) {
                    linkAccountsObj.CountryCode = 'US';
                } else {
                    linkAccountsObj.CountryCode = '';
                }
            }
            else if (sid == "StateCode" && controlType == "textdropdown") {
                var controlId = $(this).attr("id");
                if ($('#' + registerForm + ' [id$="ddlCountry_Reg_field"]').length) {
                    if ($('#' + registerForm + ' [id$="ddlCountry_Reg_field"]').val() == "US") {
                        if (controlId.indexOf("ddlState_Reg_field") != -1) {
                            linkAccountsObj[sid] = fieldVal;
                        }
                    } else {
                        if (controlId.indexOf("txtState_Reg_field") != -1) {
                            linkAccountsObj[sid] = fieldVal;
                        }
                    }
                } else {
                    if (controlId.indexOf("ddlState_Reg_field") != -1) {
                        linkAccountsObj[sid] = fieldVal;
                        if (fieldVal != "") {
                            linkAccountsObj.CountryCode = 'US';
                        } else {
                            linkAccountsObj.CountryCode = '';
                        }
                    }
                }
            } else if (sid == "Password") {
                var p = $(this).val();
                linkAccountsObj[sid] = p;
            }
        });


        if (questionAnswerIds != "0") {
            linkAccountsObj.QuestionAnswerIds = questionAnswerIds;
        }

        var isMyCme;
        var newsletterIds;
        if (mycmeNewsletterIds != null && mycmeNewsletterIds != undefined && mycmeNewsletterIds != "") {
            isMyCme = true;
            newsletterIds = mycmeNewsletterIds.split(',');
        }
        var newsletters = "0";
        $('#' + registerForm + ' #tbNewsletters tr td input').each(function () {
            var r = $(this).attr("checked");
            if (r == "checked") {
                r = true;
            }
            else {
                r = false;
            }
            if (r == true) {
                var i = $(this).attr('id').indexOf("ChkNewsletter_DynamicReg_");
                if (i != -1) {
                    var newsletterId = $(this).attr("id").substr(i + 25);
                    if (isMyCme == true) {
                        if ($.inArray(newsletterId, newsletterIds) != -1) {
                            newsletters += "," + newsletterId;
                        }
                    } else {
                        newsletters += "," + newsletterId;
                    }
                }
            }
        });

        $('#' + registerForm + ' #tbRelatedNewsletters tr td input').each(function () {
            var r = $(this).attr("checked");
            if (r == "checked") {
                r = true;
            }
            else {
                r = false;
            }
            if (r == true) {
                var i = $(this).attr('id').indexOf("ChkNewsletter_DynamicReg_");
                if (i != -1) {
                    var newsletterId = $(this).attr("id").substr(i + 25);
                    newsletters += "," + newsletterId;
                }
            }
        });

        var specialOffers = "0";
        $('#' + registerForm + ' #tbSpecialOffers tr td input').each(function () {
            var r = $(this).attr("checked");
            if (r == "checked") {
                r = true;
            } else {
                r = false;
            }
            if (r == true) {
                var i = $(this).attr('id').indexOf("ChkSpecialOffer_DynamicReg_");
                if (i != -1) {
                    var specialOfferId = $(this).attr("id").substr(i + 27);
                    specialOffers += "," + specialOfferId;
                }
            }
        });

        if (linkAccounts) {
            if ($("#divLinkAccountReceiveEmail .chk_Registration_ReceiveEmail").length) {
                if ($("#divLinkAccountReceiveEmail .chk_Registration_ReceiveEmail").attr("checked") === "checked") {
                    linkAccountsObj.ReceiveEmail = true;
                } else {
                    linkAccountsObj.ReceiveEmail = false;
                }
            } 
        } else {
            if ($("#divAlmostDoneReceiveEmail .chk_Registration_ReceiveEmail").length) {
                if ($("#divAlmostDoneReceiveEmail .chk_Registration_ReceiveEmail").attr("checked") === "checked") {
                    linkAccountsObj.ReceiveEmail = true;
                } else {
                    linkAccountsObj.ReceiveEmail = false;
                }
            } else if ($("#divRegistrationQuestions #chk_Registration_ReceiveEmail").length) {
                if ($("#divRegistrationQuestions #chk_Registration_ReceiveEmail").attr("checked") === "checked") {
                    linkAccountsObj.ReceiveEmail = true;
                } else {
                    linkAccountsObj.ReceiveEmail = false;
                }
            }
            else {
                linkAccountsObj.ReceiveEmail = false;
            }
        }

        if ($("#chk_Registration_ReceivePromotions").length) {
            if ($("#chk_Registration_ReceivePromotions").attr("checked") === "checked") {
                linkAccountsObj.ReceivePromotions = true;
            } else {
                linkAccountsObj.ReceivePromotions = false;
            }
        } else {
            linkAccountsObj.ReceivePromotions = false;
        }

        // include janrain 
        if ($('#janrain_ssisid').val()) {
            linkAccountsObj.SSISId = $('#janrain_ssisid').val();            
        }

        linkAccountsObj.NewsletterIds = newsletters;
        linkAccountsObj.SpecialOfferIds = specialOffers;

        var ajaxUrl;
        if (linkAccounts) {
            ajaxUrl = dynamicUrl + "?action=6&returl=" + returnUrl;
        } else {
            ajaxUrl = dynamicUrl + "?action=4&pagetypeid=132";
        }

        $.ajax({
            global: false,
            type: "POST",
            url: ajaxUrl,
            data: JSON.stringify(linkAccountsObj),
            contentType: "application/json;charset=utf-8",
            async: true,
            success: function (data) {

                var responseCode = data.JsonResult;

                if (responseCode != null && responseCode != "") {
                    if (responseCode == "4") {
                        if (isGatedContent) {
                            if (linkAccounts) {
                                $("#gatedAccountLinkWrapper").slideUp(800, function () {
                                    $("#gatedConfirmWrapper").fadeIn();
                                });
                            } else {
                                $("#gatedAlmostDoneWrapper").slideUp(800, function () {
                                    $("#gatedConfirmWrapper").fadeIn();
                                });
                            }
                            ////change login status
                            //$("#loginStatus").load(publicationUrl + "/login/loginstatus");
                        } else {
                            $('[id$="divIntroText"], #lightboxFormWrapper, #lightboxRightCol').hide();
                            if (linkAccounts) {
                                $("#lightboxHeader h3").text("Account Linked");
                            } else {
                                $("#lightboxHeader h3").text("Registration Successful");
                            }
                            $("#" + registerForm).hide();
                            $("#lightboxContent #divRegistrationSuccessMsg").empty();
                            $("#lightboxContent #divRegistrationSuccessMsg").html(thankyouText);
                            $("#lightboxContent #divRegistrationSuccessMsg").show();

                            if (data.returnUrl) {
                                window.setTimeout(function () { window.location.href = data.returnUrl; }, 5000);
                            } else {
                                window.setTimeout(function () { location.reload(true); }, 5000);
                            }
                        }
                    } else {
                        if (responseCode == "1") {

                            //$("#RegistrationSuccessful").hide();
                            $("#RegistrationLoadingDiv").hide();

                            $("#dynRegistrationFormContainer").show();
                            $("#" + content + " .errorMessage").html("This email address already exists in our system, please provide a different email address or sign in with your email and password to link accounts.");
                            $("#" + content + " .errorMessage").show();
                        } else if (responseCode == "2") {
                            //$("#RegistrationSuccessful").hide();
                            $("#RegistrationLoadingDiv").hide();

                            $("#dynRegistrationFormContainer").show();
                            $("#" + content + " .errorMessage").html("This email address already exists in our system but with a blank password, please change the password.");
                            $("#" + content + " .errorMessage").show();
                        } else if (responseCode == "3") {
                            //$("#RegistrationSuccessful").hide();
                            $("#RegistrationLoadingDiv").hide();

                            $("#dynRegistrationFormContainer").show();
                            $("#" + content + " .errorMessage").html("Registration failed, please email <a href='mailto:"
                                + adminEmail + "'>admin</a> for further assistance.");
                            $("#" + content + " .errorMessage").show();
                        }
                    }
                }
            },
            error: function (jqXHR) {
                console.log(jqXHR);
            }
        });
    }
    else {
        $("#" + content + " p.errorMessage").html(genericErrMsg);
        $("#" + content + " p.errorMessage").show();
    }
}

function ClearLoginForm() {
    $('#lightboxLoginForm #LoginContainer [id$="_Login_field"]').each(function () {
        $(this).val("");
        if ($(this).hasClass("fieldError")) {
            $(this).removeClass("fieldError");
        }
    });

    $('#lightboxLoginForm #LoginContainer [id$="chkRememberMe"]').attr("checked", "checked");
}

function ValidateLoginForm(isGatedContent) {
    var result = true;
    var loginFields = $('#lightboxLoginForm  [id$="_Login_field"]');
    if (isGatedContent) {
        loginFields = $('#gatedLoginForm  [id$="_Login_field"]');
    }

    loginFields.each(function () {
        var fieldVal = new String();
        fieldVal = $(this).val();

        var innerResult = true;

        var rfvText = $(this).attr('rfvaltext');
        if (rfvText != undefined && rfvText != "") {
            if (fieldVal == "") {
                $(this).addClass("fieldError");
                innerResult = false;
                result = false;
            }
            else {
                if ($(this).hasClass("fieldError")) {
                    $(this).removeClass("fieldError");
                }
            }
        }

        if (innerResult) {
            var revEx = $(this).attr('regexvalidationexpression');
            var revText = $(this).attr('regexvaltext');
            if (revEx != undefined && revEx != "") {
                var regexExpression = new RegExp(revEx);
                if (!regexExpression.test(fieldVal)) {
                    $(this).addClass("fieldError");
                    innerResult = false;
                    result = false;
                }
                else {
                    if ($(this).hasClass("fieldError")) {
                        $(this).removeClass("fieldError");
                    }
                }
            }
        }

        if (innerResult) {
            var compareText = $(this).attr('comparevaltext');
            var compareTo = $(this).attr('compareto');
            var compareToVal = $('#lightboxContent #LoginContainer [id$=\"' + compareTo + '\"]').val();
            if (compareText != undefined && compareText != "") {
                if (fieldVal != compareToVal) {
                    $(this).addClass("fieldError");
                    innerResult = false;
                    result = false;
                }
                else {
                    if ($(this).hasClass("fieldError")) {
                        $(this).removeClass("fieldError");
                    }
                }
            }
        }

        if (innerResult) {
            var rangeText = $(this).attr('rangevalidation-int');
            if (rangeText != undefined && rangeText != "") {
                var rangeVals = rangeText.split("-");
                var minVal = rangeVals[0];
                var maxVal = rangeVals[1];

                if (fieldVal != null && fieldVal != undefined && fieldVal != "") {
                    var valueOfField = parseInt(fieldVal);

                    if (minVal != undefined && minVal != "" && maxVal != undefined && maxVal != "") {
                        minVal = parseInt(minVal);
                        maxVal = parseInt(maxVal);

                        if (valueOfField >= minVal && valueOfField <= maxVal) {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                        else {
                            $(this).addClass("fieldError");
                            innerResult = false;
                            result = false;
                        }
                    }
                }
                else {
                    if ($(this).hasClass("fieldError")) {
                        $(this).removeClass("fieldError");
                    }
                }
            }
        }
    });

    return result;
}

function ClearForgotPWDForm() {
    $('#lightboxPasswordForm #ForgotPWDContainer [id$="_ForgotPWD_field"]').each(function () {
        $(this).val("");
        if ($(this).hasClass("fieldError")) {
            $(this).removeClass("fieldError");
        }
    });
}

function ValidateForgotPWDForm(isGatedContent) {
    var result = true;
    var passwordFields = $('#lightboxPasswordForm  [id$="_ForgotPWD_field"]');
    if (isGatedContent) {
        passwordFields = $('#gatedPasswordForm  [id$="_ForgotPWD_field"]');
    }

    passwordFields.each(function () {
        var fieldVal = new String();
        fieldVal = $(this).val();

        var innerResult = true;

        var rfvText = $(this).attr('rfvaltext');
        if (rfvText != undefined && rfvText != "") {
            if (fieldVal == "") {
                $(this).addClass("fieldError");
                innerResult = false;
                result = false;
            }
            else {
                if ($(this).hasClass("fieldError")) {
                    $(this).removeClass("fieldError");
                }
            }
        }

        if (innerResult) {
            var revEx = $(this).attr('regexvalidationexpression');
            var revText = $(this).attr('regexvaltext');
            if (revEx != undefined && revEx != "") {
                var regexExpression = new RegExp(revEx);
                if (!regexExpression.test(fieldVal)) {
                    $(this).addClass("fieldError");
                    innerResult = false;
                    result = false;
                }
                else {
                    if ($(this).hasClass("fieldError")) {
                        $(this).removeClass("fieldError");
                    }
                }
            }
        }

        if (innerResult) {
            var compareText = $(this).attr('comparevaltext');
            var compareTo = $(this).attr('compareto');
            var compareToVal = $('#ForgotPWDFormContainer [id$=\"' + compareTo + '\"]').val();
            if (compareText != undefined && compareText != "") {
                if (fieldVal != compareToVal) {
                    $(this).addClass("fieldError");
                    innerResult = false;
                    result = false;
                }
                else {
                    if ($(this).hasClass("fieldError")) {
                        $(this).removeClass("fieldError");
                    }
                }
            }
        }

        if (innerResult) {
            var rangeText = $(this).attr('rangevalidation-int');
            if (rangeText != undefined && rangeText != "") {
                var rangeVals = rangeText.split("-");
                var minVal = rangeVals[0];
                var maxVal = rangeVals[1];

                if (fieldVal != null && fieldVal != undefined && fieldVal != "") {
                    var valueOfField = parseInt(fieldVal);

                    if (minVal != undefined && minVal != "" && maxVal != undefined && maxVal != "") {
                        minVal = parseInt(minVal);
                        maxVal = parseInt(maxVal);

                        if (valueOfField >= minVal && valueOfField <= maxVal) {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                        else {
                            $(this).addClass("fieldError");
                            innerResult = false;
                            result = false;
                        }
                    }
                }
                else {
                    if ($(this).hasClass("fieldError")) {
                        $(this).removeClass("fieldError");
                    }
                }
            }
        }
    });

    return result;
}

function ClearRegistrationForm() {
    var selectedCountryCode = "US";

    $('#RegistrationContainer [id$="_Reg_field"]').each(function () {
        if ($(this).hasClass("watermark-textbox")) {
            var titleVal = $(this).attr("default-watermarktext");
            var fieldVal = $(this).val();
            $(this).val(titleVal);
            if (!($(this).hasClass("medRegisterInactive"))) {
                $(this).addClass("medRegisterInactive");
            }
        }
        else {
            var idVal = $(this).attr("id");
            if (idVal.indexOf("ddlCountry_Reg_field") != -1) {
                //for default country selection other than US
                if (userCountryCode == "UK") {
                    $(this).val("UK");
                    selectedCountryCode = "UK";
                    CountryOnChangeEventHandler("US", "UK", false);
                    ProfessionOnChangeEventHandler();
                } else {
                    $(this).val("US");
                }
            }
            else {
                $(this).val("");
            }
        }

        if ($(this).hasClass("fieldError")) {
            $(this).removeClass("fieldError");
        }
    });

    CheckNewsletterByCountry(selectedCountryCode);
    ToggleReceiveEmail(selectedCountryCode);
    
    $('#tbSpecialOffers tr td input').each(function () {
        var i = $(this).attr('id').indexOf("ChkSpecialOffer_DynamicReg_");
        if (i != -1) {
            if ($(this).attr("pre-checked") == "true") {
                $(this).attr("checked", "checked");
            }
            else {
                $(this).removeAttr("checked");
            }
        }
    });

    var uncheckedNewsletterIds;
    if (uncheckNewsletterIds != null && uncheckNewsletterIds != undefined && uncheckNewsletterIds != "") {
        uncheckedNewsletterIds = uncheckNewsletterIds.split(',');
    }
    //load mycme newsletter by country
    if (mycmeNewsletterIds != null && mycmeNewsletterIds != undefined && mycmeNewsletterIds != "") {
        var newsletterIds = mycmeNewsletterIds.split(',');
        $('#tbNewsletters tr td').each(function () {
            var itemId = $(this).attr('id');
            if (itemId != null && itemId != undefined && itemId != "") {
                var i = itemId.indexOf("newsletterItemCheckbox_DynamicReg_");
                if (i != -1) {
                    var newsletterId = $(this).attr("id").substr(i + 34);
                    if ($.inArray(newsletterId, newsletterIds) == -1) {
                        $(this).hide();
                    }
                    if ($.inArray(newsletterId, uncheckedNewsletterIds) != -1) {
                        $(this).find("input:checkbox").removeAttr('checked');
                    }
                }
            }
        });
    }
}

function ValidateRegistrationForm(isGatedContent) {
    var result = true;
    var registerFields = $('#RegistrationContainer  [id$="_Reg_field"]');
    if (isGatedContent) {
        registerFields = $('#gatedRegisterForm  [id$="_Reg_field"]');
    }
    registerFields.each(function () {
        var validateState = false;
        var fieldId = $(this).attr("id");
        var ctlType = $(this).attr("controltype");
        var isStateField = fieldId.indexOf("ddlState_Reg_field");
        var countryVal = $('#RegistrationContainer [id$="ddlCountry_Reg_field"]').val();
        if (ctlType == "textdropdown" && isStateField != -1) {
            validateState = true;
        }
        else {
            validateState = false;
        }

        var fieldVal = new String();
        fieldVal = $(this).val();
        var fieldTitle = $(this).attr("default-watermarktext");
        if ($(this).hasClass("watermark-textbox") && fieldVal != null && fieldVal != "" && fieldVal != undefined && fieldVal == fieldTitle) {
            fieldVal = "";
        }


        if ((validateState && countryVal == "US") || (!validateState)) {
            var innerResult = true;

            var rfvText = $(this).attr('rfvaltext');
            if (rfvText != undefined && rfvText != "") {
                if (fieldId.indexOf("ddlProfession_Reg_field") != -1) {
                    if (fieldVal == "-1") {
                        $(this).addClass("fieldError");
                        innerResult = false;
                        result = false;
                    }
                    else {
                        if ($(this).hasClass("fieldError")) {
                            $(this).removeClass("fieldError");
                        }
                    }
                }
                else {
                    if (fieldId.indexOf("ddlSpecialty_Reg_field") != -1) {
                        var specReq = $('[id$="ddlProfession_Reg_field"] option:selected').attr("sr");
                        if (specReq == "True") {
                            if (fieldVal == "") {
                                $(this).addClass("fieldError");
                                innerResult = false;
                                result = false;
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }
                        else {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                    }
                    else if (fieldId.indexOf("txtYearofGraduation_Reg_field") != -1) {
                        var yrReq = $('[id$="ddlProfession_Reg_field"] option:selected').attr("yr");
                        if (yrReq == "True") {
                            if (fieldVal == "") {
                                $(this).addClass("fieldError");
                                innerResult = false;
                                result = false;
                            }
                            else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }
                        else {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                    }
                    else {
                        if (fieldId == 'txtPassword_Reg_field' && requirePasswordDynReg == false) {

                        } else {


                            if (fieldVal == "") {
                                $(this).addClass("fieldError");
                                innerResult = false;
                                result = false;
                            } else {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                        }
                    }
                }
            }

            if (innerResult) {
                var revEx = $(this).attr('regexvalidationexpression');

                if (fieldId == 'txtPassword_Reg_field' && requirePasswordDynReg == false) {

                } else {

                    var revText = $(this).attr('regexvaltext');
                    if (revEx != undefined && revEx != "") {
                        var regexExpression = new RegExp(revEx);
                        if (!regexExpression.test(fieldVal)) {
                            $(this).addClass("fieldError");
                            innerResult = false;
                            result = false;
                        } else {
                            if ($(this).hasClass("fieldError")) {
                                $(this).removeClass("fieldError");
                            }
                        }
                    }
                }
            }

            if (innerResult) {
                var compareText = $(this).attr('comparevaltext');
                var compareTo = $(this).attr('compareto');
                var compareToVal = $('#RegistrationContainer [id$=\"' + compareTo + '\"]').val();
                if (compareText != undefined && compareText != "") {
                    if (fieldVal != compareToVal) {
                        $(this).addClass("fieldError");
                        innerResult = false;
                        result = false;
                    }
                    else {
                        if ($(this).hasClass("fieldError")) {
                            $(this).removeClass("fieldError");
                        }
                    }
                }
            }

            if (innerResult) {
                var rangeText = $(this).attr('rangevalidation-int');
                if (rangeText != undefined && rangeText != "") {
                    var rangeVals = rangeText.split("-");
                    var minVal = rangeVals[0];
                    var maxVal = rangeVals[1];

                    if (fieldVal != null && fieldVal != undefined && fieldVal != "") {
                        var valueOfField = parseInt(fieldVal);

                        if (minVal != undefined && minVal != "" && maxVal != undefined && maxVal != "") {
                            minVal = parseInt(minVal);
                            maxVal = parseInt(maxVal);

                            if (valueOfField >= minVal && valueOfField <= maxVal) {
                                if ($(this).hasClass("fieldError")) {
                                    $(this).removeClass("fieldError");
                                }
                            }
                            else {
                                $(this).addClass("fieldError");
                                innerResult = false;
                                result = false;
                            }
                        }
                    }
                    else {
                        if ($(this).hasClass("fieldError")) {
                            $(this).removeClass("fieldError");
                        }
                    }
                }
            }
        }

    });

    if ($("#chk_Registration_VerifyAgeQuestion").length) {
        if (!($("#chk_Registration_VerifyAgeQuestion").attr("checked") === "checked")) {
            $("#div_Registration_VerifyAgeQuestion").addClass("registrationQuestionError");
            result = false;
        } else {
            if ($("#div_Registration_VerifyAgeQuestion").hasClass("registrationQuestionError")) {
                $("#div_Registration_VerifyAgeQuestion").removeClass("registrationQuestionError");
            }
        }
    }

    return result;
}

function isNumberKeyForDynReg(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function ProfessionOnChangeEvent() {
    $('[id$="ddlProfession_Reg_field"]').change(function () {
        ProfessionOnChangeEventHandler();
    });

}

function ProfessionOnChangeEventHandler() {
    var countryCode = $('[id$="ddlCountry_Reg_field"] option:selected').val();

    var hasSpecs = $('[id$="ddlProfession_Reg_field"] option:selected').attr("hs");
    var specReq = $('[id$="ddlProfession_Reg_field"] option:selected').attr("sr");
    var yrReq = $('[id$="ddlProfession_Reg_field"] option:selected').attr("yr");
    var proId = $('[id$="ddlProfession_Reg_field"] option:selected').attr("value");
    SetGmcNumberInputEvent();
    SetProfessionGmcNumberDisplay();
    LoadSpecialties(proId, countryCode, hasSpecs, specReq, yrReq);
    LoadJobRoles(proId, countryCode, hasSpecs, specReq, yrReq);
}

function SetProfessionGmcNumberDisplay() {
    if ($("#txtGmcnumber_Reg_field").length > 0) {
        var professionName = $("#ddlProfession_Reg_field option:selected").text().toLowerCase();
        if (professionName == generalPractitioner) {
            $("#divRegistrationGmcnumber").show();
        } else {
            $("#divRegistrationGmcnumber").hide();
            $("#txtGmcnumber_Reg_field").val("");
        }
    }
}

function JobRoleChangeEvent(jobRoleDropDown) {
    if ($(jobRoleDropDown).find(":selected").attr("allowUserEntry") == "true") {
        $(jobRoleDropDown).next(".otherJobRoleText").show();
    } else {
        $(jobRoleDropDown).next(".otherJobRoleText").hide();
        $(jobRoleDropDown).next(".otherJobRoleText").val("");
    }
}


function OtherTagsClickEvent(otherTopic) {
    if ($(otherTopic).prop("checked")) {
        $(".otherTopicsText").show();
    } else {
        $(".otherTopicsText").hide();
        $(".otherTopicsText").val("");
    }
}


function LoadSpecialties(proId, countryCode, hasSpecs, specReq, yrReq) {
    var optionVals;
    optionVals = GetProfessionSpecialties(proId, countryCode);
    if (optionVals != "" && optionVals != undefined && optionVals != "") {
        if (optionVals != "-1") {
            BindOptions(optionVals);
        } else {
            hasSpecs = "False";
            specReq = "False";
        }
    }

    if (hasSpecs == "True") {
        $('[id$="ddlSpecialty_Reg_field"]').removeAttr("disabled");
    }
    else {
        $('[id$="ddlSpecialty_Reg_field"]').attr("disabled", true);
        $('[id$="ddlSpecialty_Reg_field"]').val("");
    }

    if (specReq == "True") {
        $('#divRegistrationSpecialty #dynRegRequiredField_specialty').show();
    }
    else {
        $('#divRegistrationSpecialty #dynRegRequiredField_specialty').hide();

        if ($('[id$="ddlSpecialty_Reg_field"]').hasClass("fieldError")) {
            $('[id$="ddlSpecialty_Reg_field"]').removeClass("fieldError");
        }
    }

    if (yrReq == "True") {
        $('#divRegistrationYearofGraduation #dynRegRequiredField_yrOfGraduation').show();
        $('#divRegistrationExpectedYearofGraduation #dynRegRequiredField_yrOfGraduation').show();
    } else {
        $('#divRegistrationYearofGraduation #dynRegRequiredField_yrOfGraduation').hide();
        $("#txtYearOfGraduation_Reg_field").val("");

        if ($('[id$="txtYearofGraduation_Reg_field"]').hasClass("fieldError")) {
            $('[id$="txtYearofGraduation_Reg_field"]').removeClass("fieldError");
        }
        
        $('#divRegistrationExpectedYearofGraduation #dynRegRequiredField_yrOfGraduation').hide();

        if ($('[id$="txtExpectedYearofGraduation_Reg_field"]').hasClass("fieldError")) {
            $('[id$="txtExpectedYearofGraduation_Reg_field"]').removeClass("fieldError");
        }
    }
}

function LoadJobRoles(proId, countryCode, hasSpecs, specReq, yrReq) {
    if ($("#ddlJobRole_Reg_field").length > 0) {
        var optionVals;
        optionVals = GetProfessionJobRoles(proId, countryCode);
        if (optionVals != "" && optionVals != undefined && optionVals != "") {
            if (optionVals != "-1") {
                BindJobRoleOptions(optionVals);
            }
        }
        if (yrReq == "True") {
            $("#divRegistrationYearOfGraduation").show();
            $('#divRegistrationYearofGraduation #dynRegRequiredField_yrOfGraduation').show();
        } else {
            $("#divRegistrationYearOfGraduation").hide();
            $("#txtYearOfGraduation_Reg_field").val("");
            $('#divRegistrationYearofGraduation #dynRegRequiredField_yrOfGraduation').hide();

            if ($('[id$="txtYearofGraduation_Reg_field"]').hasClass("fieldError")) {
                $('[id$="txtYearofGraduation_Reg_field"]').removeClass("fieldError");
            }
        }
    }
}

function CountryOnChangeEvent() {
    if ($('[id$="ddlCountry_Reg_field"]').attr("IsChangeOnCountryChange") == "true") {
        var previousCountry;
        $('[id$="ddlCountry_Reg_field"]').each(function() {
            previousCountry = $('[id$="ddlCountry_Reg_field"] option:selected').val();
        }).change(function() {

            var currentCountry = $('[id$="ddlCountry_Reg_field"] option:selected').val();
            CountryOnChangeEventHandler(previousCountry, currentCountry, true);
            CheckNewsletterByCountry(currentCountry);
            ToggleReceiveEmail(currentCountry);
        });
    }
}

function CountryOnChangeEventHandler(previousCountry, currentCountry, isCountryChanged) {
    if ($('[id$="ddlCountry_Reg_field"]').attr("IsChangeOnCountryChange") == "true") {
        if (currentCountry == "US") {
            $('#divRegistrationState-textdropdown [id$="pnlStateDropdown"]').show();
            $('#divRegistrationState-textdropdown [id$="pnlStateTextbox"]').hide();
            $('#divRegistrationState-textdropdown #dynRegRequiredField_textdropdown').show();
        } else {
            $('#divRegistrationState-textdropdown [id$="ddlState_Reg_field"]').val("NY");
            $('#divRegistrationState-textdropdown [id$="pnlStateDropdown"]').hide();
            $('#divRegistrationState-textdropdown [id$="pnlStateTextbox"]').show();
            $('#divRegistrationState-textdropdown #dynRegRequiredField_textdropdown').hide();
        }

        if (!((previousCountry != "US" && previousCountry != "UK") && (currentCountry != "US" && currentCountry != "UK"))) {
            if ($('[id$="ddlProfession_Reg_field"]').length) {
                var professionSpecs = GetProfessionByCountry(currentCountry, isCountryChanged);
                if (professionSpecs != null && professionSpecs != undefined) {
                    BindProfessionDropDown(professionSpecs.Professions);
                    BindOptions(professionSpecs.DefaultSpecialties);
                    $('[id$="ddlSpecialty_Reg_field"]').removeAttr("disabled");
                }
            }
        }
    }
}

function CheckNewsletterByCountry(countryCode) {
    $('#tbNewsletters tr td input').each(function () {
        var i = $(this).attr('id').indexOf("ChkNewsletter_DynamicReg_");
        if (i != -1) {
            if (countryCode == "US" && $(this).attr("pre-checked") == "true") {
                $(this).attr("checked", "checked");
            }
            else {
                $(this).removeAttr("checked");
            }
        }
    });

    $('#tbRelatedNewsletters tr td input').each(function () {
        var i = $(this).attr('id').indexOf("ChkNewsletter_DynamicReg_");
        if (i != -1) {
            if (countryCode == "US" && $(this).attr("pre-checked") == "true") {
                $(this).attr("checked", "checked");
            }
            else {
                $(this).removeAttr("checked");
            }
        }
    });
}

function ToggleReceiveEmail(countryCode) {
    if ($(".divReceiveEmail").length) {
        if (countryCode == "US") {
            $(".divReceiveEmail").hide();
            $(".chk_Registration_ReceiveEmail").removeAttr("checked");
        } else {
            $(".divReceiveEmail").show();
        }
    }
}

function BindProfessionDropDown(ddlOptions) {
    $('[id$="ddlProfession_Reg_field"] option').each(function () {
        var optionVal = $(this).attr("value");
        if (optionVal != null && optionVal != undefined && optionVal != "") {
            $(this).remove();
        }
        else {
            $(this).attr("selected", "selected");
        }
    });

    var optionVals = ddlOptions.split("|");
    $.each(optionVals, function (intIndex, objValue) {
        var idNamePair = optionVals[intIndex].split(":");
        $('[id$="ddlProfession_Reg_field"]').append($('<option></option>').val(idNamePair[0]).html(idNamePair[1]).attr("scid", idNamePair[2]).attr("hs", idNamePair[3]).attr("sr", idNamePair[4]).attr("yr", idNamePair[5]));
    });
}

function BindOptions(ddlOptions) {
    $('[id$="ddlSpecialty_Reg_field"] option').each(function () {
        var optionVal = $(this).attr("value");
        if (optionVal != null && optionVal != undefined && optionVal != "") {
            $(this).remove();
        }
        else {
            $(this).attr("selected", "selected");
        }
    });

    var optionVals = ddlOptions.split("|");
    $.each(optionVals, function (intIndex, objValue) {
        var idNamePair = optionVals[intIndex].split(":");
        $('[id$="ddlSpecialty_Reg_field"]').append($('<option></option>').val(idNamePair[0]).html(idNamePair[1]));
    });
}

function BindJobRoleOptions(ddlOptions) {
    $(".otherJobRoleText").hide();
    $('[id$="ddlJobRole_Reg_field"] option').each(function () {
        var optionVal = $(this).attr("value");
        if (optionVal != null && optionVal != undefined && optionVal != "") {
            $(this).remove();
        }
        else {
            $(this).attr("selected", "selected");
        }
    });

    //var optionVals = ddlOptions.split("|");
    $.each(ddlOptions, function (intIndex, objValue) {
        $('[id$="ddlJobRole_Reg_field"]').append($('<option></option>').val(ddlOptions[intIndex].JobRoleId).html(ddlOptions[intIndex].Name).attr("allowUserEntry", ddlOptions[intIndex].AllowUserEntry));
    });

    if ($(".otherJobRoleText").length == 0) {
        $('[id$="ddlJobRole_Reg_field"]').after("<input type='text' maxlength='100' class='otherJobRoleText' style='display: none; margin-top: 10px;'/>");
    }
}

function GetProfessionSpecialties(proId, countryCode) {
    if (proId == undefined) {
        return undefined;
    }

    var returnVal;

    $.ajax({
        global: false,
        type: "POST",
        url: dynamicUrl + "?loadspecs=true",
        data: JSON.stringify({ ProfessionId: proId, CountryCode: countryCode }),
        contentType: "application/json;charset=utf-8",
        async: false,
        success: function (response) {
            returnVal = response.JsonResult;
        }
    });

    return returnVal;
}

function GetProfessionJobRoles(proId, countryCode) {
    
    if (proId == undefined) {
        return undefined;
    }

    var returnVal;

    $.ajax({
        global: false,
        type: "POST",
        url: dynamicUrl + "?loadjobroles=true",
        data: JSON.stringify({ ProfessionId: proId, CountryCode: countryCode }),
        contentType: "application/json;charset=utf-8",
        async: false,
        success: function (response) {
            returnVal = response;
        },
        error: function() {
            alert("error on job role");
        }
        
    });

    return returnVal;
}

function GetProfessionByCountry(countryCode, isCountryChanged) {
    var returnVal;

    $.ajax({
        global: false,
        type: "POST",
        url: dynamicUrl + "?loadprofession=true&isCountryChange=" + isCountryChanged,
        data: JSON.stringify({ CountryCode: countryCode }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            returnVal = response.ProfessionSpecialties;
        }
    });

    return returnVal;
}

function ShowAllJanrainProviders() {
    $('#janranBackUser').hide();
    $('#loginJanRain').show();
}

function submitOnEnter(formLinkVal, isGatedContent) {

    $("#lightboxFormWrapper input, #gatedContent input").bind("keydown", function (e) {
        if (e.keyCode == 13) {
            if (formLinkVal === "login") {
                UserLogin(isGatedContent);
            }
            else if (formLinkVal === "password") {
                SendForgottenPassword(isGatedContent);
            }
            else {
                UserRegistration(isGatedContent);
            }
        }
    });
}


function validateRegexForFieldCheck(idOfFieldTocheck) {
    var result = false;
    var revEx = $("#" + idOfFieldTocheck).attr("regexvalidationexpression");
    var fieldID = idOfFieldTocheck;
    $("#errResetPasswordForm").empty();

    if (revEx != undefined && revEx != "" && fieldID != "txtEmail_Reg_field" && fieldID != "txtPassword_Reg_field") {

        var regexExpression = new RegExp(revEx);
        var fieldVal = $("#"+idOfFieldTocheck).val();
        if (!regexExpression.test(fieldVal) || $("#" + idOfFieldTocheck).val().replace(/ /g, '').length < 1) {

            $(this).addClass("fieldError");
            $("#errResetPasswordForm").css('color', 'red');
            $("#errResetPasswordForm").text($("#" + idOfFieldTocheck).attr("regexvaltext"));
            $("#" + idOfFieldTocheck).focus();
            
            result = false;
        } else {
            result = true;
            if ($(this).hasClass("fieldError")) {
                $(this).removeClass("fieldError");
            }
        }
    }
    return result;
}

function compareFieldCheck(idOfFieldTocheck, idOfFieldToUseInCheck) {
    var result = false;
    if ($("#" + idOfFieldTocheck).length) {
        var compareText = $("#" + idOfFieldToUseInCheck).val();
        var fieldVal = $("#" + idOfFieldTocheck).val();
        if (compareText != undefined && compareText != "") {
            if (fieldVal != compareText) {
                $(this).addClass("fieldError");
                $("#errResetPasswordForm").css('color', 'red');
                $("#errResetPasswordForm").text($("#" + idOfFieldToUseInCheck).attr("rfvaltext"));
                result = false;
            } else {
                $("#errResetPasswordForm").empty();
                if ($(this).hasClass("fieldError")) {
                    $(this).removeClass("fieldError");
                }
                result = true;
            }
        }
    }
    return result;
}

// To use function, html for the lightbox should already exist on the DynamicRegister/Index.cshtml
function showLightBox(lightboxID, formLinkVal, lightboxWidth, header, contentUrl, logoutUserOnClose) {

    var docScrollTop = $(document).scrollTop();
    var exitSurvey = false;

    var containerWidth = $('.container').width();
    var containerMargin = $('.container').css('margin-left');
    if (containerMargin == "0px") {
        var winWidth = containerWidth;
    } else {
        var winWidth = $(window).width();
    }

    var winHeight = $(window).height();
    var docHeight = $(document).height();
    var docWidth = $(document).width();
    var lightboxHeight = 0;

    //get lightbox content
    $.ajax({
        url: contentUrl,
        type: 'get',
        dataType: "html",
        success: function (result) {
            LoadLightBox(lightboxID, header);
            $("#lightboxContentWrapper" + lightboxID + " #lightboxContent").html(result);
        },
        complete: function () {

            // if lightbox is already opened, then kill the delay pop-up timer
            if (delayTimeout != null && delayTimeout != undefined) {
                clearTimeout(delayTimeout);
            }

            //open lightbox
            DynamicLoadForms(formLinkVal, winHeight, winWidth, docHeight, docScrollTop, lightboxWidth, lightboxHeight, lightboxID);
            //close lightbox event
            $("#lightboxClose").click(function () {
                if (logoutUserOnClose == true) {
                    window.location.href = publicationUrl + "/Login/LogOut";
                }
                checkAdvisorEmail();
            });

            if (!exitSurvey) {
                $("#lightboxMask").click(function () {
                    if (logoutUserOnClose == true) {
                        window.location.href = publicationUrl + "/Login/LogOut";
                    }
                    checkAdvisorEmail();
                });
            }
            function checkAdvisorEmail() {
                //event.preventDefault();
                closeLightbox(lightboxID);
                if (!getCookie(customModalRegistrationSwitch)) {
                    setCookie(customModalRegistrationSwitch, 1, 8);
                }
            }

            //form switch event
            $("#formSwitch, #lightboxLoginForm .forgotPassLink").click(function () {
                formLinkVal = $(this).attr("data-form");
                showForm(formLinkVal);

                var loginhtadjust = $("#lightboxLogin").height() - 200; //adjust for positioning when form is switched.
                var reghtadjust = $("#lightboxLogin").height() - 750;
                //if < IE 8 open alert
                if ($.browser.msie && parseInt($.browser.version, 10) < 9) {
                    if (formLinkVal == "register") {
                        htadjust = $("#lightboxLogin").height() - 600;
                        paddingHght(htadjust);
                    } else if (formLinkVal == "login") {
                        htadjust = $("#lightboxLogin").height() - 500;
                        paddingHght(htadjust);
                    }
                } else {
                    if (formLinkVal == "register") {
                        htadjust = reghtadjust;
                        paddingHght(htadjust);
                    } else if (formLinkVal == "login") {
                        htadjust = loginhtadjust;
                        paddingHght(htadjust);
                    }
                }


                function paddingHght(htadjust) {
                    $('html, body').animate({
                        scrollTop: $("#lightboxLogin").offset().top - htadjust // without this window scrolls to top outside of form view
                    }, 500);
                }

            });
        }
    });

};

function ResetPasswordUserLogin(SubscriberId) {
    var content = "gatedContent"; //"lightboxContent";
    var loginForm = "gatedLoginForm";  //"lightboxResetPasswordForm";

    if (compareFieldCheck("txtPassword_Reset_field", "txtPassword_Reset_Check_field")) {
        $("#" + loginForm + " #divLoginButton").hide();
        $("#" + loginForm + " #divLoginLoading").show();

        $("#" + content + " .errorMessage").html("");
        $("#" + content + " .errorMessage").hide();

        var u = SubscriberId;
        var p = $("#txtPassword_Reset_field").val();
        var r = false;


        $(".dynamic-registration-button").attr("disabled", true);

        var dynamicLoginData = 
            {
                SubscriberId: u, 
                Password: p, 
                RememberMe: r
            };

        var dynRegUrl = dynamicUrl + "?action=7&returl=" + returnUrl;

        $("#lightboxFormWrapper").prepend('<img src="./simages/ajax-loader.png" class="ajaxLoader"/>');
        $.ajax({
            global: false,
            type: "POST",
            url: dynRegUrl,
            data: JSON.stringify(dynamicLoginData),
            contentType: "application/json;charset=utf-8",
            async: true,
            success: function (response) {
                $(".dynamic-registration-button").attr("disabled", true);

                var resultCode = response.JsonResult.toString();

                if (resultCode == "5") {
                    //Hide form and show success message
                    $("#gatedPasswordResetFormContent").html('<p class="signUpText" style="padding-bottom:10% "></p><p style="padding-bottom:10%; padding-right:5%; padding-left:5%"  class="signUpText" >Your password has been updated and you are now logged in.</p> <p class="terms" style="padding-bottom: 7%; padding-right:5%"><input style="float: right" type="button" id="btnCompleteLogin" onclick="completePasswordResetLogin(returnUrl); return false;" class="dynamic-registration-button" title="Close" value="Close" /></p>');
                }
                else if (resultCode == "2") {
                    $("#" + content + " .errorMessage").html("An account with this email address already exists in our system, but a password has yet to be established. In order to establish one, and to protect your privacy, please use the <a href=\"#\" title=\"forgot password link\" onclick=\"ShowForgotPWDForm(); return false;\">forgot password link</a> to set one up.  The system will auto-generate a password reset link for you and send it to the email address provided.  You will be able to set a new password, and update your profile, including email newsletter subscriptions.  If you have any questions, please contact <a href='mailto:" +
                                               adminEmail + "'>customer service</a>.");
                    $("#" + content + " .errorMessage").show();
                }
                else if (resultCode == "3") {
                    $("#" + content + " .errorMessage").html("Login failed. This account has been suspended.");
                    $("#" + content + " .errorMessage").show();
                }
                else if (resultCode == "4") {
                    $("#" + content + " .errorMessage").html("Login failed. This account has been deactivated.");
                    $("#" + content + " .errorMessage").show();
                }
                else if (resultCode == "1") {
                    $("#" + content + " .errorMessage").html("<span>Login failed. Please check your email address and password and try again. For further assistance, please contact <a href='mailto:" +
                        adminEmail + "'>admin</a>.</span>");
                    $("#" + content + " .errorMessage").show();
                }
                    // For existing inactive user
                else {
                    $("#" + content + " .errorMessage").html(resultCode);
                    $("#" + content + " .errorMessage").show();
                }

            },
            error: function () {
                $(".dynamic-registration-button").attr("disabled", true);

                $("#" + content + " .errorMessage").html("<span>Login failed. Please try again. For further assistance, please contact <a href='mailto:" +
                        adminEmail + "'>admin</a>.</span>");
                $("#" + content + " .errorMessage").show();
            }
        });
    }
    else {
        $("#errResetPasswordForm").css('color', 'red');
        if (! validateRegexForFieldCheck("txtPassword_Reset_field")) {
            $("#errResetPasswordForm").text($("#txtPassword_Reset_field").attr("regexvaltext"));
        } else {
            $("#errResetPasswordForm").text($("#txtPassword_Reset_Check_field").attr("rfvaltext"));
        }
    }

}

function submitResetOnEnter(SubscriberId) {

    $("#ResetPasswordContainer").bind("keydown", function (e) {
        if (e.keyCode == 13) {
            if (validateRegexForFieldCheck("txtPassword_Reset_field") && compareFieldCheck("txtPassword_Reset_field", "txtPassword_Reset_Check_field")) {
                ResetPasswordUserLogin(SubscriberId);
            }
        }
    });
}

function clearElement(idOfFieldToclear) {
    $("#" + idOfFieldToclear).html("");
}

function clearErrorFortxtPasswordResetCheckfieldClick() {
    if ($("#errResetPasswordForm").text() != $("#txtPassword_Reset_field").attr("regexvaltext")) {
        clearElement("errResetPasswordForm");
    }
}

function completePasswordResetLogin(returnUrl) {
    // Set cookies to prevent custom modal registration
    setCookie(customModalRegistrationCookieName, 0, customModalRegisteredExpireDays);

    if (returnUrl) {
        if (returnUrl.length > 0) {
            var isHro = $(location).attr('href').toLowerCase().indexOf("ishro=true") > 0;
            if (isHro) {
                returnUrl = returnUrl + "&p1=" + response.SubscriberId;
            }
            window.location.href = returnUrl;
            $(".ajaxLoader").remove();
        }
    }
    else {
        window.location.href = publicationUrl;
        $(".ajaxLoader").remove();
    }
}

