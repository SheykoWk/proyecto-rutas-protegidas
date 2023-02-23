// controlador para verificar las credenciales del usuario
const checkUsersCredentials = require("../auth/auth.controllers");
const jwt = require("jsonwebtoken");
const responses = require("../utils/responses.handler");
const config = require("../../config");

//? Al usuario loguearse hace una peticion de tipo POST a nuestra base de datos
const postLogin = ( req, res ) => {
  const { email, password } = req.body;
  checkUsersCredentials(email, password)
    .then((user) => {
      if (user) {
        //? Esta info la vamos a incriptar el el token
        const token = jwt.sign(
          //? Primer parametro: info que el token va a contener una vez encriptado
          {
            id: user.id,
            email: user.email,
          },
          //? Segundo parametro: Palabra clave
          config.api.jwtSecret,
          //? tercero parametro: un objeto con la propiedad expiresIn que define la duracion del token
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