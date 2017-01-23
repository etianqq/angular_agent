angular.module('myapp')
    .factory('BuildingManagerResource', function ($http) {
        var repo = {};
        repo.getList = function (params) {
            return $http.get(agentResource.agentApi + "AgentBuilding/GetList", {params: params});
        };

        repo.add = function (params) {
            return $http.post(agentResource.agentApi + "AgentBuilding/Open", params)
        };

        return repo;
    })
    .controller('AgentBuildingManagerCtrl', function ($scope, $httpParamSerializer, $uibModal, $log, globalParas, BuildingManagerResource) {
        $scope.buildingObj = {};
        initQueryArg();
        fetchBuildingList(getListQueryArg());

        $scope.refresh = function () {
            initQueryArg();
            fetchBuildingList(getListQueryArg());
        };


        $scope.updateDataList = function (pageConfig) {
            fetchBuildingList(getListQueryArg(pageConfig));
        };

        /*------------------ fetch building list -------------------*/
        function initQueryArg(){
            $scope.keywords = "";
            $scope.pageIndex = 1;
            $scope.pageSize = 2;
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

        function fetchBuildingList(args) {
            BuildingManagerResource.getList(args).success(
                function (data) {
                    if (data.Code ===0){
                        $scope.totalCount = data.Data.Count;
                        $scope.subList = data.Data.Items;
                    }
                }
            );
        }

        /*------------------ open building modal -------------------*/
        $scope.openBuildingModal = function (item) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/template/modal/agent_buildingManager_modal.html',
                controller: function ($scope, $uibModalInstance, buildingObj) {
                    $scope.buildingObj = buildingObj;
                    $scope.ok = function () {
                        $uibModalInstance.close($scope.buildingObj);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                    buildingObj: function () {
                        return angular.copy(item);
                    }
                }
            });
            modalInstance.result.then(function (buildingObj) {
                BuildingManagerResource.add({
                    buildingID: buildingObj.AgentBuildingGuid,
                    beginTime: buildingObj.BeginTime,
                    endTime: buildingObj.EndTime
                }).success(function () {
                    $scope.refresh();
                });
            }, function () {
                $log.info('agent_buildingManager_modal dismissed at: ' + new Date());
            });

        };
    });