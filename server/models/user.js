const { sequelize } = require('../connection');
const { DataTypes } = require('sequelize');


const User = sequelize.define('user', {
    uid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    interests: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: true,
});

User.associate = (models) => {
    User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews' });
};

async function get_user_table() {
    await User.sync()
    console.log('registration table synced');
}

module.exports = { User, get_user_table };