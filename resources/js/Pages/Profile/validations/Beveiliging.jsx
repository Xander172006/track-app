import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function GebruikersInformatie({ user }) {
    const { data, setData, post } = useForm({
        email: user.email
    });

    // sets value of the user security information
    const [AccountEmail, setEmail] = useState(user.email);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
    // email
    const HandleEmail = (e) => {
        setEmail(e.target.value);
        setData('email', e.target.value);
        localStorage.setItem('AccountEmail', e.target.value);
    }

    // password
    const HandleCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
        setData('currentPassword', e.target.value);
        localStorage.setItem('currentPassword', e.target.value);
    }

    const HandleNewPassword = (e) => {
        setNewPassword(e.target.value);
        setData('newPassword', e.target.value);
        localStorage.setItem('newPassword', e.target.value);
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
    <form className='flex flex-col' onSubmit={UpdateSecurity}>
            <div className='flex flex-row justify-between bg-[#262626] rounded-t-lg p-4'>
                <h2 className='font-semibold'>Email & password</h2>
                <button className='text-[0.85rem] border-[2px] border-gray-700 px-3 rounded-xl sm:w-[10%] hover:cursor-pointer hover:bg-gray-700 transition duration-300 ease-in-out'>Edit</button>
            </div>
            <ul className='bg-[#191919]'>
                <li className='w-[95%] mx-auto text-[0.8rem] border-b-[1px] border-gray-700'>
                    <div className='sm:w-[80%] flex flex-row item-center p-4 items-center justify-between'>
                        <p>Email: </p>
                        <input
                            className='text-[0.85rem] w-[65%] rounded-md border-[1.5px] border-gray-600 bg-transparent h-9 focus:outline-none focus:border-gray-500 focus:ring-0 dark:focus:ring-orange-800 dark:focus:ring-offset-gray-800'
                            value={AccountEmail}
                            onChange={HandleEmail}
                            type='email'
                            name='email'
                        />
                    </div>
                </li>
                <li className='w-[95%] mx-auto text-[0.8rem] border-b-[1px] border-gray-700'>
                    <div className='sm:w-[80%] flex flex-row item-center p-4 items-center justify-between'>
                        <p>current password: </p>
                        <input
                            className='text-[0.85rem] w-[50%] rounded-md border-[1.5px] border-gray-600 bg-transparent h-9 focus:outline-none focus:border-gray-500 focus:ring-0 dark:focus:ring-orange-800 dark:focus:ring-offset-gray-800'
                            value={currentPassword}
                            onChange={HandleCurrentPassword}
                            placeholder='current password'
                            type="password" 
                            name='currentPassword'
                        />
                    </div>
                </li>
                <li className='w-[95%] mx-auto text-[0.8rem]'>
                    <div className='sm:w-[80%] flex flex-row item-center p-4 items-center justify-between'>
                        <p>new password: </p>
                        <input
                            className='text-[0.85rem] w-[50%] rounded-md border-[1.5px] border-gray-600 bg-transparent h-9 focus:outline-none focus:border-gray-500 focus:ring-0 dark:focus:ring-orange-800 dark:focus:ring-offset-gray-800'
                            value={newPassword}
                            onChange={HandleNewPassword}
                            placeholder='new password'
                            type="password" 
                            name='newPassword'
                        />
                    </div>
                </li>
            {updateSuccess ? (
                <div className="text-green-600 my-2 px-6 py-3 mx-6 font-thin text-[0.8rem] flex flex-row">User information updated successfully</div>
            ) : null}
        </ul>
    </form>
    </>
    )
}