import React,{useState} from 'react';

export const Appointment = ({ customer: { firstName } }) => { return <div>{firstName}</div> }

export const AppointmentsDayView = ({ appointments }) => {

    const appointmentTimeOfDay = startsAt => {
        const [h, m] = new Date(startsAt).toTimeString().split(':');
        return `${h}:${m}`;
    }

    const [selectedAppointment, setSelectedAppointment] = useState(0)//initial state
    
    return (<div id="appointmentsDayView">
        <ol>                           {/**i is the optional index value, counts each iterated element */}     
            {appointments.map((appointment,i) => {
                return <li key={appointment.startsAt}>            {/**starts at 0 */}
                    <button type="button" onClick={()=>{return setSelectedAppointment(i)}}>
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
    </div> );
}