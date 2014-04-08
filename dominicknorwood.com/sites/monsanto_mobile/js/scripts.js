$(document).ready(function() {	   
  
  var allPanels = $('.monAcCon').hide(); //Hide all Level 1 accordians
  var allInnerPanels = $('.monAcInner').hide(); //Hide all Level 2 accordians
  var allAcBtns = $('.monAccordian h1 a');  //All Level 1 links
  var allInnerBtns = $('.monAccordian h3 a');  //All Level 2 links

  $('section[data-role="page"]').live("pagebeforeshow", function() { //Close all panel before page transition
	allPanels.slideUp();
	allInnerPanels.slideUp();
  });
  $('section[data-role="page"]').live("pagehide", function() { //Reset all classes and icons after page transition
	$('h3 a.monCurrent').find('span').replaceWith('<span>&gt;&gt;</span>');
	$('.monOpen').removeClass("monOpen");
	allAcBtns.removeClass("monCurrent");
	allInnerBtns.removeClass("monCurrent");	
	
  });															  
  
  $('.monAccordian h1 a').click(function(e) { //Level 1 Accordian
    e.preventDefault();
	if($(this).parent().next().is(':hidden')){ //Check if accordian is closed
		$('.monOpen') // Closes any open accordians
		  .slideUp(function(){
		     $(this).parent().children(":first-child").find('a').removeClass("monCurrent"); //remove Level 1 class after slide event
		   });
		$('.monOpen .monAcInner').slideUp();  // Close any open Level 2 accordians
		$('.monOpen').removeClass("monOpen"); // Remove open accordian class
		$('h3 a.monCurrent').find('span').replaceWith('<span>&gt;&gt;</span>'); // Reset Level 2 icons
		$('h3 a.monCurrent').removeClass("monCurrent"); //Remove Level 2 classes
		
		
		$(this).parent().next().addClass("monOpen"); //Add class to accordian
		$(this).parent().next().slideDown(); //Open accordian
		$(this).addClass("monCurrent"); //Add class to Level 1 link
		
	}else{ //If accordian is already open then this will close it
		$(this) // Close accordian
		  .parent()
		  .next()
		  .slideUp(function(){
		     $(this).parent().children(":first-child").find('a').removeClass("monCurrent"); //remove Level 1 class after slide event
		   });
		$(this) //Close any open Level 2 accordians
		  .parent()
		  .next()
		  .children(".monAcInner")
		  .slideUp();
		$(this) // Remove class from accordian
		  .parent()
		  .next()
		  .removeClass("monOpen");
		$('h3 a.monCurrent').find('span').replaceWith('<span>&gt;&gt;</span>'); //Replace Level 2 icon
		$('h3 a.monCurrent').removeClass("monCurrent"); //Remove Level 2 link class
		
	};
    return false;
   });
  
  $('.monAccordian h3 a').click(function(e) { //Level 2 Accordian
    e.preventDefault();
	if($(this).parent().next().is(':hidden')){ //Check if accordian is closed
		$('.monAcInner').slideUp();
		allInnerBtns.find('span').replaceWith('<span>&gt;&gt;</span>');
		allInnerBtns.removeClass("monCurrent");
		$(this).parent().next().slideDown();
		$(this).find('span').replaceWith('<span>&lt;&lt;</span>');
		$(this).addClass("monCurrent");

	}else{  //If accordian is already open then this will close it
		$(this).parent().next().slideUp();
		$(this).find('span').replaceWith('<span>&gt;&gt;</span>');
		$(this).removeClass("monCurrent");
	};
    return false;
   });								 
});