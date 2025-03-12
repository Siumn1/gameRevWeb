const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config();


const port = process.env.PORT || 5000


app.use(cors({ origin: '*' }))
app.use(express.json());

const { get_auths_table } = require('./models/auth')
const { get_users_table } = require('./models/users')
// const { get_courses_table } = require('./models/courses')
// const { get_feedbacks_table } = require('./models/feedbacks')
const { get_registrations_table } = require('./models/registration');
const { get_review_table } = require("./models/review");
get_auths_table()
get_users_table()
// get_courses_table()
get_review_table()
get_registrations_table()


// const auths_routes = require('./routes/auths')
// const users_routes = require('./routes/users')
const review_routes = require('./routes/review')
// const feedbacks_routes = require('./routes/feedbacks')
// const registrations_routes = require('./routes/registrations')

// app.use('/api/auth', auths_routes)
// app.use('/api/user', users_routes)
app.use('/api/review', review_routes)
// app.use('/api/feedback', feedbacks_routes)
// app.use('/api/registration', registrations_routes)

app.use((error, request, response, next) => {
  if (error instanceof SyntaxError)
      return response.status(400).send({ message: 'not valid data' })
  else
      next()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})