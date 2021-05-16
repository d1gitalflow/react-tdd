

console.log(spy())

 const spy = () => {
  let receivedArguments;
  return {
    fn: (...args) => (receivedArguments = args),
    receivedArguments: () => receivedArguments,
    receivedArgument: n => receivedArguments[n]
  };
};