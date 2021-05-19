import React from 'react';
import 'whatwg-fetch';
import { createContainer } from './domManipulators';
import { fetchResponseOk } from './spyHelpers';
import {
    AppointmentFormLoader
} from '../src/AppointmentFormLoader';

//is an object
import * as AppointmentFormExports from '../src/AppointmentForm';



describe('AppointmentFormLoader', () => {
    let renderAndWait, container;
    const today = new Date();
    const availableTimeSlots = [

        { startsAt: today.setHours(9, 0, 0, 0) }
    ];
    beforeEach(() => {
        ({ renderAndWait, container } = createContainer());
        jest   //our spy() (stores state response)
            .spyOn(window, 'fetch')
            //our stub (sets a value and returns it, to test calls)
            .mockReturnValue(fetchResponseOk(availableTimeSlots));
        jest
            .spyOn(AppointmentFormExports, 'AppointmentForm')
            .mockReturnValue(null);
    });
    afterEach(() => {
        window.fetch.mockRestore();
        AppointmentFormExports.AppointmentForm.mockRestore();
    });

    it('fetches data when component is mounted', async () => {
        await renderAndWait(<AppointmentFormLoader />);
        expect(window.fetch).toHaveBeenCalledWith(
            '/availableTimeSlots',
            expect.objectContaining({
                method: 'GET',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' }
            })
        );
    })

    it('initially passes no data to AppointmentForm', async () => {
        await renderAndWait(<AppointmentFormLoader />);
        expect(
            AppointmentFormExports.AppointmentForm
        ).toHaveBeenCalledWith(
            { availableTimeSlots: [] },
            expect.anything()
        );
    });

    it('displays times slots that are fetched on mount', async () => {
        await renderAndWait(<AppointmentFormLoader />);

        expect(AppointmentFormExports.AppointmentForm).toHaveBeenLastCalledWith(
            {
                availableTimeSlots
            },
            expect.anything()
        );

    })
});