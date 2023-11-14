const fnAsync = () => {
  return new Promise((res, rej) => {
    true
      ? setTimeout(() => {
          res("async");
        }, 2000)
      : rej(new Error("error"));
  });
};

const fn = async () => {
  const response = await fnAsync();
  console.log(response);
  console.log("hola");
};

console.log("before");
fn();
console.log("after");
