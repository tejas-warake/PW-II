const express = require("express");
const router = express.Router();
const { createDoubt } = require("../controllers/doubtController.js");


router.get('/new', (req, res) => {
    res.render('new_doubt');
})
router.post('/new', createDoubt);


module.exports = router;