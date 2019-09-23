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

app.listen(8888);


console.log("localhost:8888");