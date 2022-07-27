const Book = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
try {
  const books = await Book.find();

  res.status(200).json({ 
    status: "success",
    data: books
  });
} catch (error) {
  res.status(404).json({
    status:'fail',
    message: error.message
  })
}
};

exports.getBookById = async (req,res) =>{
  try {
    const id = req.params.id;
    const book = await Book.findById(id);

    res.status(200).json({
      status: 'success',
      data: book
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    })
  }
}

exports.addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    //or use
    //const newBook = await Book.create(req.body);
    res.status(201).json({
      status: "success",
      data: { book: newBook },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateBook = async (req,res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status:'success',
      data: updatedBook
    })
  } catch (error) {
    res.status(404).json({
      status:'fail',
      message: error.message
    })
  }
}

exports.deleteBook = async (req,res) => {
  try {
    await Book.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status:'success',
      data:null
    })
  } catch (error) {
    res.status(404).json({
      status:'fail',
      message: error.message
    })
  }
}