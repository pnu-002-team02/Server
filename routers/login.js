const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
// Load User Model
const User = require('../models/User');

var bodyParser = require('body-parser');



//welcome Page
router.get('/', (req, res) => res.send('login page')); //just string 
//router.get('/', (req, res) => res.render('Welcome')); //view 폴더의 welcom.ejs


// Login
router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email + ":" + password);
    let errors = [];

        User.findOne({email: email })
            .then(user => {
                if(!user){
                    res.send('That email is not exist'); //null for the error but error false..
                }
                //Match passwd
                bcrypt.compare(password, user.password, (err, isMatch) => {// user. < comming from database
                    // hash된 내용과 .. 입력된 값과 비교
                    if(err) throw err;
                    if(isMatch){
                       //null(for the error), user is user
                       res.send(0);//res.send(["1", user.visited]);
                    }else {
                        res.send(1); //'password not match'
                    }
                });
            

            })
            .catch(err => console.log(err));
        })
    

module.exports = router;