let express = require('express');
let app = express();
let todoController = require('./controllers/todoController')

//set up template engine
app.set('view engine','ejs')

//static files
app.use(express.static('./public'))

//bodyParser

//fire controller
todoController(app);

app.listen(3000,function(){
  console.log('you are listening on port 3000')
});
