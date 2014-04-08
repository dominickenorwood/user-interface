$(document).ready(function() {
	/*THUMBNAIL NAVIGATION*/
	var thumbBox = $('#thumbNav .box');
	var thumbLink = $('#thumbNav a');
	var navThumb = $('#thumbNav img');
	var navBar = $('#thumbNav .bar');
	var thumbShadow = $('#thumbNav .shadow');
	
	/*CART CHECKOUT*/
	var cartBtn = $('.cartBtn');
	var cartForm = $('#cart form');
	var cartFrame = $('#cart .frame');
	var shipLink = $('.billShip .btn');
	var shipCell = $('.billShip .shippingInfo');
	var shipTxt = $('.billShip .colorBkg');
	var firstName = $('.billingInfo .fn');
	var midName = $('.billingInfo .mn');
	var lastName = $('.billingInfo .ln');
	var address = $('.billingInfo .address');
	var suite = $('.billingInfo .suite');
	var city = $('.billingInfo .city');
	var state = $('.billingInfo .state');
	var zip = $('.billingInfo .zip');
	var country = $('.billingInfo .country');
	
	/*FEEDBACK*/
	var feedback = $('#feedback');
	var feedbackRight = $('#feedback .right');
	var feedbackBtn = $('#feedback .left a');
	var feedForm = $('#feedback form');
	var feedSubmit = $('#feedback .button');
	var feedMsg = $('#feedback .message');
	var feedState = false;
	
	/*SKU*/
	var prodZoom = $('#prodDetail .clickZoom');
	var prodZoomOut = $('#prodDetail .exitZoom');
	var prodImg = $('#prodDetail .mainImg');
	var prodRow = $('#prodDR');
	var prodFoot = $('#prodDFoot');
	var prodFootLeft = $('#prodDFoot .left a');
	var prodMore = $('#prodDetail .moreImg');
	var prodThumb = $('#prodThumbs');
	var prodThumbLink = $('#prodThumbs .thumbs a');
	var prodThumbClose = $('#prodThumbs .close');
	
	/*CART OVERVIEW*/
	var giftCheckbox = $('#cart .checkbox');
	var msgLink = $('#cart .addMsg a');
	var msgButton = $('#giftMsg .button');
	var overlay = $('#overlay');
 	var popupStatus = 0;
	
	
	
	/*THUMBNAIL NAVIGATION*/
	$(thumbBox).hover(
	  function () {
		 var x = $(this).index();
		 $(thumbLink).eq(x).css({'color' : '#FFF'});
		 $(navThumb).eq(x).css({'left' : '235px','display':'block'}); 
		 $(navBar).eq(x).css({'left' : '-8px','display':'block'});
		 $(thumbShadow).eq(x).css({'left' : '235px','display':'block'}); 
	
	  }, 
	  function () {
		 var x = $(this).index();
		 $(thumbLink).eq(x).css({'color' : '#878888'});
		 $(navThumb).eq(x).css({'left' : '-300px','display':'none'});
		 $(navBar).eq(x).css({'left' : '-300px','display':'none'});
		 $(thumbShadow).eq(x).css({'left' : '-300px','display':'none'});
	  }
	);
	
	/*CART CHECKOUT*/
	$(cartBtn).click(function(e){
		
		var x = $(cartForm).height();
		e.preventDefault();
		if($(cartFrame).is(':animated')){
			return;
		}else{
			$(cartFrame).slideToggle("slow");
		}
		
		
	});
	/*Switch to different shipping address*/
    $(shipLink).click(function(e){
		e.preventDefault();
		$(shipTxt).css({'display':'none'});
		$(shipCell).css({'display':'block','width':'100%'});
		
	});
	/*Auto Fill Shipping Address*/
	$(firstName).keyup(function() {
	  var value = $(this).val();
	  $(".colorBkg .fn").html($(firstName).val());
	   if(value == ""){
		$(".colorBkg .fn").html(""); 
	  }
	});
	$(midName).keyup(function() {
	  var value = $(this).val();
	  $(".colorBkg .mn").html("&nbsp;" + $(midName).val() + ".");
	  if(value == ""){
		$(".colorBkg .mn").html(""); 
	  }
	});
	$(lastName).keyup(function() {
	  var value = $(this).val();
	  $(".colorBkg .ln").html("&nbsp;" + $(lastName).val());
	  if(value == ""){
		$(".colorBkg .ln").html(""); 
	  }
	});
	$(address).keyup(function() {
	  var value = $(this).val();
	  $(".colorBkg .address").html($(address).val());
	  if(value == ""){
		$(".colorBkg .address").html(""); 
	  }
	});
	$(suite).keyup(function() {
	  var value = $(this).val();
	  $(".colorBkg .suite").html("<br/>" + $(suite).val());
	  if(value == ""){
		$(".colorBkg .suite").html(""); 
	  }
	});
	$(city).keyup(function() {
	  var value = $(this).val();
	  $(".colorBkg .city").html($(city).val() + ",");
	  if(value == ""){
		$(".colorBkg .city").html(""); 
	  }
	});
	$(state).change(function() {
	  var value = $(this).val();
	  $(".colorBkg .state").html("&nbsp;" + $(state).val());
	  if(value == "0"){
		$(".colorBkg .state").html(""); 
	  }
	});
	$(zip).keyup(function() {
	  var value = $(this).val();
	  $(".colorBkg .zip").html("&nbsp;" + $(zip).val());
	  if(value == ""){
		$(".colorBkg .zip").html(""); 
	  }
	});
	$(country).change(function() {
	  var value = $(this).val();
	  $(".colorBkg .country").html("<br/>" + $(country).val());
	  if(value == ""){
		$(".colorBkg .country").html(""); 
	  }
	});

  /*FEEDBACK*/
    $(feedbackBtn).click(function(e){
		e.preventDefault();
		
		if(feedState == false){
			if ($.browser.msie && $.browser.version.substr(0,1)<7) {
				$('body').css('overflow-x', 'hidden');
				$(feedback).css({'width':'490px','right':'-420px'})
				$(feedbackRight).css({'display':'block'});
				$(feedback).animate({
					right:"-20px"
				},
				800,
				function(){
					feedState = true
				});
			 }else{
				$('body').css('overflow-x', 'hidden');
				$(feedback).css({'width':'460px','right':'-420px'})
				$(feedbackRight).css({'display':'block'});
				$(feedback).animate({
					right:"0"
				},
				800,
				function(){
					feedState = true
				});
			 }
		}else{
			$(feedback).animate({
				right:"-420px"
			},
			800,
			function(){
				$(feedback).css({'width':'40px','right':'0'})
			    $(feedbackRight).css({'display':'none'});
				$('body').css('overflow-x', 'auto');
				feedState = false
			});
		}
	});
	$(feedSubmit).click(function(e){
		e.preventDefault();
		$(feedForm).css({"display":"none"});
		$(feedMsg).css({"display":"block"});
	});
  
    /*FORM VALIDATION*/
	$( '#postForm' ).ipValidate( {
		required : { //check for blank input
			rule : function() {
				return $( this ).val() == '' ? false : true;
			},
			onError : function() {
				var tagLabel = $( this ).parent().find("label").text();
				var position = $( this ).position();
				var validTag = $('<div class="tag"><div class="frame">Please enter a valid<br />' + tagLabel + '<div class="slug"></div></div></div>');
				
				$(this).css({"border-color":"#CC6666"});
				$( this ).parent().append(validTag);
				$(validTag).css({"top" : (position.top - 15) + "px","left" : (position.left - 145) + "px"});
			},
			onValid : function() {
				$(this).css({"border-color":"#C6C7C6"});
				$( this ).parent().find(".tag").remove();
				//$(this).focus();
			}
		},
		nonzero : { //validate combobox
			rule : function() {
				return $( this ).val() == 0 ? false : true;
			},
			onError : function() {
				var tagLabel = $( this ).parent().find("label").text();
				var position = $( this ).position();
				var validTag = $('<div class="tag"><div class="frame">Please enter a valid<br />' + tagLabel + '<div class="slug"></div></div></div>');
				
				$(this).css({"border-color":"#CC6666"});
				$( this ).parent().append(validTag);
				$(validTag).css({"top" : (position.top - 15) + "px","left" : (position.left - 145) + "px"});
			},
			onValid : function() {
				$(this).css({"border-color":"#C6C7C6"});
				$( this ).parent().find(".tag").remove();
			}
		},
		email : { //validate email
			rule : function() {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if($( this ).val() == ''){
					return false;
				}else if(!emailReg.test($( this ).val())) {
					return false;
				}else{
					return true;
				}
			},
			onError : function() {
				var tagLabel = $( this ).parent().find("label").text();
				var position = $( this ).position();
				var validTag = $('<div class="tag"><div class="frame">Please enter a valid<br />' + tagLabel + '<div class="slug"></div></div></div>');
				
				$(this).css({"border-color":"#CC6666"});
				$( this ).parent().append(validTag);
				$(validTag).css({"top" : (position.top - 15) + "px","left" : (position.left - 145) + "px"});
			},
			onValid : function() {
				$(this).css({"border-color":"#C6C7C6"});
				$( this ).parent().find(".tag").remove();
			}
		}
	});

    /*CUSTOMIZED COMBOBOX*/
	$(".combobox").msDropDown({mainCSS:'dd2'});
	
	
	/*SKU*/
	$(prodZoom).click(function(e){
		var imgSrc = $(this).attr('href');
		e.preventDefault();
		$(prodImg).attr('src',imgSrc);
		$(prodRow).css({'display':'none'});
		$(prodFoot).css({'display':'none'});
		$(prodZoomOut).css({'display':'block'});
	});
	
	$(prodZoomOut).click(function(e){
		var imgSrc = $(this).attr('href');
		e.preventDefault();
		$(prodImg).attr('src',imgSrc);
		$(prodRow).css({'display':'block'});
		$(prodFoot).css({'display':'block'});
		$(this).css({'display':'none'});
	});
    $(prodThumbLink).click(function(e){
		var imgSrc = $(this).attr('href');
		e.preventDefault();
		$(prodImg).attr('src',imgSrc);
	});
	$(prodMore).click(function(e){
		e.preventDefault();
		$(prodFootLeft).css({'display':'none'});
		$(prodThumb).css({'display':'block'});
	});
	$(prodThumbClose).click(function(e){
		e.preventDefault();
		$(prodThumb).css({'display':'none'});
		$(prodFootLeft).css({'display':'block'});
	});
	
	/*CART OVERVIEW*/
	$(giftCheckbox).click(function(e){
		$( this ).parent().parent().find(".addMsg").toggle();
		$( this ).parent().parent().parent().find(".giftP").toggle();
		
		
	});
	$(msgLink).click(function(e){
		e.preventDefault();
		//centering with css  
		centerPopup();  
		//load popup  
		loadPopup();
		  
	});
	$(msgButton).click(function(e){
		e.preventDefault();
		disablePopup(); 
	});
	$(overlay).click(function(e){
		e.preventDefault();
		disablePopup(); 
	});
    function loadPopup(){
		if(popupStatus==0){
			$("#overlay").css({"opacity": "0.7"});  
    		$("#overlay").fadeIn("slow");  
    		$("#giftMsg").fadeIn("slow");  
    		popupStatus = 1;  
    	}  
    }; 
    function disablePopup(){    
		if(popupStatus==1){  
			$("#overlay").fadeOut("slow");  
			$("#giftMsg").fadeOut("slow");  
			popupStatus = 0;  
		} 
		$('body').css('overflow', 'auto');
    }
    function centerPopup(){   
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var documentTop = $(document).scrollTop();
		var popupHeight = $("#giftMsg").height();  
		var popupWidth = $("#giftMsg").width(); 
		$("body").css({"overflow":"hidden"});
		$("#giftMsg").css({  
			"position": "absolute",  
			"top": ((windowHeight / 2) - (popupHeight / 2)) + documentTop,  
			"left": windowWidth/2-popupWidth/2  
		});
 
		$("#overlay").css({  
			"height": windowHeight  
		});  
    } 
	
	slideshow();
	
	if ($.browser.webkit) {
    	$('#sort .dd2 .ddTitle').css({'width':'107px'});
  	}
	
	if ($.browser.msie && $.browser.version.substr(0,1)<8) {
		$(":checkbox").click(function(e){
				$( this ).parent().parent().find(".addMsg").toggle();
				$( this ).parent().parent().parent().find(".giftP").toggle();
			});
	 }
	
});

