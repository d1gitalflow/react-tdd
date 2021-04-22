import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';
//react test utils
import ReactTestUtils from 'react-dom/test-utils'


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
    //access name="storesValueATTR"
    const firstNameField = () => form('customer').elements.firstName;

    //checks form element
    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    describe('first name field', () => {
        it('renders as a text box', () => {
            render(<CustomerForm />);
            //to access form controls contained in <form> such as: button, input , etc
            //nodeList = HTMLFormElement.elements returns HTMLFormControlsCollection
            //const field = form('customer').elements.firstName; //firstName is the name="firstName" which is a property, name="" attr stores the value=""
            expectToBeInputFieldOfTypeText(firstNameField());
        })

        it('includes the existing value', () => {
            render(<CustomerForm firstName={"Ashley"} />);
            expect(firstNameField().value).toEqual('Ashley');
        })

        //access form label function
        const labelFor = formElement =>
        container.querySelector(`label[for="${formElement}"]`);

        //remember <label for="blabla"> should be equal on <input id="blabla" name="blabla">
        it('renders a label', () => {
            render(<CustomerForm />);
            expect(labelFor('firstName')).not.toBeNull();
            expect(labelFor('firstName').textContent).toEqual('First name');
        })

        it('assigns an id that matches the label id ', () => {
            render(<CustomerForm />);
            //remember firstNameField access the name="storesValueATTR".id
            expect(firstNameField().id).toEqual('firstName')
        })


        //async test - waits on the sucess or failure of the promise resolve or reject, to 
        //pass or reject the test
        it('save existing value when submit', async () => {
            expect.hasAssertions(); //returns true(if it has 1 or more assertions) or false 
            //pass 'Ashley'
            render(<CustomerForm firstName="Ashley"
                //assert phase is inside the onSubmit handler
                //pass the callback function to onSubmit handler
                onSubmit={({ firstName }) => {
                    return expect(firstName).toEqual('Ashley')
                }} />)


            //simulates adding submit button as a <input type="submit" value="Submit"> in jest    
            await ReactTestUtils.Simulate.submit(form('customer'));
        })

        it('saves new value when submited', async () => {
            expect.hasAssertions();
            render(<CustomerForm
                firstName={'Ashley'}
                onSubmit={({ firstName }) => {
                    return expect(firstName).toEqual('Jamie');
                }} />)
            //onChange event  //access const firstNameField = () => form('customer').elements.firstName;
            await ReactTestUtils.Simulate.change(firstNameField(), {
                //changes value="" to 'Jamie
                target: { value: 'Jamie' }
            })
    
            await ReactTestUtils.Simulate.submit(form('customer'));
        })

    })








    









    
});