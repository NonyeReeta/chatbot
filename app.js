require("dotenv").config();
const express = require("express");
const { connectToDb } = require("./db");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("./authentication/auth");

const authRouter = require("./routes/auth");
const menuRouter = require('./routes/menu')


// importing cors
const cors = require('cors')

const app = express()
const PORT = 3000

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

// Use express-session middleware to handle sessions
app.use(
  session({
    secret: "qwerty12345",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      //set expiry time for session to 1 hour
      maxAge: 60 * 60 * 1000,
    },
  })
);
// TO HANDLE CORS ERROR
app.use(cors({
    origin: 'http://localhost:4200'
}))


//  CONNECTING TO DATABASE INSTANCE
connectToDb()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', authRouter)
app.use('/new', menuRouter)
app.use("/new/menu", menuRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

module.exports = app;