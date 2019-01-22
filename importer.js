// This program needs to be run once
// to import our book data from JSON to MongoDB

const mongoose = require('mongoose');

// Connect to db
let dbName = 'cinema_booking'
mongoose.connect(`mongodb://localhost/${dbName}`);
global.db = mongoose.connection;
db.on('error', () => console.log('Could not connect to DB'));
db.once('open', () => {
  console.log('Connected to DB');
   importJsonDataToDb();
 });

// // Load Mongoose models
// let Book = require('./Book');
// let Author = require('./Author');

// // Load the json data from file
// let bookData = require('./books.json');

// async function importJsonDataToDb(){
//   let allBooksCount = await Book.count();
//   // if the db already contains books then delete them
//   // and also delete all authors
//   if(allBooksCount > 0){
//     console.log('Deleted old books', await Book.remove({}));
//     console.log('Deleted old authors', await Author.remove({}));
//   }
//   // first create all the authors
//   let authorHash = {};
//   for(let data of bookData){
//     if(authorHash[data.author]){ continue; } // already created
//     let author = new Author({
//       name: data.author,
//       description: data.author + ' is one of the greatest authors that ever lived in' + data.country,
//       books: []
//     });
//     authorHash[author.name] = author;
//   }
//   // creates books (and saves authors)
//   for(let data of bookData){
//     let author = authorHash[data.author];
//     data.author = author._id;
//     let book = new Book(data);
//     // save the book to MongoDB
//     await book.save();
//     // add this book id to the book array of the author
//     author.books.push(book._id);
//     await author.save();
//   }
//   // after the import count the books again
//   allBooksCount = await Book.count();
//   console.log(`Imported ${allBooksCount} books to the database`);
//   // Exit the app
//  process.exit();
// }