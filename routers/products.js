const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');

const storage = multer.diskStorage({ //detail of storing file
  destination: function(req, file, cb) {  //where the incoming file should be stored
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
    //cb(null, Date.now() + file.originalname);
    //cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); //error-> null store -> true
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage, //위에서 정의한 (위치 이름 지정)
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter //위에 정의된 필터
});

const Product = require("../models/product");


router.get("/", (req, res, next) => {
  Product.find()
    .select("name info gps _id productImage")
    .exec()
    .then(docs => {
      const response = {
        //count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,            
            info: doc.info,
            gps: doc.gps,
            productImage: doc.productImage,   //실제 서버 주소로 변경 필
            _id: doc._id,
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.post("/", upload.single('productImage'), (req, res, next) => {
  //한파일만 전송가능 
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,   
    info: req.body.info,
    gps: req.body.gps,       
    productImage:"http://localhost:5000/uploads/" + req.body.name+".PNG"  //파일을 서버에 전송할때 주소저장.실제 서버 주소로 수정 필요
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
            name: result.name, 
            info: result.info,
            gps: result.gps,             
            _id: result._id/*
            request: {
                type: 'GET',
                url: "http://localhost:5000/uploads/" + result.name
            }*/
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/findOne", (req, res, next) => {
  const tName = req.body.tName;
  Product.findOne({name:tName})
    .select('name info gps _id productImage')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc//,
           // request: { type: 'GET', url: 'http://localhost:5000/products' }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/search", (req, res, next) => {
  const tName = req.body.tName;
  console.log(tName);
  
  Product.find()
    .select("name info gps _id productImage")
    .exec()
    .then(docs => {
      const response = {
        products: docs.map(doc => {          
          //if(doc.name == id) //
          if(doc.name.search(tName)>-1)
          {
            return {
              name: doc.name,            
              info: doc.info,
              gps: doc.gps,
              productImage: doc.productImage,
              _id: doc._id/*
              request: {
                type: "GET",
                url: "http://localhost:5000/uploads/" + doc.name
              }*/
          }
          };
        })
      };
      
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
