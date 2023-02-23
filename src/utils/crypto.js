const bcrypt = require("bcrypt");

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 10);
};

const comparePassword = (plainPassword, hashedPassword) => {
  if (bcrypt.compareSync(plainPassword, hashedPassword)) {
    return true;
  }
  return false;
};

module.exports = {
  hashPassword,
  comparePassword,
};
