const { sequelize } = require('../connection')
const { DataTypes } = require('sequelize')
//const { course } = require('./courses')
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

registration.belongsTo(course, {
    foreignKey: 'course_id',
    as: 'CourseId'
})

registration.belongsTo(user, {
    foreignKey: 'uid',
    as: 'authUid'
})

async function get_registrations_table() {
    await registration.sync()
    console.log('registration table synced');
}

module.exports = { registration, get_registrations_table }