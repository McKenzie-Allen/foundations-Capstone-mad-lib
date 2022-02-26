const express = require("express");
const cors = require("cors");
const app = express();
const { getPhraseWords } = require('./controller.js')

app.use(cors());
app.use(express.json())

app.get("/phrase", getPhraseWords)




app.listen(5050, () => console.log("The spacecraft is docked at port 5050"))