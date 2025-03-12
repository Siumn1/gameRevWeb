const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:@localhost:5432/Web', {password: 'pass'})

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('db connected');
    } catch (error) {
        console.error('Error', error)
    }
}

connect()

module.exports = { sequelize, connect }