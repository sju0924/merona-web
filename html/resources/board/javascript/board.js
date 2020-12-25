//const MongoClient = require('mongodb').MongoClient;

var mongoose = require("mongoose");
const uri = "mongodb+srv://Jeon:1sAlqiuKv0VnJlt8@cluster0.ggx7e.mongodb.net/merona?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser: true ,useUnifiedTopology: true ,});
var db = mongoose.connection;
var currentindex = 0;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});

BoardSchema.methods.speak = function () {
	var greeting = this.name
	? "Meow name is " + this.name
	: "I don't have a name"
	console.log("speak() - " + greeting);
}

/* Model 선언 */


var BoardSchema = mongoose.Schema({
    Title: String,
    Author: String,
	Content: String,
	Index: String
});

	
/*.find(function(err, models){
	if(err) return console.error(err);
	console.log("find() - "+models);
});
*/

function submitf(){
	var BoardModel = mongoose.model("BoardModel", BoardSchema);
	/* Create Instance */
	var Ins = new BoardModel({ 
		Title: document.getElementById("title").value,
		Author: document.getElementById("author").value,
		Content: document.getElementById("content").value,
		Index : toString(currentindex)
		
	});
	console.log(Ins.Title); // "testIns"

	Ins.save(function(err, testIns){
		if(err) return console.error(err);
		testIns.speak();
	});

}
