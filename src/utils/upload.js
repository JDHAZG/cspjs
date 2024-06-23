// https://www.jianshu.com/p/93151c777caf
var fs = require('fs');
var _ = require('lodash');
var express = require('express');
var multer  = require('multer');
const util = require("util");
const readFile = util.promisify(fs.readFile);
// const { fileToBuf } = require('./fileTobuff');
const { excelParse } = require('./parse');
const { seatArrangement } = require('./seatArrangement');

var app = express();

var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

var uploadFolder = './upload/';
var examName=''
var buff={}
var json=[]

createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname + '-' + Date.now());  
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

// 单图上传
app.post('/upload', upload.single('logo'), function(req, res, next){
    var file = req.file;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    console.log(file)
    //file格式转化为ArrayBuff格式
    readFile(file.path).then((res) => { buff=Buffer.from(res).buffer;console.log(buff) });
    // buff=fileToBuf(file)
    // const json=excelParse(buff)
    // console.log(buff)
    res.send({ret_code: '0'});
});

//考试名称上传
app.get('/examName', function(req, res, next){
    examName=req.query.name
    console.log(examName)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.send({ret_code: '0'});
});
app.get('/parse',function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    console.log('test',buff)
    // json=excelParse(buff)
    try {
        json=excelParse(buff)
    } catch (error) {
        console.log(error);
    }
    // console.log(json.length,json)
    // console.log(json.length)
    res.send({'examineeNum':json.length})
})

app.get('/seatArrangement',function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // json=excelParse(buff)
    // console.log(json)
    const {prefix,placeholder,examineeNum,seatsNum}=req.query
    const groupInfo=seatArrangement(prefix,placeholder,seatsNum,json)
    const newStuInfo=_.flattenDeep(Object.values(groupInfo))
    res.send({'newStuInfo':newStuInfo})
})

app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(9000);