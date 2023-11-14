const API = "https://rickandmortyapi.com/api";

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

const fn = async (url) => {
  try {
    const characters = await fetchData(`${url}/character`);
    const morty = await fetchData(`${url}/character/2`);

    console.log(characters);
    console.log(morty.name, "morty");
  } catch (error) {
    console.error(error);
  }
};

fn(API);
