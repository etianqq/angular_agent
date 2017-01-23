angular.module('myapp')
    .factory('BuyApplyResource', function ($http) {
        var repo = {};
        repo.getListByAgentID = function (params) {
            return $http.get(agentResource.agentApi + "AgentService/GetListByAgentID", {params: params});
        };

        repo.findByID = function (params) {
            return $http.get(agentResource.agentApi + "Agent/FindByID", {params: params});
        };

        repo.add = function (params) {
            return $http.post(agentResource.agentApi + "AgentService/Add", params);
        };
        return repo;
    })
    .controller('AgentBuyApplyCtrl', function ($scope, $uibModal, $log, globalParas, BuyApplyResource) {
        fetchApplyList();

        function fetchApplyList() {
            BuyApplyResource.getListByAgentID().success(function (data) {
                $scope.subList = data.Data;
            });
        }

        /*------------------ open building modal -------------------*/
        $scope.buyApplyingModal = function () {
            BuyApplyResource.findByID().success(function (data) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/template/modal/agent_buyApply_modal.html',
                    controller: function ($scope, $uibModalInstance, buyApplyObj) {
                        $scope.buyApplyObj = buyApplyObj;
                        $scope.ok = function () {
                            $uibModalInstance.close($scope.buyApplyObj);
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };

                        $scope.isFormValid = function () {
                            return $scope.buyApplyForm.$dirty && $scope.buyApplyForm.$valid;
                        }
                    },
                    resolve: {
                        buyApplyObj: function () {
                            return data.Data;
                        }
                    }
                });
                modalInstance.result.then(function (buyApplyObj) {
                    BuyApplyResource.add({
                        serviceBuyMonth: buyApplyObj.serviceBuyMonth,
                        remark: buyApplyObj.remark
                    }).success(function (res) {
                        if (res.Code === 0) {
                            $.messager.showMsgInfo("购买成功！");
                            fetchApplyList();
                        }
                        else {
                            $.messager.showMsgErr(res.Message || "购买失败！")
                        }
                    });
                }, function () {
                    $log.info('agent_buyApply_modal dismissed at: ' + new Date());
                });
            });
        };
    });