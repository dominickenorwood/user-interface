$(document).ready(function(){

	window.agAnytime = {};

	agAnytime.$win = $(window),
	agAnytime.scrnSize;

	agAnytime.main = {
		init: function() { init(); }
	}

	agAnytime.search = {
		init: function() { search(); }
	}

	agAnytime.main.init();
	agAnytime.search.init();

});