const { application } = require("express")

module.exports = { getPhraseWords, setPhrase, sendPhrase, deletePhrase }

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
                    return (`Double, double toil and trouble. ${bodypart1} of newt and toe of ${animal1}, ${bodypart2} of bat and tongue of ${animal2}`)
                }
            },
            {
                id: 3,
                neededWords: ["verb", "plural noun", "plural noun"],
                finishPhrase(wordArr) {
                    const verb = wordArr[0]
                    const noun1 = wordArr[1]
                    const noun2 = wordArr[2]
                    return (`You can ${verb} more flies with ${noun1} than you can with ${noun2}`)
                }
            }
        ]
    }
}

function deletePhrase(req, res) {
    let {
        index
    } = req.params
    phraseArr.splice(index, 1);
    res.status(200).send("phrase has been deleted")

}

function setPhrase(req, res) {
    const { id, words } = req.body
    let correctPhrase = data().phrase.filter(function(value) {
        return value.id === id
    })

    let results = correctPhrase[0].finishPhrase(words)
    let wholePhrase = {
        id: id,
        endPhrase: results
    }
    phraseArr.push(wholePhrase)

    res.status(200).send(wholePhrase)

}


function getPhraseWords(req, res) {
    const randomIndex = Math.floor(Math.random() * data().phrase.length)
    const phraseWords = data().phrase[randomIndex];
    res.status(200).send(phraseWords)
}

function sendPhrase(req, res) {

    res.status(200).send(phraseArr)
}