const express = require('express');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util')
const dotenv = require('dotenv').config();
const writeLog = promisify(fs.appendFile)
const { errorHandler } = require('./middleware/errorHandler')

const app = express();
const port = process.env.PORT || 3000;

//init body parser 

app.use(express.json());
app.use(express.urlencoded({extended : false}));

const logger = (req,res,next) => {
    let data = `${req.method} ${req.url} ${new Date()} \n`;
    writeLog('./errLog/logs.txt',data)
    next();
}

app.use(logger)
app.use('/members',require('./routes/routing.js'))
// app.use(errorHandler)

app.listen(port,() => {
    console.log(`E-com app is running on ${port}`);
})



//mongodb.disconnectDB();



