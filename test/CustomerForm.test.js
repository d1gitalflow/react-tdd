import React from 'react';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

import { fetchResponseOk, fetchResponseError, fetchRequestBody } from './spyHelpers';

import 'whatwg-fetch';


/* RUNDOWN (Spy + Stub) WITH JEST:

To create a new spy call jest.fn() -> const fetchSpy = jest.fn();

To override an existing property, call -> jest.spyOn(obj,property)

To set a return value, call spy.mockReturnValue(); can also pass this into jest.fn

Can set multiple return values by chaining calls to spy.mockReturnValueOnce();

To check that my spy was called use expect(spy).toHaveBeenCalled();

To check the arguments passed to my spy can use: expect(spy).ToHaveBeenCalledWith(arguments); Or, if my spy is called multiple times and want to check the last time it was called, i can use
expect(spy).toHaveLastBeenCalledWith(args)

Calling spy.mockReset() removes all the mocked implementations, return values, and existing call history from a spy.

Calling spy.mockRestore() will remove the mock and give you back the original implementation

When using toHaveBeenCalledWith i can pass an argument value to expect.anything() to say that i dont care what the value of that argument is

I can use expect.objectMatching(object) to check that an argument has all the properties of the object i pass in, rather than being extactly equal to the object

When my spy is called multiple times, i can check the parameters passed to specific calls by using spy.mock.calls[n] where n is the call number (for example) calls[0] will return the arguments for the first time it was called

If i need to perform complex matching on a specific argument i can use spy.mock.calls[0][n] where n is the argument number.

I can stub out and spy on entire modules using the jest.mock() function */





describe('CustomerForm', () => {
  let render, container;

  

  const requestBodyOf = fetchRequestBody;







  beforeEach(() => {
    ({ render, container } = createContainer());
    
    jest   //access window.fetch for spy
      .spyOn(window,'fetch')
      //pass stub value
      .mockReturnValue(fetchResponseOk({}));

  });


  afterEach(() => {
    window.fetch.mockRestore();
  })

  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = name => form('customer').elements[name];
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);


  /* const singleArgumentSpy = () => {
    let receivedArgument;
    return {
      fn:(arg)=>{return receivedArgument = arg},
      receivedArgument:() =>{return receivedArgument}
    }
  } */


  /*   const spy = () => {
      let receivedArguments;
      let returnValue;
      return {
        fn: (...args) => {
          receivedArguments = args;
          return returnValue;
        },
        receivedArguments: () => receivedArguments,
        receivedArgument: n => receivedArguments[n],
        //set stub value
        stubReturnValue: (value) => { return returnValue = value }
      };
    }; */






  /*   //add a jest matcher 'toHaveBeenCalled'
    //its a Jest built in method, returns an obj with props 'pass' and 'message' as all jest matchers must return
    expect.extend({
      toHaveBeenCalled(received) {
        if (received.receivedArguments() === undefined) {
          return {
            pass: false,
            message: () => { return 'Spy was not called' }
          }
        }
        return { pass: true, message: () => { return 'Spy was called' } }
      }
    }); */




  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  it('has a submit button', () => {
    render(<CustomerForm />);
    const submitButton = container.querySelector(
      'input[type="submit"]'
    );
    expect(submitButton).not.toBeNull();
  });

  it('calls fetch with the right properties when submitting data', async () => {
    render(
      <CustomerForm />
    );
    ReactTestUtils.Simulate.submit(form('customer'));

    /* expect(fetchSpy).toHaveBeenCalled();
    //first arg of fetch(arg,_)
    expect(fetchSpy.receivedArgument(0)).toEqual('/customers');

    //second arg of fetch
    const fetchOpts = fetchSpy.receivedArgument(1);
    expect(fetchOpts.method).toEqual('POST');
    expect(fetchOpts.credentials).toEqual('same-origin');
    expect(fetchOpts.headers).toEqual({
      'Content-Type': 'application/json'
    }); */

    expect(window.fetch).toHaveBeenCalledWith(
      '/customers',
      expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      })
    )
  })

  it('does not notify onSave if the POST request returns an error',
    async () => {
      window.fetch.mockReturnValue(fetchResponseError());
      const saveSpy = jest.fn();
      render(<CustomerForm onSave={saveSpy} />);
      await act(async () => {
        ReactTestUtils.Simulate.submit(form('customer'));
      });
      expect(saveSpy).not.toHaveBeenCalled();
    });

  it('notifies onSave when form is submitted', async () => {
    const customer = { id: 123 };
    window.fetch.mockReturnValue(fetchResponseOk(customer));
    const saveSpy = jest.fn();

    render(<CustomerForm onSave={saveSpy} />);
    await act(async () => { ReactTestUtils.Simulate.submit(form('customer')) });

    /* expect(saveSpy).toHaveBeenCalled();
    expect(saveSpy.receivedArgument(0)).toEqual(customer); */
    expect(saveSpy).toHaveBeenCalledWith(customer);
  })

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = jest.fn();

    render(<CustomerForm />);
    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'), {
        preventDefault: preventDefaultSpy
      })
    })

    expect(preventDefaultSpy).toHaveBeenCalled();
  })

  it('renders error message when fetch call fails', async () => {
    window.fetch.mockReturnValue(Promise.resolve({ ok: false }));

    render(<CustomerForm />);
    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'));
    });

    const errorElement = container.querySelector('.error');
    expect(errorElement).not.toBeNull();
    expect(errorElement.textContent).toMatch('error occurred');
  })

  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

  const itRendersAsATextBox = fieldName =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });

  const itIncludesTheExistingValue = fieldName =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field(fieldName).value).toEqual('value');
    });

  const itRendersALabel = (fieldName, text) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(text);
    });

  const itAssignsAnIdThatMatchesTheLabelId = fieldName =>
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSubmitsExistingValue = (fieldName, value) =>
    it('saves existing value when submitted', async () => {

      render(
        <CustomerForm
          //unload as fieldName={value}, both fieldName & value to be defined.
          {...{ [fieldName]: value }}
        />
      );
      await ReactTestUtils.Simulate.submit(form('customer'));


      expect(requestBodyOf(window.fetch)).toMatchObject({
        [fieldName]: value
      })
    });

  const itSubmitsNewValue = (fieldName, value) =>
    it('saves new value when submitted', async () => {

      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
        />
      );
      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value, name: fieldName }
      });
      await ReactTestUtils.Simulate.submit(form('customer'));

      expect(requestBodyOf(window.fetch)).toMatchObject({
        [fieldName]: value
      })
    });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignsAnIdThatMatchesTheLabelId('firstName');
    itSubmitsExistingValue('firstName', 'value');
    itSubmitsNewValue('firstName', 'newValue');
  });

  describe('last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
    itRendersALabel('lastName', 'Last name');
    itAssignsAnIdThatMatchesTheLabelId('lastName');
    itSubmitsExistingValue('lastName', 'value');
    itSubmitsNewValue('lastName', 'newValue');
  });

  describe('phone number field', () => {
    itRendersAsATextBox('phoneNumber');
    itIncludesTheExistingValue('phoneNumber');
    itRendersALabel('phoneNumber', 'Phone number');
    itAssignsAnIdThatMatchesTheLabelId('phoneNumber');
    itSubmitsExistingValue('phoneNumber', '12345');
    itSubmitsNewValue('phoneNumber', '67890');
  });
});
