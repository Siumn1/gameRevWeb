const { sequelize } = require('../connection')

const { DataTypes } = require('sequelize')

const auth = sequelize.define(
    'auth',
    {
        uid: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        role: {
            type: DataTypes.TEXT
        },
        AccessToken: {
            type: DataTypes.TEXT
        },
        RefreshToken: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.TEXT
        },
        email: {
            type: DataTypes.TEXT
        },
    },
    {
        tableName: 'auths',
        timestamps: true
    }
)

async function get_auths_table() {
    await auth.sync()
    console.log('auth table synced');
}

module.exports = { auth, get_auths_table }