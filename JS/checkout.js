
/**
 * Module pattern for Checkout functions
 */
var Checkout = (function () {
    "use strict";

    var pub;

    // Public interface
    pub = {};

    /**
     * Create a HTML table representing the current cart
     *
     * @param itemList an array of items to display
     * @return HTML representing itemList as a table
     */
    function makeItemHTML(itemList) {
        var html, totalPrice;
        html = "<table>";
        html += "<tr><th>Title (Year)</th><th>Price</th></tr>";
        totalPrice = 0;
        itemList.forEach(function (item) {
            html += "<tr><td>" + item.title + "</td><td class='money'>" + item.price + "</td></tr>";
            totalPrice += parseFloat(item.price);
        });
        // Fix rounding errors
        totalPrice = Math.round(totalPrice * 100) / 100;
        html += "<tr><td>Total Price:</td><td class='money'>" + totalPrice + "</td></tr>";
        html += "</table>";
        return html;
    }

    /**
     * Setup function for the Checkout
     *
     * Fetches the current cart from the cookie, and displays it.
     * If there is no current cart, display a message to say so.
     */
    pub.setup = function () {
        var itemList;
        itemList = Cookie.get("cart");
        if (itemList) {
            itemList = JSON.parse(itemList);
            $("#cart").html(makeItemHTML(itemList));
        } else {
            $("#cart").html("<p>There are no items in your cart</p>");
            $("#checkoutForm").hide();
        }
    };

    // Expose public interface
    return pub;
}());

// Call Checkout.setup when the page loads
$(document).ready(Checkout.setup);