/**
 * Created by Administrator on 2017/1/23.
 */
var commonServer = {
    init: function (app) {
        app.get('/User/GetAgentAndUser', function (req, res) {
            res.send({Data: {SurplusServiceMonth: 12, AgentName: "杭州寒武纪网络科技公司"}});
        });
    }
};

module.exports = commonServer;