require("dotenv").config();
const jwt = require("jsonwebtoken");

function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "2hr" });
}

module.exports = jwtGenerator;
