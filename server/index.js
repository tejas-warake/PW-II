require("dotenv").config();
require("./models/db.js");
const express = require("express");
const cors = require("cors");
const doubtRoutes = require("./routes/doubtRoutes.js");
const Doubt = require('./models/doubtModel.js');

const app = express();


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");


// routes
app.use('/doubts', doubtRoutes);
app.get('/', async (req, res) => {
    try {
        const doubts = await Doubt.find({});
        return res.render('home', { doubts });
    } catch (error) {
        console.log(error);
    }
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening at PORT: ${process.env.PORT || 4000}`)
});

