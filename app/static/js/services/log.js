"use strict";

appServices.factory('LogSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    service.log = function (operation, activeTag, gh, productId) {
        /*console.log(operation, activeTag, gh, productId);*/
        var d = $q.defer();

        $http.jsonp('http://mk.danius.cn/record/writeRequestLog.html?loc=' + encodeURIComponent(window.location.href) + '&operation=cy_1_' + (activeTag ? activeTag : '') + '_' + operation + '&gh=' + gh + '&productId=' + productId + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);