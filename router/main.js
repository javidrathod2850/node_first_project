const db= require("./db");
var bodyParser =    require("body-parser");
module.exports = function(app)
{
    var mysqlObj= new db();
    mysqlObj.create_database();
    var con=mysqlObj.getconnObj();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/',function(req,res){
        res.render('index.ejs')
    });
    app.get('/about',function(req,res){
        res.render('about.html');
    });
    app.get('/register',function(req,res){
        res.render('register.ejs')
    });
    app.get('/login',function(req,res){
        if(req.session.email){
            console.log(req.session.email);
            res.redirect('/');
        }else{
            res.render('login.ejs')
        }
    });
    app.get('/logout',function(req,res){
        delete req.session.email;
        res.redirect('/login');
    });
    app.post('/check-login',function(req,res){
          var email=req.body.email;
          var password=req.body.pwd;
          var sql = "select count(id) as counts from user where email='"+email+"' and password='"+password+"'";
          con.query(sql, function (err,rows, fieldsresult) {  
          if (err){ throw err;}  
          else
          {
            if(rows[0].counts>0)
            {
                req.session.email=email;
                res.redirect('/');
            }
            else  
            {
                res.redirect('/login');
            }  
          }
        });  
    });
    app.post('/insertdata',function(req,res){
    var sql = "CREATE TABLE IF NOT EXISTS user(id INT NOT NULL AUTO_INCREMENT, email VARCHAR(255), password VARCHAR(255),country int(1),gender VARCHAR(10),address LONGTEXT, PRIMARY KEY (`id`))";  
    con.query(sql, function (err, result) {  
      if (err) throw err;  
    });  
    var email=req.body.email;
    var password=req.body.pwd;
    var country=req.body.country;
    var gender=req.body.gender;
    var address=req.body.address;
    var insertquery = "INSERT INTO user (email, password, country,gender,address) VALUES ('"+email+"','"+password+"','"+country+"','"+gender+"','"+address+"')";  
        con.query(insertquery, function (err, result) {  
            if (err) throw err;  
            console.log("1 record inserted");  
        });  
    res.redirect('/');
    });
}