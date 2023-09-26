import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function GebruikersInformatie({ user }) {
    const { data, setData, post } = useForm({
        email: user.email
    });

    // sets value of the user security information
    const [AccountEmail, setEmail] = useState(user.email);
    const [AccountPassword, setPassword] = useState("");
    
    // email
    const HandleEmail = (e) => {
        setEmail(e.target.value);
        setData('email', e.target.value);
        localStorage.setItem('AccountEmail', e.target.value);
    }

    // password
    const HandlePassword = (e) => {
        setPassword(e.target.value);
        setData('password', e.target.value);
        localStorage.setItem('AccountPassword', e.target.value);
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
    
return (
    <>
        <div className='bg-black h-[1rem] rounded-t-[3rem] p-5 flex justify-center'>
            <h1 className='text-[1.25rem]'>Security information</h1>                   
        </div>

        <div className='bg-gray-900 mt-6'>
            <form className='flex flex-col' onSubmit={UpdateSecurity}>
                <div className='flex flex-row justify-between px-7 py-4'>
                    <h2>E-mailadres & password</h2>
                    <button className='text-[0.85rem] border-[2px] border-gray-600 px-3 rounded-xl
                    hover:bg-gray-600 transition duration-300 ease-in-out'>Edit</button>
                </div>
                <ul className='bg-gray-700'>
                    <li className='px-6 py-3 mx-6 font-thin border-b-[1px] border-gray-500 text-[0.8rem] flex flex-row items-center'>
                        <span>Email: </span>
                        <input
                            className='ml-auto w-[60%] bg-gray-700 h-7 border-none text-gray-100 text-[0.9rem] placeholder:text-gray-300'
                            value={AccountEmail}
                            onChange={HandleEmail}
                            type='email'
                            name='email'
                        />
                    </li>
                    <li className='px-6 py-3 mx-6 font-thin text-[0.8rem] flex flex-row items-center'>
                        <span>Make new password: </span>
                        <input
                            className='ml-auto w-[40%] bg-gray-700 h-7 border-[1px] border-gray-500 text-gray-100 text-[0.9rem] placeholder:text-gray-400 placeholder:text-[0.9rem]'
                            value={AccountPassword}
                            onChange={HandlePassword}
                            placeholder='new password'
                            type="password" 
                            name='password'
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