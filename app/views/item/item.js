"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/item', { //app首页
            templateUrl: 'views/item/item.html',
            controller: "itemController"
        });
}]).controller('itemController', ['$scope', '$rootScope', '$routeParams', '$cookieStore', '$location', '$anchorScroll', 'LogSvc', 'OrderSvc', 'ProductSvc', function ($scope, $rootScope, $routeParams, $cookieStore, $location, $anchorScroll, LogSvc, OrderSvc, ProductSvc) {
    $location.hash();
    $anchorScroll();

    var $container = $("html,body");

    $scope.contentIndex = 0;

    $cookieStore.remove('itemForm');

    $scope.itemForm = {
        productId: $location.search().id,
        totalQuantity: 1,
        attrs: ''
    };

    window.onscroll = function (e) {
        if ($(document).scrollTop() > $('.details-tabs').offset().top) {
            $('.detail-tab').addClass('position-fixed');
        } else {
            $('.detail-tab').removeClass('position-fixed');
        }
    };

    LogSvc.log('itemLoad', $rootScope.activeTag, $rootScope.gh, $location.search().id).then();

    ProductSvc.getItem($location.search().id).then(function success(res) {
        $scope.prod = res;

        $scope.skuList = res.skuList;

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

        var cds = attrs[0].id + ':' + attrs[0].selected.id;

        $scope.getSku(cds);

        $scope.itemForm.attrs = JSON.stringify(attrs);
        $scope.attrs = JSON.parse($scope.itemForm.attrs);

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

    $scope.getSku = function (cds) {
        var sku = [];
        $scope.skuList.forEach(function (item) {
            if (item.specificationproperties.indexOf(cds) !== -1 && item.quantity !== -1) {
                sku.push(item.specificationproperties.split(';')[1].split(':')[1]);
            }
        });
        $scope.sku = sku;
    };

    $scope.setAttr = function (attr, item, offSales) {

        if (offSales) {
            return false;
        }

        var attrIndex = getIndex($scope.attrs, 'id', attr.id);
        $scope.attrs[attrIndex].selected = {
            id: item.id,
            value: item.value
        };

        $scope.itemForm.attrs = JSON.stringify($scope.attrs);

        if (attr.name === '颜色') {
            $scope.mainImg = item.imgUrl;
            $scope.itemForm.img = $scope.mainImg;
            $scope.getSku(attr.id + ':' + item.id);
        }

        LogSvc.log('setAttr' + attr.id, $rootScope.activeTag, $rootScope.gh, $location.search().id).then();
    };

    $scope.comboShow = false;
    $scope.showCombo = function () {
        $scope.comboShow = !$scope.comboShow;
        LogSvc.log('showCombo', $rootScope.activeTag, $rootScope.gh, $location.search().id).then();
    };

    $scope.tipsShow = false;
    $scope.showTips = function () {
        $scope.tipsShow = !$scope.tipsShow;
        LogSvc.log('showTips', $rootScope.activeTag, $rootScope.gh, $location.search().id).then();
    };

    $scope.add = function () {
        $scope.itemForm.totalQuantity = $scope.itemForm.totalQuantity + 1;
        LogSvc.log('add', $rootScope.activeTag, $rootScope.gh, $location.search().id).then();
    };

    $scope.reduce = function () {
        if ($scope.itemForm.totalQuantity > 1) {
            $scope.itemForm.totalQuantity = $scope.itemForm.totalQuantity - 1;
            LogSvc.log('reduce', $rootScope.activeTag, $rootScope.gh, $location.search().id).then();
        }
    };

    $scope.getContent = function (index, toTab) {
        $scope.contentIndex = index;

        if (toTab) {
            $container.animate({scrollTop: $('.details-tabs').offset().top});
        }

        LogSvc.log('getContent_' + index, $rootScope.activeTag, $rootScope.gh, $location.search().id).then();
    };

    $scope.toTop = function () {
        $container.animate({scrollTop: 0});
    };

    $scope.go = function (isCan) {
        if (!isCan) {
            return false;
        }
        $cookieStore.put('itemForm', $scope.itemForm);
        $location.path('/checkout');
    };

    $scope.$watch('itemForm', function (n, o) {
        $cookieStore.put('itemForm', n);
    }, true)
}]);