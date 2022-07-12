const  express = require('express');
const router = express.Router();
const control = require('./controller.js')

//all members
router.get('/',control.getAll)

// specific users
router.get('/:id',control.getOne)

// post function
router.post('/',control.createUser)

// put function
router.put('/:id',control.updateUser)

// delete function
router.delete('/:id',control.deleteUser)


router.all('*',(req,res) => {
    res.status(400).json({"message" : "Invalid HTTP Request"})
});

module.exports = router ;

