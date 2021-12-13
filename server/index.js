const express = require("express");
const mongoose = require("mongoose");
const userRoute = require('./routes/user-route');
const apiErrorHandler = require('./middleware/api-error-handler');

require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

app.use("/api/v1/users", userRoute);

app.use(apiErrorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


  