const obj = {
  value:1,
  values:2,
  asser:3
}

const {value:newne,...others} = obj;

console.log(newne)