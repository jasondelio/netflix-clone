const router = require("express").Router();
const User = require('../model/user-model');
const ApiError = require('../middleware/api-error');
const { authorizationValidationRules, authorizationValidate } = require('../middleware/api-key-middleware');
const { userValidationRules, userValidate } = require('../middleware/user-middleware');
const { hashPassword, comparePassword } = require('../middleware/password-encryption');
const jwt = require('jsonwebtoken')

let refreshTokens = []

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
}

router.get("/health-check", authorizationValidationRules(), authorizationValidate, async(req, res, next) => {
    res.send("Server is up");
});

router.post('/token', authorizationValidationRules(), authorizationValidate, async(req, res, next) => {
    const refreshToken = req.body.token
    if (refreshToken == null){
        next(ApiError.unauthorized());
        return;
    }
    if (!refreshTokens.includes(refreshToken)){
        next(ApiError.unauthorized());
        return;
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err){
            console.log(err);
            next(ApiError.unauthorized());
            return;
        }
        const accessToken = generateAccessToken({username : user.username});
        res.json({ accessToken: accessToken });
    })
  })

router.post("/register", authorizationValidationRules(), authorizationValidate, userValidationRules(), userValidate, async(req, res, next) => {
    const emailExists = await User.findOne({email : req.body.email});
    const usernameExists = await User.findOne({username : req.body.username});

    if(emailExists || usernameExists){
        next(ApiError.badRequest("User already exists"));
        return;
    }

    req.body.password = await hashPassword(req.body.password);
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
});

router.post("/login", authorizationValidationRules(), authorizationValidate, async(req, res, next) => {
    let user = await User.findOne({email : req.body.email});

    if(!user){
        user = await User.findOne({username : req.body.username});
        if(!user){
            next(ApiError.badRequest("Invalid username or password"));
            return;
        }
    }

    if(await comparePassword(req.body.password, user.password) === false){
        next(ApiError.badRequest("Invalid username or password"));
        return;
    }

    const accessToken = generateAccessToken({username : user.username});
    const refreshToken = jwt.sign({username : user.username}, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    res.json({ accessToken: accessToken, refreshToken: refreshToken });

});

router.delete('/logout', authorizationValidationRules(), authorizationValidate, async(req, res, next) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    next(ApiError.noContent());
    return;
})



module.exports = router;