import React, { useState } from 'react';

//receives opening and closing hours
//returns 
const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
    const totalSlots = (salonClosesAt - salonOpensAt) * 2;
    const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
    const increment = 30 * 60 * 1000;
    
    /* Example returned timestamp 
      [
        1620288000000, 1620289800000,
        1620291600000, 1620293400000,
        1620295200000, 1620297000000,
        1620298800000, 1620300600000,
        1620302400000, 1620304200000,
        1620306000000, 1620307800000,
        1620309600000, 1620311400000,
        1620313200000, 1620315000000,
        1620316800000, 1620318600000,
        1620320400000, 1620322200000
      ] */
    
    
    return Array(totalSlots).fill([startTime]).reduce((acc, _, i) => { return acc.concat([startTime + (i * increment)]) });
}

const weeklyDateValues = (startDate) => {
    const midnight = new Date(startDate).setHours(0,0,0,0);
    const increment = 24 * 60 * 60 * 1000
    return Array(7).fill([midnight]).reduce((acc,_,i)=>{return acc.concat([midnight + (i*increment)])})

}

const toTimeValue = (timestamp) => {

    //converts to: 09:00 ... til 19:00(string) for each timestamp
    return new Date(timestamp).toTimeString().substring(0, 5);
}
const toShortDate = (timestamp) => {
    console.log(new Date(timestamp));
    const [day, dayOfMonth] = new Date(timestamp)
    .toDateString()
    .split(' ');
    return `${day} ${dayOfMonth}`;
}


//displays hours (TimeTableSlot) component
const TimeTableSlot = ({
    salonOpensAt,
    salonClosesAt,
    today
}) => {
    const timeSlots = dailyTimeSlots(
        salonOpensAt,
        salonClosesAt
    )
    const dates = weeklyDateValues(today);

    return (
        <table id="time-slots">
            <thead>
                <tr>
                   {dates.map((d) => {return <th key={d}>{toShortDate(d)}</th>})} 
                </tr>
            </thead>
            
            <tbody>
                {timeSlots.map((timeSlot) => {
                    return (
                        <tr key={timeSlot}>
                            <th>{toTimeValue(timeSlot)}</th>
                        </tr>
                    )
                })}
            </tbody>
        </table>

    )
}


export const AppointmentForm = ({ selectableServices, service, onSubmit,
    salonOpensAt,
    salonClosesAt,
    today
}) => {

    const [appointment, setAppointment] = useState({ service })

    const handleChange = ({ target }) => {
        setAppointment(
            (prevAppointment) => {
                return {
                    ...prevAppointment, //previous service:'Blow-dry'
                    service: target.value //updated to service:'Blow-dry'
                }
            }
        )
    }

    return (
        <form id="appointment" onSubmit={() => { return onSubmit(appointment) }}>
            <label htmlFor="service" id="service">Salon service</label>
            <select
                id="service"
                name="service"
                value={service}
                onChange={handleChange}
                readOnly>
                <option />
                {selectableServices.map(s => (
                    <option key={s}>{s}</option>
                ))}

            </select>
            <TimeTableSlot
                salonOpensAt={salonOpensAt}
                salonClosesAt={salonClosesAt}
                today={today}
            />
        </form>)


}

AppointmentForm.defaultProps = {
    salonOpensAt: 9,
    salonClosesAt: 19,
    selectableServices: [
        'Cut',
        'Blow-dry',
        'Cut & color',
        'Beard trim',
        'Cut & beard trim',
        'Extensions'],
    today: new Date()    
};