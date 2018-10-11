appDirectives.directive("ngSelector", [function () {
    return {
        restrict: 'A',
        scope: {
            inputData: '=',
            selected: '&'
        },
        templateUrl: "component_modules/selector/selector.html",
        link: function (scope, element, attrs) {
            scope.showWaitingIcon = false;//是否等待数据
        }
    };
}]);