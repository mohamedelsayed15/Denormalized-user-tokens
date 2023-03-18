const  User  = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.signup = async (req, res) => { 
    try {

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            tokens:''// initialize tokens
        })

        const token = await jwt.sign({ id: user.id }, process.env.JWT)

        user.tokens = user.tokens + token + "/"

        await user.save()

        user.tokens = ''

        user.password = ''

        res.status(201).send({user , token})

    } catch (e) { 
        console.log(e)
        if (e.errors) { return res.status(409).send("account with this email already exists") }
        res.send(e)
    }
}
exports.login = async (req, res) => { 
    try {
        const user = await User.findOne({ where: { email: req.body.email } })

        if (!user) { return res.send("couldn't find user")}

        const compared = await bcrypt.compare(req.body.password, user.password)

        if (compared === false) { return res.send("couldn't find user") }

        const token = await jwt.sign({ id: user.id }, process.env.JWT)

        user.tokens += token + "/"

        await user.save()

        user.tokens = ''

        user.password = ''

        res.send({user,token})

    } catch (e) { 
        console.log(e)
        res.send(e)
    }
}

exports.deleteUser = async (req, res) => {
    try {

        await req.user.destroy()

        res.send()

    } catch (e) { 
        res.send(e)
    }
}