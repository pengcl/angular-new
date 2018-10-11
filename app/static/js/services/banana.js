"use strict";

appServices.factory('BananaSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    service.submit = function (body) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: apiConfig.api + '/order/submitIntentOrder.ht',
            data: $.param(body),
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
        }).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.checkMobileCode = function (phoneNumber, code) {
        var d = $q.defer();
        $http.jsonp('http://m.yfq.cn/wap/customer/checkMobileCodeSync.html?receiverMoblie=' + phoneNumber + '&mobileCode=' + code + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);