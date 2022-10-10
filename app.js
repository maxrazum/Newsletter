const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = 8080;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'join_us',
    password: ''
});


app.get('/', (req, res) => {
    let q = 'SELECT COUNT(*) AS count FROM users';
    connection.query(q, (err, results) => {
        if (err) throw err;
        let count = results[0].count;
        res.render('home', { count: count });
    });
});


app.post('/register', (req, res) => {
    let person = {
        email: req.body.email
    }
    console.log(person);

    let sqlCheckQuery = 'SELECT * FROM users WHERE email = ? LIMIT 1';

    connection.query(sqlCheckQuery, [person.email], (err, results) => {
        if (results.length) {
            console.log(`The email ${person.email} already exists.`);
            res.render('error', { email: person.email, home: '/' });
        } else {
            connection.query('INSERT INTO users SET ?', person, (err, results) => {
                if (err) throw err;
                res.redirect('/success');
            });
            console.log(`Email ${person.email} has been added to database.`);
        }
    });
});

app.get('/success', (req, res) => {
    let q = 'SELECT COUNT(*) AS count FROM users';
    connection.query(q, (err, results) => {
        if (err) throw err;
        let count = results[0].count;
        res.render('success', { count: count });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});