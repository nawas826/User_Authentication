const express = require('express');
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const Users = require('./models/users');
// const utils = require('./services/utils');
const bcrypt = require('bcrypt');

const mongoose = require("mongoose");
mongoose
	.connect("mongodb://localhost:27017/authentication", { useNewUrlParser: true })
	.then(() => {
		const app = express();
        app.use(cors());
        app.use(bodyParser.json());
        app.post('/signup', async (req, res) => {

            console.log("req.body => ", req.body)
            const newUser = new Users({ username: req.body.emailId,
                password: req.body.pswd
              });
            bcrypt.genSalt(10, function(err, salt) {
                if (err) res.status(500).send('Something went wrong');
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if (err) res.status(500).send('Something went wrong');
                    newUser.password = hash;
                    newUser.save().then((item)=> {
                        console.log('New user added successfully');
                        res.status(200).send('New user added successfully');
                    }).catch((err)=> {
                        console.log('Save to database failed',err)
                        if (err?.code === 11000) {
                            res.status(500).send('User already exist');
                        } else {
                            res.status(500).send('Internal server error');
                        }
                    });
                });
            });
            
          });

          app.post('/signin', async (req, res) => {

            console.log("req.body ----> ", req.body)
            Users.find({'username': req.body?.emailId},(err, data) => {
                console.log("data => ", data)
                if (err){
                    console.log("Error : ", err)
                    res.status(500).send(err);
                } else if (data.length === 0) {
                    res.status(400).send("User does not exist.");
                }else {
                    console.log("req.body?.password : ", req.body?.pswd)
                    console.log("data[0] => ", data[0])
                    bcrypt.compare(req.body?.pswd, data[0].password, function(err, result) {
                        if(result){
                            res.status(200).send("Login successfull");
                        } else {
                            res.status(401).send("Password is wrong");
                        }
                    });
                }
            })
            
          });
          
		app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
	}).catch((err)=> {
        console.log("Error : ", err)
    });

