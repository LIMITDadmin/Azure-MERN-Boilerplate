
var express = require('express');
var router = express.Router();
const Hero = require('./HeroModel');
const bodyParser = require("body-parser")
const ObjectID = require('mongodb').ObjectID;



var MongoClient = require('mongodb').MongoClient;
const ReadPreference = require('mongodb').ReadPreference;

//var url = "mongodb+srv://<username>:<password>@<cluster>-vgz77.azure.mongodb.net/test?retryWrites=true&w=majority";
var url = "mongodb://cosmo-limitd:1ucTvssvrmgTZk4Y2XlTazV6gqLzg8XIEgEmEemaGq0xgBz0f7TjdGC5RfB5jpC24gpbA8xlDsxy7GP6Shf4Fg==@cosmo-limitd.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmo-limitd@"

router.use(bodyParser.urlencoded({ extended: true }));
router.get('/', (req, res, next) => {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("admin");	
		dbo.collection("heros").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log('Mongo data coming in hot')
			console.log(result);
			res.json(result)
			db.close();
		});
	}); 
});


router.put('/hero', (req, res) => { // create
	const { id, type, date, desc, desc_long } = req.body;
	console.log("bekomme in PUT "+req.body)
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("admin");	
		try{
			var result = dbo.collection("heros").insertOne(
				{ type: type, date: date, desc:desc, desc_long: desc_long },
				(err,result)=>{
					console.log("received in PUT: "+result)
					res.json(result);
					db.close();
				}
			); 
			

		} catch (e) {
			res.status(500).send(e);
		 }
	}); 

});

router.post('/hero', (req, res) => {//update
	const { _id, type, date, desc, desc_long }  = req.body;
	console.log("-------------- CALLED UPDATE ----"+_id+" "+desc+" date:"+date);
	var objId = new ObjectID(_id);
	var query = { _id: objId}
	var newVals = { $set: {desc:desc, type:type, date:date} };
	console.log("trying to update with query ");
	console.log(query);
	console.log(newVals);
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("admin");	
		dbo.collection("heros").updateOne(
			query,
			newVals
			,function(err, result) {
			if (err) throw err;
			console.log('Update finished')
			console.log(result["result"]);
			res.json({ops:[req.body]}) // to be inline with create return json
			db.close();
		});
	}); 
	
});

router.delete('/hero/:id', (req, res) => {//destroy
	const { id } = req.params;
	console.log("deleting ID: "+id)
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("admin");	
		try{
			dbo.collection("heros").deleteOne( { "_id" : id } );
		} catch (e) {
			res.status(500).send(e);
		}
	});
});

module.exports = router;