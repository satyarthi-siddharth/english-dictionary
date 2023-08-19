const inputEl = document.getElementById("input");
const msgEl = document.getElementById("message");
const resContainerEl = document.getElementById("result-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word){
    try{
        msgEl.style.display = "block";
        resContainerEl.style.display = "none";
        msgEl.innerText = `Searching for the meaning of word "${word}"`;
        const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((res)=>res.json());
        if(result.title){
            msgEl.innerText = `${result.title}, Try Another Word...`;
        }else{
            msgEl.style.display = "none";
            titleEl.innerText = result[0].word;
            titleEl.style.textTransform = "capitalize";
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            resContainerEl.style.display = "block";
            audioEl.src = result[0]?.phonetics[0]?.audio;
            console.log(result);
        }
        
    }catch(error){
        msgEl.innerText = "An error has occured, try again later...";
    }

}

inputEl.addEventListener("keyup", (e) => {
    if(e.target.value && e.key === "Enter"){
        fetchAPI(e.target.value);
    }else if(e.target.value === ""){
        msgEl.innerText = "Type a word and press enter...";
        msgEl.style.display = "block";
        resContainerEl.style.display = "none";
    }
})