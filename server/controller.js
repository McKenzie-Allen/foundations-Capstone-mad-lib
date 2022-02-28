module.exports = { getPhraseWords, sendPhrase }

const currentPhrase = []

function data() {
    return {
        phrase: {
            id: 1,
            neededWords: ["noun", "verb", "adjective"],
            finishPhrase(wordArr) {
                const noun = wordArr[0]
                const verb = wordArr[1]
                const adjective = wordArr[2]
                return (`Early to ${noun} early to ${verb} makes a man healthy wealthy and ${adjective}`)
            }
        }
    }
}

function sendPhrase(req, res) {
    const { words, phraseId } = req.body
    let currentPhrase = data().filter(phrase => { phraseId === phrase.id })
    let completedPhrase = currentPhrase.finishPhrase(words)
    res.status(200).send(completedPhrase)
}


function getPhraseWords(req, res) {
    currentPhrase.splice(0, 1)
    const phrase = data().phrase.neededWords;
    res.status(200).send(phrase)
    currentPhrase.push(data().phrase.id)
    console.log(currentPhrase)
}