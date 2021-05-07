

const weeklyDateValues = () => {
  const today = new Date().setHours(9,10,0,0);
  const increment = 24 * 60 * 60 * 1000;
  return Array(7)
      .fill([today])
      .reduce((acc, _, i) =>
          acc.concat([today + (i * increment)])
      );
};

const toTimeValue = (timestamp) => {

  //converts to: 09:00 ... til 19:00(string) for each timestamp
  return new Date(timestamp)
}
console.log(toTimeValue(weeklyDateValues()))