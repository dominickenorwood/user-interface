'use strict';
(function($) {
    $(function() {
        $(document).ready(function(){

        	if ($(".quadtator").length > 0){
        		$(".quadtator").each(function(index) {
        			var quadtator = new Quadtator();
        			quadtator.setDefaultStateAndVariables($(this));
        			quadtator.setFunctionalityToButtons($(this));
        			quadtator.autoRotate($(this), 5000);
        			quadtator.featureLocked($(this));
				});
			};

			if ($(".quadtator-mobile").length > 0){
				$(".quadtator-mobile").each(function(index) {
					var quadtator = new QuadtatorMobile();
					quadtator.setDefaultStateAndVariables($(this));
					quadtator.setFunctionalityToButtons($(this));
					quadtator.buildBullets($(this));
					quadtator.autoRotate($(this), 5000);
				});
			};

			function QuadtatorMobile(){
				var buttons,
					slideshowSlides,
					currentSlideIndex = 0,
					nextSlideIndex = 1,
					quadtatorObject,
					rotate,
					time,
					timeInterval;

				this.setDefaultStateAndVariables = function(quadtator){
					quadtatorObject = quadtator;
					buttons = quadtator.find(".slideshow-button");
					slideshowSlides = quadtator.find('.slideshow-mobile .slide');
				};

				this.setFunctionalityToButtons = function(quadtator){
					buttons.on('click', function(event){
						event.preventDefault();
						var slide = quadtator.find(".slideshow-mobile .slide").eq(currentSlideIndex);
						if(!slide.is(':animated')){
							if($(this).hasClass('next')){
								goToNextSlide();
							}else{
								goToPreviousSlide();
							}
						};

						if(rotate.length > 0){
							clearInterval(timeInterval);
							timeInterval = setInterval(function(){
								                goToNextSlide();
							               }, time);
						};
					});
				};

				this.buildBullets = function(quadtator){
					var wrap = quadtator.find(".quadtator-wrapper-mobile"),
						wrapParent = wrap.parent(),
						html = '<div class="bullets">' +
									bullets(slideshowSlides.length) +
									'<div style="clear:both;"></div>' +
							   '</div>';

						wrapParent.append(html);
						setFunctionalityToBullets(wrapParent);
				};

				this.autoRotate = function(quadtator, duration){
					rotate = quadtator.find(".rotate"),
					time = duration;
					if(rotate.length > 0){
						setAutoRotate(quadtator, duration);
					}
				};

				function setAutoRotate(quadtator, duration){
					timeInterval = setInterval(function(){
						        goToNextSlide();
					       }, duration);
				};

				function bulletClick(index){
					prepareBulletSlideClasses(slideshowSlides, index);
					slideshowSlides.eq(currentSlideIndex).animate({
	                    opacity : "0"
	                },
	                800,
	                function(){
	                    setClasses(slideshowSlides, $(this), "bullet");
	                });
				};

				function setFunctionalityToBullets(quadtator){
					var bullets = quadtator.find(".bullets a");
					bullets.eq(0).addClass("current");
					bullets.on('click', function(event){
						var index = $(this).index(),
							slide = quadtator.find(".slideshow-mobile .slide").eq(currentSlideIndex);
						event.preventDefault();
						
						if(!slide.is(':animated')){
							bulletClick(index);
							bullets.removeClass("current");
							$(this).addClass("current");
						};
						
						if(rotate.length > 0){
							clearInterval(timeInterval);
							timeInterval = setInterval(function(){
								                goToNextSlide();
							               }, time);
						};
					});
				};

				function bullets(number){
					var html = '';
					for(var i = 1; i <= number; i++){
						html += '<a href="#">Slide ' + i + '</a>';
					}
					return html;
				};

				function goToPreviousSlide(){
	                preparePreviousSlideClasses(slideshowSlides);
	                slideshowSlides.eq(currentSlideIndex).animate({
	                    opacity : "0"
	                },
	                800,
	                function(){
	                    setClasses(slideshowSlides, $(this), "previous");
	                });  
				}

				function goToNextSlide(){
	                prepareNextSlideClasses(slideshowSlides);
	                slideshowSlides.eq(currentSlideIndex).animate({
	                    opacity : "0"
	                },
	                800,
	                function(){
	                    setClasses(slideshowSlides, $(this), "next");
	                });  
				};

				function setClasses(slides, slide, state){
	                if(state == "next"){
	                    setCurrentIndex();
	                }else if(state == "previous"){
	                    setNextIndex();
	                }else{
	                	setBulletIndex();
	                }
	               
	                slides.removeClass('current next');
	                slides.eq(currentSlideIndex).addClass('current');
	                slides.eq(nextSlideIndex).addClass('next');
	                slide.css({"opacity" : "1"});
	            };

	            function prepareBulletSlideClasses(slides, index){
	            	nextSlideIndex = index;
	            	setSlideshowSlides(slides);
	            };

	            function preparePreviousSlideClasses(slides){
	            	var bullets = quadtatorObject.find(".bullets a");
	            	bullets.removeClass('current');
	                if(currentSlideIndex == 0){
	                    nextSlideIndex = slideshowSlides.length - 1;
	                    bullets.eq(slideshowSlides.length - 1).addClass('current');
	                }else{ 
	                    nextSlideIndex = currentSlideIndex - 1;
	                    bullets.eq(currentSlideIndex - 1).addClass('current');
	                }
	                setSlideshowSlides(slides);
	            };

				function prepareNextSlideClasses(slides){
					var bullets = quadtatorObject.find(".bullets a");
					bullets.removeClass('current');     
	                if(currentSlideIndex == (slideshowSlides.length - 1)){
	                    nextSlideIndex = 0;
	                    bullets.eq(0).addClass('current');
	                }else{
	                    nextSlideIndex = currentSlideIndex + 1;
	                    bullets.eq(currentSlideIndex + 1).addClass('current');
	                }
	                setSlideshowSlides(slides);
	            };

	            function setBulletIndex(){
	            	currentSlideIndex = nextSlideIndex;
	            	if(currentSlideIndex == (slideshowSlides.length - 2)){
	                    nextSlideIndex = 0;
	                }else{
	                    nextSlideIndex = currentSlideIndex + 1;
	                }
	            };

	            function setNextIndex(){
	                if(currentSlideIndex == 0){
	                    currentSlideIndex = slideshowSlides.length - 1;
	                    nextSlideIndex = currentSlideIndex - 1;
	                }else if(currentSlideIndex == 1){
	                    currentSlideIndex = 0;
	                    nextSlideIndex = slideshowSlides.length - 1;
	                }else{
	                    currentSlideIndex--; 
	                    nextSlideIndex = currentSlideIndex - 1;
	                }
	            };

	            function setCurrentIndex(){
	                if(currentSlideIndex == (slideshowSlides.length - 1)){
	                    currentSlideIndex = 0;
	                    nextSlideIndex = currentSlideIndex + 1;
	                }else if(currentSlideIndex == (slideshowSlides.length - 2)){
	                    currentSlideIndex++;
	                    nextSlideIndex = 0;
	                }else{
	                    currentSlideIndex++; 
	                    nextSlideIndex = currentSlideIndex + 1;
	                }
	            };

	            function setSlideshowSlides(slides){
	                slides.removeClass('current next');
	                slides.eq(currentSlideIndex).addClass('current');
	                slides.eq(nextSlideIndex).addClass('next');  
	            };
			};

			function Quadtator(){
				var carouselHoldSlide,
					carouselButton,
					carouselSlides,
					carouselSlideHeight,
					slideshowSlides,
					currentSlideIndex = 0,
					nextSlideIndex = 1,
					rotate,
					time,
					timeInterval,
					isLocked = false,
					lockedIncrement = 1;

				this.setDefaultStateAndVariables = function(quadtator){
				    var carouselWrap = quadtator.find(".carousel-wrap"),
				        quadHeaders = quadtator.parent().children(".sectionTitle").length;
					carouselHoldSlide = quadtator.find(".carousel-wrap .hold");
					carouselButton = quadtator.find(".carousel-button");
					carouselSlides =  quadtator.find(".carousel-wrap .slide");
					carouselSlideHeight = quadtator.find(".carousel-wrap .slide").height();
					slideshowSlides = quadtator.find('.slideshow .slide');
					carouselWrap.append(carouselHoldSlide);
					carouselHoldSlide.removeClass("hold");
					if (quadHeaders == 0) quadtator.addClass("no-headers");
					if (quadHeaders > 0) quadtator.parent().addClass("quadtator-has-headers");
				};

				this.setFunctionalityToButtons = function(quadtator){
					carouselButton.on('click', function(event){
						event.preventDefault();
						var carouselWrap = quadtator.find(".carousel-wrap");
						if(!carouselWrap.is(':animated')){
							if($(this).hasClass('next')){
								var topCarouselSlide = quadtator.find(".carousel-wrap .slide").eq(0);
								goToNextSlide(carouselWrap, topCarouselSlide);
							}else{
								var bottomCarouselSlide = quadtator.find(".carousel-wrap .slide").eq(carouselSlides.length - lockedIncrement);
								goToPreviousSlide(carouselWrap, bottomCarouselSlide);
							}
						};

						if(rotate.length > 0){
							clearInterval(timeInterval);
							timeInterval = setInterval(function(){
								                var topCarouselSlide = quadtator.find(".carousel-wrap .slide").eq(0);
								                goToNextSlide(carouselWrap, topCarouselSlide);
							               }, time);
						};
					});
				};

				this.autoRotate = function(quadtator, duration){
					rotate = quadtator.find(".rotate"),
					time = duration;
					if(rotate.length > 0){
						setAutoRotate(quadtator, duration);
					}
				};

				this.featureLocked = function(quadtator){
					var locked = quadtator.find(".locked"),
						carouselWrap = quadtator.find(".carousel-wrap");
					if(locked.length > 0){
						isLocked = true;
						lockedIncrement = 2;
						carouselSlides.eq(0).remove();
					}
				};

				function setAutoRotate(quadtator, duration){
					var carouselWrap = quadtator.find(".carousel-wrap");
					timeInterval = setInterval(function(){
						        var topCarouselSlide = quadtator.find(".carousel-wrap .slide").eq(0);
						        goToNextSlide(carouselWrap, topCarouselSlide);
					       }, duration);

				}

				var csstopPos = 0;
			    //isMyCME is referenced in _QuadRotatorActivityFormat.cshtml
			    if (isMyCME) {
			        csstopPos = 1;
			    }
			    
				function goToPreviousSlide(wrap, slide){
					//CAROUSEL
                    wrap.css({"top":"-" + carouselSlideHeight + "px"});
                    wrap.prepend(slide);
                    wrap.animate({
                        top: csstopPos
                    }, 
                    800,
                    function(){

                    });

                    if(!isLocked){
						//SLIDESHOW
	                    preparePreviousSlideClasses(slideshowSlides);
	                    slideshowSlides.eq(currentSlideIndex).animate({
	                        opacity : "0"
	                    },
	                    800,
	                    function(){
	                        setClasses(slideshowSlides, $(this), "previous");
	                    });
                    };  
				}

				function goToNextSlide(wrap, slide){
					//CAROUSEL
                    wrap.animate({
                        top : "-" + carouselSlideHeight + "px"
                    }, 
                    800,
                    function(){
                        wrap.append(slide);
                        wrap.css({"top":"0"});
                    });

                    if(!isLocked){
						//SLIDESHOW
	                    prepareNextSlideClasses(slideshowSlides);
	                    slideshowSlides.eq(currentSlideIndex).animate({
	                        opacity : "0"
	                    },
	                    800,
	                    function(){
	                        setClasses(slideshowSlides, $(this), "next");
	                    });
                    };   
				};

				function setClasses(slides, slide, state){
	                if(state == "next"){
	                    setCurrentIndex();
	                }else{
	                    setNextIndex();
	                }
	                
	                slides.removeClass('current next');
	                slides.eq(currentSlideIndex).addClass('current');
	                slides.eq(nextSlideIndex).addClass('next');
	                slide.css({"opacity" : "1"});
	            }

	            function preparePreviousSlideClasses(slides){
	                if(currentSlideIndex == 0){
	                    nextSlideIndex = slideshowSlides.length - 1;
	                }else{ 
	                    nextSlideIndex = currentSlideIndex - 1;
	                }
	                setSlideshowSlides(slides);
	            };

				function prepareNextSlideClasses(slides){
	                if(currentSlideIndex == (slideshowSlides.length - 1)){
	                    nextSlideIndex = 0;
	                }else{
	                    nextSlideIndex = currentSlideIndex + 1;
	                }
	                setSlideshowSlides(slides);
	            };

	             function setNextIndex(){
	                if(currentSlideIndex == 0){
	                    currentSlideIndex = slideshowSlides.length - 1;
	                    nextSlideIndex = currentSlideIndex - 1;
	                }else if(currentSlideIndex == 1){
	                    currentSlideIndex = 0;
	                    nextSlideIndex = slideshowSlides.length - 1;
	                }else{
	                    currentSlideIndex--; 
	                    nextSlideIndex = currentSlideIndex - 1;
	                }
	            };

	            function setCurrentIndex(){
	                if(currentSlideIndex == (slideshowSlides.length - 1)){
	                    currentSlideIndex = 0;
	                    nextSlideIndex = currentSlideIndex + 1;
	                }else if(currentSlideIndex == (slideshowSlides.length - 2)){
	                    currentSlideIndex++;
	                    nextSlideIndex = 0;
	                }else{
	                    currentSlideIndex++; 
	                    nextSlideIndex = currentSlideIndex + 1;
	                }
	            };

	            function setSlideshowSlides(slides){
	                slides.removeClass('current next');
	                slides.eq(currentSlideIndex).addClass('current');
	                slides.eq(nextSlideIndex).addClass('next');  
	            };

			};

        });
    });
})(jQuery);