$(document).ready(function() {
	/*GLOBAL/////////////////////////////////////////////////*/
	function GenerateRandomNumber(maximum,current) {
		var generatedNumber = Math.floor(Math.random() * maximum);;
		while (generatedNumber == current) {
			generatedNumber = Math.floor(Math.random() * maximum);
		}	
		return generatedNumber;
	}	
	
	/*HEADER/////////////////////////////////////////////////*/
	var openContactSection = $('.openContact');
	var closeContactSection = $('#contact .close');
	var headerHeight = $('#mainHeader').height();
	var mobileNavButton = $('.mobileNavButton');
	var mobileNav = $('#logoNav nav ul');
	var navLink = $('#logoNav.main-nav nav a');
	
	$('.mainHeaderSlug').css({'height' : headerHeight + 'px'});
	
	$( window ).resize(function() {
		if($('header #contact').hasClass('open')){
			return;			
		}else{
			var test = $('#mainHeader').height();
		    $('.mainHeaderSlug').css({'height' : test + 'px'});
		}	
	});

	

	openContactSection.click(function(e){
	  e.preventDefault();
	  $('header #contact').addClass('open').slideDown(800);
	});
	
	closeContactSection.click(function(e){
	  e.preventDefault();
	  $('header #contact').removeClass('open').slideUp(800);
	});

	navLink.on('click',function(event){
		event.preventDefault();	
		var windowWidth = $(window).width();	
		var scrollTop = $(window).scrollTop();
		var aboutOffset = $('#mainContent').offset().top;
		var servicesOffset = $('#footerCopy').offset().top;		
		var clientsOffset = $('#mainContent footer').offset().top;
		var caseStudyOffset = $('#mainContent .slideshow').offset().top;
		var addHeaderHeight = $('#mainHeader').height();
		var linkTitile = $(this).attr('title');
		var linkID = $(this).attr('id');
		var linkHash = "#" + linkID
		console.log(hash);
		navLink.removeClass('current');
		$(this).addClass('current');
		if(history.pushState) {
	    history.pushState(null, null, linkHash);
		}
		else {
		    location.hash = linkHash;
		}

		switch(linkTitile){
			case 'About' : 
				var linksDistanceFromTop = (aboutOffset - scrollTop);
				$('html,body').animate({scrollTop: '+=' + ((linksDistanceFromTop - addHeaderHeight) + 20) + 'px'},700)
			break;
			case 'Services' :
				var linksDistanceFromTop = (servicesOffset - scrollTop);
				$('html,body').animate({scrollTop: '+=' + ((linksDistanceFromTop - addHeaderHeight) + 20) + 'px'},700)
			break;
			case 'Clients' :
				var linksDistanceFromTop = (clientsOffset - scrollTop);
				$('html,body').animate({scrollTop: '+=' + ((linksDistanceFromTop - addHeaderHeight) + 20) + 'px'},700)
			break;
			case 'Case Study' :
				var linksDistanceFromTop = (caseStudyOffset - scrollTop);
				$('html,body').animate({scrollTop: '+=' + ((linksDistanceFromTop - addHeaderHeight) - 20) + 'px'},700)
			break;
			default:
				return; 	
		}
		
		if(windowWidth < 580){
			mobileNav.removeClass('showNavigation');
		}
		
	});

	if(window.location.hash){
		var hash = window.location.hash;
		var hashTarget = $(hash);
		console.log(hash);
		console.log(hashTarget);
		setTimeout(function() {
      		hashTarget.trigger( "click" );
		}, 300);
	}
	else{}
	
	mobileNavButton.on('click',function(event){
		if(mobileNav.hasClass('showNavigation')){
			mobileNav.removeClass('showNavigation');
		}else{
			mobileNav.addClass('showNavigation');
		}
		
	});
	
	$( window ).scroll(function() {
	    var scrollTop = $(window).scrollTop();
		var aboutOffset = $('#mainContent').offset().top;
		var servicesOffset = $('#footerCopy').offset().top;		
		var clientsOffset = $('#mainContent footer').offset().top;
		var caseStudyOffset = $('#mainContent .slideshow').offset().top;
		var addHeaderHeight = $('#mainHeader').height();
		var about = (aboutOffset - addHeaderHeight) - scrollTop;
		var services = (servicesOffset - addHeaderHeight) - scrollTop;
		var clients = (clientsOffset - addHeaderHeight) - scrollTop;
		var caseStudy = (caseStudyOffset - addHeaderHeight) - scrollTop;
		if(scrollTop <= 100){
			$('#About').removeClass('current');
		}
		if(about <= 20 && about >= -100){
			$('#About').addClass('current');
			$('#Services, #Clients, #CaseStudy').removeClass('current');
		}
		if(services <= 300 && services >= -100){
			$('#Services').addClass('current');
			$('#About, #Clients, #CaseStudy').removeClass('current');
		}
		if(clients <= 20 && clients >= -100){
			$('#Clients').addClass('current');
			$('#About, #Services, #CaseStudy').removeClass('current');
			console.log('hello');
		}
		if(caseStudy <= 20 && caseStudy >= -100){
			$('#CaseStudy').addClass('current');
			$('#Services, #Clients, #About').removeClass('current');
		}
	});

	/*LINK BOX/////////////////////////////////////////////////*/
	var linkBox = $('.linkBox a, .getInTouch');
	linkBox.on('click',function(event){
		event.preventDefault();
		var windowWidth = $(window).width();
		var scrollTop = $(window).scrollTop();
		var contactOffset = $('.copyright').offset().top;
		var addHeaderHeight = $('#mainHeader').height();		
		var linksDistanceFromTop = (contactOffset - scrollTop);			
		if(windowWidth < 580){
			$('html,body').animate({scrollTop: '+=' + ((linksDistanceFromTop - addHeaderHeight) + 20) + 'px'},1000)
		}else{
			$('header #contact').slideDown(800);
			$('header #contact').addClass('open').slideDown(800);
		}		
	});
	
	/*RANDOM TEXT FOR PURPLE BOX/////////////////////////////////////////////////*/
    var text = [
          {color:"purpleBox",   caption:"We believe Diet Coke is a breakfast food."},
          {color:"redBox",      caption:"We're thinking about candy."},
          {color:"blueBox",     caption:"We have evidence pie is better than cake."},
          {color:"redBox",      caption:"We like putting Peeps in the microwave to see what happens."}
        ],
        i=0,
        $box = $('#sentanceBox');

    $box.html('<span class="' + text[i].color + '">' + text[i].caption + '</span>');
        i++;
    
    window.setInterval( function() {
      if( i >= text.length ) {
      	i = 0;
      }
      $box
        .fadeOut(400, function() {
            $box
                .html('<span class="' + text[i].color + '">' + text[i].caption + '</span>')
                .fadeIn(400);
            ++i;
        });
    
    },8000);	
	
	/*BANNER SLIDESHOW/////////////////////////////////////////////////*/
    var bannerSlides = $('#banner .slideshow section'),
	    numberOfBannerSlides = bannerSlides.length,
	    bannerSideNav = $('#banner .navBtn'),
	    bannerShowCount = 0,
	    bannerPreviousSlide,
	    bannerBackgrounds = $('#bkgImages .stage div'),
	    numberOfBackgroundImages = bannerBackgrounds.length,
	    currentBackground = bannerBackgrounds.eq(1).val();
	
	bannerBackgrounds.eq(currentBackground).removeClass('fadeOut');
		
	bannerSideNav.on('click',function(event){
		event.preventDefault();
		bannerPreviousSlide = bannerShowCount; 
		if($(this).hasClass('previous')){
			if(bannerShowCount == 0){
				bannerShowCount = numberOfBannerSlides - 1;
			}else{
				--bannerShowCount;
			}
		}else{
			if(numberOfBannerSlides - 1 == bannerShowCount){
				bannerShowCount = 0;
			}else{
				++bannerShowCount;
			}	
		}
		switchBannerSlides(bannerShowCount,bannerPreviousSlide);
	});
	
	function bannerRotate() {
    	$('.navBtn.next').trigger('click');
	}
	
	var bannerSlideInterval = window.setInterval(bannerRotate, 15000);
	
	$('.slideshow').on('mouseenter', function() {
    	window.clearInterval(bannerSlideInterval);
	}).on('mouseleave', function() {
	    bannerSlideInterval = window.setInterval(bannerRotate, 15000);
	});
	
	function switchBannerSlides(nextSlide, previousSlide){
		bannerSlides.eq(nextSlide).removeClass('fadeOut').addClass('fadeIn');
		bannerSlides.eq(previousSlide).removeClass('fadeIn').addClass('fadeOut');		
		bannerBackgrounds.eq(nextSlide).removeClass('fadeOut').addClass('fadeIn');
		bannerBackgrounds.eq(currentBackground).removeClass('fadeIn').addClass('fadeOut');		
		currentBackground = nextSlide;
	};
	
	$('#contentLinks a.button').click(function(e){
		e.preventDefault();
		var scrollTop = $(window).scrollTop();
		var linksOffset = $('#contentLinks').offset().top;
		var linksDistanceFromTop = (linksOffset - scrollTop);
		var addHeaderHeight = $('#mainHeader').height();
		
		if(linksDistanceFromTop >= 300){
			$('html,body').animate({scrollTop: '+=' + ((linksDistanceFromTop - addHeaderHeight) + 20) + 'px'},700)
		}else{
			$('html,body').animate({scrollTop: '+=' + ((linksDistanceFromTop - addHeaderHeight) + 20) + 'px'},400)
		}
	});
	
	$('.linkBox a').each(function(i){
		var clonedFirstDiv = $(this).children().eq(0).clone();
		$(this).append(clonedFirstDiv);
	});
	
	$('.clientLogos a').each(function(i){
		var clonedFirstDiv = $(this).children().eq(0).clone();
		clonedFirstDiv.html('');
		$(this).append(clonedFirstDiv);
	});
	
	$('.clientLogos a').on('click', function(event){
		event.preventDefault();
	});
	
	/*MAIN SLIDESHOW/////////////////////////////////////////////////*/
	var mainContentSlideshowNavigation = $('#mainContent footer a');
	var mainSlideshow = $('#mainContent .slideshow .slide');
	var mainSlideshowStage = $('#mainContent .slideshow .stage');
	var mainContentCurrentSlide = 0;
	function arrangeStack(){
	  var numberOfSlides = mainSlideshow.length;			 
	  if (numberOfSlides > 1){
		setTimeout(function() {
			var firstSlideHeight = $(mainSlideshow).eq(0).height() - 80;
			$(mainSlideshowStage).css({'height' : firstSlideHeight});
		    $(mainSlideshow).eq(0).addClass('topSlide fadeIn');
		  }, 200);
		
	  }else{
		return;	
	  }			
	};
	
	function setTopSlide(currentSlide, previousSlide){
		$(mainSlideshow).eq(currentSlide).addClass('topSlide');
		$(mainSlideshow).eq(previousSlide).removeClass('topSlide').addClass('displayNone');;
	};
	
	/*mainContentSlideshowNavigation.click(function(e){ 
	  e.preventDefault();  
	  var linkIndex = $(this).parent().index() - 1;
	  var test = mainContentCurrentSlide;	  
      if(linkIndex != mainContentCurrentSlide){
		 var nextSlideHeight = $(mainSlideshow).eq(linkIndex).height() - 90;
		 $(mainSlideshowStage).css({'height' : nextSlideHeight})		 
		 $(mainSlideshow).eq(mainContentCurrentSlide).removeClass('fadeIn opaque').addClass('fadeOut');
		 $(mainSlideshow).eq(linkIndex).removeClass('fadeOut displayNone').addClass('fadeIn');
		 $('#mainContent footer a').removeClass('current');
		 $(this).addClass('current');
		 setTimeout(function() {setTopSlide(linkIndex, test);}, 1200);		 
		 mainContentCurrentSlide = linkIndex; 
	  }  
	});*/
	
	$('#footerCopy footer a').on('click',function(event){
		event.preventDefault();
	});
	
});

