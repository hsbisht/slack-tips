const express = require('express')
const bodyParser = require('body-parser');
const slackRouter = require('./routes/slack')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("server started ...")
  res.render('index')
})

app.use("/slack", slackRouter)

app.listen(3000);