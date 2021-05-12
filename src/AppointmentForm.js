import React, { useState, useCallback } from 'react';

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

//receives as: new Date()
const weeklyDateValues = (startDate) => {
    const midnight = new Date(startDate).setHours(0, 0, 0, 0);
    const increment = 24 * 60 * 60 * 1000;
    return Array(7)
        .fill([midnight])
        .reduce((acc, _, i) =>
            acc.concat([midnight + (i * increment)])
        );
};

const toTimeValue = (timestamp) => {

    //converts to: 09:00 ... til 19:00(string) for each timestamp
    return new Date(timestamp).toTimeString().substring(0, 5);
}
const toShortDate = timestamp => {
    const [day, , dayOfMonth] = new Date(timestamp)
        .toDateString()
        .split(' ');
    return `${day} ${dayOfMonth}`;
};
const mergeDateAndTime = (date, timeSlot) => {
    const time = new Date(timeSlot);
    return new Date(date).setHours(
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds()
    );
};




//displays hours (TimeTableSlot) component
const TimeTableSlot = ({
    salonOpensAt,
    salonClosesAt,
    today,
    availableTimeSlots,
    checkedTimeSlot,
    handleChange
}) => {
    const timeSlots = dailyTimeSlots(
        salonOpensAt,
        salonClosesAt
    )
    //dates returns an array from weeklyDateValues
    const dates = weeklyDateValues(today);

    return (
        <table id="time-slots">
            <thead>
                <tr>
                    <th />
                    {dates.map((d) => { return <th key={d}>{toShortDate(d)}</th> })}
                </tr>
            </thead>

            <tbody>
                {timeSlots.map((timeSlot) => {
                    return (
                        <tr key={timeSlot}>
                            <th>{toTimeValue(timeSlot)}</th>
                            {dates.map((date) => {
                                return (
                                    <td key={date}>

                                        <RadioButtonIfAvailable
                                            availableTimeSlots={availableTimeSlots}
                                            date={date}
                                            timeSlot={timeSlot}
                                            checkedTimeSlot={checkedTimeSlot}
                                            handleChange={handleChange}
                                        />

                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>

    )
}


const RadioButtonIfAvailable = ({
    availableTimeSlots,
    date,
    timeSlot,
    checkedTimeSlot,
    handleChange
}) => {
    const startsAt = mergeDateAndTime(date, timeSlot);
    //if true then its pre-checked
    const isChecked = startsAt === checkedTimeSlot;
    if (
        availableTimeSlots.some(availableTimeSlot =>
            availableTimeSlot.startsAt === startsAt
        )
    ) {
        return (
            <input
                name="startsAt"
                type="radio"
                value={startsAt}
                checked={isChecked}
                onChange={handleChange}
            />);
    }
    return null;
};


export const AppointmentForm = ({
    selectableServices,
    service,
    selectableStylists,
    stylist,
    serviceStylists,
    onSubmit,
    salonOpensAt,
    salonClosesAt,
    today,
    availableTimeSlots,
    startsAt
}) => {

    const [appointment, setAppointment] = useState({
        service,
        startsAt,
        stylist
    })

    const handleSelectBoxChange = ({ target }) => {
        setAppointment(
            (prevAppointment) => {
                return {
                    ...prevAppointment,
                    [target.name]: target.value
                }
            }
        )
    }

    //parseInt() converts from String to Number
    /*  The useCallback hook returns a memoized callback. That means you
    always get the same reference back each time it's called, rather than a new
    constant with a new reference. */
    const handleStartAtChange = useCallback(
        ({ target }) => setAppointment((appointment) => ({
            ...appointment,
            startsAt: parseInt(target.value)
        })), []
    )

    //useState object
    const stylistsForService = appointment.service
        ? serviceStylists[appointment.service]
        : selectableStylists;
    //useState object
    const timeSlotsForStylist = appointment.stylist
        ? availableTimeSlots.filter((slot) => { return slot.stylists.includes(appointment.stylist) }) : availableTimeSlots;

    return (
        <form id="appointment" onSubmit={() => { return onSubmit(appointment) }}>
            <label htmlFor="service" id="service">Salon service</label>
            <select
                id="service"
                name="service"
                value={service}
                onChange={handleSelectBoxChange}
                readOnly>
                <option />
                {selectableServices.map(s => (
                    <option key={s}>{s}</option>
                ))}
                <select />
                <label htmlFor="stylist">Stylist</label>
                <select
                    name="stylist"
                    id="stylist"
                    value={stylist}
                    onChange={handleSelectBoxChange}
                    readOnly>
                    <option />
                    {stylistsForService.map((s) => {
                        return (
                            <option key={s}>{s}</option>
                        )
                    })}
                </select>


            </select>
            <TimeTableSlot
                salonOpensAt={salonOpensAt}
                salonClosesAt={salonClosesAt}
                today={today}
                availableTimeSlots={availableTimeSlots}
                checkedTimeSlot={appointment.startsAt}
                handleChange={handleStartAtChange}
            />
            <input type="submit" value="Add" />
        </form>)


}

//are being used by standard
//availableTimeSlots is being passed from sampleData.js
AppointmentForm.defaultProps = {
    availableTimeSlots: [],
    today: new Date(),
    salonOpensAt: 9,
    salonClosesAt: 19,
    selectableServices: [
        'Cut',
        'Blow-dry',
        'Cut & color',
        'Beard trim',
        'Cut & beard trim',
        'Extensions'
    ],
    selectableStylists: ['Ashley', 'Jo', 'Pat', 'Sam'],
    serviceStylists: {
        Cut: ['Ashley', 'Jo', 'Pat', 'Sam'],
        'Blow-dry': ['Ashley', 'Jo', 'Pat', 'Sam'],
        'Cut & color': ['Ashley', 'Jo'],
        'Beard trim': ['Pat', 'Sam'],
        'Cut & beard trim': ['Pat', 'Sam'],
        Extensions: ['Ashley', 'Pat']
    }

};