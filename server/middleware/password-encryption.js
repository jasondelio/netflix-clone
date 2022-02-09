const bcrypt = require ('bcrypt');

const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
}

const comparePassword = async(hashedPassword, inputPassword) => {
    const isSame = await bcrypt.compare(hashedPassword, inputPassword);
    
    return isSame;
}

module.exports = { hashPassword, comparePassword };