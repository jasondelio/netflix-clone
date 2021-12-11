const express = require("express");

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/health-check", (req, res) => {
    res.send("Server is up")
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


  