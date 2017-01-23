angular.module('myapp')
    .controller('TestCtrl', function ($scope, httpApi) {
        $scope.sendCode3 = function () {
            httpApi.GET("/Code/3", "", function () {

            })
        };

        $scope.sendCode302 = function () {
            httpApi.GET("/Code/302", "", function () {

            })
        };

        $scope.sendCode4000 = function () {
            httpApi.GET("/Code/4000", "", function () {

            })
        };

        $scope.sendCode4002 = function () {
            httpApi.GET("/Code/4002", "", function () {

            })
        };

        $scope.sendCodeError = function () {
            httpApi.GET("Code/error", "", function () {

            });
        };

        $scope.getTabs = function () {
            httpApi.GET("http://newcrmbuildingtrans.test.apitops.com/api/fund/Commission/Tab", {buildingKid: 9}, function () {
                alert("ok");
            });
        }
    })
    .controller('HomeController', function (globalParas) {
        globalParas.adminKid = "1807";
        globalParas.agentID = "f776290a-180e-42ef-8945-c103ea6c6135";
    });