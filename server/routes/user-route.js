const router = require("express").Router();
const User = require('../model/user-model');
const ApiError = require('../middleware/api-error');
const { authorizationValidationRules, authorizationValidate } = require('../middleware/authorization-middleware');
const { userValidationRules, userValidate } = require('../middleware/user-middleware');

router.get("/health-check", authorizationValidationRules(), authorizationValidate, async (req, res, next) => {
    res.send("Server is up");
});

router.post("/", authorizationValidationRules(), authorizationValidate, userValidationRules(), userValidate, async(req, res, next) => {
    const userExists = await User.findOne({email : req.body.email})
    if(userExists){
        next(ApiError.badRequest("User already exists"));
        return;
    }
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
})

module.exports = router;