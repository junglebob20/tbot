var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "memologdb"
});
con.connect(function(err) {
    if (err) throw err;
});

module.exports = con;
