const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require('../models/User')


dotenv.config();


const app = express();

const port = process.env.PORT || 5000;
DB_URI = "mongodb://127.0.0.1:27017/testDB"



app.use(cors());
app.use(express.json());

const connectDB = async () => {
    mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.log(err));
    
      
    
      app.listen(port,() => console.log(`Server running on port ${port}`));
}

const nUser = new User({
    username: 'Alex',
    password: '123'
})
nUser.save()
//////////

const createUser = async () => {
  try {
    // Подключение к базе данных
    await connectDB();

    // Создание нового пользователя
    const user = new User({
      username: 'testuser',
      password: 'testpassword',
    });
    await user.save(); // Сохранение пользователя в базе данных

    console.log('User created:', user);
  } catch (err) {
    console.error('Error creating user:', err);
  } finally {
    // Закрытие соединения с базой данных
    mongoose.connection.close();
  }
};

// Запуск функции
createUser();