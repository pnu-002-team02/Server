const express = require('express');
const router = express.Router();


//router.get('/', (req, res) => res.send('Welcome')); just string 
router.get('/', (req, res) => res.render('Welcome')); //view 폴더의 welcom.ejs


module.exports = router;