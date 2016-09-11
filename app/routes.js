/*
 * Define the routes for app
 * Project : Shopping Bag
 * Date : 09-09-2011
 * Author : Ankit Shukla
 * Dependency : cart-controller.js
 */
'use strict';

module.exports = function(app) {

    //Controller
    var cart = require('./cart/cart-controller');

    //Routes
    app.get('/', cart.render());
    app.get('/product-details/:pid', cart.getProductDetails());
    app.put('/update-cart', cart.updateCartItem());
};