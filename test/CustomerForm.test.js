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
    //still works for nested describes()
    beforeEach(() => {
        ({ render, container } = createContainer())
    });

    //selector <form id=""
    const form = id => container.querySelector(`form[id="${id}"]`);

    //access name="storesValueATTR"
    //const firstNameField = () => form('customer').elements.firstName;

    //access to html elements inside form function
    //pass the value of name=""
    const field = name => form('customer').elements[name];

    //checks form element
    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    //access form label function
    const labelFor = formElement =>
        container.querySelector(`label[for="${formElement}"]`);




    //it test on parent describe scope
    const itRendersAsATextBox = (fieldName) => {
        return it('renders as a text box', () => {
            render(<CustomerForm />);
            //to access form controls contained in <form> such as: button, input , etc
            //nodeList = HTMLFormElement.elements returns HTMLFormControlsCollection
            //const field = form('customer').elements.firstName; //firstName is the name="firstName" which is a property, name="" attr stores the value=""
            expectToBeInputFieldOfTypeText(field(fieldName));
        })
    }

    //it test on parent describe scope
    //just looking to pass a value and see if it returns the same value as we access field('firstName') === name="firstName"
    const itIncludesTheExistingValue = (fieldName) => {
        return it('includes the existing value', () => {
            //object unloads properties (firstName:'value), then is passed
            render(<CustomerForm {...{ [fieldName]: 'value' }} />);
            expect(field(fieldName).value).toEqual('value');
        })
    }
    //remember <label for="blabla"> should be equal on <input id="blabla" name="blabla">
    const itRendersALabel = (fieldName, result) => {
        return it('renders a label', () => {
            render(<CustomerForm />);
            expect(labelFor(fieldName)).not.toBeNull();
            expect(labelFor(fieldName).textContent).toEqual(result);
        })
    }

    const itAssignsAnIdThatMatchesTheLabelId = (fieldName) => {
        return it('assigns an id that matches the label id ', () => {
            render(<CustomerForm />);
            //remember firstNameField access the name="storesValueATTR".id
            expect(field(fieldName).id).toEqual(fieldName)
        })
    }

    //async test - waits on the sucess or failure of the promise resolve or reject, to 
    //pass or reject the test
    const itSubmitsExistingValue = (fieldName, existingValue) => {
        return it('save existing value when submit', async () => {
            expect.hasAssertions(); //returns true(if it has 1 or more assertions) or false 
            //pass 'Ashley'
            render(<CustomerForm {...{ [fieldName]: existingValue }}
                //assert phase is inside the onSubmit handler
                //pass the callback function to onSubmit handler
                onSubmit={(props) => {
                    return expect(props[fieldName]).toEqual(existingValue)
                }} />)
            //alternative:
            //onSubmit={props =>
            //expect(props[fieldName]).toEqual(value)
            // }


            //simulates adding submit button as a <input type="submit" value="Submit"> in jest    
            await ReactTestUtils.Simulate.submit(form('customer'));
        })
    }

    //bit complex test, lots of refractoring
    const itSubmitsNewValue = (fieldName, value) => {
        return it('saves new value when submited', async () => {
            expect.hasAssertions();
            render(<CustomerForm
                //gets passed as {firstName:'existingValue'} <-obj
                //this is an JS object that got converted to firstName={existingValue}, and gets passed as object
                {...{ [fieldName]: 'existingValue' }}
                onSubmit={(props) => {
                    return expect(props[fieldName]).toEqual(value);
                }} />)
            //Got refractored
            //onChange event  //access const firstNameField = () => form('customer').elements.firstName;
            await ReactTestUtils.Simulate.change(field(fieldName), {
                //changes value="" to 'Jamie and name="fieldName"
                target: { value: value, name: fieldName }
            })

            await ReactTestUtils.Simulate.submit(form('customer'));
        })
    }


    //first name field 
    describe('first name field', () => {
        itRendersAsATextBox('firstName');
        itIncludesTheExistingValue('firstName');
        itRendersALabel('firstName', 'First name');
        itAssignsAnIdThatMatchesTheLabelId('firstName');
        itSubmitsExistingValue('firstName', 'Ashley')
        itSubmitsNewValue('firstName', 'Jamie');
    })

    //last name field
    describe('last name field', () => {
        itRendersAsATextBox('lastName');
        itIncludesTheExistingValue('lastName');
        itRendersALabel('lastName', 'Last name');
        itAssignsAnIdThatMatchesTheLabelId('lastName');
        itSubmitsExistingValue('lastName', 'Morgan');
        itSubmitsNewValue('lastName', 'Marting')

    })

    //phone number field
    describe('phone number field', () => {
        itRendersAsATextBox('phoneNumber');
        itIncludesTheExistingValue('phoneNumber');
        itRendersALabel('phoneNumber', 'Phone number');
        itAssignsAnIdThatMatchesTheLabelId('phoneNumber');
        itSubmitsExistingValue('phoneNumber', '12345');
        itSubmitsNewValue('phoneNumber', '67890');
    })

    it('has a submit button',()=>{
        render(<CustomerForm />);
        const submitButton = container.querySelector('input[type="submit"]');
        expect(submitButton).not.toBeNull();
    })









});