function slideshow(){
	var totalSeconds = 5;
	var second = 0;
	var milliSecond = 0;
	var progress = 0;
	var totalFires = totalSeconds * 30;
	var slideNum = 0;
	var pause = false;
	var pauseTime = 0;
	var restack = false;
	var container = $('#slideshow');
	var slideshow = $('#slideshow .slide');
	var numberOfSlides = slideshow.length;
	var bullets = $('<div class="bullets"></div>');
	var time = 3000;
	//alert ('hello');
	
	//If slideshow has more than 1 slide then build show/////////////////////
	if (numberOfSlides > 1){
		//Create bullets
		$(slideshow).each(function(i){
			
			$(this).css({
				'z-index' : 0
			});
			$(bullets).append('<div class="thumb"><img src="'+ $(this).find('.bottom').attr("src") +'" /><div class="slug"></div><div class="shadow"></div><a href="#">' + (i+1) + '</a></div>');
			$(this)
				.hover(function(){
				  $(this).find('.top').css({"top":"0"});
				//alert('hello');	
				}, function(){
				  $(this).find('.top').css({"top":"-629px"});
				});
			
		});
		
		
		// Set default positions of first and second slide
		$(slideshow).eq(0).css({'z-index' : 2});
		$(slideshow).eq(1).css({'z-index' : 1});
		
		// Load container with bullet nav
		$(container)
			.append(bullets);
		
		// Add current class to first bullet
		currentBullet(slideNum);
		
		// Add functionality to navigation links
		
		$('.bullets a')
			  .hover(function(){
					var linkPosition = $(this).position();
					
			    	$(this).parent().find("img").css({"display":"block","left": linkPosition.left - ($(this).parent().find("img").width() / 2) + "px"});
					$(this).parent().find(".shadow").css({"display":"block","left": linkPosition.left - ($(this).parent().find("img").width() / 2) + "px"});	
					$(this).parent().find(".slug").css({"display":"block"});
				}, function(){
					$(this).parent().find("img").css({"display":"none"});
					$(this).parent().find(".shadow").css({"display":"none"});
					$(this).parent().find(".slug").css({"display":"none"});
				});
			
		$('.bullets a')
			.click(function(e){
				e.preventDefault();
				if ($(slideshow).is(":animated")){
					return;
				}else{
					
					var linkName = $(this).html();
					arrangeNavStack(linkName);
					pauseTime = 0;
					
				    if(!pause){
					  pause = true;
					  startClock();
					  waitAndPlay(); 
				    }else{
					  return;  
				    } 
				}
				
			});
		
		setTimeout(function() {startClock();},time)
	};
	
	// Add class to current bullet
	function currentBullet(bulletNum){
		$('.bullets a').removeClass('current');
		$('.bullets a').eq(bulletNum).addClass('current');
	}
	
	// Previous Slide
	function prevSlide(){
		if(slideNum == 0){
			var slideName = $(slideshow).eq(numberOfSlides - 1).attr('name');
			currentBullet(numberOfSlides - 1);
			//comment(slideName);
		}else{
			var slideName = $(slideshow).eq(slideNum - 1).attr('name');
			currentBullet(slideNum - 1);
			//comment(slideName);
		}
		
		$(slideshow).eq(slideNum).fadeOut(function(){
			if(slideNum == 0){
				slideNum = numberOfSlides - 1;
				$(slideshow).eq(slideNum).css({'z-index': 2});
				$(slideshow).eq(slideNum - 1).css({'z-index': 1});
			}else if(slideNum == 1){
				--slideNum;
				$(slideshow).eq(slideNum).css({'z-index': 2});
				$(slideshow).eq(numberOfSlides - 1).css({'z-index': 1});
			}else{
				--slideNum;
				$(slideshow).eq(slideNum).css({'z-index': 2});
				$(slideshow).eq(slideNum - 1).css({'z-index': 1});	
			}
			$(this).show().css({'z-index' : 0});
		});
	}
	
	// Next Slide
	function nextSlide(){
		if(slideNum == numberOfSlides - 1){
			var slideName = $(slideshow).eq(0).attr('name');
			currentBullet(0);
			//comment(slideName);
		}else{
			var slideName = $(slideshow).eq(slideNum + 1).attr('name');
			currentBullet(slideNum + 1);
			//comment(slideName);
		}
			
		$(slideshow).eq(slideNum).fadeOut(function(){	
			if(slideNum == numberOfSlides - 1){
				slideNum = 0;
				$(slideshow).eq(0).css({'z-index': 2});
				$(slideshow).eq(1).css({'z-index': 1});
			}else if(slideNum == numberOfSlides - 2){
					++slideNum;
				$(slideshow).eq(slideNum).css({'z-index': 2});
				$(slideshow).eq(0).css({'z-index': 1});
			}else{
				++slideNum;
				$(slideshow).eq(slideNum).css({'z-index': 2});
				$(slideshow).eq(slideNum + 1).css({'z-index': 1});	
			}
			$(this).show().css({'z-index' : 0});
		});
	}
	
	// Arrange navigation Stack
	function arrangeNavStack(linkName){
		restack = true;
		
		$(slideshow).each(function(i){
			$(this).css({
				'z-index' : 0
			});
		});
		
		if(linkName == 'next'){
			if(slideNum == 0){
				$(slideshow).eq(0).css({'z-index' : 2});
				$(slideshow).eq(1).css({'z-index' : 1});
			}else if(slideNum == numberOfSlides - 1){
				$(slideshow).eq(slideNum).css({'z-index' : 2});
				$(slideshow).eq(0).css({'z-index' : 1});
			}else{
				$(slideshow).eq(slideNum).css({'z-index' : 2});
				$(slideshow).eq(slideNum + 1).css({'z-index' : 1});
			}
			nextSlide()
		}else if(linkName == 'prev'){
			if(slideNum == 0){
				$(slideshow).eq(0).css({'z-index' : 2});
				$(slideshow).eq(numberOfSlides - 1).css({'z-index' : 1});
			}else if(slideNum == numberOfSlides - 1){
				$(slideshow).eq(slideNum).css({'z-index' : 2});
				$(slideshow).eq(slideNum - 1).css({'z-index' : 1});
			}else{
				$(slideshow).eq(slideNum).css({'z-index' : 2});
				$(slideshow).eq(slideNum - 1).css({'z-index' : 1});
			}
			prevSlide();
		}else{
			var slideName = $(slideshow).eq(linkName - 1).attr('name')
			if((linkName - 1) == 0){
				$(slideshow).eq(0).css({'z-index' : 2});
				$(slideshow).eq(1).css({'z-index' : 1});
			}else if((linkName - 1) == numberOfSlides - 1){
				$(slideshow).eq(linkName - 1).css({'z-index' : 2});
				$(slideshow).eq(0).css({'z-index' : 1});
			}else{
				$(slideshow).eq(linkName - 1).css({'z-index' : 2});
				$(slideshow).eq(linkName).css({'z-index' : 1});
			}
			slideNum = linkName - 1;
			currentBullet(linkName - 1)
			//comment(slideName);
		}
	}
	
	// ENGINE
	function engine (currentSlide){	
		$(slideshow).eq(currentSlide).fadeOut(function(){
			if(currentSlide == numberOfSlides - 2){
				++slideNum;
				$(slideshow).eq(currentSlide + 1).css({'z-index': 2});
				$(slideshow).eq(0).css({'z-index': 1});
			}else if(currentSlide == numberOfSlides - 1){
				slideNum = 0;
				$(slideshow).eq(0).css({'z-index': 2});
				$(slideshow).eq(1).css({'z-index': 1});
			}else{
				++slideNum;
				$(slideshow).eq(currentSlide + 1).css({'z-index': 2});
				$(slideshow).eq(currentSlide + 2).css({'z-index': 1});
			}
			$(this).show().css({'z-index' : 0});
		});
				
	};
	
	function ignite(){
		if(restack){
				restack = false;
				$(slideshow).each(function(i){
					$(this).css({
						'z-index' : 0
					});
				});
				if(slideNum == 0){
					$(slideshow).eq(0).css({'z-index' : 2});
					$(slideshow).eq(1).css({'z-index' : 1});
				}else if(slideNum == numberOfSlides - 1){
					$(slideshow).eq(slideNum).css({'z-index' : 2});
					$(slideshow).eq(0).css({'z-index' : 1});
				}else{
					$(slideshow).eq(slideNum).css({'z-index' : 2});
					$(slideshow).eq(slideNum + 1).css({'z-index' : 1});
				}
			}
			
		if(slideNum == numberOfSlides - 1){
			var slideName = $(slideshow).eq(0).attr('name');
			currentBullet(0);
			//comment(slideName);
		}else{
			var slideName = $(slideshow).eq(slideNum + 1).attr('name');
			currentBullet(slideNum + 1);
			//comment(slideName);
		}	
		engine(slideNum);
		
	}
	
	//WAIT AND PLAY
	function waitAndPlay(){
			if(pause && pauseTime <= 3){
				++pauseTime
				setTimeout(function() {waitAndPlay();},1000)
			}else if(!pause){
				return;
			}else{
				pause = false;
				startClock();	
			}
		}
		
	//CLOCK
		function startClock(){
		  if(!pause){
			ignite();
			setTimeout(function() {startClock();},time)
		  }else{
			return;
		  }		
		}; 
	
};