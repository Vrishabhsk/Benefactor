require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports =  (req, res, next) => {
  const jwtToken = req.header("token");
  if (!jwtToken) {
    return res.json(false);
  }
  try {
    const payload = jwt.verify(jwtToken, process.env.JWTSECRET);
    req.user = payload.user;
    next();
  } catch (err) {
    res.json("Not Authorized");
  }
};
