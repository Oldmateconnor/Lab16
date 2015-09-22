
var CheckoutValidation = (function () {
    "use strict";

    var pub;

    pub = {};

    function checkNotEmpty(textValue) {
        return textValue.trim().length > 0;
    }


    function checkDigits(textValue) {
        var pattern = /^[0-9]+$/;
        return pattern.test(textValue);
    }


    function checkLength(textValue, minLength, maxLength) {
        var length = textValue.length;
        if (maxLength === undefined) {
            maxLength = minLength;
        }
        return (length >= minLength && length <= maxLength);
    }


    function checkEmailAddress(textValue) {
        var pattern = /^[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)*@[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)*$/;
        return pattern.test(textValue);
    }


    function checkKeyIsDigit(event) {
  
        var characterPressed, nine, zero;
        characterPressed = event.keyCode || event.which || event.charCode;
        nine = "9";
        zero = "0";
        if (characterPressed < zero.charCodeAt(0)) {
            return false;
        }
        if (characterPressed > nine.charCodeAt(0)) {
            return false;
        }
        return true;
    }

    function startsWith(textValue, startValue) {
        return textValue.substring(0, startValue.length) === startValue;
    }


    function checkDeliveryName(deliveryName, messages) {
        if (!checkNotEmpty(deliveryName)) {
            messages.push("You must enter a name to deliver to");
        }
    }


    function checkDeliveryEmail(deliveryEmail, messages) {
        if (!checkNotEmpty(deliveryEmail)) {
            messages.push("You must enter an email address");
        } else if (!checkEmailAddress(deliveryEmail)) {
            messages.push("That doesn't look like a valid email address");
        }
    }

    function checkDeliveryAddress(deliveryAddress, messages) {
        if (!checkNotEmpty(deliveryAddress)) {
            messages.push("You must enter an address to deliver to");
        }
    }

    function checkDeliveryCity(deliveryCity, messages) {
        if (!checkNotEmpty(deliveryCity)) {
            messages.push("You must enter a city to deliver to");
        }
    }

    function checkDeliveryPostcode(deliveryPostcode, messages) {
        if (!checkNotEmpty(deliveryPostcode)) {
            messages.push("You must enter a postcode");
        } else if (!checkDigits(deliveryPostcode) || !checkLength(deliveryPostcode, 4)) {
            messages.push("Postcodes must be exactly 4 digits long");
        }
    }


    function checkCreditCardNumber(cardType, cardNumber, messages) {
        if (!checkNotEmpty(cardNumber)) {
            messages.push("You must enter a credit card number");
        } else if (!checkDigits(cardNumber)) {
            // Just numbers
            messages.push("The credit card number should only contain the digits 0-9");
        } else if (cardType === "amex" && (!checkLength(cardNumber, 15) || !startsWith(cardNumber, "3"))) {
            // American Express: 15 digits, starts with a 3
            messages.push("American Express card numbers must be 15 digits long and start with a '3'");
        } else if (cardType === "mcard" && (!checkLength(cardNumber, 16) || !startsWith(cardNumber, "5"))) {
            // MasterCard: 16 digits, starting with a 5
            messages.push("MasterCard numbers must be 16 digits long and start with a '5'");
        } else if (cardType === "visa" && (!checkLength(cardNumber, 16) || !startsWith(cardNumber, "4"))) {
            // Visa: 16 digits, starts with a 4
            messages.push("Visa card numbers must be 16 digits long and start with a '4'");
        }
    }

    function checkCreditCardDate(cardMonth, cardYear, messages) {
        var today;
        today = new Date();
        cardMonth = parseInt(cardMonth, 10);
        cardYear = parseInt(cardYear, 10);
        if (!cardYear) {
            messages.push("Invalid year in card expiry date");
        } else if (!cardMonth || cardMonth < 1 || cardMonth > 12) {
            messages.push("Invalid month in card expiry date");
        } else if (cardYear < today.getFullYear()) {
            // Year is in the past, not valid regardless of month
            messages.push("The card expiry date must be in the future");
        } else if (cardYear === today.getFullYear()) {
            // Year is this year, so need to check the month
            // Note - JS counts months from 0 (= January)
            // So the +1 and <= is correct, (even though it looks odd)
            if (cardMonth <= today.getMonth() + 1) {
                messages.push("The card expiry date must be in the future");
            }
        } // else year is in the future, so valid regardless of month
    }


    function checkCreditCardValidation(cardType, cardValidation, messages) {
        // General: Just numbers
        if (!checkNotEmpty(cardValidation)) {
            // A required field
            messages.push("You must enter a CVC value");
        } else if (!checkDigits(cardValidation)) {
            // Just numbers
            messages.push("The CVC should only contain the digits 0-9");
        } else if (cardType === "amex" && !checkLength(cardValidation, 4)) {
            // Amex, 4 digits
            messages.push("American Express CVC values must be 4 digits long");
        } else if (cardType === "mcard" && !checkLength(cardValidation, 3)) {
            // MasterCard, 3 digits
            messages.push("MasterCard CVC values must be 3 digits long");
        } else if (cardType === "visa" && !checkLength(cardValidation, 3)) {
            // Visa, 3 digits
            messages.push("Visa CVC values must be 3 digits long");
        }
    }

    
    function validateCheckout() {
        var messages, errorHTML;

        // Default assumption is that everything is good, and no messages
        messages = [];

        // Validate Address Details

        // Name validation
        checkDeliveryName($("#deliveryName").val(), messages);

        // Email validation
        checkDeliveryEmail($("#deliveryEmail").val(), messages);

        // Address validation
        checkDeliveryAddress($("#deliveryAddress1").val(), messages);

        // City validation
        checkDeliveryCity($("#deliveryCity").val(), messages);

        // Postcode Validation
        checkDeliveryPostcode($("#deliveryPostcode").val(), messages);

        // Validate Credit Card Details

        // Credit card number validation
        checkCreditCardNumber($("#cardType").val(), $("#cardNumber").val(), messages);

        // Expiry date validation
        checkCreditCardDate($("#cardMonth").val(), $("#cardYear").val(), messages);

        // CVC validation
        checkCreditCardValidation($("#cardType").val(), $("#cardValidation").val(), messages);

        if (messages.length === 0) {
            // Checkout successful, clear the cart
            Cookie.clear("cart");
            // Display a friendly message
            $("#main").html("<p>Thank you for your order</p>");
            // Stop the form from submitting, which would trigger a page load
            // Eventually this will submit the form to the server for processing by returning true
            return false;
        }
        // If we get here there were errors
        // Report the error messages
        errorHTML = "<p><strong>There were errors processing your form</strong></p>";
        errorHTML += "<ul>";
        messages.forEach(function (msg) {
            errorHTML += "<li>" + msg;
        });
        errorHTML += "</ul>";
        $("#errors").html(errorHTML);
        // Stop the form from submitting
        return false;
    }

    pub.setup = function () {
        
    };

    return pub;
}());

$(document).ready(CheckoutValidation.setup);