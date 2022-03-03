require('dotenv').config();

const corsOptions = {
    origin: process.env.VALID_ORIGIN,
    optionsSuccessStatus: 200
}

module.exports = { corsOptions }