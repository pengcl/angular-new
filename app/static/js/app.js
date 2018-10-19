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
}]).run(['$rootScope', '$location', '$cookieStore', function ($rootScope, $location, $cookieStore) {
    $rootScope.activeTag = 'js_pc';
    var gh = 'pc';
    gh = $cookieStore.get('gh') ? $cookieStore.get('gh') : gh;
    gh = $location.search().gh ? $location.search().gh : gh;
    $cookieStore.put('gh', gh);
    $rootScope.gh = gh;

    /*$rootScope.$on('$locationChangeStart', function () {
        _hmt.push(['_trackPageview', $location.path()]);
    })*/
}]);