import ReactDOM from 'react-dom';
import { AppointmentsDayView } from './AppointmentDayView.js';
import { sampleAppointments } from './sampleData.js';
ReactDOM.render(
    <AppointmentsDayView appointments={sampleAppointments} />,
    document.getElementById('root')
);