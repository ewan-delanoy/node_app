
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');


let connection = {};

const mysqlModule = require('./models/mysql_connection.js');
const bookModule = require('./models/book.js');

/* checkpoint */

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
/* app.use(express.static(__dirname + '/public')); */

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/books', async (req, res) => {
  connection = mysqlModule.initiateConnection();
  const books = await bookModule.seekAllItems(connection);
  connection.end();
  /* console.log("Here are the books : ", books); */
  res.render('books/index', { books: books });
});

app.get('/books/:id/edit', async (req, res) => {
  connection = mysqlModule.initiateConnection();
  const book = await bookModule.seekItem(connection, req.params.id);
  connection.end();
  res.render('books/edit', { book });
});

app.put('/books/:id', async (req, res) => {
  const bookId = parseInt(req.params.id);
  let bookData = req.body.book;
  bookData.id = bookId;
  bookData.image = 'uvw';
  connection = mysqlModule.initiateConnection();
  await bookModule.updateValue(connection, bookData);
  connection.end();
  res.redirect(`/books/${bookId}`);
});

app.get('/books/new', (req, res) => {
  res.render('books/new');
});

app.post('/books', async (req, res) => {
  const newBookData = req.body.book;
  console.log("Here is the req.body : ", req.body);
  console.log("Here is the newBookData : ", newBookData);
  if (!newBookData.price) { newBookData.price = '127.68'; }
  connection = mysqlModule.initiateConnection();
  const newBookId = await bookModule.insertValue(connection, newBookData);
  connection.end();
  res.redirect(`/books/${newBookId}`);
});

app.get('/books/:id', async (req, res) => {
  connection = mysqlModule.initiateConnection();
  const book = await bookModule.seekItem(connection, req.params.id);
  connection.end();
  res.render('books/show', { book });
});

app.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  connection = mysqlModule.initiateConnection();
  await bookModule.deleteValue(connection, bookId);
  connection.end();
  res.redirect(`/books`);
});


app.listen(3007, '127.0.0.1', async () => {
  /*
  connection = mysqlModule.initiateConnection();
  userModule.seekItemId(connection,'Suzanne Vega',function(results){console.log(results);console.log(results.length);});
  */

  connection = mysqlModule.initiateConnection();

  await bookModule.dropModel(connection);
  await bookModule.createModel(connection);
  await bookModule.seedModel(connection);

  console.log("Serving on port 3000");
});

