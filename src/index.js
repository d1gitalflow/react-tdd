import React from 'react';
import ReactDOM from 'react-dom';
import { AppointmentForm } from './AppointmentForm';
import {
  sampleAvailableTimeSlots,
  sampleStylists
} from './sampleData';
//for fetch to work in the browser, we need a polifyll
import 'whatwg-fetch';

ReactDOM.render(
  <AppointmentForm
    availableTimeSlots={sampleAvailableTimeSlots}
  />,
  document.getElementById('root')
);
