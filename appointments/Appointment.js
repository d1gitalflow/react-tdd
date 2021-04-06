import React from 'react';

export const Appointment = ({customer:{firstName}}) =>{return <div>{firstName}</div>}
export const AppointmentDayView = ({appointments}) =>{
    return <div id="appointmentsDayView">
        <ol>
            {appointments.map((appointment)=>{return <div key={appointment.startsAt}></div>})}
        </ol>
    </div>;
}