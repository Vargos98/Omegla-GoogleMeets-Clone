const express = require('express');
const app = express();

app.use('/', indexRouter);


app.listen(3000);