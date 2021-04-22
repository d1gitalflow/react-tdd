import React, {useState} from 'react';
export const CustomerForm = ({firstName,onSubmit}) => {
    const [customer,setCustomer] = useState({firstName});

    //returns 'Ashley' and 'Jamie'
    //{target:{value:'Jamie'}} gets passed to handleChangeFirst function, comes from where?
    const handleChangeFirstName = ({target}) =>{
        return setCustomer(
            (customer)=>{
                return{
                    ...customer, //firstName:'Ashley' 
                    firstName:target.value //change to firstName:'Jamie'
                }
            }
        )
    }
    
    return (
        <form id="customer" onSubmit={()=>{return onSubmit(customer)}}>
            <label htmlFor="firstName">First name</label>
            <input 
            id="firstName" 
            type="text" 
            name="firstName" 
            value={firstName} 
            onChange={handleChangeFirstName}>
            </input>
        </form>
    );
}