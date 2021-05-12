import pkg from 'faker';
const { name, phone, lorem } = pkg;


const randomInt = range => Math.floor(Math.random() * range);

Array.prototype.unique = function() {
  return this.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });
};

Array.prototype.pickRandom = function() {
  return this[randomInt(this.length)];
};

const today = new Date();
const at = hours => today.setHours(hours, 0);

const stylists = ['Ashley', 'Jo', 'Pat', 'Sam'];

const services = [
  'Cut',
  'Blow-dry',
  'Cut & color',
  'Beard trim',
  'Cut & beard trim',
  'Extensions'
];

const generateFakeCustomer = () => ({
  firstName: name.firstName(),
  lastName: name.lastName(),
  phoneNumber: phone.phoneNumberFormat(1)
});

const generateFakeAppointment = () => ({
  customer: generateFakeCustomer(),
  stylist: stylists.pickRandom(),
  service: services.pickRandom(),
  notes: lorem.paragraph()
});

export const sampleAppointments = [
  { startsAt: at(9), ...generateFakeAppointment() },
  { startsAt: at(10), ...generateFakeAppointment() },
  { startsAt: at(11), ...generateFakeAppointment() },
  { startsAt: at(12), ...generateFakeAppointment() },
  { startsAt: at(13), ...generateFakeAppointment() },
  { startsAt: at(14), ...generateFakeAppointment() },
  { startsAt: at(15), ...generateFakeAppointment() },
  { startsAt: at(16), ...generateFakeAppointment() },
  { startsAt: at(17), ...generateFakeAppointment() }
];

const pickMany = (items, number) =>
  Array(number)
    .fill(1)
    .map(() => items.pickRandom());

const buildTimeSlots = () => {
  const today = new Date();
        //ts
  const startTime = today.setHours(9, 0, 0, 0);
  const times = [...Array(7).keys()].map(day => {

    const daysToAdd = day * 24 * 60 * 60 * 1000;
    return [...Array(20).keys()].map(halfHour => {
      const halfHoursToAdd = halfHour * 30 * 60 * 1000;
      return {
        startsAt: startTime + daysToAdd + halfHoursToAdd,
        stylists: pickMany(stylists, randomInt(stylists.length))
      };
    });
  });
  return [].concat(...times);
};

export const sampleAvailableTimeSlots = pickMany(
  buildTimeSlots(),
  50
);

//console.log(sampleAvailableTimeSlots)

/* [
    { startsAt: 1620982800000, stylists: [ 'Sam', 'Ashley', 'Ashley' ] },
    { startsAt: 1621011600000, stylists: [] },
    { startsAt: 1621184400000, stylists: [ 'Sam' ] },
    { startsAt: 1621090800000, stylists: [ 'Ashley' ] },
    { startsAt: 1620723600000, stylists: [] },
    { startsAt: 1620914400000, stylists: [ 'Pat' ] },
    { startsAt: 1621251000000, stylists: [ 'Sam', 'Jo', 'Ashley' ] },    
    { startsAt: 1620918000000, stylists: [] },
    { startsAt: 1620723600000, stylists: [] },
    { startsAt: 1620835200000, stylists: [] },
    { startsAt: 1620918000000, stylists: [] },
    { startsAt: 1621159200000, stylists: [ 'Ashley' ] },
    { startsAt: 1621180800000, stylists: [ 'Ashley', 'Pat' ] },
    { startsAt: 1621182600000, stylists: [ 'Jo', 'Pat', 'Sam' ] },       
    { startsAt: 1620981000000, stylists: [] },
    { startsAt: 1620838800000, stylists: [ 'Jo', 'Sam', 'Pat' ] },       
    { startsAt: 1620918000000, stylists: [] },
    { startsAt: 1620822600000, stylists: [ 'Jo', 'Jo', 'Sam' ] },
    { startsAt: 1620831600000, stylists: [] },
    { startsAt: 1621245600000, stylists: [ 'Jo' ] },
    { startsAt: 1621261800000, stylists: [ 'Ashley', 'Ashley', 'Jo' ] },
    { startsAt: 1620986400000, stylists: [] },
    { startsAt: 1620990000000, stylists: [] },
    { startsAt: 1621182600000, stylists: [ 'Jo', 'Pat', 'Sam' ] },
    { startsAt: 1621247400000, stylists: [ 'Ashley', 'Ashley' ] },
    { startsAt: 1620921600000, stylists: [ 'Pat', 'Pat' ] },
    { startsAt: 1620912600000, stylists: [ 'Sam', 'Pat' ] },
    { startsAt: 1620833400000, stylists: [ 'Jo' ] },
    { startsAt: 1621085400000, stylists: [] },
    { startsAt: 1621065600000, stylists: [ 'Sam' ] },
    { startsAt: 1620831600000, stylists: [] },
    { startsAt: 1621092600000, stylists: [ 'Sam', 'Sam' ] },
    { startsAt: 1620910800000, stylists: [ 'Sam' ] },
    { startsAt: 1621004400000, stylists: [] },
    { startsAt: 1620831600000, stylists: [] },
    { startsAt: 1620925200000, stylists: [ 'Ashley', 'Ashley' ] },
    { startsAt: 1621006200000, stylists: [ 'Jo', 'Jo', 'Pat' ] },
    { startsAt: 1620903600000, stylists: [] },
    { startsAt: 1621168200000, stylists: [ 'Sam', 'Jo', 'Sam' ] },
    { startsAt: 1621269000000, stylists: [ 'Ashley', 'Ashley', 'Sam' ] },
    { startsAt: 1621177200000, stylists: [ 'Jo' ] },
    { startsAt: 1621177200000, stylists: [ 'Jo' ] },
    { startsAt: 1621159200000, stylists: [ 'Ashley' ] },
    { startsAt: 1621243800000, stylists: [ 'Sam' ] },
    { startsAt: 1620916200000, stylists: [ 'Pat', 'Sam', 'Ashley' ] },
    { startsAt: 1620727200000, stylists: [] },
    { startsAt: 1620754200000, stylists: [ 'Pat', 'Pat', 'Sam' ] },
    { startsAt: 1621089000000, stylists: [ 'Ashley', 'Ashley', 'Jo' ] },
    { startsAt: 1621069200000, stylists: [ 'Ashley' ] },
    { startsAt: 1620813600000, stylists: [ 'Jo', 'Sam' ] }
  ] */