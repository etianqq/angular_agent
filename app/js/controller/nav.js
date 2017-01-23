angular.module('myapp')
    .factory('NavResource', function ($http) {
        var res = {};
        res.getAgentAndUser = function (params) {
            return $http.get(agentResource.agentApi + "User/GetAgentAndUser", {params: params});
        };
        return res;
    })
    .controller('NavCtrl', function ($scope, $location, $httpParamSerializer, $cookies, globalParas, NavResource) {
        var searchStr = getSearchStr(), agentID = globalParas.agentID;
        $scope.agent = {};
        setCurrentType();
        fetchAgentMsg();

        $scope.menuList = [
            {name: "楼盘管理", hash: "/agent/buildingManager" + searchStr, type: "buildingManager"},
            {name: "购买申请", hash: "/agent/buyApply" + searchStr, type: "buyApply"},
            {name: "设置", hash: "/agent/setting" + searchStr, type: "setting"}];
        $scope.changeType = function (type) {
            $scope.type = type;
        };

        function getSearchStr() {
            var params = $location.search();
            var paramsStr = $httpParamSerializer(params);
            return paramsStr.length > 0 ? "?" + paramsStr : "";
        }

        function setCurrentType() {
            switch ($location.path()) {
                case "/agent/buyApply":
                    $scope.type = "buyApply";
                    break;
                case "/agent/setting":
                    $scope.type = "setting";
                    break;
                default:
                    $scope.type = "buildingManager";
            }
        }

        function fetchAgentMsg() {
            NavResource.getAgentAndUser().success(function (data) {
                if (data.Data) {
                    $scope.agent.SurplusServiceMonth = data.Data.SurplusServiceMonth;
                    $scope.agent.AgentName = data.Data.AgentName;
                }
            });
        }
    });