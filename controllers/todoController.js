let bodyParser = require('body-parser');
// let data = [{item:'get milk'},{item:'walk'},{item:'kick a ball'}]
let urlencoded = bodyParser.urlencoded({ extended: false })
let mongoose = require('mongoose');
//monogo connect
mongoose.connect('mongodb://test:test@ds143559.mlab.com:43559/td',['td'])
//create schema
let todoSchema = new mongoose.Schema({
  item:String
})

//create model
let Todo = mongoose.model('td',todoSchema)

// var item1 = Todo({item: 'flowerPot'}).save(function(err){
//   if(err) throw eror;
//   console.log('item saved');
//
// })


module.exports = function(app){
  app.get('/todo',function(req,res){
    Todo.find({},function(err,data){
      if(err) throw err;
    res.render('todo',{todos:data});
  })
})

  app.post('/todo',urlencoded,function(req,res){
    let newTodo = Todo(req.body).save(function(err,data){
      if(err) throw err;
        res.json(data);
    })

  })

  app.delete('/todo/:item',function(req,res){
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
      if(err) throw err;
      res.json(data)

})
})
  //   data = data.filter(function(todo){
  //     return todo.item.replace(/ /g,'-') !== req.params.item
  //   });
  //   res.json(data);
  // })

}
