const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const session = require('express-session')
const {promisify} = require('util')
const dotenv = require('dotenv').config();
const writeLog = promisify(fs.appendFile)
const { customErrorHandler }  = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

//init body parser 
app.use(helmet());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

app.use(express.json());
app.use(express.urlencoded({extended : false}));

const logger = (req,res,next) => {
    let data = `${req.method} ${req.url} ${new Date()} \n`;
    writeLog('./errLog/logs.txt',data)
    next();
}

app.use(logger)
app.use('/members',require('./routes/routing.js'));
app.use(customErrorHandler);
app.listen(port,() => {
    console.log(`E-com app is running on ${port}`);
})



//mongodb.disconnectDB();




