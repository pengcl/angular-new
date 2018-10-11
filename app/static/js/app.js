'use strict';

// Declare app level module which depends on views, and components

var app = angular.module('app', [
    'ngRoute',
    'ngCookies',
    'appTpl',
    'appServices',
    'appDirectives',
    'appFilters'
]);

var appServices = angular.module('appServices', []);
var appDirectives = angular.module('appDirectives', []);
var appFilters = angular.module('appFilters', []);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.otherwise({
            redirectTo: '/index'
        });
        $locationProvider.html5Mode(true);
    }]).config(['$sceProvider', function ($sceProvider) {
    //For sport ie7
    $sceProvider.enabled(false);
}]).controller('appController', [function () {
}]).run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.activeTag = 'js_pc';
    $rootScope.gh = $location.search().gh ? $location.search().gh : 'pc';
}]);