appDirectives.directive("ngFooter", [function () {
    return {
        restrict: 'A',
        templateUrl: "components/footer/footer.html",
        link: function (scope, element, attrs) {
            scope.showWaitingIcon = false;//是否等待数据
        }
    };
}]);