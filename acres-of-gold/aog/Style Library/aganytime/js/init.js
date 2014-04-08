window.init = function()
{
	// checks for viewport size via
	// pseudo content on the wrapper
	agAnytime.scrnSize = $('head').css('font-family');

	agAnytime.$win.resize(function()
	{
		agAnytime.scrnSize = $('head').css('font-family');
	});

	// add class for javascript support detection
	$('html').removeClass('no-js').addClass('js');

	// common items
	common();

	// wire up fast clicking for touch
	if ( Modernizr.touch )
	{
		$(function() {
		    FastClick.attach(document.body);
		});
	}

	var sliders = $('.slider');
	sliders.each(function(i)
	{
		new slider(sliders[i], { speed: 500, autoplay: false });
	})
}