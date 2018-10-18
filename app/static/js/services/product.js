"use strict";

appServices.factory('ProductSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    service.get = function (id, page, filters) {
        var d = $q.defer();
        $http.get('/api/productinf/getProductList.ht?productCategoryId=' + (id ? id : '') + '&page=' + (page ? page : 1) + '&orderByPrice=' + (filters ? filters[0] : '') + '&orderByTime=' + (filters ? filters[1] : '')).success(function (data) {
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
            var attrs = [];
            var orderIndexs = [];
            data.attributeList.forEach(function (item) {
                if (item.name === '颜色') {
                    attrs.unshift(item);
                } else {
                    attrs.push(item);
                }
            });
            data.attributeList = attrs;
            attrs.forEach(function (item) {
                orderIndexs.push(item.id);
            });

            data.skuList.forEach(function (item, index) {
                var str = item.specificationproperties.split(';');
                if (str[0].split(':')[0] == attrs[0].id) {
                    data.skuList[index].specificationproperties = str[0] + ';' + str[1];
                } else {
                    data.skuList[index].specificationproperties = str[1] + ';' + str[0];
                }
            });
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