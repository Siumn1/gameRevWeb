const { sequelize } = require('../connection');
const { DataTypes } = require('sequelize');
const { User } = require('./user'); // Импорт модели User

const Review = sequelize.define('review', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    tableName: 'reviews',
    timestamps: true,
});

Review.belongsTo(User, {
    foreignKey: 'userId', // Внешний ключ в таблице reviews
    as: 'user', // Псевдоним для доступа к пользователю
});

async function get_review_table() {
    await Review.sync();
    console.log('review table synced');
}

module.exports = { Review, get_review_table };