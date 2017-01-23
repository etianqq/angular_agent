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
                AuditRemark: "没有备注"
            },
                {
                    id: 2,
                    AddTime: "2016-2-12",
                    AuditStatus: "通过",
                    ServiceBuyMonth: 24,
                    SoldServiceMonth: 9,
                    SurplusServiceMonth: 2,
                    AuditRemark: "优质客户"
                }];
            res.send({Code: 0, Data: data});
        });
    }
};

module.exports = buyApplyServer;