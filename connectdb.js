var mysql = require('mysql');
var con = mysql.createConnection({
  host: "ec2-79-125-2-71.eu-west-1.compute.amazonaws.com",
  user: "yvsvglkuglxfog",
  password: "600b7696922f50beb0353620185fc400ae5f290c9137ec8dcf9f36e712941491",
  port: 5432,
  database: "d4912e1hm4h170"
});
con.connect(function(err) {
    if (err) throw err;
});

module.exports = con;
