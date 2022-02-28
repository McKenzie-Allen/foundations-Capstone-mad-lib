const getButton = document.querySelector('#getButton')
const wordForm = document.querySelector('#wordFormContain')
const wordSubmit = document.querySelector('#wordSubmit')

let currentPhrase = []
const getPhrase = function() {
    axios.get('http://localhost:5050/phrase')
        .then(function(res) {
            const wordArr = res.data;
            const word = document.createElement('input')
            while (wordForm.hasChildNodes()) {
                wordForm.removeChild(wordForm.firstChild)
            }

            wordArr.forEach(element => {
                word.type = 'text'
                word.placeholder = element
                word.className = 'neededWords'
                wordForm.appendChild(word.cloneNode(true))
            });

        });
};

const seePhrase = function() {
    axios.post('http://localhost:5050/phrase', id)
        .then(function(res) {
            let { phrase } = res.body
            console.log(phrase)
        })
}


wordSubmit.addEventListener('click', seePhrase)
getButton.addEventListener('click', getPhrase)