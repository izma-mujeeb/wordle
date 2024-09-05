import {getWords} from '/words.js' 

const wordsList = getWords().split("\n"); // an array of all valid words
let wordGenerated = "", guessWord = "";
let count = 1, count2 = 5;

const b1 = document.getElementById("1"); //character divs 
const b2 = document.getElementById("2");
const b3 = document.getElementById("3");
const b4 = document.getElementById("4");
const b5 = document.getElementById("5");
const b6 = document.getElementById("6");
const b7 = document.getElementById("7");
const b8 = document.getElementById("8");
const b9 = document.getElementById("9");
const b10 = document.getElementById("10");

const b11 = document.getElementById("11");
const b12 = document.getElementById("12");
const b13 = document.getElementById("13");
const b14 = document.getElementById("14");
const b15 = document.getElementById("15");
const b16 = document.getElementById("16");
const b17 = document.getElementById("17");
const b18 = document.getElementById("18");
const b19 = document.getElementById("19");
const b20 = document.getElementById("20");

const b21 = document.getElementById("21");
const b22 = document.getElementById("22");
const b23 = document.getElementById("23");
const b24 = document.getElementById("24");
const b25 = document.getElementById("25");
const b26 = document.getElementById("26");
const b27 = document.getElementById("27");
const b28 = document.getElementById("28");
const b29 = document.getElementById("29");
const b30 = document.getElementById("30");

const buttons = document.querySelectorAll(".btn"); //all of the buttons 
const enter = document.getElementById("enter"); // enter button
const erase = document.getElementById("x_"); //erase button

wordGenerated = wordGenerator(); 
console.log(wordGenerated);

let alphabet = [];
let guessed = false;

for (let button of buttons) {
    button.addEventListener("click", (event) => {
        eval("b" + count).textContent = button.id.toUpperCase();
        eval("b" + count).classList.add("boxes");
        guessWord += button.id;
        alphabet.push(button); 
        count++;
    })
}

enter.addEventListener("click", (event) => {
    if (guessWord.length !== 5) {
        popups("Not Enough Letters"); 
    } else if (!validWord(guessWord, wordsList)) {
        popups("Not in Word list");
    } else {
        const letters = correctLetters(guessWord, wordGenerated.trim());
        colorChange(alphabet, letters)
        guessWord = "";
        count2 += 5;
        alphabet = []
    }
    if (count === 31 && !guessed) {
        popups(wordGenerated);
    }
})

erase.addEventListener("click", (event) => {
    guessWord = guessWord.slice(0, guessWord.length - 1);
    eval("b" + (count - 1)).textContent = "";
    count--;
    alphabet.pop();
})

function popups(sentence) {
    const text = document.createElement("h2");
    text.classList.add("text");
    document.getElementById("wrap-container").appendChild(text);
    setTimeout(() => {
        text.textContent = sentence;
    }, 500);
    setTimeout(() => {
        text.textContent = "";
        text.classList.remove("text");
    }, 3000)
}

function colorChange(alphabet, letters) { //change color of buttons and the alphabet 
    for (let x = 0; x < letters.length; x++) {
        if (letters[x] === "green") {
            eval("b" + (count - count2)).style.backgroundColor = "#538d4e";
            alphabet[x].style.backgroundColor = "#538d4e";
        } else if (letters[x] === "yellow") {
            eval("b" + (count - count2)).style.backgroundColor = "#b59f3b";
            alphabet[x].style.backgroundColor = "#b59f3b";
        } else {
            eval("b" + (count - count2)).style.backgroundColor = "#363636";
            alphabet[x].style.backgroundColor = "#363636";
        }
        eval("b" + (count - count2)).style.border = "none";
        count2--;
    }
}

function validWord(inputWord, wordsList) { // check to see if a word is valid 
    for (const word of wordsList) {
        if (inputWord === word.trim()) {
            return true;
        }
    }
    return false;
}

function wordGenerator() { // random word generator 
    const randomNum = Math.floor(Math.random() * wordsList.length);
    return wordsList[randomNum];
}

function correctLetters(guess, wordGenerated) { //determines which letters are in the correct place 
    let letterColors = ["gray", "gray", "gray", "gray", "gray"];
    let count = 0, count2 = 0; 
    for (let x = 0; x < wordGenerated.length; x++) {
        for (let y = 0; y < guess.length; y++) {
            if (wordGenerated[x] === guess[y] && x === y) {
                letterColors[x] = "green";
                count2++;
            } else if (wordGenerated[x] === guess[y] && letterColors[y] === "gray") {
                letterColors[y] = "yellow";
                count++;
            } 
            if (count > 1) {
                letterColors[y] = "gray";
            }
            
        }
        count = 0;
    }
    if (count2 === 5) {
        guessed = true;
        popups("Wonderful!"); 
    }
    return letterColors;
}


