import React from 'react';
import { createContainer } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';
import ReactTestUtils from 'react-dom/test-utils'

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
    //access label
    const label = (name) => { return container.querySelector(`label[for="${name}"]`) }
    //labelid
    const labelId = (id) => { return container.querySelector(`label[id="${id}"`) }

    //returns acess to <table id="time-slots" />
    const timeSlotTable = () => { return container.querySelector('table#time-slots') }

    it('renders a form', () => {
        render(<AppointmentForm />);
        expect(form('appointment')).not.toBeNull();
    })




    //.elements.`name=""`.
    describe('service field', () => {


        /* <form id="my-form">
            <label for="cars">Choose a car:</label>
            <select name="service" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>
            <br><br>
            <input type="submit" value="Submit"></input> */
        it('renders a label', () => {
            render(<AppointmentForm />)
            expect(label('service')).not.toBeNull()
            expect(label('service').textContent).toEqual('Salon service')
            expect(labelId('service').id).toEqual('service');
            expect(form('appointment').elements[0].id).toEqual('service')
        })



        //Pre-select the value
        const findOption = (dropdownNode, textContent) => {
            const options = Array.from(dropdownNode.childNodes);
            //find() returns the first sucessful result
            //return boolean
            return options.find((option) => { return option.textContent === textContent })
        }






        it('pre-selects the existing value', () => {
            const services = ['Cut', 'Blow-dry'];
            render(<AppointmentForm selectableServices={services} service={'Blow-dry'} />);
            const option = findOption(field('service'), 'Blow-dry');
            expect(option.selected).toBeTruthy();
        })

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



        //kind of deprecated because the function component is using .defaultProps inside the component itself
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
                node => { return node.textContent }
            );
            //
            expect(renderedServices).toEqual(
                expect.arrayContaining(selectableServices)
            );
        });


        it('saves existing value when submited', async () => {
            expect.hasAssertions();
            render(<AppointmentForm
                service={'Blow-dry'}
                onSubmit={(props) => { return expect(props.service).toEqual('Blow-dry') }}
            />)
            //simply target the form id=""
            await ReactTestUtils.Simulate.submit(form('appointment'))
        })

        it('saves new value when submited', async () => {
            expect.hasAssertions();
            render(<AppointmentForm
                service={'Blow-dry'}
                onSubmit={
                    (props) => { return expect(props.service).toEqual('Cut') }
                }
            />)
            await ReactTestUtils.Simulate.change(field('service'), {
                target: { value: 'Cut' }
            });

            await ReactTestUtils.Simulate.submit(form('appointment'));
        })

    })

    describe('time slot table', () => {

        //index param is string
        const startsAtField = (index) => {
            return (
                container.querySelectorAll('input[name="startsAt"]')[index]
            )
        }

        const today = new Date();
        const availableTimeSlots = [
            { startsAt: today.setHours(9, 0, 0, 0) },
            { startsAt: today.setHours(9, 30, 0, 0) }
        ];


        it('renders a table for time slots', () => {
            render(<AppointmentForm />);
            expect(timeSlotTable()).not.toBeNull();
        })

        it('renders a time slot for every half an hours between open and close times', () => {
            render(<AppointmentForm
                salonOpensAt={9}
                salonClosesAt={11}
            />);

            //returns static 'NodeList'
            const timesOfDay = timeSlotTable().querySelectorAll('tbody >* th');

            expect(timesOfDay).toHaveLength(4);
            expect(timesOfDay[0].textContent).toEqual('09:00');
            expect(timesOfDay[1].textContent).toEqual('09:30');
            expect(timesOfDay[3].textContent).toEqual('10:30');
        })

        it('renders an empty cell at the start of the header row', () => {
            render(<AppointmentForm />);
            const headerRow = timeSlotTable().querySelector(
                'thead > tr'
            );
            expect(headerRow.firstChild.textContent).toEqual('');
        })

        it.skip('renders a week of available dates', () => {
            const today = new Date(2018, 11, 1);
            render(<AppointmentForm />);
            //querySelectorAll returns array-like static 'NodeList', which has properties to measure the length
            //selector: selects every element except ':first-child' inside th
            const dates = timeSlotTable().querySelectorAll(
                'thead >*  th:not(:first-child)'
            );
            //test length
            expect(dates).toHaveLength(7);
            expect(dates[0].textContent).toEqual('Sat 08');
            expect(dates[1].textContent).toEqual('Sun 09');
            expect(dates[6].textContent).toEqual('Fri 14');
        })

        //availableTimeSlots, which is an array of objects that list times that are still available.

        it('renders a radio button for each time slot', () => {

            const today = new Date();
            const availableTimeSlots = [
                //timestamp like: 1620893400000
                { startsAt: today.setHours(9, 0, 0, 0) },
                { startsAt: today.setHours(9, 30, 0, 0) }
            ]
            render(
                <AppointmentForm
                    availableTimeSlots={availableTimeSlots}
                    today={today}
                />
            )
            //access all 'td' table data cells within the <table id="time-slots">
            const cells = timeSlotTable().querySelectorAll('td');
            //access first 'td' cell and querySelector the <input type="radio"> check not to be null
            expect(
                cells[0].querySelector('input[type="radio"]')
            ).not.toBeNull()
            expect(
                cells[7].querySelector('input[type="radio"]')
            ).not.toBeNull();
        })

        it('does not render radio buttons for unavailable time slots', () => {
            render(<AppointmentForm availableTimeSlots={[]} />);
            const timesOfDay = timeSlotTable().querySelectorAll(
                'input'
            );
            expect(timesOfDay).toHaveLength(0);
        });


        it('sets radio button values to the index of the corresponding appointment', () => {
            render(
                <AppointmentForm
                    availableTimeSlots={availableTimeSlots}
                    today={today}
                />);
            expect(startsAtField(0).value).toEqual(
                availableTimeSlots[0].startsAt.toString()
            );
            expect(startsAtField(1).value).toEqual(
                availableTimeSlots[1].startsAt.toString()
            );
        })



        /* const today = new Date();
        const availableTimeSlots = [
            { startsAt: today.setHours(9, 0, 0, 0) },
            { startsAt: today.setHours(9, 30, 0, 0) }
        ]; */

        //startsAt={} receives the miliseconds(timestamp) from the first array element
        //{ startsAt: today.setHours(9, 0, 0, 0) }
        it('pre-selects the existing value', () => {
            render(
                <AppointmentForm
                    availableTimeSlots={availableTimeSlots}
                    today={today}
                    startsAt={availableTimeSlots[0].startsAt}
                />
            )
            //access to container.querySelectorAll('input[name="startsAt"]')[0]
            expect(startsAtField(0).checked).toEqual(true)
        })

        //remeber onSubmit={} a callback is passed,
        //uses value={}
        it('saves existing value when submited', async () => {
            expect.hasAssertions();
            render(
                <AppointmentForm
                    availableTimeSlots={availableTimeSlots}
                    today={today}
                    startsAt={availableTimeSlots[0].startsAt}
                    onSubmit={({ startsAt }) => { return expect(startsAt).toEqual(availableTimeSlots[0].startsAt) }}
                />
            );
            ReactTestUtils.Simulate.submit(form('appointment'));
        })

        //changes value, and checks it.
        it('saves new value when submited', async () => {
            expect.hasAssertions();
            render(
                <AppointmentForm
                    availableTimeSlots={availableTimeSlots}
                    today={today}
                    startAt={availableTimeSlots[0].startsAt}
                    onSubmit={({ startsAt }) =>
                        expect(startsAt).toEqual(
                            availableTimeSlots[1].startsAt
                        )
                    }
                />)
            await ReactTestUtils.Simulate.change(startsAtField(1), {
                target: {
                    value: availableTimeSlots[1].startsAt.toString(),
                    name: 'startAt'
                }
            })
            await ReactTestUtils.Simulate.submit(form('appointment'))
        })







    })


})