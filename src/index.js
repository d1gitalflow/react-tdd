import React from 'react';
import ReactDOM from 'react-dom';
import { AppointmentsDayView } from './AppointmentDayView.js';
import { sampleAppointments, sampleAvailableTimeSlots } from './sampleData.js';
import {CustomerForm} from './CustomerForm.js'
import {AppointmentForm} from './AppointmentForm.js'



ReactDOM.render(
    <AppointmentForm availableTimeSlots={sampleAvailableTimeSlots} />,
    document.getElementById('root')
);