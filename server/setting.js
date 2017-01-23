/**
 * Created by Administrator on 2017/1/23.
 */
var settingServer = {
    init: function (app) {
        app.get('/SysConfig/Role/GetRoleList', function (req, res) {
            var items = [];
            res.send({Data: items});
        });

        app.get('/SysConfig/Admin/GetAdmin_ListPage', function (req, res) {
            var items = [
                {
                    Kid: 0,
                    F_RealName: "张小猫",
                    F_CellPhone: 123456789,
                    F_Enabled: true,
                    DaysRemaining: 12,
                    F_BeginTime: "2017-1-2",
                    F_IsReceiveEmail: false,
                    F_Remark: "没有备注"
                }
            ];
            res.send({Data: items});
        });
    }
};

module.exports = settingServer;