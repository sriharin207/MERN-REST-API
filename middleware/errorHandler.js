const customErrorHandler = (err, req, res, next) => {
    let currentMode = process.env.NODE_ENV;
    if(currentMode == 'production'){
        res.status(400).json({message : err.message});
    }
    else{
        res.status(400).json({
            message : err.message,
            stack : err.stack
        });
    }
    // next();
}

module.exports = { customErrorHandler }
