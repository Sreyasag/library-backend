const express = require("express");
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController')

const router = express.Router();

router
    .route("/")
    .get(userController.protect, bookController.getAllBooks)
    .post(userController.protect, bookController.addBook);
router
    .route('/:id')
    .get(userController.protect, bookController.getBookById)
    .patch(userController.protect, bookController.updateBook)
    .delete(userController.protect, bookController.deleteBook);

module.exports = router;