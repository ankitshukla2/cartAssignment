/*
 * Client side file to handle actions of the page
 * Project : Shopping Bag
 * Date : 09-09-2011
 * Author : Ankit Shukla
 * Dependency : jquery.min.js, modal.js
 */

'use strict';

var cartAction = cartAction || {};
(function ($,cartAction) {

    //Get product details by product id
    cartAction.getProductDetails = function(productId){
        $.ajax({
            url: "/product-details/"+productId,
            method: 'GET'
        }).done(function(data) {
            $('.pd').html(data);
            $('.pd').modal('open');
        }).fail(function () {
            console.log('error');
        });
    };

    //Close modal box
    $('body').on('click', '.close' ,function () {
        $('.overlay').modal('close');
    });

    //Update cart
    cartAction.updateCart = function(pid,qty){
        var query = '?p_id='+pid+'&qty='+parseInt(qty);
        $.ajax({
            url: "/update-cart/"+query,
            method: 'PUT'
        }).done(function(data) {
            $('.sub-pages').html(data);
            $('.overlay').modal('close');
        }).fail(function () {
            console.log('error');
        });
    };

})(jQuery,cartAction);


//Binding click to edit item to get product details
$('body').on('click','.edit-item', function (event) {
    console.log('1');
    var productId = $(event.currentTarget.offsetParent).attr('product-id');
    $('.overlay').remove();
    cartAction.getProductDetails(productId);
});


//Binding click to update cart
$('body').on('click', '#update_cart' ,function (event) {
    event.preventDefault();
    var select = $('body').find('select.qty'),
        selectSize = $('body').find('select.size'),
        qty = $(select[1]).val(),
        pid = $(this).attr('product-id');
        cartAction.updateCart(pid,qty);
});

