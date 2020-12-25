//const MongoClient = require('mongodb').MongoClient;
var mongoose = require("mongoose");
const uri = "mongodb+srv://Jeon:1sAlqiuKv0VnJlt8@cluster0.ggx7e.mongodb.net/merona?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser: true ,useUnifiedTopology: true ,});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});

//Schema 선언
var testSchema = mongoose.Schema({
    Title: String,
    Author: String,
    Content: String
});


/* Model 선언 */
var TestModel = mongoose.model("TestModel", testSchema);

/* Create Instance */
var testIns = new TestModel({ 
    Title: "test",
    Author: "jeon",
    Content: "냉무"
});
console.log(testIns.Title); // "testIns"


testIns.save(function(err, testIns){
	if(err) return console.error(err);
	testIns.speak();
});

TestModel.find(function(err, models){
	if(err) return console.error(err);
	console.log("find() - "+models);
});

TestModel.find({name:/^testIns/});