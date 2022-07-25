const customErrorHandler = (err, req, res, next) => {
    res.status(400).json({message : err.message});
    // next();
}

module.exports = { customErrorHandler }
