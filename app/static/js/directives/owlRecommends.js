'use strict';

appDirectives.directive("owlRecommends", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'C',
        template: '<div ng-repeat="prod in items"  class="recommend-item item" data-merge="2"><div class="product"><div class="p-hd">\n' +
        '                                <a href="/item?id={{prod.productId}}" target="_blank">\n' +
        '                                    <img class="main-img" ng-src="{{prod.filePath + prod.fileName + \'_small\' + prod.extName}}"/><img class="sub-img" ng-src="{{prod.imgList[1]}}"/>\n' +
        '                                </a>\n' +
        '                            </div>\n' +
        '                            <div class="p-bd">\n' +
        '                                <div class="tags">\n' +
        '                                    <span class="tag">{{prod.preContract}}</span>\n' +
        '                                </div>\n' +
        '                                <h4 class="name"><a href="/item?id={{prod.productId}}" target="_blank">{{prod.productName}}</a></h4>\n' +
        '                                <p class="price">\n' +
        '                                    <span class="retail-price"><span>¥</span><span>{{prod.salesPrice}}</span></span><span\n' +
        '                                        class="counter-price"><span>¥</span><span>{{prod.originalPrice}}</span></span>\n' +
        '                                </p><div>\n' +
        '                                            <hr>\n' +
        '                                            <p class="desc">{{prod.shoppingGuide.length >= 15 ? prod.shoppingGuide.slice(0,15) + \'...\' : prod.shoppingGuide}}</p>\n' +
        '                                        </div>\n' +
        '                            </div>\n' +
        '                        </div></div>',
        scope: {
            items: '='
        },
        link: function (scope, element, attrs) {
        }
    };
}]).directive("recommendItem", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if (scope.$last) {
                $(element).parent().owlCarousel({
                    navigation: true, // Show next and prev buttons
                    slideSpeed: 300,
                    paginationSpeed: 400,
                    autoplayHoverPause: true,
                    scrollPerPage: true,
                    stopOnHover: true,
                    autoPlay: 3000,
                    margin: 0,
                    loop: true,
                    items: 4,
                    slideBy: 'page',
                    responsive: false,
                    autoWidth: true
                });
            }
        }
    };
}]);
