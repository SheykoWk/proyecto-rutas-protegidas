const checkUsersCredentials = require("./auth.controllers.js");
const jwt = require("jsonwebtoken");
const responses = require("../utils/responses.handler.js");
require("dotenv").config();

const postLogin = (req, res) => {
  const { email, password } = req.body;
  checkUsersCredentials(email, password)
    .then((data) => {
      if (data) {
        const token = jwt.sign(
          {
            id: data.id,
            email: data.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        responses.success({
          res,
          status: 200,
          message: "successful credentials",
          data: token,
        });
      } else {
        responses.error({
          res,
          status: 401,
          message: "error credentials",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};
module.exports = postLogin;
