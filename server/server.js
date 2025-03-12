const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const dbUri = process.env.DB_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/reviews', require('./routes/reviews'));  

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));