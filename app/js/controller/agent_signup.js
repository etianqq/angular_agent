angular.module('myapp')
    .factory('SignupResource', function ($http, $q) {
        var res = {};
        res.getCountryList = function () {
            return $http.get(agentResource.agentApi + "SysConfig/Area/GetCountryList");
        };

        res.getProvinceCityAreaList = function (params) {
            var deferred = $q.defer();
            // it dose not use $http, because this api dose not support 'withCredentials' request header and customer header.
            $.get(agentResource.agentApi + "ProvinceCityArea/GetProvinceCityAreaList", params)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
            return deferred.promise;
        };

        res.generatePhoneCode = function (phone) {
            return $http.get(agentResource.agentApi + "Notify/Generate", {params: phone});
        };

        res.register = function (params) {
            return $http.get(agentResource.agentApi + "Agent/Register", {params: params});
        };
        return res;
    })
    .controller("AgentSingupCtrl", function ($scope, $uibModal, $location, SignupResource) {
        $scope.account = {isUserAgreement: true};
        $scope.countryObj = {isShowSelectContainer: false};
        $scope.provinceObj = {isShowSelectContainer: false, type: "province"};
        $scope.cityObj = {isShowSelectContainer: false, type: "city"};
        $scope.areaObj = {isShowSelectContainer: false, type: "area"};

        fetchCountryList();
        fetchProvinceCityAreaList(0);


        function fetchCountryList() {
            SignupResource.getCountryList().success(function (data) {
                $scope.countryObj.subList = data.Data;
                $scope.countryObj.subList.forEach(function (item) {
                    item.Text = item.F_Name + "(" + item.F_PhoneCode + ")";
                });
                $scope.countryObj.mySelected = $scope.countryObj.subList[0];
            });
        }

        function fetchProvinceCityAreaList(id) {
            var kid = id;
            SignupResource.getProvinceCityAreaList({kid: kid}).then(function (data) {
                $scope.provinceObj.subList = data.Data;
                $scope.provinceObj.mySelected = $scope.provinceObj.subList[0];
                kid = $scope.provinceObj.mySelected.Kid;
            }).then(function () {
                fetchCityAreaList(kid);
            });
        }

        function fetchCityAreaList(id) {
            var kid = id;
            SignupResource.getProvinceCityAreaList({kid: kid}).then(function (data) {
                $scope.cityObj.subList = data.Data;
                $scope.cityObj.mySelected = $scope.cityObj.subList[0];
                kid = $scope.cityObj.mySelected.Kid;
            }).then(function () {
                fetchAreaList(kid);
            });
        }

        function fetchAreaList(kid) {
            SignupResource.getProvinceCityAreaList({kid: kid}).then(function (data) {
                $scope.areaObj.subList = data.Data;
                $scope.areaObj.mySelected = $scope.areaObj.subList[0];
            })
        }

        /*------------------ set province/city/area select container -------------------*/
        $scope.updateProvinceSelectItem = function (selectedObj, index) {
            updateSelectedItemImp(selectedObj, index);
            fetchCityAreaList(selectedObj.mySelected.Kid);
        };

        $scope.updateCitySelectItem = function (selectedObj, index) {
            updateSelectedItemImp(selectedObj, index);
            fetchAreaList(selectedObj.mySelected.Kid);
        };

        $scope.updateAreaSelectItem = function (selectedObj, index) {
            updateSelectedItemImp(selectedObj, index);
        };

        /*------------------ set country select container -------------------*/
        $scope.showSelectContainer = function (selectedObj) {
            selectedObj.isShowSelectContainer = !selectedObj.isShowSelectContainer;
            switch (selectedObj.type) {
                case "province":
                    $scope.cityObj.isShowSelectContainer = false;
                    $scope.areaObj.isShowSelectContainer = false;
                    break;
                case "city":
                    $scope.provinceObj.isShowSelectContainer = false;
                    $scope.areaObj.isShowSelectContainer = false;
                    break;
                case "area":
                    $scope.cityObj.isShowSelectContainer = false;
                    $scope.provinceObj.isShowSelectContainer = false;
                    break;
            }
        };

        $scope.updateSelectItem = function (selectedObj, index) {
            updateSelectedItemImp(selectedObj, index);
        };

        function updateSelectedItemImp(selectedObj, index) {
            selectedObj.isShowSelectContainer = false;
            selectedObj.mySelected = selectedObj.subList[index];
        }

        /*------------------ open building modal -------------------*/
        var protocolModal;
        $scope.openProtocolModal = function () {
            protocolModal = $uibModal.open({
                animation: true,
                templateUrl: 'protocolModal.html',
                scope: $scope,
                windowClass: "agentSingupProtocolModal"
            });
        };

        $scope.protocolCancel = function () {
            protocolModal.dismiss('cancel');
        };

        /*------------------ phone validation -------------------*/
        $scope.isInValidPhone = function () {
            return $scope.accountForm.phone.$invalid && !$scope.accountForm.phone.$pristine;
        };

        $scope.getPhoneCode = function () {
            SignupResource.generatePhoneCode({phone: $scope.account.phone}).success(function (data) {
                $.messager.showMsgInfo(data ? "发送成功" : "发送失败");
            });
        };

        /*------------------ submit form -------------------*/
        $scope.createAccount = function () {
            $scope.account.provinceKid = $scope.provinceObj.mySelected.Kid;
            $scope.account.provinceName = $scope.provinceObj.mySelected.F_Name;

            $scope.account.cityKid = $scope.cityObj.mySelected.Kid;
            $scope.account.cityName = $scope.cityObj.mySelected.F_Name;

            $scope.account.areaKid = $scope.areaObj.mySelected.Kid;
            $scope.account.areaName = $scope.areaObj.mySelected.F_Name;

            SignupResource.register($scope.account).success(function (data) {
                if (data.Code === 0) {
                    $location.path("/login");
                }
                else {
                    $.messager.showMsgInfo(data.Message || "注册失败！");
                }
            });
        };

        $scope.canSave = function () {
            return $scope.accountForm.$dirty && $scope.accountForm.$valid && $scope.account.isUserAgreement;
        }
    });
