const { application } = require("express")

module.exports = { getPhraseWords, sendPhrase }

const currentPhrase = []

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

    // let currentPhrase = data().filter(phrase => { phraseId === phrase.id })
    // let completedPhrase = currentPhrase.finishPhrase(words)
    // res.status(200).send(completedPhrase)
    console.log(data().phrase[0].finishPhrase(["dog", "eye", "cat", "nose"]))
}


function getPhraseWords(req, res) {
    const randomIndex = Math.floor(Math.random() * data().phrase.length)
    const phrase = data().phrase[randomIndex];
    res.status(200).send(phrase)
}