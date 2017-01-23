angular.module('myapp')
    .factory('SettingResource', function ($http) {
        var res = {};
        res.getRoleList = function () {
            return $http.get(agentResource.agentApi + "SysConfig/Role/GetRoleList");
        };

        res.getAdminList = function (params) {
            return $http.get(agentResource.agentApi + "SysConfig/Admin/GetAdmin_ListPage", {params: params});
        };

        res.getAdminLogByKid = function (params) {
            return $http.get(/*apiResource.oaApi +*/ "/Admin/GetAdminLogByKid", {params: params});
        };

        return res;
    })
    .controller('AgentSettingCtrl', function ($scope, $uibModal, globalParas, SettingResource) {
        var logModalInstance;
        $scope.keywords = "";

        fetchRoleList();

        $scope.selectRole = function (role) {
            $scope.roleObj.RoleList.forEach(function (data) {
                data.selected = false;
            });
            role.selected = true;
            SettingResource.getAdminList({roleKid: role.Kid}).success(function (data) {
                $scope.adminList = data.Data.Records;
            });
        };

        $scope.refresh = function () {
            $scope.keywords = "";
            fetchRoleList();
        };

        $scope.doFilter = function () {
            fetchRoleList();
        };

        /*------------------ open role list -------------------*/
        function fetchRoleList() {
            SettingResource.getRoleList().success(function (data) {
                $scope.roleObj = data.Data;
            });
        }

        /*------------------ open building modal -------------------*/
        $scope.openSettingLogModal = function (kid) {
            SettingResource.getAdminLogByKid({userKid:kid}).success(function(data){
                $scope.logList = data.Items;
                logModalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'settingLogModal.html',
                    scope: $scope,
                    windowClass: "logModal"
                });
            });
        };

        $scope.settingLogModalCancel = function () {
            logModalInstance.dismiss('cancel');
        }
    });