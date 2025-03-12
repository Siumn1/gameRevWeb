const { sequelize } = require('../connection')
const { DataTypes } = require('sequelize')
const { auth } = require('./auth')

const user = sequelize.define(
    'user',
    {
        uid: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: auth,
                key: 'uid'
            }
        },
        name: {
            type: DataTypes.TEXT
        },
        interests: {
            type: DataTypes.TEXT
        },
    },
    {
        tableName: 'users',
        timestamps: true
    }
)

user.belongsTo(auth, {
    foreignKey: 'uid',
    as: 'authUid'
})

async function get_users_table() {
    await user.sync()
    console.log('user table synced');
}

module.exports = { user, get_users_table }