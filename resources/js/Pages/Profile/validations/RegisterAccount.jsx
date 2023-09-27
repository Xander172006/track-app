import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { handleSubmit } from '@/Pages/Profile/validations/handleSubmit';

export default function RegisterAccount({ auth, error, success, gameAccount, user }) {
    const { data, setData, post } = useForm({
        username: '',
        password: '',
        UID: '',
    });
    // creates a new Game Account
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        post('/create-account', data);
    };

return (
<>
    <form 
        onSubmit={handleSubmit} 
        className='backdrop-blur-[20px] bg-black bg-opacity-60 overflow-hidden w-[50%] mx-auto rounded-xl shadow-lg shadow-gray-800'>
        <div className='flex flex-col justify-center items-center w-full gap-2 mt-0 pb-3'>
            <h1 className='text-[1.25rem] flex justify-center text-white py-5'>Make game account</h1>
            <input
                type="text"
                name="username"
                placeholder='Ingame username'
                value={data.username}
                className="bg-white border-gray-400 border-[3px] h-[3rem] rounded-lg w-[70%] text-black text-[0.9rem] placeholder:text-gray-400"
                onChange={(e) => setData('username', e.target.value)}
            />
            <input
                type="password"
                name="password"
                placeholder='Password'
                className="bg-white border-gray-400 border-[3px] h-[3rem] rounded-lg w-[70%] text-black text-[0.9rem] placeholder:text-gray-400"
                onChange={(e) => setData('password', e.target.value)}
            />
        </div>
        
        {error && (
            <div className="text-red-500 my-2 flex justify-center">
                {error}
            </div>
        )}

        {success && (
            <div className="text-green-500 my-2 flex justify-center">
                {success}
            </div>
        )}

        <div className='flex flex-row text-[0.85rem] w-full justify-center items-center gap-[8rem] pb-2'>
            <a href="" className='text-blue-500 hover:text-blue-400 transition duration-300 ease-in-out'>Forgot password?</a>
            <button className='flex justify-center my-3 bg-orange-700 p-2 items-center text-center rounded-lg w-[25%] hover:text-black transition duration-500 ease-in-out' type='submit'>Register</button>
        </div>
    </form>

    <form className='flex justify-center flex-col items-center text-[0.9rem] my-12 backdrop-blur-[7.5px] bg-black bg-opacity-60 w-[40%] rounded-xl py-6 mx-auto shadow-lg shadow-gray-800'>
        <h1 className='text-[0.95rem]'>Find account with UID</h1>

        <input
            type="number"
            name="UID"
            placeholder='UID'
            className="bg-white border-gray-400 border-[3px] h-[2.5rem] my-6 rounded-lg w-[60%] text-black text-[0.9rem] placeholder:text-gray-400"
            onChange={(e) => setData('UID', e.target.value)}
        />
        <p className='w-[70%] text-gray-400 text-[0.7rem]'>You can search your UID to find an existing account or your old account.</p>
    </form>
</>
    );
}