import React, { useState } from 'react';
export const CustomerForm = ({ firstName, lastName, phoneNumber, onSubmit }) => {

    const [customer, setCustomer] = useState({ firstName, lastName, phoneNumber, onSubmit });


    /*  //returns 'existingValue' and 'Jamie'
     //{target:{value:'Jamie'}} gets passed to handleChangeFirst function, comes from where? - NO
     //just updates the 'customer' obj 
     const handleChangeFirstName = ({ target }) => {
         return setCustomer(
             (customer) => {
                 return {
                     ...customer, //firstName:'existingValue' 
                     firstName: target.value //change to firstName:'Jamie' which onChange chooses as the latest property
                 }
             }
         )
     }
                       //{target:{value:value}}
     const handleChangeLastName = ({ target }) => {
         return setCustomer((customer) => {
             return {
                 ...customer,
                 lastName: target.value
             }
         })
     }
 
 
     const handleChangePhoneNumber = ({ target }) => {
         return setCustomer((customer) => {
             return {
                 ...customer,
                 phoneNumber: target.value
             }
         })
     }  */

    //Refractored to:
    const handleChange = ({ target }) => {
        setCustomer((customer) => {
            return {
                ...customer,
                [target.name]: target.value
            }
        })
    }

    return (
        <form id="customer" onSubmit={() => { return onSubmit(customer) }}>
            <label htmlFor="firstName">First name</label>
            <input
                id="firstName"
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}>
            </input>
            <label htmlFor="lastName">Last name</label>
            <input
                id="lastName"
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}

            />
            <label htmlFor="phoneNumber">Phone number</label>
            <input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
            />
        </form>
    );
}