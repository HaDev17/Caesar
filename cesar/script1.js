//Create the alphabet array

const Alphabet = []

for (i = 0; i < 26; i++) {
    Alphabet.push(String.fromCharCode(65+i))
}
//console.log(Alphabet) // ["A","B"....,"Z"]

// Create a function to get the position of a given caracter of message 

function get_p(c){
    c = c.toUpperCase();
    for (let i = 0; i < 26; i++) {
       if (c == Alphabet[i]) {
           return i;
       }
    }
}

// Create a function to get the caracter of a given position 

function get_c(p){
    for (let i = 0; i < 26; i++) {
       if (p == i) {
           return Alphabet[i];
       }
    }
}


// Create our cesar cipher 

function cesar(msg, key, verifie){
    msg    = msg.toUpperCase();
    newMsg = "";
    
    for (i = 0; i < msg.length; i++) {
    
       if(msg[i] == ' '){
           newMsg = newMsg.concat(msg[i]);
       } else {
           pos = get_p(msg[i]);
           let res;
           if(verifie == true){
               res = pos+key
           } else {
               if (key > 26) key = key%26;
               res = (pos-key<0)?pos-key+26:pos-key;
           }
           newMsg = newMsg.concat( get_c(res%26) )
       }
    }
    return newMsg
}



    let btn1    = document.getElementById("btn1");
    let btn2    = document.getElementById("btn2");
    let input1  = document.getElementsByTagName("textarea")[0];
    let input2  = document.getElementsByTagName("input")[0];
    
    let msg,key;
    const verifMsg = /^[a-z\s]+$/i
    const verifKey = /^[0-9]+$/i
    input1.addEventListener("input", (e) => {
         if(verifMsg.test(e.target.value)){
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
        if(verifKey.test(e.target.value)){
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

        btn1.addEventListener("click", ()=> {
            if((msg != undefined) && (key !== undefined)) {
                popupMsg(msg, parseInt(key), true)
                console.log(msg, key)
            }
        })
        
        btn2.addEventListener("click", ()=> {
            if((msg != undefined) && (key !== undefined)) {
                popupMsg(msg, parseInt(key), false)
                console.log(msg, key)
            }
        })

    id = null;
    let circle = document.getElementById("svg-circle")
    async function popupMsg(msg, key, check){
        clearInterval(id)
        i = 0;
        p = check?-1:1;
        pos = 13;
            id = setInterval(() => {
                circle.style.transform = `rotate(${p*(pos+i)}deg)`;
                i++;
                pos = pos +13;
                if(((key+1)%26 * 13) == pos ){
                    clearInterval(id)
                }
            },500);
            setTimeout(() => {
                show(msg,key,check)
            }, 500*((key+1)%26));

    }
    function show(msg, key, check){
        let content = document.querySelector(".popup .modal-body")
        let title = document.querySelector(".popup h5")
        title.textContent = check?"Le chiffrement est :":"Le dechiffrement est :";
        content.textContent = cesar(msg,key, check);
        document.querySelector(".btn").click()
        input1.value=''
        input2.value=''
        msg = undefined
        key= undefined
        circle.style.transform = `rotate(${0}deg)`;
        
    }
    
    