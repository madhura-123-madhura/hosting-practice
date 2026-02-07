const jwt = require("jsonwebtoken")


const protect = (req, res, next) => {
    //1 check for cookie
    const ADMIN = req.cookies.ADMIN

    //2 if not available send error 
    if (!ADMIN) {
        return res.status(401).json({ message: "cookie not found", success: false })
    }

    //3 check for token
    //4 if not available send error 
    jwt.verify(ADMIN, process.env.JWT_KEY, (_, decode) => { //decode is come from auth.cpntroller login function payload of of jwt.sign
        if (!decode) {
            return res.status(401).json({ message: "invalid token", success: false })
        }
        //5 if everything is available call next
        next()
    })
}

module.exports = protect