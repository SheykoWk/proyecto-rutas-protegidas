const checkUsersCredentials = require("../auth/auth.controllers");
const jwt = require("jsonwebtoken");
const responses = require("../utils/responses.handler");
const config = require("../../../config");


const postLogin = ( req, res ) => {
  const { email, password } = req.body;
  checkUsersCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          config.api.jwtSecret,
          {
            expiresIn: "1d",
          }
        );

        responses.success( {
          res, 
          status: 200,
          message: "Credentials validated successfully",
          data: token
        })
      } else {
        responses.error({
          res,
          status: 401,
          message: "Invalid credentials",
        });
      }
    })
    .catch((err) => {
      responses.error({
        res,
        status: 400,
        message: "something bad",
        data: err,  
      });
    });
};
 


module.exports = postLogin;
