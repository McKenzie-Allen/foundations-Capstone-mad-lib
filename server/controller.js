const { application } = require("express")

module.exports = { getPhraseWords, sendPhrase }

let phraseArr = []

function data() {
    return {
        phrase: [{
                id: 1,
                neededWords: ["noun", "verb", "adjective"],
                finishPhrase(wordArr) {
                    const noun = wordArr[0]
                    const verb = wordArr[1]
                    const adjective = wordArr[2]
                    return (`Early to ${noun} early to ${verb} makes a man healthy wealthy and ${adjective}`)
                }
            },
            {
                id: 2,
                neededWords: ["bodypart", "animal", "bodypart", "animal"],
                finishPhrase(wordArr) {
                    const bodypart1 = wordArr[0]
                    const animal1 = wordArr[1]
                    const bodypart2 = wordArr[2]
                    const animal2 = wordArr[3]
                    return (`${bodypart1} of newt and toe of ${animal1}, ${bodypart2} of bat and tongue of ${animal2}`)
                }
            }
        ]
    }
}

function sendPhrase(req, res) {
    const { id, words } = req.body
    let correctPhrase = data().phrase.filter(function(value) {
        return value.id === id
    })

    let results = correctPhrase[0].finishPhrase(words)
    let wholePhrase = {
        id: id,
        endPhrase: results
    }

    res.status(200).send(wholePhrase)

}


function getPhraseWords(req, res) {
    const randomIndex = Math.floor(Math.random() * data().phrase.length)
    const phraseWords = data().phrase[randomIndex];
    res.status(200).send(phraseWords)
}