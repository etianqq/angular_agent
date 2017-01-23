angular.module('myapp')
    .factory('BuildingManagerApplyResource', function ($http) {
        var repo = {};
        repo.getListForAgentID = function (params) {
            return $http.get(agentResource.agentApi + "AgentBuildingService/GetListForAgentID", {params: params});
        };

        repo.findByID = function (params) {
            return $http.get(agentResource.agentApi + "AgentBuildingService/FindByID", {params: params});
        };

        repo.auditApply = function (params) {
            return $http.post(agentResource.agentApi + "AgentBuildingService/AuditApply", params);
        };

        return repo;
    })
    .controller('AgentBuildingManagerApplyCtrl', function ($scope, $uibModal, $log, BuildingManagerApplyResource) {
        $scope.buildingObj = {};
        initQueryArg();

        fetchBuildingApplyList(getListQueryArg());

        $scope.refresh = function () {
            initQueryArg();
            fetchBuildingApplyList(getListQueryArg());
        };

        $scope.updateDataList = function (pageIndex) {
            fetchBuildingApplyList(getListQueryArg(pageIndex));
        };

        /*------------------ fetch building apply list -------------------*/
        function initQueryArg(){
            $scope.keywords = "";
            $scope.pageIndex = 1;
            $scope.pageSize = 1;
        }

        function getListQueryArg(pageConfig){
            if (pageConfig && pageConfig.pageIndex) {
                $scope.pageIndex = pageConfig.pageIndex;
            }
            if (pageConfig && pageConfig.pageSize) {
                $scope.pageSize = pageConfig.pageSize;
            }
            var args = {};
            if ($scope.keywords.trim().length > 0) {
                args.keyWords = $scope.keywords;
            }
            args.pageIndex = $scope.pageIndex;
            args.pageSize = $scope.pageSize;

            return args;
        }

        function fetchBuildingApplyList(args) {
            BuildingManagerApplyResource.getListForAgentID(args).success(function (data) {
                if (data.Code ===0){
                    $scope.totalCount = data.Data.Count;
                    $scope.subList = data.Data.Items;
                }
            });
        }

        /*------------------ open building modal -------------------*/
        $scope.openBuildingModal = function (item) {
            BuildingManagerApplyResource.findByID({applyID: item.AgentBuidingServiceGuid}).success(function (data) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/template/modal/agent_buildingManager_apply_modal.html',
                    controller: function ($scope, $uibModalInstance, buildingObj) {
                        $scope.buildingObj = buildingObj;
                        $scope.audit = function (result) {
                            $scope.buildingObj.auditResult = result;
                            $uibModalInstance.close($scope.buildingObj);
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    resolve: {
                        buildingObj: function () {
                            return data.Data;
                        }
                    }
                });

                modalInstance.result.then(function (buildingObj) {
                    BuildingManagerApplyResource.auditApply({
                        applyID: buildingObj.AgentBuidingServiceGuid,
                        auditRemark: buildingObj.AuditRemark,
                        auditStatus: buildingObj.auditResult
                    }).success(function(){
                        $scope.refresh();
                    });
                }, function () {
                    $log.info('agent_buildingManager_apply_modal dismissed at: ' + new Date());
                });
            });
        };
    });