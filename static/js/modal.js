/*
 * Modal box Plugin
 * Project : Shopping Bag
 * Date : 09-09-2011
 * Author : Ankit Shukla
 * Dependency : jquery.min.js
 */

'use strict';

(function( $ ) {

    $.fn.modal = function( action ) {
        var modalContent = $('.pd').html();
        var modal = '<div class=overlay><div class=modal><div class=close>X</div>'+modalContent+'</div></div>';
        if ( action === "open") {
            $('body').append(modal);
            $('.overlay').fadeIn(300);
        }

        if ( action === "close" ) {
            $('.overlay').fadeOut(300);
            $('.overlay').remove();
        }

    };

}( jQuery ));