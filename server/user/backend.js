const User = require('../../server/user/schema');
const ObjectID = require('mongodb').ObjectID
const multer = require('multer')

module.exports = async function(waw) {

		const router = waw.router('/api/users');
		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/wawReact";
		let dbo 
	
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			// db.connect(url, { useUnifiedTopology: true })
			dbo = db.db("wawReact");
		});
		
		router.get('/get/users', async function(req, res){
		   await dbo.collection("users").find({}).toArray(function(err, result) {
				if (err) throw err;
				console.log(result)
				res.json(result)
			});
		})

		router.get('/get/users/:id', async function(req, res){
			const id = req.params.id;
			console.log(req)
			await User.findOne({_id: ObjectID(id)}, async function(err, res_user){
				res.json(res_user)
			})
		 })
			
		
	
		router.post('/set/admin/:id', function(req, res){
			const id = req.params.id
			User.findOne({_id: ObjectID(id)}, async function(err, res_user){
			await dbo.collection("users").updateOne({_id: ObjectID(id)}, {$set:{is:{admin: !res_user.is.admin}}})
				res_user.is.admin = !res_user.is.admin
				res.json(res_user)
			})
		})

			
		router.delete('/delete/:id', async function(req, res){
			const id = req.params.id
			try {await User.deleteOne({_id: ObjectID(id)}, async function(request ,result){
				res.json({success: true})
				// console.log(res)
			});
			
			 }
			catch(e){
				throw e;
			}	
		})
		
		router.post('/bio/:id', async function(req, res){
			let id = req.params.id
			console.log(req.data)
			if(req.body.name){
			await dbo.collection("users").updateOne({_id: ObjectID(id)}, {$set: {name: req.body.name}}, function(err, result){
				console.log(req.body)
			});
		}
		else if(req.body.phone){
			await dbo.collection("users").updateOne({_id: ObjectID(id)}, {$set: {phone: req.body.phone}}, function(err, result){
				console.log(req.body)
			});
		}
		else if (req.body.bio){
			await dbo.collection("users").updateOne({_id: ObjectID(id)}, {$set: {bio: req.body.bio}}, function(err, result){
			});
		  }
		})
		
		var mongo = require('mongodb');
			var Grid = require("gridfs-stream");
			Grid.mongo = mongo;
			const express = require('express');
			const uploads = require('./upload');
			var upload = multer({dest: "./uploads"});
			var multipartUpload = multer({storage: multer.diskStorage({
				destination: function (req, file, callback) { callback(null, './uploads');},
				filename: function (req, file, callback) { callback(null, file.fieldname + '-' + Date.now() + file.originalname);}})
			}).single('photo');
	

		router.use(express.static('uploads'))
	
		router.post('/uploads/:id', multipartUpload, (req, res, next) => {
			let id = req.params.id
			console.log('Success', req.file);
			dbo.collection('users').updateOne({_id: ObjectID(id)}, {$set: {image: 'http://localhost:3000/uploads/' + req.file.filename}})
		});
	
		router.get('/uploads/:filename', function(req, res){
			const filename = req.params.filename
			// res.sendFile(`./uploads/${filename}`)
			res.json({success: 'good'})
		})
	
		router.post('/get/image/:id', async function(req, res){
				let id = req.params.id
				await dbo.collection('users').findOne({_id: ObjectID(id)}, function(err, result){
					if (err) throw err;
					console.log(result.image)
					res.json(result)
				})
		})
};