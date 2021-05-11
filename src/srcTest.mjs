function factory() {
  return (a, b) => a + b;
}

const sum1 = factory();
const sum2 = factory();

console.log(sum1(1, 2)); // => 3
console.log(sum2(1, 2)); // => 3

const isIt1 = sum1(1,2) === sum2(1,2)
console.log(isIt1)