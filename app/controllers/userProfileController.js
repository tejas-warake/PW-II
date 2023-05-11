const User = require("../models/userModel.js");
const Doubt = require("../models/doubtModel.js");


const getUserProfile = async (req, res) => {
    if (req.user) {
        const currentUser = req.user;
        const userId = req.user._id;

        try {
            const user = await User.findById(userId);
            const doubts = await Doubt.find({ author : userId });

            return res.render('user_profile', { currentUser, user, doubts });
        } catch (err) {
            console.log(err);
        }
    } else {
        res.redirect('/login');
    }
}



module.exports = { getUserProfile };