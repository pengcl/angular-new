"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/article/about', { //about
            templateUrl: 'views/article/about/about.html',
            controller: "articleAboutController"
        });
}]).controller('articleAboutController', ['$scope', function ($scope) {


}]);