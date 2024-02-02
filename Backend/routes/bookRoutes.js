const express = require('express');
const {registerBooks,getAllBooks}=require('../controllers/bookController');
const router = express.Router();


router.route('/books').post(registerBooks);
router.route('/books').get(getAllBooks);

module.exports = router;