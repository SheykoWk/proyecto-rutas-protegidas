const router = require("express").Router();
const postLogin = require("./auth.services");

+router.post("/auth/login", postLogin);

module.exports = router;
