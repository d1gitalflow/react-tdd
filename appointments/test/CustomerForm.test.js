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

    //selector <form id=""
    const form = id => container.querySelector(`form[id="${id}"]`);
    //access name="storesValue"
    const firstNameField = () => form('customer').elements.firstName;

    //checks form element
    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    it('renders a form', () => {
        render(<CustomerForm />);
        expect(form('customer')).not.toBeNull();
    })

    it('renders the first name field as a text box', () => {
        render(<CustomerForm />);
        //to access form controls contained in <form> such as: button, input , etc
        //nodeList = HTMLFormElement.elements returns HTMLFormControlsCollection
        //const field = form('customer').elements.firstName; //firstName is the name="firstName" which is a property, name="" attr stores the value=""
        expectToBeInputFieldOfTypeText(firstNameField());
    })

    it('includes the existing value for the first name',()=>{
        render(<CustomerForm firstName={"Ashley"}/>);
        expect(firstNameField().value).toEqual('Ashley');
    })
});