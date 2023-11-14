const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const URL = "https://pokeapi.co/api/v2/pokemon/";

const searchInput = document.querySelector("#search");

let pokemonsArray = ["charizard", "bulbasaur", "charmeleon"];

searchInput.addEventListener("keyup", function (event) {
  console.log(event.target.value);

  const filteredPokemons = pokemonsArray.filter((pokemon) =>
    pokemon.includes(event.target.value)
  );

  console.log(filteredPokemons, "filtrados");
});

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

const loadPokemon = async (url) => {
  try {
    for (let i = 1; i <= 151; i++) {
      fetchData(URL + i).then((data) => renderPokemon(data));
    }
  } catch (error) {
    console.error(error);
  }
};

loadPokemon(URL);

const formatId = (id) => {
  let pokemonId = id.toString();
  if (pokemonId.length === 1) {
    pokemonId = "00" + pokemonId;
  } else if (pokemonId.length === 2) {
    pokemonId = "0" + pokemonId;
  }

  return pokemonId;
};

const renderPokemon = ({ id, sprites, name, types, height, weight }) => {
  const pokemonTypes = types.map(
    (type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`
  );
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
    <p class="pokemon-id-back">#${id}</p>
    <div class="pokemon-imagen">
        <img src="${
          sprites.other["official-artwork"].front_default
        }" alt="${name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${formatId(id)}</p>
            <h2 class="pokemon-nombre">${name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${pokemonTypes}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${height}m</p>
            <p class="stat">${weight}kg</p>
        </div>
    </div>
  `;

  listaPokemon.append(div);
};

function mostrarPokemon(poke) {
  let tipos = poke.types.map(
    (type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`
  );
  tipos = tipos.join("");

  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
  listaPokemon.append(div);
}

botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (botonId === "ver-todos") {
            renderPokemon(data);
          } else {
            const tipos = data.types.map((type) => type.type.name);
            if (tipos.some((tipo) => tipo.includes(botonId))) {
              renderPokemon(data);
            }
          }
        });
    }
  })
);
