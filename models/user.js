const Sequelize = require('sequelize')
const sequelize = require('../util/mysql')
const bcrypt = require('bcryptjs')

const User = sequelize.define('user', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true 
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [5 , 50]
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [5 , 50]
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tokens: {//store tokens as a string instead of another table
            type: Sequelize.TEXT('medium')
    }
})
User.beforeSave(async (user) => {
    if (user.changed('password')) {

        user.password = await bcrypt.hash(user.password, 8)

    }
})

module.exports =  User 