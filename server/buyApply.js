/**
 * Created by Administrator on 2017/1/23.
 */
var buyApplyServer = {
    init: function (app) {
        app.get('/AgentService/GetListByAgentID', function (req, res) {
            var data = [{
                id: 1,
                AddTime: "2016-6-20",
                AuditStatus: "通过",
                ServiceBuyMonth: 12,
                SoldServiceMonth: 5,
                SurplusServiceMonth: 3,
                ApplyRemark: "没有备注"
            },
                {
                    id: 2,
                    AddTime: "2016-2-12",
                    AuditStatus: "通过",
                    ServiceBuyMonth: 24,
                    SoldServiceMonth: 9,
                    SurplusServiceMonth: 2,
                    ApplyRemark: "优质客户"
                }];
            res.send({Code: 0, Data: data});
        });

        app.get('/Agent/FindByID', function (req, res) {
            var data = {
                AgentName: "寒武纪集团",
                Regierungsbezirk: "杭州市上城区",
                ContactName: "李冰冰",
                ContactPhone: "123456789",
                SurplusServiceMonth: 11,
                remark: "信用良好"
            };
            res.send({Code: 0, Data: data});
        });

        app.post('/AgentService/Add', function (req, res) {
            res.send({Code: 0, Message: "Add successfully!"});
        });
    }
};

module.exports = buyApplyServer;