$(document).ready(function() {
	//alert('works');
	/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	STANDARD SLIDESHOW
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
	arrangeStack();
	arrangeStackSlide();
	arrangeSlideOver();
	
	/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	ADVANCED TRANSITIONS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
	arrangeExpandTransition();
	arrangeColumnTransition();
	arrangeVenetianTransition();
	arrangePixelTransition();
	
	/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	LOADED SLIDESHOW
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
	loadedSlideshow();
	
});
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
STANDARD SLIDESHOW
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function arrangeStack(){
	var slideshow = $('#standardShow img');
	var numberOfSlides = slideshow.length;
	
	if (numberOfSlides > 1){
		$(slideshow).each(function(i){
			$(this).css({
				'z-index' : 0
			});
		});
		$(slideshow).eq(0).css({'z-index' : 2});
		$(slideshow).eq(1).css({'z-index' : 1});
		setTimeout(function() {standardSlideShow(0);}, 1000);
	}else{
		return;	
	}
	
};
function standardSlideShow (currentSlide){
	var slideshow = $('#standardShow img');
	var numberOfSlides = slideshow.length;
	currentSlide = currentSlide % numberOfSlides;
	
	$(slideshow).eq(currentSlide).fadeOut(function(){
		if(currentSlide == numberOfSlides - 2){
			$(slideshow).eq(currentSlide + 1).css({'z-index': 2});
			$(slideshow).eq(0).css({'z-index': 1});
		}else if(currentSlide == numberOfSlides - 1){
			$(slideshow).eq(0).css({'z-index': 2});
			$(slideshow).eq(1).css({'z-index': 1});
		}else{
			$(slideshow).eq(currentSlide + 1).css({'z-index': 2});
			$(slideshow).eq(currentSlide + 2).css({'z-index': 1});
		}
		
		$(this).show().css({'z-index' : 0});
		setTimeout(function() {standardSlideShow(++currentSlide);}, 1000);
		
	});
}

