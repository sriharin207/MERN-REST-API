const errorHandler = (err,req,res,next) => {
    res.status(400).json({message : "Something went wrong"})
    return
}

module.exports = { errorHandler }