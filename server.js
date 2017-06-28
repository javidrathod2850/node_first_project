var express    =    require('express');
var session = require('express-session');
var app        =    express();
var sess;
app.use(session({secret: 'ssshhhhh'}));

require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('views'))
app.engine('html', require('ejs').renderFile);


//     app.get('/',function(req,res){
//     res.sendfile('index.html');
// });

var server     =    app.listen(3000,function(){
console.log("We have started our server on port 3000 ");
});
