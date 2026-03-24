const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Prudhviraj44', // 🔥 change this
    database: 'weather_app'
});

db.connect(err => {
    if (err) {
        console.log("DB Error:", err);
        return;
    }
    console.log("MySQL Connected");
});

module.exports = db;