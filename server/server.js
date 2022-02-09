const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const userRoute = require('./routes/user-route');
const apiErrorHandler = require('./middleware/api-error-handler');
const connectDB = require('./configuration/mongo-configuration');

require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

connectDB();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use("/api/v1/user", userRoute);

app.use(apiErrorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


  