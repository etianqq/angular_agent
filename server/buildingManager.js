/**
 * Created by Administrator on 2017/1/23.
 */
var buildingServer = {
    init: function (app) {
        app.get('/AgentBuilding/GetList', function (req, res) {
            var data = [{
                id: 1,
                Regierungsbezirk: "南京市江宁区",
                BuildingName: "双湖星城",
                BuildingContactName: "宋仲基",
                BuildingContactPhone: "13455829357",
                BeginTime: "2015-3-20",
                EndTime: "2016-3-20",
                ServiceBuyMonth: 12,
                DaysRemaining: 3,
                IsOpen: false
            },
                {
                    id: 2,
                    Regierungsbezirk: "南京市浦口区",
                    BuildingName: "中和绿色谷",
                    BuildingContactName: "宋慧乔",
                    BuildingContactPhone: "13455829357",
                    BeginTime: "2015-3-20",
                    EndTime: "2016-6-20",
                    ServiceBuyMonth: 12,
                    DaysRemaining: 6,
                    IsOpen: true
                }];
            res.send({Code: 0, Data: {Count: 1, Items: data}});
        });

        app.get('/AgentBuildingService/GetListForAgentID', function (req, res) {
            var data = [{
                id: 1,
                Regierungsbezirk: "南京市江宁区",
                BuildingName: "双湖星城",
                BuildingContactName: "宋仲基",
                BuildingContactPhone: "13455829357",
                ServiceBuyMonth: 12,
                ApplyRemark: "pass",
                ApplyDate: "2016-6-20",
                isAudit: true
            },
                {
                    id: 2,
                    Regierungsbezirk: "南京市浦口区",
                    BuildingName: "中和绿色谷",
                    BuildingContactName: "宋慧乔",
                    BuildingContactPhone: "13455829357",
                    ServiceBuyMonth: 12,
                    ApplyRemark: "pass",
                    ApplyDate: "2016-6-20",
                    isAudit: false
                }];
            res.send({Code: 0,  Data: {Count: 1, Items: data}});
        });
    }
};

module.exports = buildingServer;