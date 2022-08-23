require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.get('/', (req, res) => {
    res.send("Hello There!");
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening at PORT: ${process.env.PORT || 4000}`)
})

