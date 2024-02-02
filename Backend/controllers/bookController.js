const Books = require("../models/bookModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const { query } = require("express");

exports.createBook = catchAsyncError(async (req, res, next) => {
  try {
    const { id, title, author, genre, price } = req.body;

    const book = await Books.create({
      id,
      title,
      author,
      genre,
      price,
    });

    console.log("book created successfully");
    return res.status(201).json({
        id,title,author,genre,price
    });
  } catch (error) {}
});

exports.updateBook = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, genre, price } = req.body;

    const book = await Books.findOneAndUpdate(
      { id: id },
      {
        title,
        author,
        genre,
        price,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    console.log("book updated successfully");
    res.status(200).json({
        book
    });
  } catch (error) {
    console.log(error)
        return res.status(500).json({
            error: "Something went wrong while updating the book."
        })
  }
});

exports.getBook = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Books.findOne({ id: id });
    console.log("book fetched successfully");
    res.status(200).json({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
    });
  } catch (error) {}
});

exports.getAllBooks = catchAsyncError(async (req, res, next) => {
  try {
    const query = req.query;
    // console.log(query)
    if (Object.keys(query).length === 0) {
      const books = await Books.find();
      console.log("All books fetched successfully");
      res.status(200).json({
        books
      });
    } else { 
      const title = query.title;
      const author = query.author;
      const genre = query.genre;
      const Sort = query.sort===undefined?'id':query.sort;
      const order = query.order==='DSC'?-1: 1;

    //   console.log('sort',Sort)

      if (title) {
        //   console.log(title);
          const books = await Books.find({
            title: title,
          }).sort({ [Sort]: order , id: 1});
          console.log(books);
      } else if (author) {
        // console.log(title);
          const books = await Books.find({
            author: author,
          }).sort({ [Sort]: order, id: 1 });
          console.log(books);
      } else if (genre) {
        // console.log(title);
        const books = await Books.find({
          genre: genre,
        }).sort({ [Sort]: order, id: 1 });
        console.log(books);
      } else {
        const books = await Books.find().sort({[Sort]: order, id: 1})
        console.log(books)
      }
      res.status(200).json({
        success: true,
        message: "Books fetched successfully",
      });
    }
  } catch (error) {}
});

exports.getSearchBooks = catchAsyncError(async (req, res, next) => {
  try {
    const title = query.title;
    const author = query.author;
    const genre = query.genre;

    if (title) {
      const books = await Books.find({ id: 1 });
      console.log(books);
    } else if (author) {
      console.log(author);
    } else if (genre) {
      console.log(genre);
    } else {
      console.log("No search field provided");
    }
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
    });
  } catch (error) {}
});
