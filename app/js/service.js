angular.module('sass.service', ['ngCookies'])
    .provider('globalParas', function () {
        //todo
        var _globalParas = {agentID: "f776290a-180e-42ef-8945-c103ea6c6135", adminKid: "1807"};
        this.setAgentID = function (agentID) {
            _globalParas.agentID = agentID;
        };
        this.setAdminKid = function (adminKid) {
            _globalParas.adminKid = adminKid;
        };
        this.$get = function () {
            return _globalParas;
        }
    })
    .factory('sassInterceptor', function ($location, $window, $cookies, $q,messageUI) {
        var interceptor = {
            'request': function (request) {
                messageUI.showLoading();
                return request;
            },
            'response': function (response) {
                messageUI.hideLoading();
                var result = response.data;
                if (result.Code === 3) {
                    document.write(result.Message);
                }
                else if (result.Code === 302) {
                    var hash = $location.hash().length > 0 ? "#" + $location.hash() : $location.hash();
                    $window.location.href = result.Message + hash;
                }
                else if (result.Code === 4000) {
                    $location.path("/Unauthorized");
                }
                else if (result.Code === 4002) {
                    $cookies.remove("uk");
                    $location.path("/login");
                }
                else if (result.Code !== undefined && result.Code !== null && result.Code !== 0) {
                    messageUI.showAlertMsg(result.Message || 'Error!', 2000, 'danger');
                    return $q.reject(response);
                }
                return response;
            }
        };
        return interceptor;
    })
    .factory('messageUI', function () {
        function showLoading() {
            if ($("#tops_loading").length == 0) {
                var loading = "<div id='tops_loading'><div class='loading_box'><span class='loading_inner'>Loading...</span></div></div>";
                $("body").append(loading);
            }
            $("#tops_loading").show();
        }

        function hideLoading() {
            $("#tops_loading").hide();
        }

        function showAlertMsg(message, delay, type) {
            $("#tops_alert_msg").remove();
            $("body").prepend($("<div alert-panel id='tops_alert_msg' style='position:fixed;z-index:1000;top:0;left:0;width:100%;text-align: center;z-index:9999;'></div>"));

            var $panel = $("#tops_alert_msg");
            var $div = $("<div onselectstart='return false' class='alert alert-dismissible'></div>");
            $div.addClass("alert-" + (type || 'info'));
            $div.css({padding: "12px 10px 5px", "margin-bottom": "5px", cursor: "pointer", height: '45px', fontSize: '16px'});
            $div.text(message);
            $panel.prepend($div).hide();

            $panel.slideDown(function(){
                setTimeout(function () {
                    $panel.slideUp(function () {
                        $panel.remove();
                    });
                }, delay || 1500);
            });

            $('#tops_alert_msg').click(function(){
                var self = $(this);
                self.slideUp(function () {
                    self.remove();
                });
            });
        }

        return {
            showLoading: showLoading,
            hideLoading: hideLoading,
            /*
             * @action 提示alert
             * @params message 提示信息 可为string或者html
             * @params delay 提示信息 出现到消失的时间，单位毫秒
             * @params type 提示信息类型 warning警告，danger危险或出错，success成功，info提示信息
             */
            showAlertMsg: showAlertMsg
        }
    });