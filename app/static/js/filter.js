'use strict';

appFilters.filter('trustHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

appFilters.filter('curCate', function () {
    return function (place) {
        return place.split('/')[2];
    }
});