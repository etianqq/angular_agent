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
            var data = [
                {
                    AgentBuidingServiceGuid: 1,
                    Regierungsbezirk: "南京市江宁区",
                    BuildingName: "双湖星城",
                    BuildingContactName: "宋仲基",
                    BuildingContactPhone: "13455829357",
                    ServiceBuyMonth: 12,
                    ApplyRemark: "通过",
                    ApplyDate: "2016-6-20",
                    isAudit: true,
                    AuditStatus: 1
                },
                {
                    AgentBuidingServiceGuid: 2,
                    Regierungsbezirk: "南京市浦口区",
                    BuildingName: "中和绿色谷",
                    BuildingContactName: "宋慧乔",
                    BuildingContactPhone: "13455829357",
                    ServiceBuyMonth: 12,
                    ApplyRemark: "不通过",
                    ApplyDate: "2016-6-20",
                    isAudit: false,
                    AuditStatus: 1
                },
                {
                    AgentBuidingServiceGuid: 3,
                    Regierungsbezirk: "杭州市滨江区",
                    BuildingName: "盛元慧谷",
                    BuildingContactName: "张富根",
                    BuildingContactPhone: "13898829357",
                    ServiceBuyMonth: 12,
                    ApplyRemark: "有问题",
                    ApplyDate: "2016-6-20",
                    isAudit: false,
                    AuditStatus: 0
                }];
            res.send({Code: 0, Data: {Count: 1, Items: data}});
        });

        app.get('/AgentBuildingService/GetListByBuildingID', function (req, res) {
            var Items = [{
                id: 1,
                AddTime: "2016-6-20",
                ApplyName: "宋仲基",
                ServiceBuyMonth: 12,
                ApplyRemark: "pass",
                DaysRemaining: 4
            },
                {
                    id: 2,
                    AddTime: "2016-6-20",
                    ApplyName: "宋慧乔",
                    ServiceBuyMonth: 11,
                    ApplyRemark: "pass",
                    DaysRemaining: 2
                }];
            var data = {};
            data.Details = Items;
            data.BuildingName = "双湖星城";
            res.send({Code: 0, Data: data});
        });

        app.post('/AgentBuilding/Open', function (req, res) {
            res.send({Code: 0, Message: "Add successfully!"});
        });

        app.get('/AgentBuildingService/FindByID', function (req, res) {
            var data;
            var applyID = req.query.applyID;
            console.log("AgentBuidingServiceGuid:"+applyID);
            if (applyID == 3) {
                data = {
                    BuildingName: "盛元慧谷",
                    Regierungsbezirk: "杭州市滨江区",
                    BuildingContactName: "张楠",
                    BuildingContactPhone: "123456789",
                    ServiceBuyMonth: 10,
                    BeginTime: "2017-1-2",
                    EndTime: "2017-1-12",
                    ApplyRemark: "申请人资质很好",
                    AuditRemark: "需要审核",
                    AuditStatus: 0
                };
            }
            else {
                data = {
                    BuildingName: "太和广场",
                    Regierungsbezirk: "浙江省杭州市上城区",
                    BuildingContactName: "张楠",
                    BuildingContactPhone: "123456789",
                    ServiceBuyMonth: 10,
                    BeginTime: "2017-1-2",
                    EndTime: "2017-1-12",
                    ApplyRemark: "申请人资质很好",
                    AuditRemark: "需要审核",
                    AuditStatus: 10
                };
            }
            res.send({Code: 0, Data: data});
        });

        app.post('/AgentBuildingService/AuditApply', function (req, res) {
            res.send({Code: 0, Message: "Audit successfully!"});
        });
    }
};

module.exports = buildingServer;