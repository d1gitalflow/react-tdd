import React from 'react';

export const Appointment = ({ customer: { firstName } }) => { return <div>{firstName}</div> }

export const AppointmentDayView = ({ appointments }) => {
    
    const appointmentTimeOfDay = startsAt => {
        const [h, m] = new Date(startsAt).toTimeString().split(':');
        return `${h}:${m}`;
    }

    return <div id="appointmentsDayView">
        <ol>
            {appointments.map((appointment) => { return <li key={appointment.startsAt}>
                {appointmentTimeOfDay(appointment.startsAt)}
            </li> })}
        </ol>
    </div>;
}