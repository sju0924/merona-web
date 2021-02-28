const https = require('http');
//express 모듈 불러오기
var express = require('express');
var app = express();
// path 모듈 불러오기
const path = require('path');

//mongoDB 모듈 불러오기
var fs = require('fs');
var mongoose = require("mongoose");
const e = require('express');
const uri = "mongodb+srv://Jeon:1sAlqiuKv0VnJlt8@cluster0.ggx7e.mongodb.net/merona?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser: true ,useUnifiedTopology: true ,});
var db = mongoose.connection;

//body-parser
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true})); 
app.use(bodyparser.json());


//게시판 게시물의 형식
var BoardSchema = mongoose.Schema({
    Title: String,
    Author: String,
    Content: String,
    Index: String
});
//boardmodels collection을 연결
var BoardModel = mongoose.model("boardmodels", BoardSchema);
BoardModel.countDocuments(function(err,count){
    if(err) console.log(err)
    else{
        currentindex = count;
        console.log(currentindex);
    }
});

//메인 화면(index) 로 route
app.use(express.static(__dirname + '/resources'));
app.get('/',function(req,res){
    res.sendFile(__dirname + '/views/index.html');
})

// 게시판으로 route
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/board',function(req,res){
    
    BoardModel.find(function(err,data){ // 게시물을 MongoDB에서 가져오기
        if(err) res.send(err);
        //console.log(data);
        res.render("board.html",{"content":data}); // merona-web\views에 board.html이 있음.
    });
    
})

//게시물 상세 보기 페이지로 route
//idx는 게시물의 index 번호
app.get('/board/:idx',function(req,res){
    
    var Cidx = req.params.idx;
    console.log(Cidx);

    BoardModel.find({"Index":Cidx}, function(err,data){ // 게시물을 MongoDB에서 가져오기
        if(err) res.send(err);
        console.log(data);
        res.render("content.html",{"detail":data}); // merona-web\views에 board.html이 있음.
    });
    
    
    
})

//게시판-글쓰기로 route
app.get('/write',function(req,res){
    res.sendFile(__dirname + '/views/write.html');
})

//게시판-제출로 write. 사용자가 직접 사용하는 페이지는 아님.
app.post('/submit',function(req,res){
    console.log("현재 index = "+currentindex)
    //Query 저장
    var gettitle = req.body.title;
    var getauthor = req.body.author;
    var getcontent = req.body.content;
    //console.log(req);


    //데이터 생성
    var Ins = new BoardModel({ 
		Title: gettitle,
		Author: getauthor,
		Content: getcontent,
		Index : currentindex		
    });
   console.log(Ins.Title); 
    

    //MongoDB에 데이터 저장
	Ins.save(function(err, testIns){
		if(err) return console.error(err);        
    });
    
    //다음 게시글 번호
    currentindex = currentindex+1;
    
    // 글쓰기 submit시 redirect되어서 MongoDB에 저장 후 게시판으로 redirect
    res.redirect('/board'); 
})

// 리액트 정적 파일 제공
app.use(express.static(__dirname +'/todolist_client/build'));
//to-do 로 route
app.get('/list',function(req,res){
    res.sendFile(__dirname+'/todolist_client/build/index.html');
})

app.get('/api/data',function(req,res){
    res.json({ greeting: 'Hello World' });
})


//포트 5000에서 앱 실행
app.listen(process.env.PORT || 5000,function(){
    console.log("Server has created");   
})






