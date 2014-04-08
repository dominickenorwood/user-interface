window.common = function()
{	

	// toggles
	$('.toggle-controller').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$( $(this).attr('href') ).toggleClass('open');

		if ( $(this).attr('id') == 'menu-button' )
		{
			$('html, body').toggleClass('menu-open');
		}
	});

	$('.custom-select.url select').on('change', function() {
		var url = $(this).val();
		if (url) {
			window.location = url;
		}
		return false;
	})

	// fancy hover state on tables
	$("table.styled td").on('mouseover mouseleave', function(e) {
	    if (e.type == 'mouseover') {
	    	$(this).addClass('focused');
	    	$(this).parent().addClass("hover");
	    	$("colgroup").eq($(this).index()).addClass("hover");
	    }
	    else {
	    	$(this).removeClass('focused');
	    	$(this).parent().removeClass("hover");
	    	$("colgroup").eq($(this).index()).removeClass("hover");
	    }
	});

	// weather tabs
	$('#weather .tab-header a').on('click', function(e) {
		e.preventDefault();
		$('#weather .tab').removeClass('open')
		$('#weather .tab-header a').removeClass('active')

		$(this).toggleClass('active');
		$( $(this).attr('href') ).toggleClass('open');
	});

	// responsive images
	if ( agAnytime.scrnSize == 'small' )
	{
		$('img').each(function(index) {
			var size = $(this).attr('data-small');
			$(this).attr('src', size);
		});
	}
	else if ( agAnytime.scrnSize == 'medium' )
	{
		$('img').each(function(index) {
			var size = $(this).attr('data-medium');
			$(this).attr('src', size);
		});
	}
	else if ( agAnytime.scrnSize == 'large' )
	{
		$('img').each(function(index) {
			var size = $(this).attr('data-large');
			$(this).attr('src', size);
		});
	}
	else if ( agAnytime.scrnSize == 'x-large' )
	{
		$('img').each(function(index) {
			var size = $(this).attr('data-x-large');
			$(this).attr('src', size);
		});
	}

	// scroll to fixed on brand sites
	if ( agAnytime.scrnSize == 'x-large' ) { $('.sub-nav').scrollToFixed();	}
}