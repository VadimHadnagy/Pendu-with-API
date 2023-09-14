
// Fetch api pokemons

let randomPokemon;

const fetchPokemons = async () => {

    const url = `https://pokeapi.co/api/v2/pokemon?limit=1281&offset=0`;
    const res = await fetch(url);
    const data = await res.json();
    
    let allPokemons = data.results;
    
    randomPokemon = allPokemons[Math.floor(Math.random() * data.count)];

    generateWordCase(randomPokemon);
    generateKeyboard(alphabetArray, keyboard);

};
// Array pour le pendu
let alphabetArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

fetchPokemons();
let wordUnderscore;

// variable de queryselector

const wordDiv = document.querySelector(".word");
const keyboard = document.querySelector(".keyboard");
const winDiv = document.querySelector(".win");
const penduDiv = document.querySelector(".penduDiv");
const penduImg = document.querySelector(".penduImg");

// Element crée

const lifeRemaining = document.createElement("h2");
winDiv.appendChild(lifeRemaining);

// Compteur de lettre bon dans le mots

let goodLetter = 0;
let pendu = 9;
let penduscroll = 0;

updateRemaining();
function updateRemaining() {
    lifeRemaining.innerHTML = "Il vous reste : " + pendu + " essai(s)";
};

// Fonction qui permet la génération de underscore par raport a la taille du mot

function generateWordCase(pokemon) {
    console.log(randomPokemon.name);
    for(let i = 0; i < pokemon.name.split('').length; i++) {  
        // Création d'un élément HTML DIV
        wordUnderscore = document.createElement("div");
        // Acroche la div "wordUnderscore" a ma div html 
        wordDiv.appendChild(wordUnderscore);
        // Ajoute la class css a ma div     
        wordUnderscore.classList.add("wordunderscore" + i, "wordunderscoreStyle");
        // Ajoute l'underscore pour faire devienr le mot
        wordUnderscore.innerHTML = "_"; 
        if(pokemon.name[i] === "-") {
            goodLetter += 1;
            wordUnderscore.innerHTML = "-";
        }
    }
};

// Fonction qui permet la génération du clavier 

function generateKeyboard(arrayAlphabet, keyboard) {
    for(let i = 0; i < arrayAlphabet.length; i++) {
        // Creation d'un element html a pour les lettre du clavier
        const key = document.createElement("div");
        // j'accorche key a la div du clavier
        keyboard.appendChild(key);
        // Ajout de la classe css a l'élément html a
        key.classList.add("key");
        // Ajout des Valeur pour les lettre du clavier quand on clique 
        key.value = arrayAlphabet[i];
        // Affichage visuel des lettre des lettres du clavier
        key.innerHTML = arrayAlphabet[i];
        // Ecouteur d'évenement pour envoyer la valeur des lettre au click a la fonction verify
        key.addEventListener("click", () => {
            verify(key.value, key);
        })
    }
};

function verify(value, key) {
    const looseText = document.createElement("H1");
    if (!randomPokemon.name.includes(value.toLowerCase())) {
        pendu--;
        penduscroll++;
        key.remove();
        penduDiv.appendChild(penduImg);
        console.log(true);
        updateRemaining();
        penduImg.src = "./images/pendu_" + penduscroll + ".jpg";
    };
    
    for(let j = 0; j < randomPokemon.name.length; j++) {
        if(value.toLowerCase() == randomPokemon.name[j]) {
            const wordUnderscoreEnd = document.querySelector(".wordunderscore" + j);
            wordUnderscoreEnd.innerHTML = value;
            key.remove();
            goodLetter++;
        }
        if(goodLetter === randomPokemon.name.length) {
            let winText = document.createElement("H1");
            winDiv.appendChild(winText);
            winText.classList.add("winText");
            winText.innerHTML = "Bravo vous avez gagner : " + randomPokemon.name;
        } 
    };
    if(pendu <= 0) {
        winDiv.appendChild(looseText);
        looseText.innerHTML = "Vous avez perdu le mot était : " + randomPokemon.name;
        looseText.classList.add("looseText");
    }
    };



