const bcrypt = require('bcryptjs');

const hash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

module.exports = hash;
