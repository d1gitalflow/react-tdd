import React from 'react';
import ReactDOM from 'react-dom';
import { AppointmentsDayView } from '../Appointment.js';
import { sampleAppointments } from './sampleData.js';
ReactDOM.render(
    <AppointmentsDayView appointments={sampleAppointments} />,
    document.getElementById('root')
);