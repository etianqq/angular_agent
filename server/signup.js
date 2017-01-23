/**
 * Created by Administrator on 2017/1/23.
 */
var sigupServer = {
    init: function (app) {
        app.get('/Agent/Register', function (req, res) {
            res.send({Code: 0, Message: "register successfully!"});
        });

        app.get('/Notify/Generate', function (req, res) {
            res.send({Code: 0, Message: "generate PhoneCode successfully!"});
        });

        app.get('/SysConfig/Area/GetCountryList', function (req, res) {
            res.send({Data: [{F_Name: "中国", F_PhoneCode: 86}]});
        });

        app.get('/ProvinceCityArea/GetProvinceCityAreaList', function (req, res) {
            var kid = req.params.kid;
            console.log("req.params.kid:"+req.params.kid);
            switch (kid) {
                case 0:
                    res.send({Data: [{F_Name: "浙江", Kid: 1}]});
                    break;
                case 1:
                    res.send({Data: [{F_Name: "杭州市", Kid: 2}]});
                    break;
                case 2:
                    res.send({Data: [{F_Name: "上城区", Kid: 3}]});
                    break;
            }

        });

    }
};

module.exports = sigupServer;