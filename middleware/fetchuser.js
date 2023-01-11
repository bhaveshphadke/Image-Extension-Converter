// Importing jsonwebtoken and its secrete key
const jwt = require('jsonwebtoken')
const JWT_SECRETE = process.env.JWT_SECRETE
// function to fetch user
const fetchuser = async (req, res, next) => {
    // Getting token from header
    const token = req.header('auth-token');
    // const token =req.body.token
    try {
        // if header contains valid token following code will pass user and will run next()n function
        const data = await jwt.verify(token, JWT_SECRETE)
        req.user = data.user
        next()
    } catch (error) {
        //if token is invalid or isempty we will dirextly run next()
        next()
    }
}

module.exports = fetchuser