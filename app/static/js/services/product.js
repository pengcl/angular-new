"use strict";

appServices.factory('ProductSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    service.get = function (id, page) {
        var d = $q.defer();
        $http.get('/api/productinf/getProductList.ht?productCategoryId=' + (id ? id : '') + '&page=' + (page ? page : 1)).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getRecommends = function (id) {
        var d = $q.defer();
        $http.get('/api/productinf/getProductList.ht?isseckill=0' + (id ? '&productCategoryId=' + id : '')).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getCatalogs = function (id) {
        var d = $q.defer();
        $http.get('/api/productinf/findproductCategory.ht?productCategoryId=' + (id ? id : '')).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getItem = function (id, condition) {
        var d = $q.defer();
        $http.get('/api/productinf/getProductDetail.ht?productId=' + id + (condition ? '&condition=' + condition : '')).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

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

    return service;
}]);