/**
 * Created by Administrator on 2016/4/25.
 */
//use express
var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser');

//serve static index.html as default
app.use(express.static(__dirname + '/app/'));
app.use(bodyParser.json());

//bind and listen for connections on the given host and port
app.listen(9003, function () {
    console.log('Server listening on', 9003)
});

/*--------------------- REST API ---------------------*/
/*---------------------  MainSheet ---------------------*/
app.get('/MainSheet/SummaryCount', function (req, res) {
    var data = {
        VCount: 5,
        SCount: 10,
        RCount: 4,
        LCount: 7,
        HCount: 8,
        MCount: 9,
        ZCount: 20,
        AllCount: 63
    };
    res.send({Code: 0, Count: 1, Data: data});
});

app.get('/MainSheet/GarageList', function (req, res) {
    var data = [{
        floorCount: 2, undergroundCount: 4, title: "一期车位"
    }];
    res.send({Code: 0, Count: 1, Items: data});
});

app.get('/MainSheet/BuildingList', function (req, res) {
    var data = [{title: "项目一期", buildingList: [{shopCount: 2, houseCount: 4, title: "一号楼"}]}];
    res.send({Code: 0, Count: 1, Items: data});
});
/*---------------------  BuildingGarageSettingCtrl ---------------------*/
app.get('/BuildingGarageSetting/GarageList', function (req, res) {
    var data = [{
        floorCount: 2, undergroundCount: 4, title: "一期车位"
    }];
    res.send({Code: 0, Count: 1, Items: data});
});

app.get('/BuildingGarageSetting/BuildingList', function (req, res) {
    var data = [{title: "项目一期", buildingList: [{shopCount: 2, houseCount: 4, title: "一号楼"}]}];
    res.send({Code: 0, Count: 1, Items: data});
});
/*---------------------  BuildingManager ---------------------*/
app.get('/BuildingManager/GetList', function (req, res) {
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
    res.send({Code: 0, Count: 1, Items: data});
});


app.get('/BuildingManagerApply/GetList', function (req, res) {
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
    res.send({Code: 0, Count: 1, Items: data});
});

/*---------------------  BuildingManagerLog ---------------------*/
app.post('/BuildingManagerLog/GetList', function (req, res) {
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
    data.Items = Items;
    data.BuildingName = "双湖星城";
    res.send({Code: 0, Count: 1, Data: data});
});

/*---------------------  buy apply ---------------------*/
app.get('/BuyApply/GetList', function (req, res) {
    var data = [{
        id: 1,
        AddTime: "2016-6-20",
        AuditStatus: "pass",
        ServiceBuyMonth: 12,
        SoldServiceMonth: 5,
        SurplusServiceMonth: 3,
        AuditRemark: "ok"
    },
        {
            id: 2,
            AddTime: "2016-2-12",
            AuditStatus: "pass",
            ServiceBuyMonth: 24,
            SoldServiceMonth: 9,
            SurplusServiceMonth: 2,
            AuditRemark: "no"
        }];
    res.send({Code: 0, Count: 1, Items: data});
});

app.post('/BuyApply/Create', function (req, res) {
    var data = {
        AgentName: "江苏省南京市销冠代理商广告策划有限公司",
        Regierungsbezirk: "江苏省南京市玄武区",
        BuildingContactName: "宋慧乔",
        BuildingContactPhone: "13455829357",
        DaysRemaining: 1
    };
    res.send({Code: 0, Count: 1, Data: data});
});
/*--------------------- for setting ---------------------*/
app.get('/Setting/AdminList', function (req, res) {
    var data = [{
        Kid: 1,
        F_RealName: "苏敏",
        F_CellPhone: "18668223033",
        F_Enabled: true,
        F_LeftDay: 10,
        F_BeginTime: "2014-04-03",
        F_IsReceiveEmail: true,
        F_Remark: "test"
    },
        {
            Kid: 2,
            F_RealName: "王景成",
            F_CellPhone: "13615718501",
            F_Enabled: false,
            F_LeftDay: 3,
            F_BeginTime: "2014-04-03",
            F_IsReceiveEmail: false,
            F_Remark: "test"
        }];
    res.send({Code: 0, Count: 1, Items: data});
});

app.get('/Admin/GetAdminLogByKid', function (req, res) {
    var data = [{kid: 1, UpdateBuilding: "ConfigBuilding1", F_Remark: "修改楼盘配置1", F_AddTime: "2016-05-17 11:12:55"},
        {kid: 2, UpdateBuilding: "ConfigBuilding2", F_Remark: "修改楼盘配置2", F_AddTime: "2016-05-16 11:12:55"},
        {kid: 3, UpdateBuilding: "ConfigBuilding3", F_Remark: "修改楼盘配置3", F_AddTime: "2016-05-15 11:12:55"}];
    res.send({Code: 0, Count: 1, Items: data});
});

/*--------------------- for test ---------------------*/
app.get('/Code/3', function (req, res) {
    console.log("/Code/3");
    res.send({Code: 3, Message: "it is code 3"});
});

app.get('/Code/302', function (req, res) {
    console.log("/Code/302");
    res.send({Code: 302, Message: "http://baidu.com"});
});

app.get('/Code/4000', function (req, res) {
    console.log("/Code/4000");
    res.send({Code: 4000});
});

app.get('/Code/4002', function (req, res) {
    console.log("/Code/4002");
    res.send({Code: 4002});
});

app.get('/Code/error', function (req, res) {
    console.log("/Code/error");
    res.send({Code: 33, Message: "it is error code"});
});