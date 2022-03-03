const express = require("express");
const cors = require("cors");
const app = express();
const { getPhraseWords, setPhrase, sendPhrase, deletePhrase } = require('./controller.js')

app.use(cors());
app.use(express.json())

app.get("/phrase", getPhraseWords)
app.post("/phrase", setPhrase)
app.get("/all", sendPhrase)
app.delete("/phrase/:index", deletePhrase)



app.listen(5050, () => console.log("The spacecraft is docked at port 5050"))