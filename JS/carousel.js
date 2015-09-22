
var Carousel = (function () {
    "use strict";

    var categoryList, categoryIndex, pub, nextCategory;

    pub = {};

    function MovieCategory(title, image, page) {
        this.title = title;
        this.image = image;
        this.page = page;
        this.makeHTML = function () {
            var html;
            html = "<a href='" + page + "'>";
            html += "<img src='" + image + "'>";
            html += "<br>" + title;
            html += "</img>";
            html += "</a>";
            return html;
        };
    }

    nextCategory = (function () {
        var padLeft = true;
        return function () {
            if (padLeft) {
                $("#carousel").animate({paddingLeft: 400, opacity: 0.0}, 1000, "swing", function () {
                    $("#carousel").html(categoryList[categoryIndex].makeHTML());
                    categoryIndex += 1;
                    if (categoryIndex >= categoryList.length) {
                        categoryIndex = 0;
                    }
                    $("#carousel").animate({paddingLeft: 10, opacity: 1.0}, 1000, "swing");
                });
            } else {
                $("#carousel").animate({paddingRight: 400, opacity: 0.0}, 1000, "swing", function () {
                    $("#carousel").html(categoryList[categoryIndex].makeHTML());
                    categoryIndex += 1;
                    if (categoryIndex >= categoryList.length) {
                        categoryIndex = 0;
                    }
                    $("#carousel").animate({paddingRight: 10, opacity: 1.0}, 1000, "swing");
                });
            }
            padLeft = !padLeft;
        };
    }());


    pub.setup = function () {
        categoryList = [];
        categoryList.push(new MovieCategory("Classics", "images/Metropolis.jpg", "classic.php"));
        categoryList.push(new MovieCategory("Science Fiction and Horror", "images/Plan_9_from_Outer_Space.jpg", "scifi.php"));
        categoryList.push(new MovieCategory("Alfred Hitchcock", "images/Vertigo.jpg", "hitchcock.php"));
        categoryIndex = 0;
        nextCategory();
        setInterval(nextCategory, 2000);
    };

    return pub;
}());

$(document).ready(Carousel.setup);