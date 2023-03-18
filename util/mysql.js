const Sequelize = require('sequelize')


const sequelize = new Sequelize(
    'denormalized user',
    'me',
    '621654', {
        dialect: 'mysql',
        host :'127.0.0.1'
    }
)

module.exports = sequelize