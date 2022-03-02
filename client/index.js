const getButton = document.querySelector('#getButton')
const wordForm = document.querySelector('#wordFormContain')
const wordSubmit = document.querySelector('#wordSubmit')

let currentPhrase = 0;
let currentPhraseLength = 0;


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

            console.log(res.data)
        });
}


wordSubmit.addEventListener('click', seePhrase)
getButton.addEventListener('click', getPhrase)