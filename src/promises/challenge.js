const API = "https://rickandmortyapi.com/api";

function fetchData(url) {
  return fetch(url);
}

// fetchData(`${API}/character`)
//   .then((response) => response.json())
//   .then((characters) => console.log(characters))
//   .catch((error) => console.log(error));

fetchData(`${API}/character`)
  .then((response) => response.json())
  .then((characters) => {
    console.log(characters);
    return fetchData(`${API}/character/2`)
      .then((response) => response.json())
      .then((character) => console.log(character.name, "test"));
  })
  .catch((error) => console.log(error));
