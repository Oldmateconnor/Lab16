
/**
 * Module pattern for Review functions
 */
var Reviews = (function () {
    "use strict";

    // Public interface
    var pub = {};

    function noReviews(target) {
        $(target).html("<p>There are no reviews for this item</p>");
    }

    function parseReviews(data, target) {
        var rating, user, haveReviews;
        $(target).html("");
        haveReviews = false;
        $(target).append("<ul>");
        $(data).find("review").each(function () {
            haveReviews = true;
            rating = $(this).find("rating")[0].textContent;
            user = $(this).find("user")[0].textContent;
            $(target).append("<li>" + user + " (" + rating + ")");
        });
        $(target).append("</ul>");
        if (!haveReviews) {
            noReviews(target);
        }
    }


    function showReviews() {
        var xmlSource, target;

        // The XML's file is based on the filename for the image for the film...
        xmlSource = $(this).parent().find("img")[0].src;
        // But it is in the reviews directory, not the images directory...
        xmlSource = xmlSource.replace("/images/", "/reviews/");

        xmlSource = xmlSource.replace(".jpg", ".xml");
        target = $(this).parent().find(".reviews")[0];
        // Make an Ajax call to get the XML
        $.ajax({
            type: "GET",
            url: xmlSource,
            cache: false,
            success: function (data) {
                // When the XML comes back, call parseReviews
                parseReviews(data, target);
            },
            error: function () {
                // If we can't get the XML, display the 'no reviews' message
                noReviews(target);
            }
        });
    }

    /**
     * Setup function for Reviews
     *
     * Adds buttons to each .film element to show reviews, and a div to contain them.
     * The button click triggers a call to showReviews.
     */
    pub.setup = function () {
        $(".film").append("<input type='button' class='showReviews' value='Show Reviews'></input>");
        $(".film").append("<div class='reviews'></div>");
        $(".showReviews").click(showReviews);
    };

    // Expose public interface
    return pub;

}());

// Call Reviews.setup when page loads
$(document).ready(Reviews.setup);