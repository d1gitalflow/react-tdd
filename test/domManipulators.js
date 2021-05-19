import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';

export const createContainer = () => {
  const container = document.createElement('div');

  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = (formId, name) => form(formId).elements[name];
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);

  const element = selector => container.querySelector(selector);
  const elements = selector =>
    Array.from(container.querySelectorAll(selector));

  const simulateEvent = eventName => (element, eventData) =>
    ReactTestUtils.Simulate[eventName](element, eventData);

  const simulateEventAndWait = eventName => async (
    element,
    eventData
  ) =>
    await act(async () =>
      ReactTestUtils.Simulate[eventName](element, eventData)
    );

  const children = element => Array.from(element.childNodes);

  return {

    /* The synchronous form of act does two things: first, it calls all useEffect
    hooks after it has rendered the provided component. Second, it defers any
    state setters until after all effects have executed. We are using the first
    behavior here.*/
    render: component =>
      act(() => { ReactDOM.render(component, container); }),
    container,
    form,
    field,
    labelFor,
    element,
    elements,
    children,
    click: simulateEvent('click'),
    change: simulateEvent('change'),
    submit: simulateEventAndWait('submit'),
    renderAndWait: async component =>
      await act(async () => ReactDOM.render(component, container)),
  };
};

export const withEvent = (name, value) => ({
  target: { name, value }
});
