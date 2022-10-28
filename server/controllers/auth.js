const User = require('../models/userModel.js');
const jwt = require("jsonwebtoken");


const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
        res.cookie('nToken', token, { maxAge: 9000000, httpOnly: true });
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return res.status(400).send({ err });
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie('nToken');
    return res.redirect('/');
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // find this username
        console.log("Logging in..");
        const user = await User.findOne({ username }, 'username password');
        if (!user) {
            return res.status(401).send({ message: 'Wrong Username or Password' });
        }

        // check the password
        user.comparePassword(password, (err, isMatch) => {
            if (isMatch) {
                // Password does not match
                return res.status(401).send({ message: 'Wrong Username or password' });
            }

            // Create a token
            const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                expiresIn: '60 days',
            });
            // Set a cookie and redirect to root
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            return res.redirect('/');
        });
    } catch (err) {
        console.log(err);
    }
}


module.exports = { createUser, logoutUser, loginUser };