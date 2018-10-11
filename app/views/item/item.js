"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/item/:id', { //app首页
            templateUrl: 'views/item/item.html',
            controller: "itemController"
        });
}]).controller('itemController', ['$scope', '$rootScope', '$routeParams', '$cookieStore', '$location', '$anchorScroll', 'LogSvc', 'OrderSvc', 'ProductSvc', function ($scope, $rootScope, $routeParams, $cookieStore, $location, $anchorScroll, LogSvc, OrderSvc, ProductSvc) {
    $location.hash();
    $anchorScroll();

    $scope.contentIndex = 0;

    $cookieStore.remove('itemForm');

    $scope.itemForm = {
        productId: $routeParams.id,
        totalQuantity: 1,
        attrs: null
    };

    LogSvc.log('itemLoad', $rootScope.activeTag, $rootScope.gh, $routeParams.id).then();

    ProductSvc.getItem($routeParams.id).then(function success(res) {
        $scope.prod = res;

        $scope.positions = (function () {
            return {
                name: res.productCategoryName.split('/')[2],
                id: res.productCategoryId
            }
        })();

        var attrs = [];

        res.attributeList.forEach(function (item) {
            attrs.push({
                id: item.id,
                name: item.name,
                selected: {
                    id: item.list[0].id,
                    value: item.list[0].value
                }
            })
        });

        $scope.itemForm.attrs = attrs;

        $scope.itemForm.name = $scope.prod.productName;
        $scope.itemForm.price = $scope.prod.salesPrice;
        $scope.mainImg = res.imgList[0];
        $scope.itemForm.img = $scope.mainImg;

        ProductSvc.get(res.productCategoryId).then(function success(res) {
            $scope.prods = res.list;
        });
    });

    $scope.setMainImg = function (img) {
        $scope.mainImg = img;
        $scope.itemForm.img = $scope.mainImg;
    };

    $scope.setAttr = function (attr, item) {
        var attrIndex = getIndex($scope.itemForm.attrs, 'id', attr.id);
        $scope.itemForm.attrs[attrIndex].selected = {
            id: item.id,
            value: item.value
        };

        if (attr.name === '颜色') {
            $scope.mainImg = item.imgUrl;
            $scope.itemForm.img = $scope.mainImg;
        }

        LogSvc.log('setAttr' + attr.id, $rootScope.activeTag, $rootScope.gh, $routeParams.id).then();
    };

    $scope.comboShow = false;
    $scope.showCombo = function () {
        $scope.comboShow = !$scope.comboShow;
        LogSvc.log('showCombo', $rootScope.activeTag, $rootScope.gh, $routeParams.id).then();
    };

    $scope.tipsShow = false;
    $scope.showTips = function () {
        $scope.tipsShow = !$scope.tipsShow;
        LogSvc.log('showTips', $rootScope.activeTag, $rootScope.gh, $routeParams.id).then();
    };

    $scope.add = function () {
        $scope.itemForm.totalQuantity = $scope.itemForm.totalQuantity + 1;
        LogSvc.log('add', $rootScope.activeTag, $rootScope.gh, $routeParams.id).then();
    };

    $scope.reduce = function () {
        if ($scope.itemForm.totalQuantity > 1) {
            $scope.itemForm.totalQuantity = $scope.itemForm.totalQuantity - 1;
            LogSvc.log('reduce', $rootScope.activeTag, $rootScope.gh, $routeParams.id).then();
        }
    };

    $scope.getContent = function (index) {
        $scope.contentIndex = index;

        LogSvc.log('getContent_' + index, $rootScope.activeTag, $rootScope.gh, $routeParams.id).then();
    };

    $scope.$watch('itemForm', function (n, o) {
        $cookieStore.put('itemForm', n);
    }, true)
}]);