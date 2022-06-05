import {Service} from 'wrcom'
const User = require('../../server/user/schema');
const ObjectID = require('mongodb').ObjectID
// const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
// const nJwt = require('njwt');
const fs = require('fs');
const multer = require('multer')
const { uploadsFolder } = require('../../server/user/upload');


module.exports = async function(waw: any) {

    const router = waw.router('/api/user');

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/wawReact";

    let dbo : any
    MongoClient.connect(url, function(err:any, db:any) {
    if (err) throw err;
    dbo = db.db("wawReact");
    //   db.connect(url, { useUnifiedTopology: true })
    
    });
    router.post("/status", function(req:any, res:any) {
        User.findOne({
            $or: [{
                reg_email: req.body.email.toLowerCase()
            },{
                email: req.body.email.toLowerCase()
            }]
        }, function(err:any, user:any) {
            var json = {};
            json.email = !!user;
            if(user&&req.body.password){
                json.pass = user.validPassword(req.body.password);
            }
            res.json(json);
        });
    });
    
    router.get('/get/users', async function(req:any, res:any){
        dbo.collection("users").find({}).toArray(function(err:any, result:any) {
            if (err) throw err;
            console.log(result)
            res.json(result)
        });
    })

    router.post('/set/admin/:id', function(req:any, res:any){
        const id = req.params.id
        User.findOne({_id: ObjectID(id)}, async function(err:any, res_user:any){
            
        await dbo.collection("users").updateOne({_id: ObjectID(id)}, {$set:{is:{admin: !res_user.is.admin}}})
            res_user.is.admin = !res_user.is.admin
            res.json(res_user)
        })
        
    })
    
    router.post('/bio/:id', async function(req:any, res:any){
        let id = req.params.id
        console.log(req.data)
        if(req.body.name){
        await dbo.collection("users").updateOne({_id: ObjectID(id)}, {$set: {name: req.body.name}}, function(err:any, result:any){
            console.log(req.body)
        });
    }
    else if(req.body.phone){
        await dbo.collection("users").updateOne({_id: ObjectID(id)}, {$set: {phone: req.body.phone}}, function(err:any, result:any){
            console.log(req.body)
        });
    }
    else if (req.body.bio){
        await dbo.collection("users").updateOne({_id: ObjectID(id)}, {$set: {bio: req.body.bio}}, function(err:any, result:any){
        });
     }
    })

    router.delete('/delete/:id', async function(req:any, res:any){
        const id = req.params.id
        try {await dbo.collection("users").deleteOne({_id:ObjectID(id)});
        res.json({success: true})
    }
        catch(e){
            throw e;
        }	
    })
    
    var mongo = require('mongodb');
		var Grid = require("gridfs-stream");
		Grid.mongo = mongo;
		const express = require('express');
		const uploads = require('./upload');
		var upload = multer({dest: "./uploads"});
		var multipartUpload = multer({storage: multer.diskStorage({
			destination: function (req:any, file:any, callback:any) { callback(null, './uploads');},
			filename: function (req:any, file:any, callback:any) { callback(null, file.fieldname + '-' + Date.now() + file.originalname);}})
		}).single('photo');


		router.post('/uploads/:id', multipartUpload, (req:any, res:any, next:any) => {
			let id = req.params.id
			console.log('Success', req.file);
			dbo.collection('users').updateOne({_id: ObjectID(id)}, {$set: {image: 'http://localhost:3000/uploads/' + req.file.filename}})
		});
		router.get('/uploads/:filename', function(req:any, res:any){
			const filename = req.params.filename
			// res.sendFile(`./uploads/${filename}`)
			res.json({success: 'zalupa'})
		})
		router.post('/get/image/:id', async function(req:any, res:any){
			let id = req.params.id
			await dbo.collection('users').findOne({_id: ObjectID(id)}, function(err:any, result:any){
				if (err) throw err;
				console.log(result.image)
				res.json(result)
			})

		})
}

class UserService extends Service {
    public rand = Math.floor(Math.random() * 5000);
    public roles = ['admin']
    public users: any = [];
    public _users: any = {};
    public user: any = {data: {}, is: {}};

    constructor() {
        super();
    }
}

export default UserService