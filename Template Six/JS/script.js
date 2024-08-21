$(function() {
    'use strict';
    $('.info-list li').click(function() {
        $(this).addClass('active').siblings('li').removeClass('active');
        window.console.log($(this).data('class'));
        $('.info-content div').hide();
        $('.' + $(this).data('class')).fadeIn();
    })
})