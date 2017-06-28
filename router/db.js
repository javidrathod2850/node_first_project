const mysql = require('mysql');  
// var con = mysql.createConnection({  
//   host: "localhost",  
//   user: "root",  
//   password: "root"  
// });  
// con.connect(function(err) {  
//   if (err) throw err;  
//   console.log("Connected!"); 
//   con.query("CREATE DATABASE  IF NOT EXISTS demo", function (err, result) {  
//     if (err) throw err;  
//     console.log("Database created");  
//     });  
// });  




class mysql_connection {

  constructor(){
	this.con = mysql.createConnection({  
	  host: "localhost",  
	  user: "root",  
	  password: "123456",
        database: "demo"
	});  
  }
  
 getconnObj(){
	return this.con;
}

 create_database(){
console.log('2222222');
this.con.connect(function(err) {  
  if (err) throw err;  
  console.log("Connected!");  
});  
}
}
module.exports=mysql_connection;
