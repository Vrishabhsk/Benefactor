require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const jwtToken = req.header("token");
  if (!jwtToken) {
    return res.json(false);
  }
  const payload = jwt.verify(jwtToken, process.env.JWTSECRET);
  req.user = payload.user;
  next();
};
