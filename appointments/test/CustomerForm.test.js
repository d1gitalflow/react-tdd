import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';


//a test suite
describe('CustomerForm',()=>{
    let render; 
    let container; //div container

    //Each test gets its own container,
    //independent of the other tests.

    //'render' obj is a function with one parameter waiting to get passed one argument
    beforeEach(()=>{
        ({render,container} = createContainer())
    });

    it('renders a form',()=>{
        render(<CustomerForm />);
        expect(container.querySelector('form[id="customer"]')).not.toBeNull();
    })
});