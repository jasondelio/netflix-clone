const express = require("express");

require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.get("/health-check", (req, res) => {
    res.send("Server is up")
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


  