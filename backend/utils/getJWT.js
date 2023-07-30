require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

console.log(NODE_ENV);

module.exports.getJWT = function getJWT() {
  return NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
};
