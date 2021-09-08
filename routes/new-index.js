
var express = require('express');
var router = express.Router();
const Hero = require('./HeroModel');
const bodyParser = require("body-parser")



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
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("admin");	
		try{
			dbo.collection("heros").insertOne(
				{ type: type, date: date, desc: desc, desc_long: desc_long }
			);
		} catch (e) {
			res.status(500).send(e);
		 }
	}); 

});

router.post('/hero', (req, res) => {//update
	const { id, type, date, desc, desc_long }  = req.body;

	Hero.findOne({ id })
		.then(hero => {
		hero.type = type;
		hero.date = date;
		hero.desc = desc;
		hero.desc_long = desc_long;
		hero.save().then(res.json(hero));
		})
		.catch(err => {
		res.status(500).send(err);
		});
});

router.delete('/hero/:id', (req, res) => {//destroy
	const { id } = req.params;

	Hero.findOneAndRemove({ id })
		.then(hero => {
		res.json(hero);
		})
		.catch(err => {
		res.status(500).send(err);
		});
});


module.exports = router;