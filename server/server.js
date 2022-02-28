const express = require("express");
const cors = require("cors");
const app = express();
const { getPhraseWords, sendPhrase } = require('./controller.js')

app.use(cors());
app.use(express.json())

app.get("/phrase", getPhraseWords)
app.post("/phrase", sendPhrase)



app.listen(5050, () => console.log("The spacecraft is docked at port 5050"))