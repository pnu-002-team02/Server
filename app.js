const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const app = express();

//MongoDB config
const db = require('./config/keys').MongoURI;/*atlas 에서 어플리키에션 연결 uri*/

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true}) /*키값을 첫번째 인자로*/
    .then(()=> console.log('MongoDB connected'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
/** 
 * 데이터를 form으로 받기 때문에 we need to add in our body parser middleware which
 * now is part of Express
*/
// Bodyparser
app.use(express.urlencoded({ extened: false}))

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server started on port '+ PORT));




