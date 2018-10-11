appDirectives.directive("ngAddress", ['AddressSvc', function (AddressSvc) {
    return {
        restrict: 'A',
        scope: {
            show: '=',
            area: '='
        },
        templateUrl: "component_modules/address/address.html",
        link: function (scope, element, attrs) {

            scope.address = {
                province: '',
                city: '',
                district: ''
            };

            scope.$watch('show', function (n, o) {
                if (n !== o && n) {
                    scope.getProvinces();
                }
            });

            scope.hide = function () {
                scope.show = false;
            };

            scope.getProvinces = function () {
                scope.selectorData = AddressSvc.getProvinces();
                setTimeout(function () {
                    scope.$apply(scope.tabName = 'province');
                }, 10);
            };

            scope.getCities = function (province) {
                if (!province) {
                    return false;
                }
                scope.selectorData = AddressSvc.getCities(province);
                setTimeout(function () {
                    scope.$apply(scope.tabName = 'city');
                }, 10);
            };

            scope.getDistricts = function (province, city) {
                if (!province || !city) {
                    return false;
                }
                scope.selectorData = AddressSvc.getDistricts(province, city);
                setTimeout(function () {
                    scope.$apply(scope.tabName = 'district');
                }, 10);
            };

            scope.areaSelected = function (e, data) {
                if (scope.tabName === 'province') {
                    scope.address.province = data.name;

                    scope.address.city = '';
                    scope.address.district = '';

                    scope.getCities(data.name);
                }

                if (scope.tabName === 'city') {
                    scope.address.city = data.name;

                    scope.address.district = '';
                    scope.getDistricts(scope.address.province, data.name);
                }

                if (scope.tabName === 'district') {
                    scope.address.district = data.name;
                    scope.area = scope.address.province + scope.address.city + scope.address.district;
                    scope.show = false;
                }
            };
        }
    };
}]);