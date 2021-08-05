
var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://<username>:<password>@<cluster>-vgz77.azure.mongodb.net/test?retryWrites=true&w=majority";
var url = "mongodb://cosmo-limitd:1ucTvssvrmgTZk4Y2XlTazV6gqLzg8XIEgEmEemaGq0xgBz0f7TjdGC5RfB5jpC24gpbA8xlDsxy7GP6Shf4Fg==@cosmo-limitd.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmo-limitd@"

router.get('/', (req, res, next) => {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("admin");
		dbo.collection("collection1").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log('Mongo data coming in hot')
    		console.log(result);
    		res.json(result)
    		db.close();
    	});
	}); 
});

module.exports = router;