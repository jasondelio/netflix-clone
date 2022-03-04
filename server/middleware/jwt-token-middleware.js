const jwt = require('jsonwebtoken');
const ApiError = require('./api-error');

const authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['x-access-token'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        next(ApiError.unauthorized());
        return;
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            next(ApiError.unauthorized());
            return;
        }
        req.user = user; 
        next()
    })
}

module.exports = { authenticateToken }