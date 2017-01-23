angular.module('sass.directive', [])
    .directive("sassPaging", function () {
        return {
            restrict: 'E',
            templateUrl: 'template/directive/paging.html',
            replace: true,
            scope: {
                totalCount: '=',
                pageSize: '=',
                pageIndex: '='
            },
            link: function (scope, element, attrs) {
                scope.$watch('totalCount', function (value) {
                    if (value == null) {
                        return;
                    }
                    scope.totalPages = Math.ceil(value / scope.pageSize);
                    initPagination();
                }, true);

                scope.$watch('pageSize', function (value) {
                    scope.re_pageIndex = value;
                });

                scope.changePageSize = function (pageSize) {
                    scope.pageIndex = 1;
                    scope.totalPages = Math.ceil(scope.totalCount / pageSize);
                    initPagination();
                    scope.$parent.updateDataList({pageSize: pageSize, pageIndex: 1});
                };

                scope.selectPage = function (page) {
                    if (!isActive(page)) {
                        scope.pageIndex = page;
                        scope.$parent.updateDataList({pageIndex: page});
                    }
                };

                scope.goToPage = function (page) {
                    if (!isActive(page)) {
                        scope.pageIndex = parseInt(page);
                        initPagination();
                        scope.$parent.updateDataList({pageIndex: scope.pageIndex});
                    }
                };

                scope.getPageName = function (page) {
                    if (page == "...") {
                        return page;
                    }
                    return page;
                };
                scope.getClassName = function (page) {
                    if (page == "...") {
                        return "disabled";
                    }
                    if (scope.pageIndex === page) {
                        return "page_on";
                    }
                };
                scope.selectPrevious = function () {
                    if (!scope.noPrevious()) {
                        scope.selectPage(scope.pageIndex - 1);
                    }
                };
                scope.selectNext = function () {
                    if (!scope.noNext()) {
                        scope.selectPage(scope.pageIndex + 1);
                    }
                };
                /*---------------- private functions ------------------*/
                function initPagination() {
                    scope.pages = [];
                    var end = scope.totalPages - 1;
                    if (scope.pageIndex >= 1 && end > 5) {
                        if (scope.pageIndex <= 2 && scope.pageIndex <= end - 2) {
                            scope.pages.push(1);
                            scope.pages.push(2);
                            scope.pages.push(3);
                            scope.pages.push(4);
                            scope.pages.push(5);
                            scope.pages.push("...");
                            scope.pages.push(end);
                        }
                        if (scope.pageIndex >= 4 && scope.pageIndex <= end - 3) {
                            scope.pages.push(0);
                            for (var i = -2; i < 2; i++) {
                                scope.pages.push(scope.pageIndex + i);
                            }
                            scope.pages.push("...");
                            scope.pages.push(end);
                        }
                        if (scope.pageIndex >= end - 4 && scope.pageIndex <= end) {
                            scope.pages.push(1);
                            scope.pages.push("...");
                            scope.pages.push(end - 4);
                            scope.pages.push(end - 3);
                            scope.pages.push(end - 2);
                            scope.pages.push(end - 1);
                            scope.pages.push(end);
                        }
                    } else {
                        for (var i = 0; i < scope.totalPages; i++) {
                            scope.pages.push(i + 1);
                        }
                    }
                }

                function isActive(page) {
                    if (page == "...") {
                        return true;
                    }
                    return scope.pageIndex === page;
                }
            }
        };
    })
    .directive('iCheck', function ($timeout, $parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, $attrs, ngModel) {
                return $timeout(function () {
                    var value = $attrs.value;
                    var $element = $(element);

                    // Instantiate the iCheck control.
                    $element.iCheck({
                        radioClass: 'iradio_minimal-blue',
                        checkboxClass: 'icheckbox_minimal-blue',
                        increaseArea: '20%'
                    });

                    // If the model changes, update the iCheck control.
                    $scope.$watch($attrs.ngModel, function (newValue) {
                        $element.iCheck('update');
                    });

                    // If the iCheck control changes, update the model.
                    $element.on('ifChanged', function (event) {
                        if ($element.attr('type') === 'radio' && $attrs.ngModel) {
                            $scope.$apply(function () {
                                ngModel.$setViewValue(value);
                            });
                        }
                        else if ($(element).attr('type') === 'checkbox' && $attrs.ngModel) {
                            $scope.$apply(function () {
                                ngModel.$setViewValue(event.target.checked);
                            });
                        }
                    });
                });
            }
        };
    })
    .directive('bootstrapSwitch', [
        function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function (scope, element, attrs, ngModel) {
                    var arg = {};
                    if (attrs.size) {
                        arg.size = attrs.size;
                    }
                    element.bootstrapSwitch(arg);

                    element.on('switchChange.bootstrapSwitch', function (event, state) {
                        if (ngModel) {
                            scope.$apply(function () {
                                ngModel.$setViewValue(state);
                            });
                        }
                    });

                    scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                        if (newValue) {
                            element.bootstrapSwitch('state', true, true);
                        } else {
                            element.bootstrapSwitch('state', false, true);
                        }
                    });
                }
            };
        }
    ])
    .directive('formatDate', function ($filter) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModelCtrl) {
                ngModelCtrl.$formatters.push(function (modelValue) {
                    if (modelValue) {
                        return new Date(modelValue);
                    }
                });

                ngModelCtrl.$parsers.push(function (value) {
                    if (value) {
                        return $filter('date')(value, 'yyyy-MM-dd');
                    }
                });
            }
        };
    })
    /*http://stackoverflow.com/questions/14703517/angular-js-set-element-height-on-page-load*/
    .directive('resize', function ($window) {
        return function (scope, element, attrs) {
            var w = angular.element($window);
            var widthGap = 0, heightGap = 0;
            if (attrs.widthGap) {
                widthGap = parseInt(attrs.widthGap);
                heightGap = parseInt(attrs.heightGap);
            }

            var height = w.height() - widthGap;
            var width = w.width() - heightGap;
            element.css("height", height);
            element.css("width", width);
        }
    })
    .directive('levelTree', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                var tr = elem;
                scope.$watch('$last', function (isLast) {
                    if (isLast) {
                        tr.closest("table").createTree();
                    }
                });
            }
        }
    })
    .directive('pwCheck', function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, elem, attrs, ngModelCtrl) {
                var isSame = function (value) {
                    var firstPassword = scope.$eval(attrs.pwCheck);
                    return value === firstPassword;
                };

                ngModelCtrl.$parsers.push(function (value) {
                    ngModelCtrl.$setValidity("pwmatch", isSame(value));
                    return value;
                });
                scope.$watch(function () {
                    return scope.$eval(attrs.pwCheck);
                }, function () {
                    ngModelCtrl.$setValidity("pwmatch", isSame(ngModelCtrl.$modelValue));
                });
            }
        }
    });

