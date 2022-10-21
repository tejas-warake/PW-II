require("dotenv").config();
require("./models/db.js");
const express = require("express");
const cors = require("cors");
const doubtRoutes = require("./routes/doubtRoutes.js");

const app = express();


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");


// routes
app.use('/doubts', doubtRoutes);
app.get('/', (req, res) => {
    res.render('home');
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening at PORT: ${process.env.PORT || 4000}`)
})

