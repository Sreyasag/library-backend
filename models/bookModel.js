const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        unique:true,
    },
    author: {
        type:String,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    year:{
        type:Number,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    pages:{
        type:Number,
        required: true,
    },
    addedOn:{
        type:Date,
        required: true,
        default:Date.now() 
    },
    addedBy:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;



