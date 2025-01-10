const express = require('express');
const app = express();
const indexRouter = require('./routes/index');

const path = require('path');

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', indexRouter);


app.listen(3000,()=>{
  console.log('Server is running on port 3000');  // Server is running on port 3000
});