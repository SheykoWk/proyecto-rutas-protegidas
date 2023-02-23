const router = require("express").Router()

const userServices = require("./users.services")
const passportJwt = require("../middlewares/auth.middleware")

router.get("/", userServices.getAllUsers)
router.post("/", userServices.postNewUser)

router.get("/:id", passportJwt, userServices.getUserById)
router.patch("/:id", passportJwt, userServices.patchUser)
router.delete("/:id", passportJwt, userServices.deleteUser)

router.get("/me", passportJwt, userServices.getMyUser)
router.patch("/me", passportJwt, userServices.patchMyUser)
router.delete("/me", passportJwt, userServices.deleteMyUser)

module.exports = router
