const express = require("express");
const router = express.Router();
const { createDoubt, getDoubt } = require("../controllers/doubtController.js");
const { addAnswer } = require("../controllers/answersController.js");


router.get('/new', (req, res) => {
    res.render('new_doubt');
})

router.post('/:id/answers', addAnswer);
router.post('/new', createDoubt);
router.get('/:id', getDoubt);

module.exports = router;