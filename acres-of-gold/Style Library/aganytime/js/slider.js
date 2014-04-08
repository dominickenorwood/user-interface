window.slider = function(e, opts) {

	var $this = $(e),
		cur = 0,
		ar = $this.find('.arrow.right'),
		al = $this.find('.arrow.left'),
		slides = $this.find('.slides li'),
		wrapper = $this.find('.slides ul'),
		navItems = $this.find('nav span'),
		timer;

	var settings = {
		speed: 350,
		easing: 'swing',
		slideTime: 5000,
		autoplay: true
	}

	$.extend(settings, opts);

	function ui() {
		ar.on('click', function(e) {
			clearTimeout(timer);
			e.stopPropagation();
			// (cur + 1 > slides.length - 1) ? cur = slides.length - 1 : cur++
			cur = (cur + 1) % slides.length;
			move();
			if ( settings.autoplay ) { autoPlay(); }
		});

		al.on('click', function(e) {
			clearTimeout(timer);
			e.stopPropagation();
			// (cur - 1 < 0) ? cur = 0 : cur--
			cur = (cur + slides.length - 1) % slides.length;
			move();
			if ( settings.autoplay ) { autoPlay(); }
		});

		navItems.on('click', function() {
			clearTimeout(timer);
			cur = $(this).index();
			move();
			if ( settings.autoplay ) { autoPlay(); }
		});
	}

	function move() {
		wrapper.animate({
			left: wrapper.width() * (cur * -1)
		}, settings.speed, settings.easing);

		buildNav();
	}

	function buildNav() {
		navItems.removeClass('active');
		navItems.eq(cur).addClass('active');
	}

	function autoPlay() {
		timer = setTimeout(function()
		{
			cur = (cur + 1) % slides.length;
			move();
		}, settings.slideTime);
	}

	// kickoff
	ui();
	buildNav();
	move();
	if ( settings.autoplay ) { autoPlay(); }

	$(window).resize(function() {
		move();
	})

}