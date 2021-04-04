//Jest already has built in access to global name space and already 'require()ed'.
//But still need to add the ReactDOM and JSX
import React from 'react';
import ReactDOM from 'react-dom';

import { Appointment } from '../Appointment.js'


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
