const getButton = document.querySelector('#getButton')
const wordForm = document.querySelector('#wordFormContain')
const wordSubmit = document.querySelector('#wordSubmit')

let currentPhrase = 0;
let currentPhraseLength = 0;
// const getPhrase = function() {
//     axios.get('http://localhost:5050/phrase')
//         .then(function(res) {
//             const wordArr = res.data;
//             const word = document.createElement('input')
//             while (wordForm.hasChildNodes()) {
//                 wordForm.removeChild(wordForm.firstChild)
//             }

//             wordArr.forEach(element => {
//                 word.type = 'text'
//                 word.placeholder = element
//                 word.className = 'neededWords'
//                 wordForm.appendChild(word.cloneNode(true))
//             });

//         });
// };

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
    words = []
    for (i = 0; i > currentPhraseLength; i++) {
        words.push(document.querySelector(`input[name="input 0]"`))
    }
    console.log(words)

    // axios.post('http://localhost:5050/phrase', body)
    //     .then(function(res) {
    //         console.log(phrase)
    //     });
    // currentPhrase = 0
    // currentPhraseLength = 0
}


wordSubmit.addEventListener('click', seePhrase)
getButton.addEventListener('click', getPhrase)