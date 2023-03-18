const jwt = require('jsonwebtoken')
const  User  = require('../models/user')
//==========================================
const logoutAuth = async (req, res, next) => { 
    try {
        const headerToken = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(headerToken, process.env.JWT)

        const user = await User.findByPk(decoded.id)

        let tokens = user.tokens.split('/')

        let verified;

        tokens = tokens.filter(token => {

            if (headerToken === token) {
                verified = true;
            } else {
                return token
            }
        })
        if (verified !== true) { throw new Error()}

        user.tokens = tokens.join('/')

        user.tokens += '/'

        await user.save()

        res.send('logged out')

    } catch (e) {  
        console.log(e)
        res.status(401).send({Error : "Your not authenticated"})
    }
}
module.exports = logoutAuth