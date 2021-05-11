import React, { useState } from 'react';

const appointmentTimeOfDay = startsAt => {
    const [h, m] = new Date(startsAt).toTimeString().split(':');
    return `${h}:${m}`;
}

export const Appointment = ({
    customer,
    stylist,
    service,
    notes,
    startsAt

}) => (
    <div id="appointmentView">
        <h3>Todays appointment at {appointmentTimeOfDay(startsAt)}</h3>
        <table>
            <tbody>
                <tr>
                    <td>
                        Customer:
                    </td>
                    <td>
                        {customer.firstName} {customer.lastName}
                    </td>
                </tr>
                <tr>
                    <td>Phone number</td>
                    <td>{customer.phoneNumber}</td>
                </tr>
                <tr>
                    <td>Stylist</td>
                    <td>{stylist}</td>
                </tr>
                <tr>
                    <td>Service</td>
                    <td>{service}</td>
                </tr>
                <tr>
                    <td>Notes</td>
                    <td>{notes}</td>
                </tr>
            </tbody>
        </table>
    </div>
)

export const AppointmentsDayView = ({ appointments }) => {

    const [selectedAppointment, setSelectedAppointment] = useState(0)//initial state

    return (<div id="appointmentsDayView">
        <ol>                           {/**i is the optional index value, counts each iterated element */}
            {appointments.map((appointment, i) => {
                return <li key={appointment.startsAt}>            {/**starts at 0 */}
                    <button className={
                        i === selectedAppointment ? 'toggled' : ''
                    } type="button" onClick={() => { return setSelectedAppointment(i) }}>
                        {appointmentTimeOfDay(appointment.startsAt)}
                    </button>
                </li>
            })}
        </ol>
        {appointments.length === 0 ? (
            <p>There are no appointments scheduled for today.</p>
        ) : (                               //initial state 0
            <Appointment {...appointments[selectedAppointment]} />
        )}
    </div>);
}