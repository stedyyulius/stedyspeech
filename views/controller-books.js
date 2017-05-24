const ObjectId = require('mongodb').ObjectID;
const Books = require('../Models/books.js')

function add(req,res,next){
  Books.create({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    stock: req.body.stock
  },function(err,result){
    res.send(`${req.body.title} Created!`)
  })
}

function remove(req,res,next){
  Books.findOne({
    "_id": ObjectId(req.params.id)
  },function(err,result){
    res.send(`${result.title} Deleted!`)
    Books.remove({
      "_id": result._id
    })
  })  
}

function search(req,res,next){
  Books.find({
    "_id": ObjectId(req.params.id)
  },function(err,result){
    res.send(result)
  })
}

function read(req,res,next){
  Books.find({},function(err,result){
    res.send(result)
  })
}

function update(req,res,next){
  Books.findOne({
    "_id": ObjectId(req.params.id)
  },function(err,result){
    res.send(`${result.title} Updated!`)
    Books.updateOne({
      "_id": result._id
    },{
      $set:{
        isbn: req.params.isbn || result.isbn,
        title: req.params.title || result.title,
        author: req.params.author || result.author,
        category: req.params.category || result.category,
        stock: req.params.stock || result.stock
      }
    })
  })
}

module.exports = {
  add,remove,update,read,search
}