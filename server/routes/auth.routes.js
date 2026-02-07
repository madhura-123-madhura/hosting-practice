const { register, login, logout } = require("../controllers/auth.controller.js")
const rateLimit = require("express-rate-limit")

const router = require("express").Router()

const authlimiter = rateLimit({
    window: 1000 * 60,
    max: 3
})
router
    .post("/signup", register)
    .post("/signin", authlimiter, login)  //you can attempt 3 times for login
    .post("/signout", logout)

module.exports = router