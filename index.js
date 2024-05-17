const express = require('express');
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'gayatrisiddani', // Your MySQL username
  password: 'sai@2002', // Your MySQL password
  database: 'oracle'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// GET all users
app.get('/books/', (req, res) => {
  connection.query('SELECT * FROM data_history', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500);
      res.send('Error fetching users');
      return;
    }
    res.json(results);
  });
});

app.post('/books/', async(req, res) => {
  const {name, img, summary} = req.body
  const selectBookQuery = `Insert into data_history(name, img, summary) values('${name}', '${img}', '${summary}')`; 
  const dbUser = await db.run(selectBookQuery); 
  response.send('Book added successfully')
});


app.get('/books/:bookId', async (req, res) => {
  const {bookId} = req.params; 
  const getBookQuery = `select * from data_history where id=${bookId}; `; 
  const bookArray = await db.all(getBookQuery)
  response.send(bookArray); 
});


app.put('/books/:bookId', async (req, res) => {
  const {bookId} = req.params; 
  const bookDetails = req.body; 
  const {name, img, summary} = bookDetails;
  const updateBookQuery = `update data_history set name=${name}, img=${img}, summary=${summary} where id=${bookId}; `; 
  await db.run(updateBookQuery)
  response.send("Book added successfully"); 
});

app.delete('/books/:bookId', async (req, res) => {
  const {bookId} = req.params; 
  const deleteBookQuery = `Delete from book where id=${bookId}; `; 
  await db.run(deleteBookQuery)
  response.send("Book deleted successfully"); 
});



