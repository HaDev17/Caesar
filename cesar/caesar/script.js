//-------------------------------create the caesar algorithme --------------------------------

//Create the alphabet array

const Alphabet = []

for (i = 0; i < 26; i++) {
    Alphabet.push(String.fromCharCode(65 + i))
}
//console.log(Alphabet) // ["A","B"....,"Z"]

// Create a function to get the position of a given caracter of message 

function get_p(c) { 
    c = c.toUpperCase();
    for (let i = 0; i < 26; i++) {
        if (c == Alphabet[i]) {
            return i;
        }
    }
}

// Create a function to get the caracter of a given position 

function get_c(p) {
    for (let i = 0; i < 26; i++) {
        if (p == i) {
            return Alphabet[i];
        }
    }
}


// Create our cesar cipher 

function cesar(msg, key, verifie) {
    msg = msg.toUpperCase();
    newMsg = "";

    for (i = 0; i < msg.length; i++) {

        if (msg[i] == ' ') {
            newMsg = newMsg.concat(msg[i]);
        } else {
            pos = get_p(msg[i]);
            let res;
            if (verifie == true) {
                res = pos + key
            } else {
                if (key > 26) key = key % 26;
                res = (pos - key < 0) ? pos - key + 26 : pos - key;
            }
            newMsg = newMsg.concat(get_c(res % 26))
        }
    }
    return newMsg
}

//-------------------------------Put it on the web ----------------------------------


//-------------------------------------Variables-------------------------------------
let btn1     = document.getElementById("btn1");
let btn2     = document.getElementById("btn2");
let input1   = document.getElementsByTagName("textarea")[0];
let input2   = document.getElementsByTagName("input")[0];
let circle   = document.getElementById("svg-circle");
let id       = null;
let msg, key;
let form = document.querySelector(".form")
let wheel = document.querySelector(".circle")



function display() {
    circle.style.transform = `rotate(${0}deg)`;
    setTimeout(() => {
        form.style.visibility = "hidden"
        form.style.opacity = "0" 
    }, 1000);
    form.style.display = "none"
    wheel.style.display = "grid"
}
function undisplay() {
    form.style.display = "flex"
    form.style.visibility ="visible"
    form.style.opacity = 1
    wheel.style.display = "none"
}

// Creat a regular expression that allow just alphabet 
const verifMsg = /^[a-z\s]+$/i
// Creat a regular expression that allow just numbers
const verifKey = /^[0-9]+$/i

//---------------------Get the messge and the key from input tags--------------------
//****************with some design****************
input1.addEventListener("input", (e) => {
    if (verifMsg.test(e.target.value)) {
        msg = e.target.value;
        input1.classList.remove("warning")
        input1.classList.add('good')
    }
    else {
        input1.classList.add("warning")
        input1.classList.remove('good')
        msg = undefined
    }
})

input2.addEventListener("input", (e) => {
    if (verifKey.test(e.target.value)) {
        key = e.target.value;
        input2.classList.remove("warning")
        input2.classList.add('good')
    }
    else {
        input2.classList.add("warning")
        input2.classList.remove('good')
        key = undefined
    }
})

//Event listener "click" when the user click on chiffre and dechiffre buttons we call the popupMsg function
btn1.addEventListener("click", () => {
    if ((msg != undefined) && (key !== undefined)) {
        display()
        popupMsg(msg, parseInt(key), true)
        //console.log(msg, key)
    }
})

btn2.addEventListener("click", () => {
    if ((msg != undefined) && (key !== undefined)) {
        display()
        popupMsg(msg, parseInt(key), false)
        //console.log(msg, key)
    }
})


//************************Function to create the rotaion of the wheel************************
async function popupMsg(msg, key, check) {
    clearInterval(id)
    i = 0;
    p = check ? -1 : 1;
    pos = 13;
    setTimeout(() => {
        id = setInterval(() => {
            circle.style.transform = `rotate(${p * (pos + i)}deg)`;
            i++;
            pos = pos + 13;
            if (((key + 1) % 26 * 13) == pos) {
                clearInterval(id)
            }
        }, 500);
        // Whait until the rotation of the wheel end and call the function show
        setTimeout(() => {
            show(msg, key, check)
        }, 500 * ((key + 1) % 26));
    
    }, 800);
    
}

// Function to show the result , with popup message using bootstrap library
function show(message, k, check) {
    let content = document.querySelector(".popup .modal-body")
    let title = document.querySelector(".popup h5")
    title.textContent = check ? "Le chiffrement est :" : "The decrypted message is :";
    //Call the caesar function to return the cipher message 
    content.textContent = cesar(message, k, check);
    document.querySelector(".btn").click()
    input1.value = ''
    input2.value = ''
    msg = undefined
    key = undefined
    //circle.style.transform = `rotate(${0}deg)`;
}


document.querySelector('.close').addEventListener('click', ()=> {
    undisplay()
})
// document.querySelector('#exampleModalCenter').addEventListener('click', ()=> {
//     undisplay()
// })

document.addEventListener("click", (e)=> {
    console.log(e.target.classList)
    if(!e.target.classList.contains("modal-body") && e.target.classList.contains("fade") ) {
        undisplay()
    }
})