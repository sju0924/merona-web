const https = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var mongoose = require("mongoose");
const uri = "mongodb+srv://Jeon:1sAlqiuKv0VnJlt8@cluster0.ggx7e.mongodb.net/merona?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser: true ,useUnifiedTopology: true ,});
var db = mongoose.connection;
var currentindex = 0;

//게시판 게시물의 형식
var BoardSchema = mongoose.Schema({
    Title: String,
    Author: String,
    Content: String,
    Index: String
});
//boardmodels collection을 연결
var BoardModel = mongoose.model("boardmodels", BoardSchema);

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
        console.log(data);
        res.render("board.html",{"content":data}); // merona-web\views에 board.html이 있음.
    });
    
  //res.send("12345");
    
})

//게시판-글쓰기로 route
app.get('/board/write',function(req,res){
    res.sendFile(__dirname + '/views/write.html');
})

//게시판-제출로 write. 사용자가 직접 사용하는 페이지는 아님.
app.get('/submit',function(req,res){
    //Query 저장
    var gettitle = req.query.title;
    var getauthor = req.query.author;
    var getcontent = req.query.content;
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


//to-do 로 route
app.get('/list',function(req,res){
    res.sendFile(__dirname + '/views/list.html');
})

//포트 5000에서 앱 실행
app.listen(process.env.PORT || 5000,function(){
    console.log("Server has created");   
})


