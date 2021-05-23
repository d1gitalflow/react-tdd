const smallFn = () =>{
  return {
    prop1: (rec) => rec+1,
    prop2: (rec) => rec*2
  }
}



//vs
let prop2; //otherwise the prop1 obj is 'undefined'
({prop1} = smallFn())
let prop1Store = prop1(2);
console.log(prop1Store)

