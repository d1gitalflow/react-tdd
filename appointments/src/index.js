import React from 'react';
import ReactDOM from 'react-dom';
import { AppointmentsDayView } from './AppointmentDayView.js';
import { sampleAppointments } from './sampleData.js';
import {CustomerForm} from './CustomerForm.js'
import {AppointmentForm} from './AppointmentForm.js'
ReactDOM.render(
    <AppointmentForm  />,
    document.getElementById('root')
);