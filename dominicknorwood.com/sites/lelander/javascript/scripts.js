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
	var navLink = $('#logoNav nav a');
	
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
	
	mobileNavButton.on('click',function(event){
		if(mobileNav.hasClass('showNavigation')){
			mobileNav.removeClass('showNavigation');
		}else{
			mobileNav.addClass('showNavigation');
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
	var purpleBox = $('.purpleBox');
	var randomSentences = ["We believe Diet Coke is a breakfast food.",
						   "We're thinking about candy.",
						   "We have evidence pie is better than cake.",
						   "We like putting Peeps in the microwave to see what happens."]	
						   				   
	purpleBox.html(randomSentences[GenerateRandomNumber(randomSentences.length,-1)]);
	
	/*BANNER SLIDESHOW/////////////////////////////////////////////////*/
    var bannerSlides = $('#banner .slideshow section');
	var numberOfBannerSlides = bannerSlides.length;
	var bannerSideNav = $('#banner .navBtn');
	var bannerShowCount = 0;
	var bannerPreviousSlide;
	/*var bannerBackgrounds = $('#bkgImages .stage div');
	var numberOfBackgroundImages = bannerBackgrounds.length;
	var currentBackground = Math.floor(Math.random() * numberOfBackgroundImages);*/
	
	//bannerBackgrounds.eq(currentBackground).removeClass('fadeOut');	
		
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
	
	function switchBannerSlides(nextSlide, previousSlide){
		//var randomBkg = GenerateRandomNumber(numberOfBackgroundImages,currentBackground);
		bannerSlides.eq(nextSlide).removeClass('fadeOut').addClass('fadeIn');
		bannerSlides.eq(previousSlide).removeClass('fadeIn').addClass('fadeOut');		
		/*bannerBackgrounds.eq(randomBkg).removeClass('fadeOut').addClass('fadeIn');
		bannerBackgrounds.eq(currentBackground).removeClass('fadeIn').addClass('fadeOut');		
		currentBackground = randomBkg;*/
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
	
	
	$('.testWrap .linkBoxTest a').on('click',function(event){
		event.preventDefault();
		if($(this).hasClass('expand')){
		   $('.testWrap .linkBoxTest a').removeClass('shrink').find('div.underlay').removeClass('static');;	
		    $(this).removeClass('expand').find('div.underlay').removeClass('static');;
			
		}else if($(this).hasClass('shrink')){
			$('.testWrap .linkBoxTest a').removeClass('expand').addClass('shrink').find('div.underlay').removeClass('static');
			$(this).removeClass('shrink').addClass('expand').find('div.underlay').addClass('static');
		}else{
			$('.testWrap .linkBoxTest a').addClass('shrink').find('div.underlay').removeClass('static');	
		    $(this).removeClass('shrink').addClass('expand').find('div.underlay').addClass('static');
		}				
	});
	
	$('.linkBoxTest a').each(function(i){
		var clonedFirstDiv = $(this).children().eq(0).clone();
		$(this).append(clonedFirstDiv);
	});
	
	$('#contentLinksTest a.button').click(function(e){
		e.preventDefault();
		var scrollTop = $(window).scrollTop();
		var linksOffset = $('#contentLinksTest').offset().top;
		var linksDistanceFromTop = (linksOffset - scrollTop);
		var addHeaderHeight = $('#mainHeader').height();
		
		if(linksDistanceFromTop >= 300){
			$('html,body').animate({scrollTop: '+=' + ((linksDistanceFromTop - addHeaderHeight) + 20) + 'px'},700)
		}else{
			$('html,body').animate({scrollTop: '+=' + ((linksDistanceFromTop - addHeaderHeight) + 20) + 'px'},400)
		}
	});
	
});

