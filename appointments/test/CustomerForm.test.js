import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';


//a test suite
describe('CustomerForm', () => {
    let render;
    let container; //div container

    //Each test gets its own container,
    //independent of the other tests.

    //'render' obj is a function with one parameter waiting to get passed one argument
    beforeEach(() => {
        ({ render, container } = createContainer())
    });

    it('renders a form', () => {
        render(<CustomerForm />);
        expect(container.querySelector('form[id="customer"]')).not.toBeNull();
    })

    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    it('renders the first name field as a text box', () => {
        render(<CustomerForm />);
        //form('customer') = <form id="customer">
        //For there to be a form element with the name firstName
        const field = form('customer').elements.firstName; //firstName = name attr 
        expectToBeInputFieldOfTypeText(field);
    })
});