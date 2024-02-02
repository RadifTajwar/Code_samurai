const express = require('express');
const { createBook, updateBook, getBook, getAllBooks, getSearchBooks } = require('../controllers/bookController');
const router = express.Router();

router.route('/books').post(createBook);
router.route('/books/:id').put(updateBook);
router.route('/books/:id').get(getBook);
router.route('/books').get(getAllBooks);
// router.route('/books').get(getSearchBooks)

module.exports = router;