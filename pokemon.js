let btnEl = document.getElementById("zoekBtn");
let infoEl = document.getElementById("pokemonInfo");
let nameInputEl = document.getElementById("nameInput");

async function haalDataOp() {
    try {
        let gekozenNaam = nameInputEl.value.toLowerCase(); 
        let url = `https://pokeapi.co/api/v2/pokemon/${gekozenNaam}`;
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(response.status);
        };

        let data = await response.json();
        console.log(data);
        toonData(data);
    }
    catch(error) {
        infoEl.textContent = "naam niet gevonden";
        infoEl.style.color = "red";
        console.error(error);
    }
};

function toonData(pokemon) {
    infoEl.innerHTML = "";
    let card = document.createElement("div");
        card.classList.add("card");

    let nameEl = document.createElement("p");
    nameEl.textContent = pokemon.name;
    card.appendChild(nameEl);

    let imgEl = document.createElement("img");
    imgEl.src = pokemon.sprites.front_default;
    imgEl.alt = pokemon.name;
    card.appendChild(imgEl);

    pokemon.types.forEach(element => {
        let typeEl = document.createElement("p");
        typeEl.textContent = element.type.name;
        card.appendChild(typeEl);
    });

    infoEl.appendChild(card);
};

btnEl.addEventListener("click", haalDataOp);