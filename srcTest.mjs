const itSubmitsExistingValue = fieldName =>
  it('saves existing value when submitted', async () => {
    let submitArg;
    render(<CustomerForm
      {...{ [fieldName]: 'value' }}
      onSubmit={customer => submitArg = customer}
    />);
    ReactTestUtils.Simulate.submit(form('customer'));
    expect(submitArg[fieldName]).toEqual('value');
  });