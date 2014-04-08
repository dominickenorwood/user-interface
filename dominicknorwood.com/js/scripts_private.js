$(document).ready(function() {
   //GALLERY LIBRARIES
   var mobileIMGArray = ['deltapine_thumb.jpg','liberty_thumb.jpg','monsanto_thumb.jpg','msd_thumb.jpg',
   				   'cocacola_thumb.jpg','slug01_thumb.png','slug01_thumb.png','slug01_thumb.png',
				   'slug01_thumb.png','slug01_thumb.png','slug01_thumb.png','slug01_thumb.png']   
   var jqueryIMGArray = ['marketdelta_thumb.jpg','odile_thumb.jpg','oneil_thumb.jpg','cocacola_thumb.jpg',
   				   'dekalb_thumb.jpg','tailgate_thumb.jpg','mooshi_thumb.jpg','asgrow_thumb.jpg',
				   'draftmark_thumb.jpg','jqslideshow_thumb.jpg','slug01_thumb.png','slug01_thumb.png']						   
   var cssIMGArray = ['everest_thumb.jpg','lekorsa_thumb.jpg','marketdelta_thumb.jpg','odile_thumb.jpg',
   				   /*'streetlevel_thumb.jpg',*/'colorama_thumb.jpg','lumera_thumb.jpg','rtotv_thumb.jpg',
				   'mattingly_thumb.jpg','leasezone_thumb.jpg','lipps_thumb.jpg','virpack_thumb.jpg',
				   'partners_thumb.jpg','ochs_thumb.jpg','caci_thumb.jpg',/*'pnb_thumb.jpg',
				   'lathrop_thumb.jpg',*/'hancock_thumb.jpg','stlfactory_thumb.jpg',/*'anzea_thumb.jpg',*/
				   'slufriends_thumb.jpg','vino_thumb.jpg','rtohq_thumb.jpg','slug01_thumb.png',				'slug01_thumb.png','slug01_thumb.png','slug01_thumb.png','slug01_thumb.png']
				   
	var windowSizeArray = [ "width=400,height=760","width=1100,height=900" ];			   
   //CUBICAL ELEMENTS			      
   var frame = $('#frame');
   var csshtml = $('#navigation .csshtml');
   var navigation = $('#navigation a');
   var cubicalButton = $('#cubicalNav');
   var cubeLink = $('.prime a');
   var headScroll = $('#headScroll');
   //COUNT
   var primeCount = 1;
   var ffCount = 0;
   var sfCount = 0;
   var tfCount = 0;
   var ftCount = 0;
   var stCount = 0;
   var ttCount = 0;
   var arrayCount = 0;
   //SWITCHES
   var currentPage = "home";
   var navigateToPage = "";
   var cubeTransition = 0;
   var cubeAnimated = false;
   var cubeStages = 0;
   var stageCheck = 1;
   var straightToHome = false;
   var cubicalOn = false;
   var stagePosition = "";
   
   var timer;
   var slideshowTimer;
   var hasTimer = false;
   var _t1 = 200;
   var _t2 = 200;
   var _t3 = 200;
   var _t4 = 200;
   var _t5 = 200;
   var _t6 = 2000
   var _t7 = 1500
   /*var _t1 = 200;
   var _t2 = 600;
   var _t3 = 800;
   var _t4 = 2000;
   var _t5 = 4000;
   var _t5 = 3000
   var _t6 = 1500*/
   
   var contentBox = $("#content .box");
   var boxIndex = 0;
   
   //ADD THUMB DROPSHADOW
   $(frame).append('<div id="cubeShadow"></div>');
   
   //CUBICAL FRAME
   $(frame).append('<div id="hd1" class="column"></div>')
   $(frame).append('<div id="hb2" class="column"></div>')
   $(frame).append('<div id="hd3" class="column"></div>')
   
   function resumePrint()
	{
		window.open("http://dominicknorwood.com/ajax/resume.html","print_version","width=775,height=500,screenX=50,left=50,screenY=50,top=50,status=yes,menubar=yes,resizable=yes");
	}
					  
   function spinnerOn(){
	   $('.spinner').fadeIn('medium');
   };
   
   function spinnerOff(){
	   $('.spinner').fadeOut('medium');
   };
   
   //PROJECT DETAIL POPUP
   function centerPopup(){  
		var winw = $(window).width();  
		var winh = $(window).height();  
		var popw = $('#popup').width();  
		var poph = $('#popup').height();  
		$("#popup").css({  
			"position" : "absolute",  
			"top" : /*winh/2-poph/2*/ '50px',  
			"left" : winw/2-popw/2  
		});  
		//IE6  
		$("#bgPopup").css({  
			"height": winh  
		}); 
		
		$('#popupClose')
			  .click(function(e){
				 e.preventDefault();
				 
				 if(hasTimer){
					hasTimer = false;
					clearTimeout(slideshowTimer); 
				 }
				 $("#bgPopup").fadeOut("medium");  
				 $("#popup").fadeOut("medium", function(){$('#popup #pFrame').remove();
				 										  $('#popup #rWrap').remove();
				 												});		  
			  }); 
        $('.popMobile').click(function(e){
			 e.preventDefault();
	   		 var url = $(this).attr("href");
             var windowName = "popUp";//$(this).attr("name");
             var windowSize = windowSizeArray[$(this).attr("rel")];	   		  
			 window.open(url, windowName, windowSize,"screenX=50,left=50,screenY=50,top=50,status=yes,menubar=yes,resizable=yes");
		});
					  
	} 
	 
   function getResume(){
	   $('.spinner').fadeIn('medium');
				 $('#pContent #loadBay').load('/ajax/resume.html #rWrap', function() {
					 //alert('Load was performed.');
					  //loadedSlideshow();
					  $('.spinner').fadeOut('medium');
					  $("#bgPopup").fadeIn("medium");  
					  $("#popup").fadeIn("medium");
					  centerPopup(); 
					  $('.print').click(function(e){
	   						e.preventDefault();
	   						resumePrint();
					  });
					  /*$('a.print').click()(function(e){
						 e.preventDefault;
						 resumePrint(); 
					  });*/
					  
					 });
   };
   //NAVIGATION FUNCTIONS
   $('#header .logo').click(function(e){
	   e.preventDefault(); 
	   if(currentPage == "home"){
		  return; 
	   }else{
		   if(!cubeAnimated){
			  boxIndex = 0;
			  $(navigation).removeClass('current');
			  $('#navigation #home').addClass('current');
			  navCall('home'); 
		   }else{
			  return; 
		   }
	   } 
   });
   
   $('#footer .home').click(function(e){
	   e.preventDefault(); 
	   if(currentPage == "home"){
		  return; 
	   }else{
		   if(!cubeAnimated){
			  boxIndex = 0;
			  $(navigation).removeClass('current');
			  $('#navigation #home').addClass('current');
			  navCall('home'); 
		   }else{
			  return; 
		   }
	   } 
   });
   
   function togglePage(index){
	 var effectTime = 1000;
     /*$("#content .current").fadeOut('slow', function() {
    						// Animation complete.
							$(this).removeClass('current');
							$("#content .box").eq(index).fadeIn('slow').addClass('current');
  							});*/
	 $("#content .current").fadeToggle(effectTime, function() {
    						// Animation complete.
							$(this).removeClass('current');
							$("#content .box").eq(index).fadeToggle(effectTime).addClass('current');
  							}); 
   }
   
   $(navigation).click(function(e){
	  var _linkID = $(this).attr('id');
	  boxIndex = $(navigation).index(this);
	  navigateToPage = _linkID;
	 //alert("That was div index #" + index);
	  
	   e.preventDefault(); 
	   if(_linkID == currentPage){
		  return; 
	   }else{
		   if(_linkID == "resume"){
		     navCall(_linkID) 
		   }else if(cubicalOn == false){
			 navCall(_linkID)
		   }else{
			 cubicalOn = false;
			 cubicalTimer();   
		   } 
	   }
	   
   });
   
   function navCall(linkID, index){ 
	   if(linkID != "resume"){
		   if(linkID == currentPage){
			  return;   
		   }else{
			   if(!cubeAnimated){
				 spinnerOff();  
				 togglePage(boxIndex);
				 //alert(boxIndex);
				 
				 currentPage = linkID;
				 $(navigation).removeClass('current');
				 $('#' + linkID).addClass('current'); 
				 
				 stageCheck = 1;
				 arrayCount = 0;
				 cubeAnimated = true;
				 
				 if(currentPage == "home"){
					 $('#headScroll span').slideToggle('slow', function() {
							$('#headScroll')
					 			.append('<span class="home"><a href="http://gorgonthehorrible.com/" target="_blank" title="The Secret Labaratory of Gorgon the Horrible">Visit Labaratory &#187;</a></span>')
								.hide()
								.slideToggle('slow');
								$(this).remove();
						  });
					  spinnerOn();
					  backToHome();
						  
				 }else{
					if(currentPage == "csshtml"){
					    cubeStages = cssIMGArray.length / 12;
					 }else if(currentPage =="jqueryAction"){
						cubeStages = jqueryIMGArray.length / 12;
					 }else{
						cubeStages = mobileIMGArray.length / 12;
					 };
		
					 if (cubeTransition == 0){
						 cubeTransition = 1;
					 }else{
						 cubeTransition = 0;
					 };
					 
					 if(cubeStages > 1){
						 $(cubicalButton).fadeIn('slow');
					 }else{
						 $(cubicalButton).fadeOut('slow');
					 }
					 
					 if($('#headScroll span').hasClass('home')){
						 
						 $('#headScroll span').slideToggle('slow', function() {
							$('#headScroll')
					 			.append('<span>' + stageCheck + ' of ' + cubeStages + '</span>')
								.hide()
								.slideToggle('slow');
								$(this).remove();
						  })

					 }else{
						$('#headScroll span').remove();
			 			$('#headScroll').append('<span>' + stageCheck + ' of ' + cubeStages + '</span>');
					 }
					 preCubical();
				}
			   }else{
				  return; 
			   }
		   }
	   }else{
		  getResume();
		  //alert('load resume'); 
	   }
   };
   
   //NEXT SET OF THUMBS
   $(cubicalButton).click(function(e){
	   e.preventDefault();   
	   if(!cubeAnimated){
		  if(cubeStages > 1){
			  if(stageCheck != cubeStages){
				 stageCheck++; 
			  }else{
				 arrayCount = 0;
				 stageCheck = 1; 
			  }
			 
			 $('#headScroll span').remove();
			 $('#headScroll').append('<span>' + stageCheck + ' of ' + cubeStages + '</span>');
			 
			 cubeAnimated = true;
		     preCubical(); 
		  }else{
			return;  
		  }  
	   }else{
		  return;
	   } 
   });
   
   //CUBICAL TRANSITION
   function preCubical(){
	 primeCount = 1;
   	 ffCount = 0;
   	 sfCount = 0;
   	 tfCount = 0;
   	 ftCount = 0;
   	 stCount = 0;
   	 ttCount = 0;
	 
	 $('#frame a').removeClass('enabled');
	 $(frame).css({'overflow':'hidden'});
	 
	 if(cubeTransition == 1){
		 $(frame).append('<div id="CSSV1" class="columnV"></div>');
		 $(frame).append('<div id="CSSV2" class="columnV"></div>');
		 $(frame).append('<div id="CSSV3" class="columnV"></div>');
		 $(frame).append('<div id="CSSV4" class="columnV"></div>');
	 }else{
		 $(frame).append('<div id="CSSH1" class="column"></div>')
		 $(frame).append('<div id="CSSH2" class="column"></div>')
		 $(frame).append('<div id="CSSH3" class="column"></div>')
	 }
	 
	 $('#frame a')
			.hover(function(){
				$(frame).append($('#cubeShadow'))

			}, function(){
				$(frame).append($('#cubeShadow'))

			});
			
	 buildCubical();  
   };
   
   function buildCubical(){
	   if(cubeTransition == 1){
			 if(primeCount <= 12){
			  if(primeCount == 1 || primeCount == 5 || primeCount == 9){
				 $('#CSSV1').append($('#prime' + primeCount));
				 $('#prime' + primeCount).css({'left':0,'top': 342 + (ftCount * 114) + 'px'});
				 
				 if(currentPage == "csshtml"){
					var _relIN = cssIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSV1').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + cssIMGArray[arrayCount] +')"></a></div>'); 
				 }else if(currentPage =="jqueryAction"){
					var _relIN = jqueryIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSV1').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + jqueryIMGArray[arrayCount] +')"></a></div>'); 
				 }else{
					var _relIN = mobileIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSV1').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + mobileIMGArray[arrayCount] +')"></a></div>'); 
				 }
				 
				 ftCount++;
			  }else if(primeCount == 2 || primeCount == 6 || primeCount == 10){
				 $('#CSSV2').append($('#prime' + primeCount));
				 $('#prime' + primeCount).css({'left':0});
				 
				 if(currentPage == "csshtml"){
					var _relIN = cssIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSV2').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + cssIMGArray[arrayCount] +')"></a></div>'); 
				 }else if(currentPage =="jqueryAction"){
					var _relIN = jqueryIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSV2').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + jqueryIMGArray[arrayCount] +')"></a></div>'); 
				 }else{
					var _relIN = mobileIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSV2').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + mobileIMGArray[arrayCount] +')"></a></div>');
				 }
				  
			  }else if(primeCount == 3 || primeCount == 7 || primeCount == 11){
				 $('#CSSV3').append($('#prime' + primeCount));
				 $('#prime' + primeCount).css({'left':0,'top': 342 + (stCount * 114) + 'px'});
				 
				 if(currentPage == "csshtml"){
					var _relIN = cssIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSV3').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + cssIMGArray[arrayCount] +')"></a></div>');
				 }else if(currentPage =="jqueryAction"){
					var _relIN = jqueryIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSV3').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + jqueryIMGArray[arrayCount] +')"></a></div>');
				 }else{
					var _relIN =  mobileIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSV3').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + mobileIMGArray[arrayCount] +')"></a></div>');
				 }
				 
				 stCount++;
			  }else{
				 $('#CSSV4').append($('#prime' + primeCount));
				 $('#prime' + primeCount).css({'left':0});
				 
				 if(currentPage == "csshtml"){
					var _relIN = cssIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSV4').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + cssIMGArray[arrayCount] +')"></a></div>'); 
				 }else if(currentPage =="jqueryAction"){
					var _relIN = jqueryIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSV4').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + jqueryIMGArray[arrayCount] +')"></a></div>');  
				 }else{
					var _relIN =  mobileIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSV4').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + mobileIMGArray[arrayCount] +')"></a></div>');  
				 }
				 			 
			  }
			  
			  primeCount++;
			  arrayCount++;
			  buildCubical(); 
		   }else{
			   primeCount = 1;
			   ftCount = 0;
			   stCount = 0;
			   
			   moveCSSV1()
			  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
  
		   } 
		   //END OF VERTICAL TRANSITION CONDITION  
	   }else{
		  if(primeCount <= 12){
			   
			  if(primeCount <= 4){
				 $('#CSSH1').append($('#prime' + primeCount));
				 $('#prime' + primeCount).css({'top':0,'left': 448 + (ffCount * 112) + 'px'});
				 
				 if(currentPage == "csshtml"){
					var _relIN = cssIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSH1').append('<div id="secondCSSH' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + cssIMGArray[arrayCount] +')"></a></div>'); 
				 }else if(currentPage =="jqueryAction"){
					var _relIN = jqueryIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSH1').append('<div id="secondCSSH' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + jqueryIMGArray[arrayCount] +')"></a></div>'); 
				 }else{
					var _relIN =  mobileIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSH1').append('<div id="secondCSSH' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + mobileIMGArray[arrayCount] +')"></a></div>'); 
				 }
				 
				 ffCount++;
			  }else if(primeCount >= 5 && primeCount <= 8){
				 $('#CSSH2').append($('#prime' + primeCount));
				 $('#prime' + primeCount).css({'top':0});
				 
				 if(currentPage == "csshtml"){
					var _relIN = cssIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSH2').append('<div id="secondCSSH' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + cssIMGArray[arrayCount] +')"></a></div>'); 
				 }else if(currentPage =="jqueryAction"){
					var _relIN = jqueryIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSH2').append('<div id="secondCSSH' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + jqueryIMGArray[arrayCount] +')"></a></div>'); 
				 }else{
					var _relIN =  mobileIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSH2').append('<div id="secondCSSH' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + mobileIMGArray[arrayCount] +')"></a></div>'); 
				 }
				 
			  }else{
				 $('#CSSH3').append($('#prime' + primeCount));
				 $('#prime' + primeCount).css({'top':0,'left': 448 + (sfCount * 112) + 'px'});
				 
				 if(currentPage == "csshtml"){
					var _relIN = cssIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSH3').append('<div id="secondCSSH' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + cssIMGArray[arrayCount] +')"></a></div>'); 
				 }else if(currentPage =="jqueryAction"){
					var _relIN = jqueryIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSH3').append('<div id="secondCSSH' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + jqueryIMGArray[arrayCount] +')"></a></div>'); 
				 }else{
					var _relIN =  mobileIMGArray[arrayCount];
					var _relOUT = _relIN.substr(0, _relIN.lastIndexOf('_'));
					$('#CSSH3').append('<div id="secondCSSH' + primeCount + '" class="second"><a href="#" rel="' + _relOUT + '"  style="background-image:url(/images/portfolio/thumbs/' + mobileIMGArray[arrayCount] +')"></a></div>'); 
			   }

				 sfCount++; 
			  }
			  
			  primeCount++;
			  arrayCount++;
			  buildCubical(); 
		   }else{
			   primeCount = 1;
			   ffCount = 0;
			   sfCount = 0;
			   
			   moveCSSH1()
			  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		   }  
	   } 
   };
   
   //CUBICAL ANIMATION
   function moveCSSH1(){
     $('#CSSH1').animate({'left': '0',},2000,function(){ });
	 setTimeout(moveCSSH2, 200);
   };
   function moveCSSH3(){
     $('#CSSH3').animate({'left': '0',},2000,function(){destroyCubical();});	 
   };
   function moveCSSH2(){
     $('#CSSH2').animate({'left': '-448px',},2000,function(){ });
     setTimeout(moveCSSH3, 200);
   };
   
   function moveCSSV1(){
	 $('#CSSV1').animate({'top': '0',},2000,function(){ });
	 setTimeout(moveCSSV2, 200);
   };
   function moveCSSV2(){
     $('#CSSV2').animate({'top': '-342px',},2000,function(){ });
	 setTimeout(moveCSSV3, 200);
   };
   function moveCSSV3(){
	 $('#CSSV3').animate({'top': '0',},2000,function(){ });
	 setTimeout(moveCSSV4, 200);
   };
   function moveCSSV4(){
	 $('#CSSV4').animate({'top': '-342px',},2000,function(){	destroyCubical();});
   };
   
   function destroyCubical(){
	   if(primeCount <= 12){
		  $('#prime' + primeCount).remove(); 
		  
		  if(cubeTransition == 1){
			$('#secondCSS' + primeCount).attr({
			   id:'prime' + primeCount,
			   class:'prime'
			});
		  }else{
			$('#secondCSSH' + primeCount).attr({
			   id:'prime' + primeCount,
			   class:'prime'
			 });
		  }

		  $(frame).append($('#prime' + primeCount))
		  
		  primeCount++;
		  destroyCubical(); 
	   }else{
		   primeCount = 1;
		   ftCount = 0;
		   stCount = 0;
		   cubeAnimated = false;
		   
		   if(cubeTransition == 1){
			 //$('#CSSV1').remove();
			     $('#CSSV1').remove();
				 $('#CSSV2').remove();
				 $('#CSSV3').remove();
				 $('#CSSV4').remove();
			 }else{
				 $('#CSSH1').remove();
			     $('#CSSH2').remove();
			     $('#CSSH3').remove();
			 }
			 
		   $(frame).css({'overflow':'visible'});
		   $('#frame a').each(function(i){
			    var _rel = $(this).attr('rel');
				if (_rel.toLowerCase().indexOf("slug") >= 0){
					return;
				}else{
					$(this).addClass('enabled');
					$(this)
					.hover(function(){
						$(this).parent().append($('#cubeShadow'))
		
					}, function(){
						$(frame).append($('#cubeShadow'))
		
					});
					$(this)
				      .click(function(e){
					   e.preventDefault();
					 
					   $('.spinner').fadeIn('medium');
					   $('#pContent #loadBay').load('/ajax/' + _rel + '.html', function() {
						  fireSlideshow();
						  $('.spinner').fadeOut('medium');
						  $("#bgPopup").fadeIn("medium");  
						  $("#popup").fadeIn("medium");  
						  centerPopup();
						 }); 
				    });
				}
			});
		
		   
			
			/*$('#frame a.enabled')
			  .click(function(e){
				 e.preventDefault();
				 
				 $('.spinner').fadeIn('medium');
				 $('#pContent #loadBay').load('/ajax/test.html', function() {
					 //alert('Load was performed.');
					  //loadedSlideshow();
					  $('.spinner').fadeOut('medium');
					  $("#bgPopup").fadeIn("medium");  
					  $("#popup").fadeIn("medium");  
					  centerPopup();
					 });
 
				  
			  });*/
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
	   }
   };
   
   function backToHome(){
	   straightToHome = true;
	   cubicalOn = true;
	   
	   $(frame).css({'overflow':'hidden'});
	   $(cubicalButton).fadeOut('slow');
	   
	   $(frame).append('<div id="SFV1" class="columnV"></div>')
	   $(frame).append('<div id="SFV2" class="columnV"></div>')
	   $(frame).append('<div id="SFV3" class="columnV"></div>')
	   $(frame).append('<div id="SFV4" class="columnV"></div>')
	   
	   $('#frame a').removeClass('enabled');
	   
	    $('#frame a')
			.hover(function(){
				$(frame).append($('#cubeShadow'))

			}, function(){
				$(frame).append($('#cubeShadow'))

			});
	   
	   buildStageF();
   };
   /*///////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////
   CUBICAL MOVIE
   ///////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////*/
   

   /*///////////////////////////////////////////////////////////////////
   STAGE A
   ///////////////////////////////////////////////////////////////////*/
    function destroyCubicalMovie(){
		if(primeCount <= 12){
		  $(frame).append($('#prime' + primeCount));
		  if(primeCount <= 4){
			 $('#prime' + primeCount).css({'top':0,'left':ffCount * 112 + 'px'})
			 ffCount++;
		  }else if(primeCount >= 5 && primeCount <= 8){
			 $('#prime' + primeCount).css({'top':'114px','left':sfCount * 112 + 'px'});
			 sfCount++;
		  }else{
			  $('#prime' + primeCount).css({'top':'228px','left':tfCount * 112 + 'px'});

			  tfCount++;
		  }
		  primeCount++;
		  destroyCubicalMovie();
		}else{
		  primeCount = 1;
		  ffCount = 0;
		  sfCount = 0;
		  tfCount = 0;
		  
		  
		  $('.column').remove();
		  $('.columnV').remove();

		  navCall(navigateToPage);

		}
	   
   }
   
   function cubicalTimer(){
	 if(cubicalOn == false){
	   if(!cubeAnimated){
		 spinnerOn();
		 clearTimeout(timer); 
	   	 destroyCubicalMovie(); 
	   }else{
		 
		 /*_t1 = 200;
		 _t2 = 200;
		 _t3 = 200;
		 _t4 = 200;
		 _t5 = 200;*/
		 spinnerOn();
		 //alert('in motion');
		 //return;   
	   } 
	 }else{
		 if(stagePosition == "stage_A"){
			timer = setTimeout(moveHD1, _t6 /*3000*/);
			//setTimeout(moveHD1, 3000); 
		 }else if(stagePosition == "stage_B"){
			timer = setTimeout(moveSBV1, _t6 /*3000*/);
			//setTimeout(moveSBV1, 3000); 
		 }else if(stagePosition == "stage_C"){
			timer = setTimeout(moveSCH1, _t6 /*3000*/);
			//setTimeout(moveSCH1, 3000);
		 }else if(stagePosition == "stage_D"){
			timer = setTimeout(moveSDV4, _t6 /*3000*/);
			//setTimeout(moveSDV4, 3000);
		 }else if(stagePosition == "stage_E"){
			timer = setTimeout(moveSEH2 ,_t6 /*1500*/);
			//setTimeout(moveSEH2, 1500);
		 }else if(stagePosition == "stage_F"){
			timer = setTimeout(moveSFV1, _t6 /*2000*/);
			//setTimeout(moveSFV1, 2000);
		 }else{
			alert("no stage position"); 
		 } 
	 }
   };
   
   function buildColumns(){
	   cubicalOn = true;
	   stagePosition = "stage_A";
	   
	   if(primeCount <= 12){
		   
		  if(primeCount <= 4){
			 $('#hd1').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'top':0,'left': 448 + (ffCount * 112) + 'px'});
			 $('#hd1').append('<div id="secondSA' + primeCount + '" class="second"><img src="/images/cubical/stage_b/cube' + primeCount + '.jpg" /></div>');
			 ffCount++;
		  }else if(primeCount >= 5 && primeCount <= 8){
			 $('#hb2').append($('#prime' + primeCount));
			 
			 $('#prime' + primeCount).css({'top':0});
			 
			 $('#hb2').append('<div id="secondSA' + primeCount + '" class="second"><img src="/images/cubical/stage_b/cube' + primeCount + '.jpg" /></div>');
		  }else{
			 $('#hd3').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'top':0,'left': 448 + (sfCount * 112) + 'px'});
			 $('#hd3').append('<div id="secondSA' + primeCount + '" class="second"><img src="/images/cubical/stage_b/cube' + primeCount + '.jpg" /></div>');
			 sfCount++; 
		  }
		  
		  primeCount++;
		  buildColumns(); 
	   }else{
		   primeCount = 1;
		   ffCount = 0;
		   sfCount = 0;
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  cubicalTimer();
		 // setTimeout(moveHD1, 3000);
		 // moveHD1();
		  //return;   
	   }
   };
   function moveHD1(){
	 cubeAnimated = true;
     cubicalOn = true;
	 $('#hd1').animate({'left': '0',},2000);
     setTimeout(moveHB2, _t1);
   };
   function moveHD3(){
     $('#hd3').animate({'left': '0',},2000,function(){cubeAnimated = false;destroyStageA();});	 
   };
   function moveHB2(){
	   $('#hb2').animate({'left': '-448px',},2000);
		setTimeout(moveHD3, _t1);
   };
   
   function destroyStageA(){
	   if(primeCount <= 12){
		  $('#prime' + primeCount).remove(); 
		  $('#secondSA' + primeCount).attr({
			 id:'prime' + primeCount,
			 class:'prime'
		  });

		  $(frame).append($('#prime' + primeCount))
		  
		  primeCount++;
		  destroyStageA(); 
	   }else{
		   primeCount = 1;
		   ffCount = 0;
		   sfCount = 0;
		   
		   $('#hd1').remove();
		   $('#hb2').remove();
		   $('#hd3').remove();
		   
		   $(frame).append('<div id="SBV1" class="columnV"></div>')
		   $(frame).append('<div id="SBV2" class="columnV"></div>')
		   $(frame).append('<div id="SBV3" class="columnV"></div>')
		   $(frame).append('<div id="SBV4" class="columnV"></div>')
		   
		   buildStageB();
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  
		  //return;   
	   }
   }
   
   //buildColumns();
   /*///////////////////////////////////////////////////////////////////
   STAGE B
   ///////////////////////////////////////////////////////////////////*/
   
   function buildStageB(){
	   stagePosition = "stage_B";
	   if(primeCount <= 12){
		   
		  if(primeCount == 1 || primeCount == 5 || primeCount == 9){
			 $('#SBV1').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0,'top': 342 + (ftCount * 114) + 'px'});
			 $('#SBV1').append('<div id="secondSB' + primeCount + '" class="second"><img src="/images/cubical/stage_c/cube' + primeCount + '.jpg" /></div>');
			 ftCount++;
		  }else if(primeCount == 2 || primeCount == 6 || primeCount == 10){
			 $('#SBV2').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0});
			 $('#SBV2').append('<div id="secondSB' + primeCount + '" class="second"><img src="/images/cubical/stage_c/cube' + primeCount + '.jpg" /></div>');
		  }else if(primeCount == 3 || primeCount == 7 || primeCount == 11){
			 $('#SBV3').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0,'top': 342 + (stCount * 114) + 'px'});
			 $('#SBV3').append('<div id="secondSB' + primeCount + '" class="second"><img src="/images/cubical/stage_c/cube' + primeCount + '.jpg" /></div>');
			 stCount++;
		  }else{
			 $('#SBV4').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0});
			 $('#SBV4').append('<div id="secondSB' + primeCount + '" class="second"><img src="/images/cubical/stage_c/cube' + primeCount + '.jpg" /></div>');
		  }
		  
		  primeCount++;
		  buildStageB(); 
	   }else{
		   primeCount = 1;
		   ftCount = 0;
		   stCount = 0;
		   
		   cubicalTimer();
		   //setTimeout(moveSBV1, 3000);
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  //setTimeout(moveHD1, 2000);

		  //return;   
	   }
   }
   
   function moveSBV1(){
     cubeAnimated = true;
	 $('#SBV1').animate({'top': '0',},2000,function(){});
	 setTimeout(moveSBV2, _t1);
   }
   function moveSBV2(){
	 $('#SBV2').animate({'top': '-342px',},2000,function(){});
	 setTimeout(moveSBV3, _t1);
   }
   function moveSBV3(){
	 $('#SBV3').animate({'top': '0',},2000,function(){});
	 setTimeout(moveSBV4, _t1);
   }
   function moveSBV4(){
	 $('#SBV4').animate({'top': '-342px',},2000,function(){cubeAnimated = false;destroyStageB();});
   }
   
   function destroyStageB(){
	   if(primeCount <= 12){
		  $('#prime' + primeCount).remove(); 
		  $('#secondSB' + primeCount).attr({
			 id:'prime' + primeCount,
			 class:'prime'
		  });

		  $(frame).append($('#prime' + primeCount))
		  
		  primeCount++;
		  destroyStageB(); 
	   }else{
		   primeCount = 1;
		   ftCount = 0;
		   stCount = 0;
		   
		   $('#SBV1').remove();
		   $('#SBV2').remove();
		   $('#SBV3').remove();
		   $('#SBV4').remove();
		   
		   $(frame).append('<div id="SCH1" class="column"></div>')
		   $(frame).append('<div id="SCH2" class="column"></div>')
		   $(frame).append('<div id="SCH3" class="column"></div>')
		   
		   buildStageC();
		   
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  
		  //return;   
	   }
   }
   
   /*///////////////////////////////////////////////////////////////////
   STAGE C
   ///////////////////////////////////////////////////////////////////*/
   function buildStageC(){
	   stagePosition = "stage_C";
	   if(primeCount <= 12){
		  if(primeCount <= 4){
			 $('#SCH1').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'top':0,'left': 448 + (ffCount * 112) + 'px'});
			 $('#SCH1').append('<div id="secondSC' + primeCount + '" class="second"><img src="/images/cubical/stage_d/cube' + primeCount + '.jpg" /></div>');
			 ffCount++;
		  }else if(primeCount >= 5 && primeCount <= 8){
			 $('#SCH2').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'top':0,'left': 448 + (sfCount * 112) + 'px'});
			 $('#SCH2').append('<div id="secondSC' + primeCount + '" class="second"><img src="/images/cubical/stage_d/cube' + primeCount + '.jpg" /></div>');
			 sfCount++;
		  }else{
			 $('#SCH3').append($('#prime' + primeCount));
			  $('#prime' + primeCount).css({'top':0,'left': 448 + (tfCount * 112) + 'px'});
			  $('#SCH3').append('<div id="secondSC' + primeCount + '" class="second"><img src="/images/cubical/stage_d/cube' + primeCount + '.jpg" /></div>'); 
			 tfCount++;
		  }
		  
		  primeCount++;
		  buildStageC(); 
	   }else{
		   primeCount = 1;
		   ffCount = 0;
		   sfCount = 0;
		   tfCount = 0;
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  //setTimeout(moveSCH1, 3000);
		  cubicalTimer(); 
	   }
   };
   function moveSCH1(){
     cubeAnimated = true;
	 $('#SCH1').animate({'left': '0',},2000,function(){});
	 setTimeout(moveSCH2, _t2);
   }
   function moveSCH2(){
	 $('#SCH2').animate({'left': '0',},2000,function(){});
	 setTimeout(moveSCH3, _t2);	 
   }
   function moveSCH3(){
	 $('#SCH3').animate({'left': '0',},2000,function(){cubeAnimated = false;destroyStageC();});
   }
   function destroyStageC(){
	   if(primeCount <= 12){
		  $('#prime' + primeCount).remove(); 
		  $('#secondSC' + primeCount).attr({
			 id:'prime' + primeCount,
			 class:'prime'
		  });

		  $(frame).append($('#prime' + primeCount))
		  
		  primeCount++;
		  destroyStageC(); 
	   }else{
		   primeCount = 1;
		   ffCount = 0;
		   sfCount = 0;
		   tfCount = 0;
		   
		   $('#SCH1').remove();
		   $('#SCH2').remove();
		   $('#SCH3').remove();
		   
		   $(frame).append('<div id="SDV1" class="columnV"></div>')
		   $(frame).append('<div id="SDV2" class="columnV"></div>')
		   $(frame).append('<div id="SDV3" class="columnV"></div>')
		   $(frame).append('<div id="SDV4" class="columnV"></div>')
		   
		   buildStageD();
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  
		  //return;   
	   }
   }
   /*///////////////////////////////////////////////////////////////////
   STAGE D
   ///////////////////////////////////////////////////////////////////*/
   function buildStageD(){
	   stagePosition = "stage_D";
	   if(primeCount <= 12){
		   
		  if(primeCount == 1 || primeCount == 5 || primeCount == 9){
			 $('#SDV1').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0,'top': 342 + (ftCount * 114) + 'px'});
			 $('#SDV1').append('<div id="secondSD' + primeCount + '" class="second"><img src="/images/cubical/stage_e/cube' + primeCount + '.jpg" /></div>');
			 ftCount++;
		  }else if(primeCount == 2 || primeCount == 6 || primeCount == 10){
			 $('#SDV2').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0,'top': 342 + (stCount * 114) + 'px'});
			 $('#SDV2').append('<div id="secondSD' + primeCount + '" class="second"><img src="/images/cubical/stage_e/cube' + primeCount + '.jpg" /></div>');
			 stCount++;
		  }else if(primeCount == 3 || primeCount == 7 || primeCount == 11){
			 $('#SDV3').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0,'top': 342 + (ttCount * 114) + 'px'});
			 $('#SDV3').append('<div id="secondSD' + primeCount + '" class="second"><img src="/images/cubical/stage_e/cube' + primeCount + '.jpg" /></div>');
			 ttCount++;
		  }else{
			 $('#SDV4').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0});
			 $('#SDV4').append('<div id="secondSD' + primeCount + '" class="second"><img src="/images/cubical/stage_e/cube' + primeCount + '.jpg" /></div>');
		  }
		  
		  primeCount++;
		  buildStageD(); 
	   }else{
		   primeCount = 1;
		   ftCount = 0;
		   stCount = 0;
		   ttCount = 0;
		   
		   //setTimeout(moveSDV4, 3000);
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  cubicalTimer();
		  //setTimeout(moveHD1, 2000);

		  //return;   
	   }
   }
   
   function moveSDV1(){
	 
	    $('#SDV1')
				  .animate({
					 'top': '0',
				   },
					 2000,
				   function(){
					   cubeAnimated = false;
					   destroyStageD(); 
				   });	   
   }
   function moveSDV2(){
	   $('#SDV2')
		  .animate({
			'top': '0',
		  },
		  2000,
		  function(){
					
		 });
		 setTimeout(moveSDV1, _t3);
   }
   function moveSDV3(){
	   
	   $('#SDV3')
		.animate({
		'top': '0',
		},
		2000,
		function(){
									
		});
		setTimeout(moveSDV2, _t5);
   }
   function moveSDV4(){
	   cubeAnimated = true;
	   $('#SDV4')
		.animate({
		'top': '-342px',
		},
		2000,
		function(){
					
		});
		setTimeout(moveSDV3, _t1);
   }
   
    function destroyStageD(){
	   if(primeCount <= 12){
		  $('#prime' + primeCount).remove(); 
		  $('#secondSD' + primeCount).attr({
			 id:'prime' + primeCount,
			 class:'prime'
		  });

		  $(frame).append($('#prime' + primeCount))
		  
		  primeCount++;
		  destroyStageD(); 
	   }else{
		   primeCount = 1;
		   ftCount = 0;
		   stCount = 0;
		   ttCount = 0;
		   
		   $('#SDV1').remove();
		   $('#SDV2').remove();
		   $('#SDV3').remove();
		   $('#SDV4').remove();
		   
		   $(frame).append('<div id="SEH1" class="column"></div>')
		   $(frame).append('<div id="SEH2" class="column"></div>')
		   $(frame).append('<div id="SEH3" class="column"></div>')
		   
		   buildStageE();
		   
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  
		  //return;   
	   }
   }
   
   /*///////////////////////////////////////////////////////////////////
   STAGE E 
   ///////////////////////////////////////////////////////////////////*/
   function buildStageE(){
	   stagePosition = "stage_E";
	   if(primeCount <= 12){
		  if(primeCount <= 4){
			 $('#SEH1').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'top':0,'left': 448 + (ffCount * 112) + 'px'});
			 $('#SEH1').append('<div id="secondSE' + primeCount + '" class="second"><img src="/images/cubical/stage_f/cube' + primeCount + '.jpg" /></div>');
			 ffCount++;
		  }else if(primeCount >= 5 && primeCount <= 8){
			 $('#SEH2').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'top':0});
			 $('#SEH2').append('<div id="secondSE' + primeCount + '" class="second"><img src="/images/cubical/stage_f/cube' + primeCount + '.jpg" /></div>');
		  }else{
			 $('#SEH3').append($('#prime' + primeCount));
			  $('#prime' + primeCount).css({'top':0});
			  $('#SEH3').append('<div id="secondSE' + primeCount + '" class="second"><img src="/images/cubical/stage_f/cube' + primeCount + '.jpg" /></div>'); 
		  }
		  
		  primeCount++;
		  buildStageE(); 
	   }else{
		   primeCount = 1;
		   ffCount = 0;
		   sfCount = 0;
		   tfCount = 0;
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  cubicalTimer();
		  //setTimeout(moveSEH2, 1500); 
	   }
   };
   
   function moveSEH1(){
	 
	    $('#SEH1')
				  .animate({
					 'left': '0',
				   },
					 2000,
				   function(){
					  cubeAnimated = false;
					  destroyStageE(); 			  
				   });
				   
   }
   function moveSEH2(){
	   cubeAnimated = true;
	   $('#SEH2')
		  .animate({
			'left': '-448px',
		  },
		  2000,
		  function(){
								
		 });
		 setTimeout(moveSEH3, _t4);
		 
   }
   function moveSEH3(){
	   $('#SEH3')
		.animate({
		'left': '-448px',
		},
		2000,
		function(){
			//destroyStageC();						
		});
		
		setTimeout(moveSEH1, _t4);
   }
   
   function destroyStageE(){
	   if(primeCount <= 12){
		  $('#prime' + primeCount).remove(); 
		  $('#secondSE' + primeCount).attr({
			 id:'prime' + primeCount,
			 class:'prime'
		  });

		  $(frame).append($('#prime' + primeCount))
		  
		  primeCount++;
		  destroyStageE(); 
	   }else{
		   primeCount = 1;
		   ffCount = 0;
		   sfCount = 0;
		   tfCount = 0;
		   
		   $('#SEH1').remove();
		   $('#SEH2').remove();
		   $('#SEH3').remove();
		   
		   $(frame).append('<div id="SFV1" class="columnV"></div>')
		   $(frame).append('<div id="SFV2" class="columnV"></div>')
		   $(frame).append('<div id="SFV3" class="columnV"></div>')
		   $(frame).append('<div id="SFV4" class="columnV"></div>')
		   
		   buildStageF();
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  
		  //return;   
	   }
   }
   
   /*///////////////////////////////////////////////////////////////////
   STAGE F LOOP
   ///////////////////////////////////////////////////////////////////*/
   function buildStageF(){
	   stagePosition = "stage_F";
	   if(primeCount <= 12){
		  if(primeCount == 1 || primeCount == 5 || primeCount == 9){
			 $('#SFV1').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0});
			 $('#SFV1').append('<div id="secondSF' + primeCount + '" class="second"><img src="/images/cubical/stage_a/cube' + primeCount + '.jpg" /></div>');
		  }else if(primeCount == 2 || primeCount == 6 || primeCount == 10){
			 $('#SFV2').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0});
			 $('#SFV2').append('<div id="secondSF' + primeCount + '" class="second"><img src="/images/cubical/stage_a/cube' + primeCount + '.jpg" /></div>');
		  }else if(primeCount == 3 || primeCount == 7 || primeCount == 11){
			 $('#SFV3').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0});
			 $('#SFV3').append('<div id="secondSF' + primeCount + '" class="second"><img src="/images/cubical/stage_a/cube' + primeCount + '.jpg" /></div>');
		  }else{
			 $('#SFV4').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0});
			 $('#SFV4').append('<div id="secondSF' + primeCount + '" class="second"><img src="/images/cubical/stage_a/cube' + primeCount + '.jpg" /></div>');
		  }
		  
		  primeCount++;
		  buildStageF(); 
	   }else{
		   primeCount = 1;
		   ftCount = 0;
		   stCount = 0;
		   
		   if(straightToHome){
			  spinnerOff();
			  moveSFV1(); 
		   }else{
			 cubicalTimer();
			 //setTimeout(moveSFV1, 2000);  
		   }
		   
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  //setTimeout(moveHD1, 2000);

		  //return;   
	   }
   }
   
   function moveSFV1(){
	 cubeAnimated = true;
	    $('#SFV1').animate({'top': '-342px',},2000);
		setTimeout(moveSFV2, _t3);
   }
   function moveSFV2(){
	   $('#SFV2').animate({'top': '-342px',},2000);
	   setTimeout(moveSFV3, _t3);
   }
   function moveSFV3(){
	   $('#SFV3').animate({'top': '-342px',},2000);
	   setTimeout(moveSFV4, _t3);
   }
   function moveSFV4(){
	   $('#SFV4').animate({'top': '-342px',},2000,function(){cubeAnimated = false;destroyStageF();});
   }
   
    function destroyStageF(){
	   if(primeCount <= 12){
		  $('#prime' + primeCount).remove(); 
		  $('#secondSF' + primeCount).attr({
			 id:'prime' + primeCount,
			 class:'prime'
		  });

		  $(frame).append($('#prime' + primeCount))
		  
		  primeCount++;
		  destroyStageF(); 
	   }else{
		   primeCount = 1;
		   ftCount = 0;
		   stCount = 0;
		   straightToHome = false;
		   
		   $('#SFV1').remove();
		   $('#SFV2').remove();
		   $('#SFV3').remove();
		   $('#SFV4').remove();
		   
		   $(frame).append('<div id="hd1" class="column"></div>')
		   $(frame).append('<div id="hb2" class="column"></div>')
		   $(frame).append('<div id="hd3" class="column"></div>')
		   
		   buildColumns();
		   
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  
		  //return;   
	   }
   }
 
 //RUN THE DAMN SHOW
 buildColumns();   
   /*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
POP-UP SLIDESHOW
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

  function fireSlideshow(){
	var totalSeconds = 5;
	var second = 0;
	var milliSecond = 0;
	var progress = 0;
	var totalFires = totalSeconds * 30;
	var slideNum = 0;
	var pause = false;
	var pauseTime = 0;
	var restack = false;
	var container = $('#popup #slideshow');
	var slideshow = $('#popup #slideshow img');
	var ssNavCon = $('#popup .ssNav');
	var bullets = $('<div class="ssBullets"></div>');
	var numberOfSlides = slideshow.length;
	
	if (numberOfSlides > 1){
		hasTimer = true;
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
		
		$(ssNavCon).append('<h2>Slides</h2>' ,bullets , '<div style="clear:both;"></div>')
		
		// Add current class to first bullet
		currentBullet(slideNum);
		
		// Add functionality to navigation links
		$('#popup .ssBullets a')
			.click(function(e){
				e.preventDefault();
				if ($(slideshow).is(":animated")){
					return;
				}else{
					var linkName = $(this).html();
					clearTimeout(slideshowTimer); 
					arrangeNavStack(linkName);
					waitAndPlay(); 
				}
			});
		
		// Start Clock
		slideshowTimer = setTimeout(function() {ignite();},4000);
	}
	
	// Add class to current bullet
	function currentBullet(bulletNum){
		$('.ssBullets a').removeClass('current');
		$('.ssBullets a').eq(bulletNum).addClass('current');
	}
	
	// Arrange navigation Stack
	function arrangeNavStack(linkName){
		restack = true;
		
		$(slideshow).each(function(i){
			$(this).css({
				'z-index' : 0
			});
		});
		
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
		slideshowTimer = setTimeout(function() {ignite();},4000);		
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
	};
	
	//WAIT AND PLAY
	function waitAndPlay(){
		slideshowTimer = setTimeout(function() {ignite();},4000);
	 };
	
  };

});

