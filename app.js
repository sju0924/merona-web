const https = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var mongoose = require("mongoose");
const uri = "mongodb+srv://Jeon:1sAlqiuKv0VnJlt8@cluster0.ggx7e.mongodb.net/merona?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser: true ,useUnifiedTopology: true ,});
var db = mongoose.connection;
var currentindex = 0;

var BoardSchema = mongoose.Schema({
    Title: String,
    Author: String,
    Content: String,
    Index: String
});



app.use(express.static(__dirname + '/html/resources'));
app.get('/',function(req,res){
    res.sendFile(__dirname + '/html/index.html');
})


app.use('/board',express.static(__dirname + '/html/resources'));
app.get('/board',function(req,res){
    res.sendFile(__dirname + '/html/board.html');
})

app.get('/submit',function(req,res){
    var gettitle = req.query.title;
    var getauthor = req.query.author;
    var getcontent = req.query.content;
    console.log(req);

    var BoardModel = mongoose.model("BoardModel", BoardSchema);
    var Ins = new BoardModel({ 
		Title: gettitle,
		Author: getauthor,
		Content: getcontent,
		Index : toString(currentindex)		
    });
   console.log(Ins.Title); // "testIns"
    

/*
	Ins.save(function(err, testIns){
		if(err) return console.error(err);
        
    });
    
    currentindex = currentindex+1;
    */
})


app.listen(process.env.PORT || 5000,function(){
    console.log("Server has created");   
})


