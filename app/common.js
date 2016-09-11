/*
 * Define common method used across app
 * Project : Shopping Bag
 * Date : 09-09-2011
 * Author : Ankit Shukla
 * Dependency : common.js
 */

'use strict';

//JSON DATA
var cartData = [
    {
        "p_id":"1",
        "p_name":"cotton tshirt",
        "p_variation":"solid green",
        "p_style":"ms13kt1906",
        "p_selected_color":{
            "name":"blue",
            "hexcode":"#1169BD"
        },
        "p_selected_size":{
            "name":"small",
            "code":"s"
        },
        "p_available_options":{
            "colors":[
                {
                    "name":"green",
                    "hexcode":"#1169BD"
                },
                {
                    "name":"yellow",
                    "hexcode":"#F9F8E6"
                },
                {
                    "name":"red",
                    "hexcode":"#ED99A8"
                }
            ],
            "sizes":[
                {
                    "name":"small",
                    "code":"s"
                },
                {
                    "name":"medium",
                    "code":"m"
                },
                {
                    "name":"large",
                    "code":"l"
                },
                {
                    "name":"extra large",
                    "code":"xl"
                }
            ],
            "qty":[1,2,3,4]
        },
        "img_url":"T4.jpg",
        "p_quantity":1,
        "p_originalprice":11.0,
        "p_price":11.0,
        "c_currency":"$"
    },
    {
        "p_id":"2",
        "p_name":"print girls tee",
        "p_variation":"pink rainbow",
        "p_style":"ms13kt1906",
        "p_selected_color":{
            "name":"pink",
            "hexcode":"#F1DDEF"
        },
        "p_selected_size":{
            "name":"small",
            "code":"s"
        },
        "p_available_options":{
            "colors":[
                {
                    "name":"green",
                    "hexcode":"#A3D2A1"
                },
                {
                    "name":"yellow",
                    "hexcode":"#F9F8E6"
                },
                {
                    "name":"pink",
                    "hexcode":"#F1DDEF"
                }
            ],
            "sizes":[
                {
                    "name":"small",
                    "code":"s"
                },
                {
                    "name":"medium",
                    "code":"m"
                },
                {
                    "name":"large",
                    "code":"l"
                },
                {
                    "name":"extra large",
                    "code":"xl"
                }
            ],
            "qty":[1,2,3,4]
        },
        "img_url":"T1.jpg",
        "p_quantity":1,
        "p_originalprice":17.0,
        "p_price":17.0,
        "c_currency":"$"
    },
    {
        "p_id":"3",
        "p_name":"flower pattern shirt",
        "p_variation":"blue",
        "p_style":"ms13kt1906",
        "p_selected_color":{
            "name":"blue",
            "hexcode":"#1169BD"
        },
        "p_selected_size":{
            "name":"small",
            "code":"s"
        },
        "p_available_options":{
            "colors":[
                {
                    "name":"green",
                    "hexcode":"#A3D2A1"
                },
                {
                    "name":"blue",
                    "hexcode":"#1169BD"
                },
                {
                    "name":"red",
                    "hexcode":"#ED99A8"
                }
            ],
            "sizes":[
                {
                    "name":"small",
                    "code":"s"
                },
                {
                    "name":"medium",
                    "code":"m"
                },
                {
                    "name":"large",
                    "code":"l"
                },
                {
                    "name":"extra large",
                    "code":"xl"
                }
            ],
            "qty":[1,2,3,4]
        },
        "img_url":"T2.jpg",
        "p_quantity":1,
        "p_originalprice":21.0,
        "p_price":9.0,
        "c_currency":"$"
    },
    {
        "p_id":"4",
        "p_name":"check pattern tshirt",
        "p_variation":"mens red",
        "p_style":"ms13kt1906",
        "p_selected_color":{
            "name":"red",
            "hexcode":""
        },
        "p_selected_size":{
            "name":"small",
            "code":"s"
        },
        "p_available_options":{
            "colors":[
                {
                    "name":"green",
                    "hexcode":"#A3D2A1"
                },
                {
                    "name":"yellow",
                    "hexcode":"#F9F8E6"
                },
                {
                    "name":"red",
                    "hexcode":"#ED99A8"
                }
            ],
            "sizes":[
                {
                    "name":"small",
                    "code":"s"
                },
                {
                    "name":"medium",
                    "code":"m"
                },
                {
                    "name":"large",
                    "code":"l"
                },
                {
                    "name":"extra large",
                    "code":"xl"
                }
            ],
            "qty":[1,2,3,4]
        },
        "img_url":"T3.jpg",
        "p_quantity":1,
        "p_originalprice":22.0,
        "p_price":22.0,
        "c_currency":"$"
    }
];

//Calculate cart amount to be paid after discount
var calculateDiscountedCartAmount = function(calculatedAmount,discount,total){
    calculatedAmount.discount = ((discount/100)*total).toFixed(2);
    calculatedAmount.amount = total - calculatedAmount.discount;
    return calculatedAmount;
};

//Calculate discount and estimated amount to be pay
var getOffer = function(quantity,subTotal){
    var cartEstimatedAmt = {'amount':0,'discount':0};
    switch (true){
        case(quantity == 3):
            cartEstimatedAmt = calculateDiscountedCartAmount(cartEstimatedAmt, 5 , subTotal);
            break;
        case(quantity > 3 && quantity <= 10) :
            cartEstimatedAmt = calculateDiscountedCartAmount(cartEstimatedAmt, 10 , subTotal);
            break;
        case(quantity > 10) :
            cartEstimatedAmt = calculateDiscountedCartAmount(cartEstimatedAmt, 25 , subTotal);
            break;
        default :
            cartEstimatedAmt = calculateDiscountedCartAmount(cartEstimatedAmt, 5 , subTotal);
    }
    return cartEstimatedAmt;
};

//Data for cart view
module.exports.getCartData = function() {
    return {
        "productsInCart": cartData
    };
};

//Cart total and discount
module.exports.getCartPrice = function(cartData) {
    var cart = cartData,
        subTotal = 0,
        numberOfIems = 0;
    for (var i in cart) {
        subTotal += (cart[i].p_quantity*cart[i].p_price);
        numberOfIems += cart[i].p_quantity;
    }
    var estimateAmtAndDiscount = getOffer(numberOfIems,subTotal);
    return {
        "subTotal": subTotal,"estimateAmtAndDiscount":estimateAmtAndDiscount
    };
};

//Send the upadated cart data
module.exports.updateCartData = function(data,query){
    for (var i in data.productsInCart) {
        if(data.productsInCart[i].p_id == query.p_id) {
            data.productsInCart[i].p_quantity = parseInt(query.qty);
        }
    }
    return data;
};