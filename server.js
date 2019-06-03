var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const mongoose = require('mongoose')

const morgan = require("morgan"); //log 찍는




// monGo config
const db = 'mongodb+srv://dbuser:votmdnjem@cluster0-al5vl.mongodb.net/test?retryWrites=true'/*atlas 에서 어플리키에션 연결 uri*/
//Connect to Mongoose
mongoose.connect(db, { useNewUrlParser: true}) /*키값을 첫번째 인자로*/
    .then(()=> console.log('MongoDB connected'))
    .catch(err => console.log(err));

// to json..
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
    
    

app.get('/', (req, res) => { 
    res.send('Hello World'); 
});

app.get('/hi', (req, res) => { 
    res.send('hi World'); 
});

// Bodyparser (미들웨어)
//app.use(express.urlencoded({ extened: false}))



//Routers
app.use('/login', require('./routers/login'));
app.use('/register', require('./routers/register'));

app.use("/products", require("./routers/products"));
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads')); //Make this folder Available to everyone
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  
//app.use('/photos', require('./routers/photos'));


/*
Image tutorial
*/
app.use(morgan("dev")); //로그를 찍는 모듈
app.use('/uploads', express.static('uploads')); //Make this folder Available to everyone
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
/*
Image tutorial
*/



var server = app.listen(5000, function(){
    console.log("Express server has started on port 5000")
})