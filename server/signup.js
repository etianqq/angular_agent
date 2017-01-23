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
            var items = [
                {
                    F_Name: "中国",
                    F_PhoneCode: 86
                }
            ];
            res.send({Data: items});
        });

        app.get('/ProvinceCityArea/GetProvinceCityAreaList', function (req, res) {
            var kid = req.query.kid;
            switch (kid) {
                case "0":
                    res.send({Data: [{F_Name: "浙江", Kid: 1}]});
                    break;
                case "1":
                    res.send({Data: [{F_Name: "杭州市", Kid: 2}]});
                    break;
                case "2":
                    res.send({Data: [{F_Name: "上城区", Kid: 3}]});
                    break;
                default :
                    res.send({Data: [{F_Name: "北京", Kid: 0}]});
            }

        });

    }
};

module.exports = sigupServer;