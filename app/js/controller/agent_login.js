angular.module('myapp')
    .controller("AgentLoginCtrl", function ($scope, $http, $timeout, $location, md5) {
        $scope.username = "";
        $scope.password = "";
        $scope.isLogining = false;

        var oauth_url = agentResource.oauth_login_url.join(",");

        $scope.login = function () {
            var md5_password = md5.createHash($scope.password || "");
            var arg = {loginName: $scope.username, password: md5_password, urls: oauth_url};

            $.ajax({
                dataType: "jsonp",
                url: agentResource.agentApi + "oauth/logintoauthurl",
                type: "GET",
                crossDomain: true,
                data: arg
            }).success(function (data) {
                var arr = data.Data;
                if (angular.isArray(arr)) {
                    $scope.isLogining = true;
                    var count = arr.length;
                    var timer = $timeout(function () {
                        $location.path("/");
                    }, 1000);
                    for (var i in arr) {
                        var url = arr[i];
                        $.ajax({
                            dataType: "jsonp",
                            url: arr[i],
                            type: "GET",
                            data: {},
                            success: function (result) {
                                if (--count == 0) {
                                    $location.path("/");
                                    clearTimeout(timer);
                                }
                            }
                        });
                    }
                } else {
                    $.messager.showMsgErr(http_msg[data.Code + ""] || "登录失败!");
                }
            });
        };
    });
