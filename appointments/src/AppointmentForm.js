import React from 'react';
export const AppointmentForm = ({selectableServices}) => {
    return (
    <form id="appointment">
        <select name="service">
            <option/>
                {selectableServices.map((s)=>{
                    return(
                        <option key={s}>{s}</option>
                    )
                })}
            
        </select>
    </form>)
}