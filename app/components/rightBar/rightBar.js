appDirectives.directive("rightBar", [function () {
    return {
        restrict: 'A',
        templateUrl: "components/rightBar/rightBar.html",
        link: function (scope, element, attrs) {
            var $container = $("html,body");
            scope.top = function () {
                $container.animate({scrollTop: 0});
            }
        }
    };
}]);