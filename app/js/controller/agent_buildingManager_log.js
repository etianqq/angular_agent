angular.module('myapp')
    .factory('BuildingManagerLogResource', function ($http) {
        var repo = {};
        repo.getListByBuildingID = function (params) {
            return $http.get(agentResource.agentApi + "AgentBuildingService/GetListByBuildingID", {params: params});
        };

        return repo;
    })
    .controller('AgentBuildingManagerLogCtrl', function ($scope, $stateParams, BuildingManagerLogResource) {
        fetchLogList();

        function fetchLogList() {
            BuildingManagerLogResource.getListByBuildingID({buildingID: $stateParams.id}).success(function (data) {
                $scope.subList = data.Data.Details;
                $scope.BuildingName = data.Data.BuildingName;
            });
        }
    });
