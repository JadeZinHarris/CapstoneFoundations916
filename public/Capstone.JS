const form = document.querySelector('form');
const nameInput = document.querySelector('#name-input');
const characterSelect = document.querySelector('#character-select');
const characterList = document.querySelector('#character-list');
const btn = document.querySelector("#btn");
const answers = document.querySelector("#answers");

function handleSubmit(e) {
    e.preventDefault()
    

    if (nameInput.value.length < 1) {
        alert('You must enter a Champion')
        return
    }

    let userDifficulty = document.querySelector('input[name="difficulty"]:checked').value
    let body = {
    
        name: nameInput.value, 
        difficulty: +userDifficulty, 
        character_id: +characterSelect.value
       
    }
   
    axios.post('http://localhost:4004/champion', body)
        .then(() => {
            characterSelect.value = 1
            nameInput.value = ''
            document.querySelector('#difficulty-one').checked = true
             getChampions()
        })
}

function deleteCard(id) {
    axios.delete(`http://localhost:4004/champion/${id}`)
        .then(() => getChampions())
        .catch(err => console.log(err))
}

function getChampions() {
console.log('hit get champions')
characterList.innerHTML= ''
    axios.get('http://localhost:4004/champions')
        .then(res => {
            console.log(res.data)

            res.data.forEach(elem => {
                let characterCard= document.createElement('div')
                characterCard.innerHTML=`
                    <h2>${elem.name}, ${elem.character_id}</h2>
                    <h3>Rating: ${elem.difficulty}/5</h3>
                <button onclick="deleteCard(${elem['champion_id']})">Delete</button>
                    </div>
                `
               characterList.append(characterCard)
            })
        })
}

function getCharacter() {
    axios.get('http://localhost:4004/characters')
        .then(res => {
            res.data.forEach(character => {
                const option = document.createElement('option')
                option.setAttribute('value', character.character_id)
                option.textContent = character.name
                characterSelect.appendChild(option)
              
              
            })
        })
}



getCharacter()
getChampions()
form.addEventListener('submit', handleSubmit)

const optionsz = [
    '"I am bound, but I will not break."-Morgana',
    '"I see you lack judgement."-Kayle',
    '"Being a hero kind of runs in the family."-Lux',
    '"What masterpiece shall we play today?"-Sona',
    '"From out of the sewers comes... doom."-Twitch',
    '"You make it easy to be unimpressed."-Tristana',
    '“I find that the stranger life gets, the more it seems to make sense.” -Ivern',
    '“I have found my limit a thousand times, and still I press further.” -Pantheon',
    '“A shepherd with no flock is just an idiot with a stick.” -Sylas',
    '“Only a fool plays the hand he is dealt.” -Twisted Fate'
];
btn.addEventListener("click",()=> {
    let randomAnswer = optionsz[Math.floor(Math.random() *optionsz.length)];
    answers.textContent = randomAnswer;
    answers.style.display = "block";
})