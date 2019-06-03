const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
// Load User Model
const User = require('../models/User');

//Register Page  
router.get('/', (req, res) => res.send('register page'));


//Register Handle "등록 버튼의 기능"
router.post('/', (req, res) => {
    const { name, email, password, password2 }= req.body;
    /*
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2; */
    let errors = [];
    
    // Check required fields
    if(!name || !email || !password || !password2) {
        errors.push(1);//'Please fill in all fields'
    }
    //Check Password
    if(password !== password2) {
        errors.push(2);//'Passwords Do not match'
    }
    //Check pass length
    if(password.length <3){
        errors.push(3)//'Password must be longer than 3'
    }
    if(errors.length >0){
        res.send(errors);
    } 
    else {
           /*
    console.log(req.body)  //이 body는 rester.ejs 에서 작성된 내용이 서버 콘솔에 표시
         양식이 적당혀res.send('pass')*/
        User.findOne({ email: email}) //User collection 에서 찾기
        .then(user => { 
            if(user){
                //User Exists
                errors.push(4)//'already exists'
                res.send(errors);
            }
            else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //Generate Hash Password
                bcrypt.genSalt(10,  (err, salt) => //salt를 만들고 콜백 함수에 넣는다.
                 bcrypt.hash(newUser.password, salt, (err, hash)=>{ //salt와 passwd로 hash를 만들고 콜백함수에 넣나봄
                     if(err) throw err;
                     // Set password to hashed
                     newUser.password = hash;
                     // Save user
                     newUser.save() //newUser가 문서객체라서 save()매소드가 있는듯
                     .then(user => {
                         res.send(0);// 유저 저장 완료 
                         console.log(user.name + "saved");
                     })
                     .catch(err => console.log(err));
                }))
            }
        });
    } 
})

//{ $addToSet: { 필드1: 값, 필드2: 값, ... } }


router.put('/visited', (req, res) => {  //put dms update
    var email = req.body.email;
    var add = req.body.add;
    User.findOneAndUpdate({ email: email}, { $addToSet: { visited: add }}, { multi: true, new: true } )
    .then( res.send('done'))
    .catch(err => console.log(err));
})


//users visited list 
router.get('/:email', (req, res) => {
    var email = req.params.email;
    User.findOne({email:email})
    .then(user => {
        if(!user){
            res.send("0");//user not found
        }else{
           res.send(user.visited);
        }
    })
});


module.exports = router;
