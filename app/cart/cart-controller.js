/*
 * Render cart data, Get product details, Update Cart
 * Project : Shopping Bag
 * Date : 09-09-2011
 * Author : Ankit Shukla
 * Dependency : common.js
 */

'use strict';

var common = require('../common.js');

//Render cart page
module.exports.render = function() {
    var shoppingCart = function(req, res) {
        var cartData = common.getCartData(),
            cartSubTotal = common.getCartPrice(cartData.productsInCart);
        res.render('cart.html',{'data':cartData.productsInCart,
            'subTotal':cartSubTotal.subTotal,
            'estimatedPrice':cartSubTotal.estimateAmtAndDiscount
        });
    };
    return shoppingCart;
};

//Render product details
module.exports.getProductDetails = function(){
    var productDetailModal = function(req, res){
        var cartData = common.getCartData(),
            productInfo = '';
        for(var i in cartData.productsInCart) {
            if(parseInt(cartData.productsInCart[i].p_id) == parseInt(req.params.pid)) {
                productInfo = cartData.productsInCart[i];
                break;
            }
        }
        res.render('product-details.html',{'data':productInfo});

    };
    return productDetailModal;
};

//Render Updated cart
module.exports.updateCartItem = function(){
    var cartUpdate = function(req, res){
        var cartData = common.getCartData(),
            updatedCartData = common.updateCartData(cartData,req.query),
            cartSubTotal = common.getCartPrice(updatedCartData.productsInCart);
        res.render('updated-cart.html',{'data':updatedCartData.productsInCart,
            'subTotal':cartSubTotal.subTotal,
            'estimatedPrice':cartSubTotal.estimateAmtAndDiscount
        });
    };
    return cartUpdate;
};