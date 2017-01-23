/**
 * Created by Administrator on 2017/1/23.
 */
var settingServer = {
    init: function (app) {
        app.get('/SysConfig/Role/GetRoleList', function (req, res) {
            var data = {
                F_Title: "总经理",
                RoleList: [
                    {
                        selected: true,
                        F_Level: 1,
                        F_Title: "销售员A"
                    },
                    {
                        selected: false,
                        F_Level: 1,
                        F_Title: "销售员B"
                    },
                    {
                        selected: false,
                        F_Level: 1,
                        F_Title: "销售员C"
                    },
                    {
                        selected: false,
                        F_Level: 1,
                        F_Title: "销售员D"
                    }
                ]
            };
            res.send({Data: data});
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