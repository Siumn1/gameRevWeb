const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:@localhost:5432/Web', { password: 'pass' });

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}

connect();

module.exports = { sequelize, connect };