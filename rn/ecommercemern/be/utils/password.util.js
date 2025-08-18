const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (plaintextPassword) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plaintextPassword, salt);
    return hash.toString();
};

module.exports = { hashPassword };