/*SLIDING SLIDESHOW/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function arrangeStackSlide(){
	//var container = $('#standardShowSlide');
	var containerWidth = $('#standardShowSlide').width();
	var containerHeight = $('#standardShowSlide').height();
	var slideshow = $('#standardShowSlide img');
	var numberOfSlides = slideshow.length;
	
	if (numberOfSlides > 1){
		$(slideshow).each(function(i){
			$(this).css({
				'top' : containerHeight + "px"
			});
		});
		$(slideshow).eq(0).css({'top':0});
		setTimeout(function() {standardSlideShowSlide(0);}, 1500);	
	}else{
		return;	
	}
};
function standardSlideShowSlide (currentSlide){
	var containerWidth = $('#standardShowSlide').width();
	var containerHeight = $('#standardShowSlide').height();
	var slideshow = $('#standardShowSlide img');
	var numberOfSlides = slideshow.length;
	currentSlide = currentSlide % numberOfSlides;
	
	if (currentSlide == (numberOfSlides - 1)){
		$(slideshow).eq(0).animate({top: '-=' + containerHeight},1000);
		$(slideshow).eq(currentSlide).animate({top: '-=' + containerHeight},1000,function(){
			$(this).css({'top':containerHeight});	
		});
	}else{
		$(slideshow).eq(currentSlide + 1).animate({top: '-=' + containerHeight},1000);
		$(slideshow).eq(currentSlide).animate({top: '-=' + containerHeight},1000,function(){
			$(this).css({'top':containerHeight});	
		});
	}
	setTimeout(function() {standardSlideShowSlide(++currentSlide);}, 1500);	
};

/*SLIDE OVER SLIDESHOW/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function arrangeSlideOver(){
	var containerWidth = $('#standardSlideOver').width();
	var containerHeight = $('#standardSlideOver').height();
	var slideshow = $('#standardSlideOver img');
	var numberOfSlides = slideshow.length;
	
	if (numberOfSlides > 1){
		$(slideshow).each(function(i){
			$(this).css({
				'z-index' : 0,
				'top' : '-' + containerHeight + "px"
			});
		});
		$(slideshow).eq(0).css({'top':0,'z-index' : 2});
		$(slideshow).eq(1).css({'z-index' : 1});
		setTimeout(function() {standardSlideOver(1);}, 1500);	
	}else{
		return;	
	}
};
function standardSlideOver (currentSlide){
	var containerWidth = $('#standardSlideOver').width();
	var containerHeight = $('#standardSlideOver').height();
	var slideshow = $('#standardSlideOver img');
	var numberOfSlides = slideshow.length;
	currentSlide = currentSlide % numberOfSlides;
	
	$(slideshow).eq(currentSlide - 1).css({'z-index':1});
	$(slideshow).eq(currentSlide).css({'z-index':2}).animate({top: '+=' + containerHeight},1000,function(){
		$(slideshow).eq(currentSlide - 1).css({'z-index':0,'top':'-' + containerHeight + 'px'});
	});
	
	setTimeout(function() {standardSlideOver(++currentSlide);}, 1500);
};

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ADVANCED TRANSITIONS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function arrangeExpandTransition(){
	$('#advancedExpand img').hide().each(function(i){
		var slide = $('<div class="parent"><div class="child"></div></div>');
		var slideBkg = $('#advancedExpand img').eq(i).attr("src");
		slide.css({
			'background' : 'url('+ slideBkg +') no-repeat top left',
			'z-index' : '0'
			});
		
		$('#advancedExpand').append(slide);
	});
	$('#advancedExpand .parent')
		.eq(0)
		.css({'z-index':'1'})
		.children()
		.eq(0)
		.css({'width': '500px', 'height':'300px'}) ;
	setTimeout(function() {expandTransition(1);}, 1500);
};
function expandTransition (currentSlide){
	var slideshow = $('#advancedExpand .parent');
	var numberOfSlides = slideshow.length;
	currentSlide = currentSlide % numberOfSlides;
	
	$(slideshow)
		.eq(currentSlide)
		.css({'z-index':2})
		.children()
		.animate({
			width : '500px',
			height : '300px'
		},
		1000,
		function(){
			$(slideshow)
				.eq(currentSlide - 1)
				.css({'z-index' : '0'})
				.children()
				.css({'width':'0','height':'0'});
			$(slideshow)
				.eq(currentSlide)
				.css({'z-index' : '1'});
			setTimeout(function() {expandTransition(++currentSlide);}, 1500);
		});
};

/*COLUMN TRANSITION/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function arrangeColumnTransition(){
	
	$('#advancedColumn img')
		.hide()
		.each(function(i){
			var slide = $('<div class="parent"></div>');
			var slideBkg = $('#advancedColumn img').eq(i).attr("src");
			slide.data('image', slideBkg);
			slide.css({'z-index' : '0'});
			$('#advancedColumn').append(slide);
		});
		
	$('#advancedColumn .parent')
		.eq(0)
		.css({
			'z-index':'1',
			'background' : 'url('+ $('#advancedColumn .parent').eq(0).data('image') +') no-repeat left top',
			'width':'500px',
			'height':'300px'
			})
		
	setTimeout(function() {columnTransition(1);}, 1500);
};
function columnTransition(currentSlide){
	var containerWidth = $('#advancedColumn').width();
	var numberOfSlices = Math.ceil(containerWidth / 40);
	var count = 0;
	var slideshow = $('#advancedColumn .parent');
	var image = $('#advancedColumn .parent').eq(currentSlide).data('image');
	var numberOfSlides = slideshow.length;
	currentSlide = currentSlide % numberOfSlides;
	
	function transition(){
		if (count == (numberOfSlices - 1)){
			var slideshowSlice = $('<div class="childLast"></div>');
			$(slideshow)
				.eq(currentSlide)
				.css({'z-index':2,'width': ((count + 1) * 40)})
				.append(slideshowSlice)
				.children()
				.eq(count)
				.css({'background' : 'url('+ image +') no-repeat -' + (count * 40) + 'px top'})
				.animate({
					height : '300px'
				}, 
				500,
				function(){
					$(slideshow)
						.eq(currentSlide - 1)
						.css({
							'z-index':'0',
							'background' : 'none',
							'width':'0',
							'height':'0'
							})
						.children()
						.remove();
					$(slideshow)
						.eq(currentSlide)
						.css({
							'z-index':'1'
							});
					if (currentSlide == (numberOfSlides - 1)){
						setTimeout(function() {columnTransition(0);}, 1500);
					}else{
						setTimeout(function() {columnTransition(++currentSlide);}, 1500);
					}	
				});	
		}else{
			var slideshowSlice = $('<div class="child"></div>');
			$(slideshow)
				.eq(currentSlide)
				.css({'z-index':'2','width': ((count + 1) * 40)})
				.append(slideshowSlice)
				.children()
				.eq(count)
				.css({'background' : 'url('+ image +') no-repeat -' + (count * 40) + 'px top'})
				.animate({
					height : '300px'
				},
				500,
				function(){
					
				});
			++count;
			setTimeout(function() {transition();}, 200);
		};
	}
	transition();
};

/*VENETIAN TRANSITION/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function arrangeVenetianTransition(){
	var slideshow = $('#advancedVenetian img');
	var numberOfSlides = slideshow.length;
	
	$(slideshow)
		.hide()
		.each(function(i){
			var slide = $('<div class="parent"></div>');
			var slideBkg = $(this).attr("src");
			slide.data('image',slideBkg);
			slide.css({'z-index' : '0'});
			$('#advancedVenetian').append(slide);
		});
	
	$('#advancedVenetian .parent')
		.eq(0)
		.css({
			'z-index':'1',
			'background' : 'url('+ $('#advancedVenetian .parent').eq(0).data('image') +') no-repeat left top',
			'width':'500px',
			'height':'300px'
			})
	setTimeout(function() {venetianTransition(1);}, 1500);
};
function venetianTransition(currentSlide){
	var containerWidth = $('#advancedVenetian').width();
	var numberOfSlices = Math.ceil(containerWidth / 40);
	var count = 0;
	var slideshow = $('#advancedVenetian .parent');
	var image = $('#advancedVenetian .parent').eq(currentSlide).data('image');
	var numberOfSlides = slideshow.length;
	currentSlide = currentSlide % numberOfSlides;
	
	function transition(){
		if(count == (numberOfSlices - 1)){
			//alert('last');
			var slideshowSlice = $('<div class="child"><div class="box"></div></div>');
			$(slideshow)
				.eq(currentSlide)
				.css({'z-index':'2','width': ((count + 1) * 40)})
				.append(slideshowSlice)
				.children()
				.eq(count)
				.children('.box')
				.css({'background' : 'url('+ image +') no-repeat -' + (count * 40) + 'px top'})
				.animate({
					'width' : '40px'
				},
				500,
				function(){
					$(slideshow)
						.eq(currentSlide - 1)
						.css({
							'z-index':'0',
							'background' : 'none',
							'width':'0',
							'height':'0'
							})
						.children()
						.remove();
						
					$(slideshow)
						.eq(currentSlide)
						.css({
							'z-index':'1'
							});
					if (currentSlide == (numberOfSlides - 1)){
						setTimeout(function() {venetianTransition(0);}, 1500);
					}else{
						setTimeout(function() {venetianTransition(++currentSlide);}, 1500);
					}			
				});
		}else{
			var slideshowSlice = $('<div class="child"><div class="box"></div></div>');
			$(slideshow)
				.eq(currentSlide)
				.css({'z-index':'2','width': ((count + 1) * 40)})
				.append(slideshowSlice)
				.children()
				.eq(count)
				.children('.box')
				.css({'background' : 'url('+ image +') no-repeat -' + (count * 40) + 'px top'})
				.animate({
					'width' : '40px'
				},
				500);
			++count;
			setTimeout(function() {transition();}, 200);
		}
		
	};
	
	transition();
};

/*PIXEL TRANSITION/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function arrangePixelTransition(){
	var slideshow = $('#advancedPixel img');
	var numberOfSlides = slideshow.length;
	
	$(slideshow)
		.hide()
		.each(function(i){
			var slide = $('<div class="parent"></div>');
			var slideBkg = $(this).attr("src");
			slide.data('image',slideBkg);
			slide.css({'z-index' : '0'});
			$('#advancedPixel').append(slide);
		});
	
	$('#advancedPixel .parent')
		.eq(0)
		.css({
			'z-index':'1',
			'background' : 'url('+ $('#advancedVenetian .parent').eq(0).data('image') +') no-repeat left top',
			'width':'500px',
			'height':'300px'
			})
	setTimeout(function() {pixelTransition(1);}, 1500);
}
function pixelTransition(currentSlide){
	var containerWidth = $('#advancedPixel').width();
	var containerHeight = $('#advancedPixel').height();
	var numberOfHorSlices = Math.ceil(containerWidth / 100); 
	var numberOfVertSlices = Math.ceil(containerHeight / 100);
	// Horizontal = 8, Vertical = 5, Total = 40 slices
	var numberOfSlices = numberOfHorSlices * numberOfVertSlices;
	var count = 0;
	var slideshow = $('#advancedPixel .parent');
	var image = $('#advancedPixel .parent').eq(currentSlide).data('image');
	var numberOfSlides = slideshow.length;
	var hCount = 0;
	var vCount = 0;
	var sliceCount = 0;
	currentSlide = currentSlide % numberOfSlides;
	
	
	function transition(){
		$(slideshow)
				.eq(currentSlide)
				.css({'z-index':'2'})
				.children()
				.children('.box')
				.animate({
					'width' : '100px',
					'height' : '100px',
					'margin-top' : '0',
					'margin-bottom' : '0'
				},
				1000,
				function(){
					//alert(test);
					if(sliceCount == (numberOfSlices  - 1)){
						$(slideshow)
							.eq(currentSlide - 1)
							.css({
								'z-index':'0',
								'background' : 'none'							
							})
							.children()
							.remove();
							
						$(slideshow)
							.eq(currentSlide)
							.css({
								'z-index':'1'
							});
						
						if (currentSlide == (numberOfSlides - 1)){
							//alert('done');
							setTimeout(function() {pixelTransition(0);}, 1500);
						}else{
							setTimeout(function() {pixelTransition(++currentSlide);}, 1500);
						}
					}else{
						++sliceCount;
					}
					
				})
	}
	function buildBlocks(){
		for (var i = 0; i < numberOfVertSlices; i++){
			for (var j = 0; j < numberOfHorSlices; j++){
					var slideshowSlice = $('<div class="child"><div class="box"></div></div>');
					$(slideshow)
						.eq(currentSlide)
						.append(slideshowSlice)
						.children()
						.eq(count)
						.children('.box')
						.css({'background' : 'url('+ image +') no-repeat -' + (j * 100) + 'px -' + (i * 100) + 'px'});
						++count
						//alert('H: ' + i + ' V: ' + j)
				
			}
			if( i == (numberOfVertSlices - 1)){
				setTimeout(function() {transition();}, 200);
				//transition();
			}
		};
	}
	buildBlocks();
};

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
LOADED SLIDESHOW
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
function loadedSlideshow(){
	var totalSeconds = 5;
	var second = 0;
	var milliSecond = 0;
	var progress = 0;
	var totalFires = totalSeconds * 30;
	var slideNum = 0;
	var pause = false;
	var pauseTime = 0;
	var restack = false;
	var container = $('#loadedSlideshow');
	var slideshow = $('#loadedSlideshow img');
	var numberOfSlides = slideshow.length;
	var prevNext = $('<div class="prevNext"><a href="#" class="prev">prev</a><a href="#" class="next">next</a></div>');
	var bullets = $('<div class="bullets"></div>');
	var pauseImg = $('<div class="paused"></div>');
	var progressBar = $('<div id="progressBar"><div class="progress"></div></div>');
	
	//var comments = $('#comment').eq(2);
	//$(comments).css({'top':'100px'});
	
	//$('#loadedSlideshow #comment').eq(1).css({'top':'100px'});
	
	//alert('hello')
	//TESTIN/////////////
	var stopWatch = $('#stopWatch #time');
	var currentTime = $('<div class="currentTime">' + second + ':' + milliSecond + '</div>');
	var bar = $('#stopWatch .progress')
	
	$(stopWatch)
		  .append(currentTime);
	
	//If slideshow has more than 1 slide then build show/////////////////////
	if (numberOfSlides > 1){
		// Arrange order of slides and add links to bullet navigation
		$(slideshow).each(function(i){
			//var slideName = $(this).attr("name");
			//$(this).data('_name',slideName);
			$(this).css({
				'z-index' : 0
			});
			$(bullets).append('<a href="#">' + (i+1) + '</a>');
		});
		
		// Set default positions of first and second slide
		$(slideshow).eq(0).css({'z-index' : 2});
		$(slideshow).eq(1).css({'z-index' : 1});
		
		comment($(slideshow).eq(0).attr("name"));
		// Load container with bullet nav, button nav, pause image, and progressbar
		$(container)
			.append(pauseImg, bullets, prevNext, progressBar)
			.hover(function(){
				$(prevNext).fadeIn();
				$(progressBar).fadeIn()
				
			}, function(){
				$(prevNext).fadeOut();
				$(progressBar).fadeOut();
			});
		
		// Hide prev/next and progress bar	
		$(prevNext).hide();
		$(progressBar).css({'opacity':'.8'}).hide();
		
		// Add current class to first bullet
		currentBullet(slideNum);
		
		// Add functionality to navigation links
		$('#loadedSlideshow a')
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
			
		
		
		// Start Clock
		setTimeout(function() {startClock();},30)
	}
	
	// Add class to current bullet
	function currentBullet(bulletNum){
		$('.bullets a').removeClass('current');
		$('.bullets a').eq(bulletNum).addClass('current');
	}
	
	//Comment
	function comment(slideName){
		if(slideName){
			var commentBlocks = ('#loadedSlideshow #comment')
			var comment = ('#loadedSlideshow .' + slideName);
			var commentHeight = $(comment).height();
			$(commentBlocks).animate({
				top:'300px'
			},
			{
				duration: 500,
				queue:false	
			});
			$(comment).animate({
				top:(300 - commentHeight) + 'px'
			},
			{
				duration:500,
				queue:false
			}
			);	
		}else{
			$('#loadedSlideshow #comment').animate({
				top:'300px'
			},
			{
				duration: 500,
				queue:false	
			});
		}
	};
	
	// Previous Slide
	function prevSlide(){
		if(slideNum == 0){
			var slideName = $(slideshow).eq(numberOfSlides - 1).attr('name');
			currentBullet(numberOfSlides - 1);
			comment(slideName);
		}else{
			var slideName = $(slideshow).eq(slideNum - 1).attr('name');
			currentBullet(slideNum - 1);
			comment(slideName);
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
			comment(slideName);
		}else{
			var slideName = $(slideshow).eq(slideNum + 1).attr('name');
			currentBullet(slideNum + 1);
			comment(slideName);
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
			comment(slideName);
		}
	}
	
	// ENGINE
	function engine (currentSlide){
		//var slideName = $(slideshow).eq(currentSlide).attr('name')
		
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
		
		//alert(slideName);			
	};
	
	function ignite(){
		//var slideName = $(slideshow).eq(currentSlide).attr('name')
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
			comment(slideName);
		}else{
			var slideName = $(slideshow).eq(slideNum + 1).attr('name');
			currentBullet(slideNum + 1);
			comment(slideName);
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
				if(milliSecond >= 29){
					if(second >= (totalSeconds - 1)){
						progress = 0;
						milliSecond = 0;
						second = 0;
						$('.currentTime').replaceWith('<div class="currentTime">' + second + ':' + milliSecond + '</div>')
						ignite();
					}else{
						milliSecond = 0;
						++second
						$('.currentTime').replaceWith('<div class="currentTime">' + second + ':' + milliSecond + '</div>')
					}
				}else{
					++milliSecond
					$('.currentTime').replaceWith('<div class="currentTime">' + second + ':' + milliSecond + '</div>')
				}
				++progress;
				$('.progress').css({'width': Math.floor((progress / totalFires) * 100) + 'px'})
				setTimeout(function() {startClock();},30)
			}else{
				return;
			}		
		};
}

