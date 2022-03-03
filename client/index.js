const getButton = document.querySelector('#getButton')
const wordForm = document.querySelector('#wordFormContain')
const wordSubmit = document.querySelector('#wordSubmit')
const phraseList = document.querySelector('#phraseList')


let currentPhrase = 0;
let currentPhraseLength = 0;


const getPhraseWords = function() {
    axios.get('http://localhost:5050/phrase')
        .then(function(res) {
            const { id, neededWords } = res.data;
            const word = document.createElement('input')
            while (wordForm.hasChildNodes()) {
                wordForm.removeChild(wordForm.firstChild)
            }
            currentPhrase = id
            currentPhraseLength = neededWords.length


            neededWords.forEach(function(element, index) {

                word.type = 'text'
                word.placeholder = element
                word.className = 'neededWords'
                word.name = `input${index}`
                wordForm.appendChild(word.cloneNode(true))
            });

        });
};



const setPhrase = function() {
    words = document.querySelectorAll('.neededWords')
    wordsSend = []

    for (let i = 0; i < words.length; i++) {
        wordsSend.push(words[i].value)
    }
    let body = {
        id: currentPhrase,
        words: wordsSend
    }
    axios.post('http://localhost:5050/phrase', body)
        .then(function(res) {


            while (wordForm.hasChildNodes()) {
                wordForm.removeChild(wordForm.firstChild)
            }
            seeAllPhrases();
        });
}
const seeAllPhrases = function() {
    phraseList.innerHTML = ``
    axios.get('http://localhost:5050/all')
        .then(function(res) {
            res.data.forEach(function(element, index) {
                let phraseCard = `<div class="phraseCard">
                    <h2>Phrase${index+1}</h2>
                    <h3>${element.endPhrase}</h3>
                    <button onclick="deleteCard(${index})">Delete</button>
                    </div>
                `
                phraseList.innerHTML += phraseCard

            })

        })
}
const deleteCard = function(index) {
    axios.delete(`http://localhost:5050/phrase/${index}`)
        .then(function(res) {
            console.log(res.data)
            seeAllPhrases();
        });
}


wordSubmit.addEventListener('click', setPhrase)
getButton.addEventListener('click', getPhraseWords)