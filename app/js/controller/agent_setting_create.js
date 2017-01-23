angular.module('myapp')
    .factory("SettingCreateResource", function ($http) {
        var res = {};
        res.getTheRoleListOfAdminByAdminKid = function (params) {
            return $http.jsonp(agentResource.agentApi + "sysconfig/Role/GetTheRoleListOfAdminByAdminKid?callback=JSON_CALLBACK", {params: params});
        };
        res.addAdmin = function (params) {
            return $http.get(agentResource.agentApi + "Admin/AddAdmin", {params: params});
        };

        return res;
    })
    .controller('AgentSettingCreateCtrl', function ($scope, $uibModal, $location, SettingCreateResource) {
        $scope.account = {};
        $scope.account.sex = true;

        $scope.updateSex = function (sex) {
            $scope.account.sex = sex;
        };

        $scope.canSave = function () {
            return $scope.accountForm.$dirty && $scope.accountForm.$valid;
        };

        $scope.createAccount = function () {
            SettingCreateResource.addAdmin($scope.account).success(function () {
                $.messager.showMsgInfo("添加成功!");
                $location.path("/agent/setting");
            }).error(function () {
                $.messager.showMsgInfo("添加失败!")
            });
        };
    });