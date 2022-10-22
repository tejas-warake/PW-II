require("dotenv").config();
require("./models/db.js");
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const doubtRoutes = require("./routes/doubtRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const Doubt = require('./models/doubtModel.js');

const app = express();
app.use(cookieParser());

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");


// routes
app.use('/doubts', doubtRoutes);
app.use(userRoutes);

// home route
app.get('/', async (req, res) => {
    try {
        const doubts = await Doubt.find({});
        return res.render('home', { doubts });
    } catch (error) {
        console.log(error);
    }
})


// category wise listing routes
app.get('/r/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const doubts = await Doubt.find({ category : category });
        return res.render('home', { doubts });
    } catch (error) {
        console.log(error);
    }
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening at PORT: ${process.env.PORT || 4000}`)
});

