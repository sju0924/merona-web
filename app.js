const https = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var mongoose = require("mongoose");
const uri = "mongodb+srv://Jeon:1sAlqiuKv0VnJlt8@cluster0.ggx7e.mongodb.net/merona?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser: true ,useUnifiedTopology: true ,});

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

app.get('/board',function(req,res){
    res.sendFile(__dirname + '/html/board.html');
})


app.listen(process.env.PORT || 5000,function(){
    console.log("Server has created");   
})


