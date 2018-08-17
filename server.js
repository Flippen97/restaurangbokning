const express = require('express'); // Web Framework
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ida',
  password: 'ida',
  database: 'restaurant',
})

app.listen(3001, () => {
  console.log('Listening to port 3001!');
})

app.post('/api/create_booking', (req, res) => {
//  const guests = req.body.create_guests;
//  const date = req.body.create_date;
//  const session = req.body.create_session;
  const name = req.body.create_name;
  const email = req.body.create_email;
  const telephone = req.body.create_phone;

  const queryString =
    `INSERT INTO customers
    (name, email, telephone)
    VALUES ('', ?, ?, ?, ?, ? ,?)`;

  connection.query(queryString, [name, email, phone], (err, results, fields) => {
    if(err){
      console.log('Failed to add booking: ' + err);
      res.sendStatus(500) // Show user internal server error
      res.end();
      return;
    }
    /** Reload to book page, Book component (in routes-folder)
     * will mount again and fetch the new booking */
    res.redirect('/book');
  })
});


app.get('/customers/:id', (req, res) => {
  const queryString = "SELECT * FROM bookings WHERE id = ?";
  const bookingId = req.params.id;

  connection.query(queryString, [bookingId], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for booking: ' + err);
      res.sendStatus(500) // Show user internal server error
      res.end();
      return;
    }

    const bookings = rows.map((row) => {
      return {
        id: row.id,
        guests: row.guests,
        date: row.date,
        session: row.session,
        name: row.name,
        email: row.email,
        phone: row.phone,
      }
    })
    res.json(bookings)
  })
})

app.get('/api/bookings/date/:date', (req, res) => {
  const queryString = "SELECT * FROM bookings WHERE date = ?";
  const date = req.params.date;

  connection.query(queryString, [date], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for booking: ' + err);
      res.sendStatus(500) // Show user internal server error
      res.end();
      return;
    }

    const bookings = rows.map((row) => {
      return {
        id: row.id,
        guests: row.guests,
        date: row.date,
        session: row.session,
        name: row.name,
        email: row.email,
        phone: row.phone,
      }
    })
    res.json(bookings)
  })
})

app.get('/api/bookings', (req, res) => {
  const queryString = "SELECT * FROM bookings";

  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to get all bookings ' + err);
      res.sendStatus(500) // Show user internal server error
      res.end();
      return;
    }

    const bookings = rows.map((row) => {
      return {
        id: row.id,
        guests: row.guests,
        date: row.date,
        session: row.session,
        name: row.name,
        email: row.email,
        phone: row.phone,
      }
    })
    res.json(bookings)
  })
})