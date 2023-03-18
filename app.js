const express = require('express')
const sequelize = require('./util/mysql')
const userRoutes = require('./routes/user')
const app = express()
//parser //json data limiter
app.use(express.json({ limit: '1kb' }))

app.use('/user', userRoutes)
//404
app.use('/*', (req, res) => { 
    try {

        res.status(404).send("Mohamed Elsayed")

    } catch(e){}
})


const me = async () => await sequelize.sync({force : true})//{force : true}//during development only

me()
//listener
app.listen(3000, () => { 
    console.log(`server is up on 3000`)
})
