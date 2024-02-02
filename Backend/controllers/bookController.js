const Books =require('../models/bookModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const errorHandler = require('../utils/errorHandler');


exports.registerBooks = catchAsyncError(async (req, res, next) => {
    const { id, title, author, genre, price } = req.body;

    // Create a new book with the provided data
    const newBook = await Books.create({
        id, title, author, genre, price
    });

    // Send only the desired properties in the response
    const bookResponse = {
        id: newBook.id,
        title: newBook.title,
        author: newBook.author,
        genre: newBook.genre,
        price: newBook.price,
        _id: newBook._id,
        __v: newBook.__v
    };

    console.log('Book Registered Successfully!');
    console.log(bookResponse);

    res.status(201).json({
     bookResponse
    });
});


exports.getAllBooks = catchAsyncError(async (req, res, next) => {
    try {
      const query = req.query;
      // console.log(query)
      if(Object.keys(query).length === 0){
        const books = await Books.find();
        console.log("All books fetched successfully");
        res.status(200).json({
          success: true,
          message: "All books fetched successfully",
          data: books,
        });
      }else{
      const title=query.title;
      const author=query.author;
      const genre=query.genre;
      const Sort=query.sort;
      const order=query.order;
      
      if(title){
          console.log(title)
          const books = await Books.find({
              title: title
          }).sort({id:-1});
          console.log(books)
      }
      else if(author){
          console.log(author)
      }
      else if(genre){
          console.log(genre)
      }
      else{
          console.log("No search field provided")
      }
      res.status(200).json({
        success: true,
        message: "Books fetched successfully",
      });
      }
    } catch (error) {}
  });