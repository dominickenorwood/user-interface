Galleria.addTheme({
    name: 'dmn',
    author: 'Matt Adelhock',
    version: 1,
    css: 'galleria.dmn.css',
    defaults: {
        // add your own default options here
        transition: 'slide',
        imagecrop: true,
        showCounter: false,
        imagePosition: 'left',
        imageCrop: true,
        // custom theme-specific options should begin with underscore:
        _my_color: '#fff',
        _toggleInfo: true,
        debug: false
    },
    init: function (options) {
        // add some elements
        var hideShow = '<div class="hide-show"><a href="#"><i class="fa fa-chevron-down"></i></a></div>' +
                       '<div style="clear:both;"></div>';

        this.append({
            'info': [hideShow]
        });

        // cache some stuff
        var touch = Galleria.TOUCH,
            click = touch ? 'touchstart' : 'click'/*,
            info = this.$('info-link,info-close,info-text')*/;

        // set the container's background to the theme-specific _my_color option:
        this.$('container').css('background-color', options._my_color);

        this.$("stage").hover(function () {

            $(this).children("div.galleria-image-nav").fadeIn("fast");

        }, function () {

            $(this).children("div.galleria-image-nav").fadeOut("fast");
        }
		);

        this.$('stage').before(this.$('info-title'));
        this.$('stage').after(this.$('info'));

        // bind some stuff
        this.bind('thumbnail', function (e) {

            if (!touch) {
                // fade thumbnails
                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function () {
                    $(this).not('.active').children().stop().fadeTo(100, 1);
                }, function () {
                    $(this).not('.active').children().stop().fadeTo(100, 0.6);
                });

                if (e.index === this.getIndex()) {
                    $(e.thumbTarget).css('opacity', 1);
                }
            } else {
                $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6);
            }
        });

        // bind a loader animation:
        this.bind('loadstart', function (e) {
            if (!e.cached) {
                this.$('loader').show();

            }
            //this.$('info').toggle(this.hasInfo());
            $(e.thumbTarget).css('opacity', 1).parent().siblings().children().css('opacity', 0.6);
        });

        this.bind('loadfinish', function (e) {
            this.$('loader').hide();
            
            

        });
        
        this.bind('image', function (e) {
            var doesCaptionDescriptionExist = $('.galleria-info .full-description').html().length;

            /*console.log("TITLE LENGTH : " + doesCaptionHeaderExist);
            console.log("DESCRIPTION LENGTH : " + doesCaptionDescriptionExist);*/

            $('.galleria-info').removeClass('no-caption-content');

            if (doesCaptionDescriptionExist == 0) {
                $('.galleria-info').addClass('no-caption-content');
            }
            //$('div.galleria-info-description').delay(5000).fadeOut(800);
        });
        $('.hide-show a').on('click', function (e) {
             e.preventDefault();
             if ($(".galleria-info").hasClass("show")) {
                 $(".galleria-info").removeClass("show");
                 $(".hide-show a").html('<i class="fa fa-chevron-down"></i>');
             } else {
                 $(".galleria-info").addClass("show");
                 $(".hide-show a").html('<i class="fa fa-chevron-up"></i>');
             }
        });
        

    }
});
$(function () {
    /*if ('[id*="miniRotatorArticle"]') {
        $(".galleria-info-description, .galleria-thumbnails-container, .galleria-stage").css("left", "18px");
        $(".galleria-container").css("padding-left", "18px");
    }*/
});