const cows = 9;

const countCows = new Promise((res, rej) => {
  if (cows > 10) {
    res(`Si tenemos las vacas necesarias, tenemos ${cows}`);
  } else {
    rej("No contamos con las vacas necesarias");
  }
});

countCows
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => console.log("se acabo la promesa"));
