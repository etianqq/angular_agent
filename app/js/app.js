/**
 * main app
 */
angular.module('myapp', ['ui.router', 'oc.lazyLoad', 'ui.bootstrap', 'angular-md5', 'ngCookies', 'sass.service', 'sass.directive', 'sass-filter'])
    .value({hasVisitedUserState: false})
    .config(function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common['k-crossdomain'] = true;
        $httpProvider.interceptors.push('sassInterceptor');
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/Home');
        $urlRouterProvider.when('/', '/Home');

        $urlRouterProvider.otherwise('/Home');

        $stateProvider
            .state('agent', {
                url: '/agent',
                abstract: true,
                templateUrl: 'template/nav.html',
                controller: 'NavCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controller/nav.js');
                    }]
                }
            })
            /*----- basic ----*/
            .state('agent.buildingManager', {
                url: '/buildingManager',
                templateUrl: 'template/agent_buildingManager.html',
                controller: 'AgentBuildingManagerCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controller/agent_buildingManager.js');
                    }]
                },
                title: "楼盘管理"

            })
            .state('agent.buildingManagerLog', {
                url: '/buildingManagerLog/:id',
                templateUrl: 'template/agent_buildingManager_log.html',
                controller: 'AgentBuildingManagerLogCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controller/agent_buildingManager_log.js');
                    }]
                },
                title: ['$stateParams', function ($stateParams) {
                    return "楼盘管理:日志" + $stateParams.id;
                }]
            })

            .state('agent.buildingManagerApply', {
                url: '/buildingManagerApply',
                templateUrl: 'template/agent_buildingManager_apply.html',
                controller: 'AgentBuildingManagerApplyCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controller/agent_buildingManager_apply.js');
                    }]
                },
                title: "楼盘管理:申请"
            })
            .state('agent.buyApply', {
                url: '/buyApply',
                templateUrl: 'template/agent_buyApply.html',
                controller: 'AgentBuyApplyCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controller/agent_buyApply.js');
                    }]
                },
                title: "楼盘管理"
            })
            .state('agent.setting', {
                url: '/setting',
                templateUrl: 'template/agent_setting.html',
                controller: 'AgentSettingCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controller/agent_setting.js');
                    }]
                },
                title: "设置"
            })
            .state('agent.settingCreate', {
                url: '/settingCreate',
                templateUrl: 'template/agent_setting_create.html',
                controller: 'AgentSettingCreateCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controller/agent_setting_create.js');
                    }]
                },
                title: "设置:添加"
            })
            .state('login', {
                url: '/login',
                templateUrl: 'template/agent_login.html',
                controller: 'AgentLoginCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controller/agent_login.js');
                    }]
                }
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'template/agent_signup.html',
                controller: 'AgentSingupCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/controller/agent_signup.js');
                    }]
                }
            })
            .state('Unauthorized', {
                url: '/Unauthorized',
                templateUrl: 'template/Unauthorized.html'
            })
            /*---------------- test ---------------*/
            .state('Home', {
                url: '/Home',
                templateUrl: 'template/Home.html'
            });
    })
    .run(function ($rootScope, $window, $document, $injector, $state, hasVisitedUserState) {
        var currentStateName = "";
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            var title = getPageTitle(toState);
            $window.title = title;
            $document.title = title;
            currentStateName = toState.name;

            function getPageTitle(current) {
                var title = current.title;
                if (!title) {
                    return $window.title;
                }
                return angular.isString(title) ? title : $injector.invoke(title);
            }
        });
    });

