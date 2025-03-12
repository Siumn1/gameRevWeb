// models/review.js
const { sequelize }= require('../connection');
const { DataTypes } = require('sequelize');
const { user } = require('./users')


const review = sequelize.define('review', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
    
}, {
    tableName: 'reviews'
});

review.belongsTo(user, {
    foreignKey: 'userId', // Внешний ключ в таблице reviews
    as: 'user' // Псевдоним для доступа к пользователю
});

async function get_review_table() {
    await review.sync()
    console.log('registration table synced');
}

module.exports = {review, get_review_table};