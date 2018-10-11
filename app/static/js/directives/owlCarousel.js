'use strict';

appDirectives.directive("owlCarousel", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'C',
        template: '<a class="carousel-item item" ng-repeat="item in imgUrls"><img src="{{item}}"></a>',
        scope: {
            imgUrls: '='
        },
        link: function (scope, element, attrs) {
        }
    };
}]).directive("carouselItem", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if (scope.$last) {
                $(element).parent().owlCarousel({
                    navigation: true, // Show next and prev buttons
                    slideSpeed: 300,
                    paginationSpeed: 400,
                    autoplayHoverPause: true,
                    stopOnHover: true,
                    autoPlay: 3000,
                    margin: 0,
                    loop: true,
                    items: 1,
                    responsive: false,
                    autoWidth: true
                });
            }
        }
    };
}]);
