const faker = require('faker');
const mysql = require('mysql2');


let data = [];
for (let i = 0; i < 999; i++) {
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'join_us',
    password: ''
});

let q = 'INSERT INTO users (email, created_at) VALUES ?';

connection.query(q, [data], (err, results) => {
    console.log(err);
    console.log(results);
});

connection.end();