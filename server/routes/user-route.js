const router = require("express").Router();
const User = require('../model/user-model');
const ApiError = require('../middleware/api-error');
const { authorizationValidationRules, authorizationValidate } = require('../middleware/api-key-middleware');
const { userValidationRules, userValidate } = require('../middleware/user-middleware');
const { hashPassword, comparePassword } = require('../middleware/password-encryption');

router.get("/health-check", authorizationValidationRules(), authorizationValidate, async (req, res, next) => {
    res.send("Server is up");
});

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

router.post("/", authorizationValidationRules(), authorizationValidate, async(req, res, next) => {
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

    res.json(user);

});



module.exports = router;