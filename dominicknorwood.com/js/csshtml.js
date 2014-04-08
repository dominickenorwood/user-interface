$(document).ready(function() {
   var cssArray = ['everest_thumb.jpg','lekorsa_thumb.jpg','marketdelta_thumb.jpg','odile_thumb.jpg',
   				   'streetlevel_thumb.jpg','everest_thumb.jpg','lekorsa_thumb.jpg','marketdelta_thumb.jpg',
				   'odile_thumb.jpg','streetlevel_thumb.jpg','everest_thumb.jpg','lekorsa_thumb.jpg',
				   'mock1_thumb.jpg','mock2_thumb.jpg','mock3_thumb.jpg','mock1_thumb.jpg',
				   'mock2_thumb.jpg','mock3_thumb.jpg','mock1_thumb.jpg','mock2_thumb.jpg',
				   'mock3_thumb.jpg','mock1_thumb.jpg','mock2_thumb.jpg','mock3_thumb.jpg',
				   'mock1_thumb.jpg','mock2_thumb.jpg','mock3_thumb.jpg','mock1_thumb.jpg']
   var frame = $('#frame');
   var csshtml = $('#navigation .csshtml');
   var cubicalButton = $('#cubicalNav a');
   var cubeLink = $('.prime a');
   var primeCount = 1;
   var ffCount = 0;
   var sfCount = 0;
   var tfCount = 0;
   var ftCount = 0;
   var stCount = 0;
   var ttCount = 0;
   var arrayCount = 0;
   var cssHTMLCheck = false;
   
   $(frame).append('<div id="cubeShadow"></div>');
   
   $(csshtml).click(function(e){
	   e.preventDefault;
	   if(!cssHTMLCheck){
		  cssHTMLCheck = true;
		  preCSSHTML(); 
	   }else{
		   return;
	   }
	   
   })
   
   $(cubicalButton).click(function(e){
	   e.preventDefault;
	   preCSSHTML();
   })
   
   function preCSSHTML(){
	 primeCount = 1;
   	 ffCount = 0;
   	 sfCount = 0;
   	 tfCount = 0;
   	 ftCount = 0;
   	 stCount = 0;
   	 ttCount = 0;
	 
	 $('#frame a').removeClass('enabled');
	 $(frame).css({'overflow':'hidden'});
	 
	 $(frame).append('<div id="CSSV1" class="columnV"></div>');
	 $(frame).append('<div id="CSSV2" class="columnV"></div>');
	 $(frame).append('<div id="CSSV3" class="columnV"></div>');
	 $(frame).append('<div id="CSSV4" class="columnV"></div>');
	 
	 buildCSSHTML();  
   };
   
   function buildCSSHTML(){
	   if(primeCount <= 12){
		   
		  if(primeCount == 1 || primeCount == 5 || primeCount == 9){
			 $('#CSSV1').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0,'top': 342 + (ftCount * 114) + 'px'});
			 $('#CSSV1').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" style="background-image:url(/images/csshtml/' + cssArray[(primeCount - 1) + arrayCount] +')"></a></div>');
			 ftCount++;
		  }else if(primeCount == 2 || primeCount == 6 || primeCount == 10){
			 $('#CSSV2').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0});
			 $('#CSSV2').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" style="background-image:url(/images/csshtml/' + cssArray[(primeCount - 1) + arrayCount] +')"></a></div>');
		  }else if(primeCount == 3 || primeCount == 7 || primeCount == 11){
			 $('#CSSV3').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0,'top': 342 + (stCount * 114) + 'px'});
			 $('#CSSV3').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" style="background-image:url(/images/csshtml/' + cssArray[(primeCount - 1) + arrayCount] +')"></a></div>');
			 stCount++;
		  }else{
			 $('#CSSV4').append($('#prime' + primeCount));
			 $('#prime' + primeCount).css({'left':0});
			 $('#CSSV4').append('<div id="secondCSS' + primeCount + '" class="second"><a href="#" style="background-image:url(/images/csshtml/' + cssArray[(primeCount - 1) + arrayCount] +')"></a></div>');
		  }
		  
		  primeCount++;
		  buildCSSHTML(); 
	   }else{
		   primeCount = 1;
		   ftCount = 0;
		   stCount = 0;
		   
		   if(arrayCount == 0){
			 	arrayCount = 12
			}else{
			 	arrayCount = 0;
			}
		   
		   moveCSSV1()
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  //setTimeout(moveHD1, 2000);

		  //return;   
	   }
   }
   
    function moveCSSV1(){
	    $('#CSSV1')
				  .animate({
					 'top': '0',
				   },
					 2000,
				   function(){
					   
					  
				   });
				   setTimeout(moveCSSV2, 200);
   }
   function moveCSSV2(){
	   $('#CSSV2')
		  .animate({
			'top': '-342px',
		  },
		  2000,
		  function(){				
		 });
		 setTimeout(moveCSSV3, 200);
   }
   function moveCSSV3(){
	   $('#CSSV3')
		.animate({
		'top': '0',
		},
		2000,
		function(){
									
		});
		setTimeout(moveCSSV4, 200);
   }
   function moveCSSV4(){
	   $('#CSSV4')
		.animate({
		'top': '-342px',
		},
		2000,
		function(){	
			destroyCSSHTML()					
		});
   }
   
   function destroyCSSHTML(){
	   if(primeCount <= 12){
		  $('#prime' + primeCount).remove(); 
		  $('#secondCSS' + primeCount).attr({
			 id:'prime' + primeCount,
			 class:'prime'
		  });

		  $(frame).append($('#prime' + primeCount))
		  
		  primeCount++;
		  destroyCSSHTML(); 
	   }else{
		   primeCount = 1;
		   ftCount = 0;
		   stCount = 0;
		   
		   $('#CSSV1').remove();
		   $('#CSSV2').remove();
		   $('#CSSV3').remove();
		   $('#CSSV4').remove();
		   
		   $(frame).css({'overflow':'visible'});
		   $('#frame a').addClass('enabled');
		   
		   $('#frame a.enabled')
			.hover(function(){
				$(this).parent().append($('#cubeShadow'))
				/*var color = '#990000';
				$(this)
				  .stop()
				  .animate({backgroundColor: color}, {duration: 0,queue:false});*/
			}, function(){
				$(frame).append($('#cubeShadow'))
				/*var color = '#0066FF';
				$(this)
				  .stop()
				  .animate({backgroundColor: color}, {duration: 500,queue:false});*/
			});
		   
		   
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
  
	   }
   }
   
   /*///////////////////////////////////////////////////////////////////
   STAGE A
   ///////////////////////////////////////////////////////////////////*/
   /*$(frame).append('<div id="hd1" class="column"></div>')
   $(frame).append('<div id="hb2" class="column"></div>')
   $(frame).append('<div id="hd3" class="column"></div>')*/
   
   function buildColumns(){
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
		  setTimeout(moveHD1, 3000);
		 // moveHD1();
		  //return;   
	   }
   };
   
   function moveHD1(){
	    $('#hd1')
				  .animate({
					 'left': '0',
				   },
					 2000,
				   function(){
					   //setTimeout(moveHD3, 200);
					  
				   });
				   setTimeout(moveHB2, 200);
   }
   function moveHD3(){
	   $('#hd3')
		  .animate({
			'left': '0',
		  },
		  2000,
		  function(){
			destroyStageA();					
		 });
		 
   }
   function moveHB2(){
	   $('#hb2')
		.animate({
		'left': '-448px',
		},
		2000,
		function(){
			
									
		});
		setTimeout(moveHD3, 200);
   }
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
		   
		   setTimeout(moveSBV1, 3000);
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  //setTimeout(moveHD1, 2000);

		  //return;   
	   }
   }
   
   function moveSBV1(){
	    $('#SBV1')
				  .animate({
					 'top': '0',
				   },
					 2000,
				   function(){
					   
					  
				   });
				   setTimeout(moveSBV2, 200);
   }
   function moveSBV2(){
	   $('#SBV2')
		  .animate({
			'top': '-342px',
		  },
		  2000,
		  function(){
			//setTimeout(moveHB2, 200);					
		 });
		 setTimeout(moveSBV3, 200);
   }
   function moveSBV3(){
	   $('#SBV3')
		.animate({
		'top': '0',
		},
		2000,
		function(){
									
		});
		setTimeout(moveSBV4, 200);
   }
   function moveSBV4(){
	   $('#SBV4')
		.animate({
		'top': '-342px',
		},
		2000,
		function(){
			destroyStageB();						
		});
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
		  setTimeout(moveSCH1, 3000); 
	   }
   };
   function moveSCH1(){
	    $('#SCH1')
				  .animate({
					 'left': '0',
				   },
					 2000,
				   function(){
					   			  
				   });
				   setTimeout(moveSCH2, 600);
   }
   function moveSCH2(){
	   $('#SCH2')
		  .animate({
			'left': '0',
		  },
		  2000,
		  function(){
								
		 });
		 setTimeout(moveSCH3, 600);
		 
   }
   function moveSCH3(){
	   $('#SCH3')
		.animate({
		'left': '0',
		},
		2000,
		function(){
			destroyStageC();						
		});
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
		   
		   setTimeout(moveSDV4, 3000);
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
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
		 setTimeout(moveSDV1, 800);
   }
   function moveSDV3(){
	   $('#SDV3')
		.animate({
		'top': '0',
		},
		2000,
		function(){
									
		});
		setTimeout(moveSDV2, 4000);
   }
   function moveSDV4(){
	   $('#SDV4')
		.animate({
		'top': '-342px',
		},
		2000,
		function(){
					
		});
		setTimeout(moveSDV3, 200);
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
		  setTimeout(moveSEH2, 1500); 
	   }
   };
   
   function moveSEH1(){
	    $('#SEH1')
				  .animate({
					 'left': '0',
				   },
					 2000,
				   function(){
					  destroyStageE(); 			  
				   });
				   
   }
   function moveSEH2(){
	   $('#SEH2')
		  .animate({
			'left': '-448px',
		  },
		  2000,
		  function(){
								
		 });
		 setTimeout(moveSEH3, 2000);
		 
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
		
		setTimeout(moveSEH1, 2000);
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
		   
		   setTimeout(moveSFV1, 2000);
		  /*SET UP A CONDITION THAT LOOKS FOR A VIEW CHANGE, IF YOU CLICK CSS/HTML THEN NIX SET TIMEOUT AND THROW DEFAULT VIEW FUNCTION. CHECK BEFORE EACH TRANSITION TO SEE IF A VIEW HAS BEEN CLICKED*/
		  //setTimeout(moveHD1, 2000);

		  //return;   
	   }
   }
   
   function moveSFV1(){
	    $('#SFV1')
				  .animate({
					 'top': '-342px',
				   },
					 2000,
				   function(){
					   
					  
				   });
				   setTimeout(moveSFV2, 800);
   }
   function moveSFV2(){
	   $('#SFV2')
		  .animate({
			'top': '-342px',
		  },
		  2000,
		  function(){
			//setTimeout(moveHB2, 200);					
		 });
		 setTimeout(moveSFV3, 800);
   }
   function moveSFV3(){
	   $('#SFV3')
		.animate({
		'top': '-342px',
		},
		2000,
		function(){
									
		});
		setTimeout(moveSFV4, 800);
   }
   function moveSFV4(){
	   $('#SFV4')
		.animate({
		'top': '-342px',
		},
		2000,
		function(){
			destroyStageF();						
		});
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
   
});