const express = require("express");
const { createUser } = require("../controllers/auth.js");

const router = express.Router();

router.get('/sign-up', (req, res) => {
    res.render('sign_up');
})
router.post('/sign-up', createUser);

module.exports = router;