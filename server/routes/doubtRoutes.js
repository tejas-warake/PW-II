const express = require("express");
const router = express.Router();
const { createDoubt, getDoubt, getUpdateDoubt, updateDoubt, deleteDoubt } = require("../controllers/doubtController.js");
const { addAnswer } = require("../controllers/answersController.js");


router.get('/new', (req, res) => {
    const currentUser = req.user;
    res.render('new_doubt', { currentUser });
})

router.post('/:id/answers', addAnswer);       // adding an answer
router.post('/new', createDoubt);             // creating a new doubt
router.get('/:id', getDoubt);                 // view a specific doubt
router.get('/edit/:id', getUpdateDoubt);      // update page for doubt 
router.post('/edit/:id', updateDoubt);
router.get('/delete/:id', deleteDoubt);       // delete the doubt


module.exports = router;