const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./Controller/error');
const mongoose = require('mongoose')

const app = express();
app.listen(3000);

app.set('view engine', 'ejs');
app.set('views', 'Views');

mongoose
  .connect(
    'mongodb://localhost/BookSharing'
  )

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'Public')));

const startRoute = require("./Routes/start")

app.use(startRoute)

app.use(errorController.get404);