const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = "https://rickandmortyapi.com/api";

function fetchData(url, callback) {
  let xhttp = new XMLHttpRequest();

  xhttp.open("GET", url, true);
  xhttp.onreadystatechange = function (event) {
    //0 => no inicializado
    //1 => loading
    //2 => se hizo la llamada
    //3 => trabajando en la llamada
    //4 => ya recibimos la data de la llamda
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        const error = new Error("Error" + url);
        return callback(error, null);
      }
    }
  };

  xhttp.send();
}

fetchData(`${API}/character`, function (error1, data1) {
  if (error1) {
    return console.log(error1);
  }
  fetchData(`${API}/character/2`, function (error2, data2) {
    if (error2) return console.log(error2);

    console.log(data1?.results[0]);
    console.log(data2?.name);
  });
});
