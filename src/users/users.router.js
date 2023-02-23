const router = require("express").Router();
const passportJWT = require("../middleware/auth.middleware.js");
const userServices = require("./users.services");

router.get("/", userServices.getAllUsers);
router.post("/", userServices.postNewUser);

router.get("/:id", userServices.getUserById);
router.patch("/:id", passportJWT, userServices.patchUser);
router.delete("/:id", passportJWT, userServices.deleteUser);

module.exports = router;
