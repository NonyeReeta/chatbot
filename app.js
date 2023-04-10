require("dotenv").config();
const express = require("express");
const { connectToDb } = require("./db");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path"); 
require("./authentication/auth");

// importing the data models
const botMenuModel = require("./models/botMenu");

const authRouter = require("./routes/auth");
const menuRouter = require('./routes/menu');
const botMenuRouter = require('./routes/botMenu')
const chatRouter = require('./routes/chat')

// importing cors
const cors = require('cors')

const app = express()
const PORT = process.env.PORT;

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

// rendering a veiw
app.set("view engine", "ejs");
//setting the public folder as the static folder
app.use('/public',express.static(path.join(__dirname, "/public")));

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
app.use(
  cors({
    origin: "*"
  })
  );


//  CONNECTING TO DATABASE INSTANCE
connectToDb()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = req.session;

   // get initial options
    botMenuModel
      .find({})
      .then((questions) => {
         if (
           session &&
           session.id === sessionId &&
           session.deviceId === req.headers["user-agent"]
         ) {
          res.render('index', {questions})
         } else {
           req.session.deviceId = req.headers["user-agent"];
           res.cookie("sessionId", req.session.id);
           res.render("index", { questions });
         } 
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
})

app.use('/', authRouter)
app.use('/new', menuRouter)
app.use("/new/menu", menuRouter)
app.use('/bot', botMenuRouter)
app.use("/bot/menu", botMenuRouter);
app.use("/chat", chatRouter);



app.listen(PORT, '0.0.0.0', () => {
  console.log(`server listening on port ${PORT}`);
});

module.exports = app;