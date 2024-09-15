const bcrypt = require('bcrypt');

const validPassword = async function(password, user) {
  
  let result = bcrypt.compare(password, user.password);
  return result;
  
  }

module.exports.validPassword = validPassword