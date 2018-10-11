appDirectives.directive("ngHeader", ['ProductSvc', function (ProductSvc) {
    return {
        restrict: 'A',
        templateUrl: "components/header/header.html",
        link: function (scope, element, attrs) {
            scope.showWaitingIcon = false;//是否等待数据

            ProductSvc.getCatalogs().then(function success(res) {
                scope.catalogs = res.childList;
            });
        }
    };
}]);