const User = require('../models/userModel.js');
const jwt = require("jsonwebtoken");


const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        return res.redirect('/');
    } catch(err) {
        console.log(err);
        return res.status(400).send({ err });
    }
}


module.exports = { createUser };