const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

function linkFactory(link) {
    return proxyUrl + link
}

//#region --- Script Index ---
function loadEvents() {}
function unloadEvents() {}

async function loadHTML(hash) {
    let path;
    switch (hash) {
        case "#dados": 
            path = "./html/dados.html";
            loadEvents = loadDadosEvents;
            unloadEvents = unloadDadosEvents;
            break;
        case "#insulto":
            path = "./html/insulto.html";
            loadEvents = loadInsultEvents;
            unloadEvents = unloadInsultEvents;
            break;
        case "":
            unloadHTML();
            path = 0;
    };
    if (path != 0) {
        let res = await fetch(path);
        let text = await res.text();
    
        document.querySelector("#page").innerHTML = text;
    
        loadEvents();
    }
}

async function unloadHTML() {
    unloadEvents();

    document.querySelector("#page").innerHTML = "";
}

window.addEventListener("hashchange", function() {
    loadHTML(location.hash)
})
//#endregion

//#region --- Script Insult ---
async function generateInsult() {
    const res = await fetch(linkFactory(`https://evilinsult.com/generate_insult.php`));
    if (res.status == 200) {
        const text = await res.text();

        const element = document.querySelector("#insultOutput");
        element.innerHTML = text;
        element.style.visibility = "visible";
    }
    else
        alert("Acesse o proxyUrl no topo do script para habilitar novamente, por favor.");
}

function loadInsultEvents() {
    document.querySelector("#generateInsult").addEventListener("click", generateInsult);
}

function unloadInsultEvents() {
    document.querySelector("#generateInsult").removeEventListener("click", generateInsult);
}
//#endregion

//#region --- Script Dados ---
function rolarDados(valor) {
    let rolagem = Math.random() * valor;
    rolagem = Math.ceil(rolagem);

    const element = document.querySelector("#diceResult");
    element.innerHTML = rolagem
    element.style.visibility = "visible";
}

function loadDadosEvents() {
    let buttons = document.querySelector("#rollDiv");

    buttons.addEventListener('click', function(event) {
        if (event.target.value != null) {
            rolarDados(event.target.value);
        }
        
    });
}

function unloadDadosEvents() {
    document.querySelector("#rollDiv").removeEventListener("click", rolarDados);
}
//#endregion