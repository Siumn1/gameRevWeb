const { sequelize } = require('../connection')
const { DataTypes } = require('sequelize')

const { user } = require('./users')

const registration = sequelize.define(
    'registration',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
    },
    {
        tableName: 'registration',
        timestamps: true
    }
)
registration.belongsTo(user, {
    foreignKey: 'uid',
    as: 'regUid'
})

async function get_registrations_table() {
    await registration.sync()
    console.log('registration table synced');
}

module.exports = { registration, get_registrations_table }