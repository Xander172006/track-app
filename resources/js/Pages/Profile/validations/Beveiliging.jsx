import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function GebruikersInformatie({ user }) {
    const { data, setData, post } = useForm({
        email: user.email
    });

    // sets value of the user security information
    const [AccountEmail, setEmail] = useState(user.email);
    
    // email
    const HandleEmail = (e) => {
        setEmail(e.target.value);
        setData('email', e.target.value);
        localStorage.setItem('AccountEmail', e.target.value);
    }

    const [updateSuccess, setUpdateSuccess] = useState(false);

    const UpdateSecurity = async(e) => {
        e.preventDefault();
        try {
            post('/update-user-security', data);
            setUpdateSuccess(true);
        } catch (error) {
            console.log('Error updating security information', error);
        }
    }

    function obscureEmail(email) {
        const parts = email.split('@');
        const username = parts[0];
        const domain = parts[1];
    
        // replaces some characters with dots for ananomacy
        const obscuredUsername =
            username.substring(0, 2) +
            '*'.repeat(username.length - 3)
            username.slice(-1);
    
        const obscuredDomain =
            domain.charAt(0) +
            '*'.repeat(domain.length - 2) + domain.slice(-2);
    
        return obscuredUsername + '@' + obscuredDomain;
    }
    
return (
    <>
        <div className='bg-black h-[1rem] rounded-t-[3rem] p-5 flex justify-center'>
            <h1 className='text-[1.25rem]'>Beveiliging informatie</h1>                   
        </div>

        <div className='bg-gray-800 mt-6'>
            <form className='flex flex-col' onSubmit={UpdateSecurity}>
                <div className='flex flex-row justify-between px-7 py-4'>
                    <h2>E-mailadres</h2>
                    <button className='text-[0.85rem] border-[2px] border-gray-600 px-3 rounded-xl
                    hover:bg-gray-600 transition duration-300 ease-in-out'>Wijzigen</button>
                </div>
                <ul className='bg-gray-700'>
                    <li className='px-6 py-3 mx-6 font-thin border-b-[1px] border-gray-500 text-[0.8rem] flex flex-row'><span>E-mailadres: </span> <span className='ml-auto'>{obscureEmail(user.email)}</span></li>
                    <li className='px-6 py-3 mx-6 font-thin text-[0.8rem] flex flex-row'>
                        <span>Nieuwe E-mailadress:       </span>
                        <input
                            className='ml-auto w-[60%] bg-gray-700 h-7 border-none text-gray-100 text-[0.9rem] placeholder:text-gray-300'
                            onChange={HandleEmail}
                            type="email" 
                            name='email'
                        />
                    </li>

                    {updateSuccess ? (
                        <div className="text-green-600 my-2 px-6 py-3 mx-6 font-thin text-[0.8rem] flex flex-row">User information updated successfully</div>
                    ) : null}
                </ul>
            </form>
        </div>
    </>
    )
}