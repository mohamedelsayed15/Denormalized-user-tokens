const jwt = require('jsonwebtoken')
const  User  = require('../models/user')
//==========================================
const auth = async (req, res, next) => { 
    try {
        const headerToken = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(headerToken, process.env.JWT)

        console.log(decoded)

        const user = await User.findByPk(decoded.id)

        const tokens = user.tokens.split('/')

        console.log(tokens)

        let verified;

        for (let i = 0; i < tokens.length; i++) { 

            if (headerToken === tokens[i]) { verified = true; break }

        }

        if (verified !== true) {throw new Error() }

        req.token = headerToken 

        req.user = user

        next()

    } catch (e) {  
        console.log(e)
        res.status(401).send({Error : "Your not authenticated"})
    }
}
module.exports = auth