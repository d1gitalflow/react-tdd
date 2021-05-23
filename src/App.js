/* 
-Initially, it will show the AppointmentsDayViewLoader, along with a button
-If the user clicks the button, they will be shown the CustomerForm
-Once they've completed that form and submitted the customer to the server, the
user will be shown the AppointmentFormLoader and can then book an
appointment
-Once the appointment has been booked, the user is taken back to viewing the
AppointmentsDayViewLoader 
*/


import React, { useState, useCallback } from 'react';
import { AppointmentFormLoader } from './AppointmentFormLoader';
import { AppointmentsDayViewLoader } from './AppointmentsDayViewLoader';
import { CustomerForm } from './CustomerForm';

export const App = () => {
    const [view, setView] = useState('dayView');
    const [customer, setCustomer] = useState();

    const transitionToAddAppointment = useCallback(customer => {
        setCustomer(customer);
        setView('addAppointment');
    }, []);
    const transitionToAddCustomer = useCallback(
        () => setView('addCustomer'),
        []
    );
    const transitionToDayView = useCallback(
        () => setView('dayView'),
        []
    );

    switch (view) {
        case 'addCustomer':
            return <CustomerForm onSave={transitionToAddAppointment} />;
        case 'addAppointment':
            return (
                <AppointmentFormLoader
                    customer={customer}
                    onSave={transitionToDayView}
                />
            );
        default:
            return (
                <React.Fragment>
                    <div className="button-bar">
                        <button
                            type="button"
                            id="addCustomer"
                            onClick={transitionToAddCustomer}>
                            Add customer and appointment
            </button>
                    </div>
                    <AppointmentsDayViewLoader />
                </React.Fragment>
            );
    }
};
