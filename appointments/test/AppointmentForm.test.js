import React from 'react';
import { createContainer } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';
import { internet } from 'faker';

describe('AppointmentForm',()=>{
    let render, container;

    beforeEach(()=>{
        return {
            render,
            container
        } = createContainer();
    });


    const form = id => container.querySelector(`form[id="${id}"]`);
    //access name="" inside form
    const field = name => form('appointment').elements[name];


    it('renders a form',()=>{
        render(<AppointmentForm/>);
        expect(form('appointment')).not.toBeNull();
    })

    //.elements.`name=""`.
    describe('service field',()=>{
        it('renders as select box',()=>{
            render(<AppointmentForm/>);
            expect(field('service')).not.toBeNull();
            expect(field('service').tagName).toEqual('SELECT')
        })
    })


})