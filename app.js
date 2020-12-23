const https = require('http');
var express = require('express');

const server = https.createServer((request,response) => { 
    response.writeHead(200, { 'Content-Type' : 'text/html'} );
    if(request.url === '/'){
        response.write("Hello, it's Merona web development project");
    }
    else{
        var resString = String(request.url);
        response.write(resString);
    }
    response.end();
    console.log(request); 
}); 

server.listen(process.env.PORT || 5000)

