jQuery(document).ready(function() {
    
    jQuery('.step-slide__title').each(function(index, el) {
        jQuery(el).prepend('<div class="step-slide__title-counter">' + (index + 1) + '</div>');
    });

    for (var i = 0; i < jQuery('.step-slide').length - 1; i++) {
        jQuery('.step__extender').append('<div class="step__extender-item"></div>');
    };

    var progress = {
        current: ( 100 / (jQuery('.step-slide').length - 1) ),
        total: jQuery('.step-slide').length,
        width: ( 100 / (jQuery('.step-slide').length - 1) ),
        process: doProgress
    };

    function doProgress () {}
    var testSlider = jQuery('.test-slider').bxSlider({
        mode: 'fade',
        infiniteLoop: false,
        speed: 0,
        adaptiveHeight: true,
        adaptiveHeightSpeed: 0,
        touchEnabled: false,
        pager: false,
        nextSelector: '.btn-next-container',
        nextText: '<div class="btn-next"><span>далее</span></div>',
        onSliderLoad: function (currentIndex) {
            // первоначальные стили
            jQuery('.main-progress__text').eq(currentIndex).addClass('main-progress__text_active');
            jQuery('.step__extender-item').eq(currentIndex).addClass('step__extender-item_active');
            jQuery('.main-progress__extender').css('width', progress.width + '%');
        },
        onSlideAfter: function (slideElement, oldIndex, newIndex) {
            // активация кнопок
            jQuery('.btn-next-container').removeClass('btn-next-container_active');
            jQuery('.btn-next').removeClass('btn-next_active btn-shine');

            // изменение полосы загрузки
            progress.current += progress.width;
            jQuery('.main-progress__extender').css('width', progress.current + '%');

            // изменение шага
            jQuery('.step__extender-item').eq(newIndex).addClass('step__extender-item_active');
            jQuery('.step__text span').html(newIndex + 1);

            // изменение заголовка в полосе загрузки
            if ( jQuery('.main-progress__text').eq(newIndex).length != 0 ) {
                jQuery('.main-progress__text').eq(oldIndex).removeClass('main-progress__text_active');
                jQuery('.main-progress__text').eq(newIndex).addClass('main-progress__text_active');
            };
        }
    });
//testSlider.redrawSlider();

    // testSlider.goToSlide(4);

    jQuery('.pick-item__input').on('change', function(event) {
        event.preventDefault();
        jQuery('.btn-next-container').addClass('btn-next-container_active');
        jQuery('.btn-next').addClass('btn-next_active btn-shine');
    });
    
    jQuery('#heig').on('change', function(event) {
        event.preventDefault();
        jQuery('.btn-next-container').addClass('btn-next-container_active');
        jQuery('.btn-next').addClass('btn-next_active btn-shine');
    });



jQuery('#button_send_feedbackcalc').on('click', function () {
    jQuery.ajax({
        url: 'index.php?route=extension/module/feedbackcalc/writethree',
        type: 'post',
        dataType: 'json',
        data: jQuery("#form-feedbackcalc").serialize(),
        beforeSend: function () {
        jQuery('#button_send_feedbackcalc').button('loading');
    },
    complete: function () {
        jQuery('#button_send_feedbackcalc').button('reset');
    },
    success: function (json) {
        jQuery('.alert-success, .alert-danger').remove();
        if (json['error']) {
            jQuery('.last-step-form__accept').after('<div class="alert alert-danger" style="margin:20px 0;"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '</div>');
        }
        if (json['success']) {

                        testSlider.goToSlide( jQuery('.step-slide').length - 1 );
                        jQuery('.header-line').slideUp(300);
                        jQuery('.progress-line').slideUp(300);


        //  jQuery('#form-feedbackcalc').after('<div class="alert alert-success" style="margin:20px 0;"><i class="fa fa-check-circle"></i> ' + json['success'] + '</div>');
       //   jQuery('input[name=\'name\']').val('');
            jQuery('input[name=\'phone\']').val('');
            jQuery('input[name=\'email\']').val('');
        }
    }
    });
});


});