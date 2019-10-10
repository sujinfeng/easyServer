var express = require('express');
var querystring = require('querystring');
const bodyParser = require('body-parser');
var path = require('path'); //系统路径模块
var fs = require('fs'); //文件模块
var app = express();

app.use(bodyParser.json());
const home = require('./router/home.js');
app.use('/home',home);

app.use('/static',express.static("./static"));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', function(request, response){
  // 输出 JSON 格式
   data = {
       'first_name':'roby',
       'last_name':'zhou'
   };
   console.log(data);
  //  response.end(JSON.stringify(data));
   response.json(data);
});

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
app.post('/post', urlencodedParser, function(request, response){
  // 输出 JSON 格式
    
   data = {
       'username':request.body.username,
       'userpwd':request.body.userpwd,
       'token':request.body.userpwd
   };
   console.log(data);
  //  response.end(JSON.stringify(data));
   response.json(data);
});


app.post('/test', urlencodedParser, function(request, response){
    // 输出 JSON 格式
    var file = path.join(__dirname, 'static/data.json'); //文件路径，__dirname为当前运行js文件的目录
    //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径

    //读取json文件
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            response.json('文件读取失败');
        } else {
            let {username,page,size} = request.body
            let arr = eval(data)[0].body;
            let dataObj = [];
            let len = (page*size)>arr.length?arr.length:(page*size)
            for(let i=((page-1)*size);i<len;i++){
                dataObj.push(arr[i]);
            }
            let datas = {
               'username':username,
               'data':dataObj,
               'total':arr.length
            };
            //  response.end(JSON.stringify(data));
            response.json(datas);
        }
    });
});
app.post('/citys', urlencodedParser, function(request, response){
     // 输出 JSON 格式
    var file = path.join(__dirname, 'static/citys.json'); //文件路径，__dirname为当前运行js文件的目录
    //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径

    //读取json文件
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            response.json('文件读取失败');
        } else {
            response.json(eval(data));
        }
    });
});

app.post('/test1', urlencodedParser, function(request, response){
  // 输出 JSON 格式
    
    data =[{"a": "2019-10-10 09:10", "b": "福田区国际创新中心1", "c": "B001灯杆", "d": "充电桩，大屏"}, {"a": "2019-10-10 09:10", "b": "福田区国际创新中心", "c": "B001灯杆", "d": "充电桩"}, {"a": "2019-10-10 09:10", "b": "福田区火车站", "c": "B001灯杆", "d": "充电桩"}, {"a": "2019-10-10 09:10", "b": "福田区国际创新中心", "c": "B001灯杆", "d": "充电桩，大屏"}, {"a": "2019-10-10 09:10", "b": "福田区国际创新中心12333", "c": "B001灯杆", "d": "充电桩"}, {"a": "2019-10-10 09:10", "b": "福田区国际创新中心001号", "c": "B001灯杆", "d": "充电桩，大屏，WIFI"}, {"a": "2019-10-10 09:10", "b": "福田区国际创新中心", "c": "B001灯杆", "d": "充电桩"}, {"a": "2019-10-10 09:10", "b": "福田区国际创新中心", "c": "B001灯杆", "d": "充电桩"}, {"a": "2019-10-10 09:10", "b": "福田区国际创新中心", "c": "B001灯杆", "d": "充电桩"}, {"a": "2019-10-10 09:10", "b": "福田区国际创新中心33333ss", "c": "B001灯杆", "d": "充电桩"}, {"a": "2019-10-10 09:10", "b": "福田区国际创新中心", "c": "B001灯杆", "d": "充电桩"}, {"a": "2019-10-10 09:10", "b": "福田区国际创新中心", "c": "B001灯杆", "d": "充电桩"}];
   console.log(data);
  //  response.end(JSON.stringify(data));
   response.json(data);
});

 app.post('/test2', urlencodedParser, function(request, response){
  // 输出 JSON 格式
    
    data = {"a": "5", "b": "6","c":"优"}, 
   console.log(data);
  //  response.end(JSON.stringify(data));
   response.json(data);
});

app.post('/test3', urlencodedParser, function(request, response){
  // 输出 JSON 格式
    
    data =[
    {
        "value": "三全鲜食（北新泾店）",
        "address": "长宁区新渔路144号"
    },
    {
        "value": "Hot honey 首尔炸鸡（仙霞路）",
        "address": "上海市长宁区淞虹路661号"
    },
    {
        "value": "新旺角茶餐厅",
        "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"
    },
    {
        "value": "泷千家(天山西路店)",
        "address": "天山西路438号"
    },
    {
        "value": "胖仙女纸杯蛋糕（上海凌空店）",
        "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
    },
    {
        "value": "贡茶",
        "address": "上海市长宁区金钟路633号"
    },
    {
        "value": "豪大大香鸡排超级奶爸",
        "address": "上海市嘉定区曹安公路曹安路1685号"
    },
    {
        "value": "茶芝兰（奶茶，手抓饼）",
        "address": "上海市普陀区同普路1435号"
    },
    {
        "value": "十二泷町",
        "address": "上海市北翟路1444弄81号B幢-107"
    },
    {
        "value": "星移浓缩咖啡",
        "address": "上海市嘉定区新郁路817号"
    },
    {
        "value": "阿姨奶茶/豪大大",
        "address": "嘉定区曹安路1611号"
    },
    {
        "value": "新麦甜四季甜品炸鸡",
        "address": "嘉定区曹安公路2383弄55号"
    },
    {
        "value": "Monica摩托主题咖啡店",
        "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
    }
];
   console.log(data);
  //  response.end(JSON.stringify(data));
   response.json(data);
});


app.listen(8888);


console.log("localhost:8888");