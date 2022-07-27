const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn)

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;


