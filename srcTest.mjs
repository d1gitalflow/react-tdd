const spy = () => {
  let receivedArguments;
  return {
    fn: (...arg) => (receivedArgument = arg),
    receivedArguments: () => receivedArguments,
    //access the 'receivedArguments' array specific element
    receivedArgument:(n)=>{return receivedArguments[n]}
  };
};


