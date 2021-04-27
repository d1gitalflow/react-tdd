import React, { useState } from 'react';
export const AppointmentForm = ({ selectableServices, service, onSubmit }) => {

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
        <form id="appointment" onSubmit={()=>{return onSubmit(appointment)}}>
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
        </form>)


}

AppointmentForm.defaultProps = {
    selectableServices: [
        'Cut',
        'Blow-dry',
        'Cut & color',
        'Beard trim',
        'Cut & beard trim',
        'Extensions']
};