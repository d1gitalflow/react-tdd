//Jest already has built in access to global name space and already 'require()ed'.
//But still need to add the ReactDOM and JSX
import React from 'react';
import ReactDOM from 'react-dom';

//testing utils
import ReactTestUtils from 'react-dom/test-utils';

//import Appointment component
import { Appointment, AppointmentsDayView } from '../Appointment.js'


//describes a 'test suite', which is a set of tests with a given name
//1st arg is the name of the unit of the test.
describe('Appointment', () => {
    let container;
    let customer;

    //code in this block is executed before each test
    beforeEach(() => {
        //create <div></div>
        container = document.createElement('div')
    })

    const render = (component) => {
        return ReactDOM.render(component, container)
    }

    //it defines a single/individual test
    it('renders the customer first name', () => {
        //create customer obj literal
        customer = { firstName: 'Ashley' };

        //final render ReactDOM.render(reactElement,container)
        render(<Appointment customer={customer} />);

        //in each invdidual/single test there can be 
        //as many as expectations we want
        expect(container.textContent).toMatch('Ashley');
    })

    //another single/individual test
    it('renders another customer first name', () => {
        customer = { firstName: 'Jordan' };
        render(<Appointment customer={customer} />);
        //access <div> textContent ->
        //represents the text content of the node and its descendants.
        expect(container.textContent).toMatch('Jordan');
    });
})

describe('AppointmentDayView', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    })

    const render = (component) => {
        return ReactDOM.render(component, container);
    }

    const today = new Date();
    const appointments = [
        {
            startsAt: today.setHours(12, 0),
            customer: { firstName: 'Ashley' }
        },
        {
            startsAt: today.setHours(13, 0),
            customer: { firstName: 'Jordan' }
        }
    ];

    it('renders a div with the right id', () => {
       
        render(<AppointmentsDayView appointments={appointments} />)
        //all <div>'s with id="appointmentsDayView"
        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
        //parent node ir <ol> ordered list, and how many children it has
        //needs to be two
        expect(container.querySelector('ol').children).toHaveLength(2);
    })

    it.skip('renders each appointment in an <li>', () => {
        
        render(<AppointmentsDayView appointments={appointments} />);
        //querySelectorAll() returns a NodeList representing a list of elements 
        //matching the specified group of selectors, NodeList is possible to iterate
        //as an array, using Array.from(NodeList), has .length property 
        expect(container.querySelectorAll('li')).toHaveLength(2);
        expect(
            container.querySelectorAll('li')[0].textContent
        ).toEqual('12:00');
        expect(
            container.querySelectorAll('li')[1].textContent
        ).toEqual('13:00');

    })

    it('initially shows a message saying there are no appointments today', () => {
        //empty array means map() will not run and will just show "There are no..."
        render(<AppointmentsDayView appointments={[]} />)
        expect(container.textContent).toMatch('There are no appointments scheduled for today.')
    })

    it('selects the first appointment by default', () => {
        
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.textContent).toMatch('Ashley');
    });

    it('has a button element in each li', () => {
        
        render(<AppointmentsDayView appointments={appointments} />);
        expect(
            //selects all <button> element tags where <li> is a parent
            container.querySelectorAll('li > button')
        ).toHaveLength(2);
        expect(                                          //type attribute for <button> elem tag
            container.querySelectorAll('li > button')[0].type
        ).toEqual('button');
        //note: remember querySelectorAll() returns a array-like NodeList obj, can be turned to array for iteration with Array.from(NodeList)
    })

    it('renders another appointment when selected', () => {
        
        render(<AppointmentsDayView appointments={appointments} />);
        const button = container.querySelectorAll('button')[1];
        ReactTestUtils.Simulate.click(button);//to simulte the click
        expect(container.textContent).toMatch('Jordan');
        //NOTE: 'container.textContent' is like saying I want
        //this text to appear somewhere, but I don't care where.
    })
})
