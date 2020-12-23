const https = require('http');
var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static(__dirname + '/html/resources'));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/html/index.html');
})

app.listen(process.env.PORT || 5000,function(){
    console.log("Server has created");   
})

