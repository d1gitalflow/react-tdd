import React from 'react';
import { createContainer } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';

describe('AppointmentForm', () => {
    let render, container;

    beforeEach(() => {
        return {
            render,
            container
        } = createContainer();
    });


    const form = id => container.querySelector(`form[id="${id}"]`);
    //access name="" inside form
    const field = name => form('appointment').elements[name];


    it('renders a form', () => {
        render(<AppointmentForm />);
        expect(form('appointment')).not.toBeNull();
    })

    //.elements.`name=""`.
    describe('service field', () => {
        it('renders as select box', () => {
            render(<AppointmentForm />);
            expect(field('service')).not.toBeNull();
            expect(field('service').tagName).toEqual('SELECT')
        })

        it('initially has a blank value chosen', () => {
            render(<AppointmentForm />);
            const firstNode = field('service').childNodes[0];
            expect(firstNode.value).toEqual('');
            expect(firstNode.selected).toBeTruthy();
        });



        it('lists all salon services', () => {
            const selectableServices = ['Cut', 'Blow-dry'];
            render(
                <AppointmentForm
                    selectableServices={selectableServices}
                />
            );
            //childNodes returns a 'NodeList' obj which gets converted to an array
            //which seems to be usual to convert 'NodeList' obj to array to iterate
            //NOTE: this is a snapshot, 'NodeList' is 'live'.
            const optionNodes = Array.from(
                field('service').childNodes
            );
            //iterate 'optionNodes' using map which returns .textContent
            const renderedServices = optionNodes.map(
                node => { console.log(node.textContent); return node.textContent }
            );
            //
            expect(renderedServices).toEqual(
                expect.arrayContaining(selectableServices)
            );
        });
    })


})