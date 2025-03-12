const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
 // Импорт модели

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const DB_URI = "mongodb://127.0.0.1:27017/testDB";

app.use(cors());
app.use(express.json());

// Функция для подключения к базе данных
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Таймаут 5 секунд
    });
    const User = require('../models/User');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Завершить процесс с ошибкой
  }
};

// Запуск приложения
const startApp = async () => {
  await connectDB(); // Подключение к базе данных
  const User = require('../models/User');
  

  // Запуск сервера
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

// Запуск приложения
startApp();