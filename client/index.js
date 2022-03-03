const getButton = document.querySelector('#getButton')
const wordForm = document.querySelector('#wordFormContain')
const wordSubmit = document.querySelector('#wordSubmit')
const phraseList = document.querySelector('#phraseList')

let currentPhrase = 0;
let currentPhraseLength = 0;
let phraseArr = [];


const getPhrase = function() {
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

const seePhrase = function() {
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
            let { id, endPhrase } = res.data

            console.log(id)
            console.log(endPhrase)
            phraseArr.push(res.data)
            let phraseCard = `<div class="phraseCard">
            <h2>${endPhrase}</h2>
            <button onclick="deleteCard(${id})">Delete</button>
            </div>
        `
            phraseList.innerHTML += phraseCard


            while (wordForm.hasChildNodes()) {
                wordForm.removeChild(wordForm.firstChild)
            }
        });
}

const deleteCard = function(id) {
    const index = phraseArr.findIndex((element) => { element.id === id })
    console.log(index)
}


wordSubmit.addEventListener('click', seePhrase)
getButton.addEventListener('click', getPhrase)