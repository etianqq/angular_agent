angular.module('sass-filter', [])
    .filter('trustAsResourceUrl', function ($sce) {
        return function (val) {
            return $sce.trustAsResourceUrl(val);
        }
    });
