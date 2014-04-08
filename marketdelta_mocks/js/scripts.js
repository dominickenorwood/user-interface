var jqslider = {
  fire: function(seconds){
	  var next = $('#jqSlider #next');
	  var prev = $('#jqSlider #prev');
	  var slide = $('#jqSlider .slide');
	  var slideCount = $('#jqSlider .slide').length;
	  var time = seconds * 1000;
	  var pause = false;
	  var pauseCount = 0;
	  var pauseTime = 5;//Set how long to pause between each slide
	  var slideDuration = 800; //Set the duration of the animation
	  var count = 0;
	  
	  //Arrange Slides
	  $(slide).each(function(i){
		$(this).css({'left' : '880px'});
	  });
	  $(slide).eq(0).css({'left':0});
	  
	  //Set up Buttons and start clock
	  if(slideCount > 1){
		$(next).click(function(e){
			e.preventDefault();
			nextSlide();
			//Pause Clock
			pauseCount = 0;
			if(!pause){
			  pause = true;
			  startClock();
			  pauseAndPlay(); 
			}else{
			  return;  
			};
		});
		
		$(prev).click(function(e){
			e.preventDefault();
			prevSlide();
			//Pause Clock
			pauseCount = 0;
			if(!pause){
			  pause = true;
			  startClock();
			  pauseAndPlay(); 
			}else{
			  return;  
			};
		});
		setTimeout(function() {startClock();},time)
	  }else{
		$(next).click(function(e){
			e.preventDefault();
		});
		
		$(prev).click(function(e){
			e.preventDefault();
		});
	  };
	 
		
	  //Slide animation
	  function nextSlide(){
		if ($(slide).is(":animated")){
		  return;
		}else{
		  $(slide)
			.eq(count)
			.animate({left : '-880px'},
					 {duration: slideDuration,
					  complete:function() {
									++count;
									$(this).css({'left':'880px'});      				 
								},
					  queue:false});
					  
		 if(count >= (slideCount - 1)){
		   $(slide)
			.eq(0)
			.css({'left':'880px'})
			.animate({left : '0'},
					 {duration: slideDuration,
					  complete:function() {
								  count = 0;
								},
					  queue:false});	  
		
		 }else{
		  $(slide)
			.eq(count + 1)
			.css({'left':'880px'})
			.animate({left : '0'},
					 {duration: slideDuration,
					  complete:function() {
								
								},
					  queue:false}); 
		 }
		}
	  }
	  
	  function prevSlide(){
		if ($(slide).is(":animated")){
		  return;
		}else{
		  $(slide)
			.eq(count)
			.animate({left : '880px'},
					 {duration: slideDuration,
					  complete:function() {
														 
								},
					  queue:false});
		
			if(count <= 0){
			   $(slide)
				.eq(slideCount - 1)
				.css({'left':'-880px'})
				.animate({left : '0'},
						 {duration: slideDuration,
						  complete:function() {
									  count = (slideCount - 1);
									},
						  queue:false});	
			}else{
			  $(slide)
				.eq(count - 1)
				.css({'left':'-880px'})
				.animate({left : '0'},
						 {duration: slideDuration,
						  complete:function() {
									  --count;
									},
						  queue:false});	
			}
		} 
	  }
	  
	  //PAUSE AND PLAY
		function pauseAndPlay(){
		  if(pause && pauseCount <= pauseTime){
			++pauseCount
			setTimeout(function() {pauseAndPlay();},1000)
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
			nextSlide();
			setTimeout(function() {startClock();},time)
		  }else{
			return;
		  }		
		}; 
  }
};
	  
$(document).ready(function() {
  jqslider.fire(3); //Set the number of seconds between each slide.
});

