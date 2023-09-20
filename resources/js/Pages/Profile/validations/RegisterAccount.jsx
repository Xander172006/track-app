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
    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-2 mt-4'>
        <input
            type="text"
            name="username"
            placeholder='Username'
            value={data.username}
            className="bg-white border-gray-400 border-[3px] h-[3rem] rounded-lg w-[35%] text-black text-[0.9rem] placeholder:text-gray-400"
            onChange={(e) => setData('username', e.target.value)}
        />
        <input
            type="password"
            name="password"
            placeholder='Wachtwoord'
            className="bg-white border-gray-400 border-[3px] h-[3rem] rounded-lg w-[35%] text-black text-[0.9rem] placeholder:text-gray-400"
            onChange={(e) => setData('password', e.target.value)}
        />
        {error && (
            <div className="text-red-500 my-2">
                {error}
            </div>
        )}
        {success && (
            <div className="text-green-500 my-2">
                {success}
            </div>
        )}
        <div className='flex flex-row text-[0.85rem] w-full justify-center items-center gap-[8rem]'>
            <a href="" className='text-blue-500'>Wachtwoord vergeten</a>
            <button className='flex justify-center my-3 bg-orange-700 p-2 items-center text-center rounded-lg w-[10%]' type='submit'>Registreer</button>
        </div>
    </form>
    <form className='flex justify-center flex-col items-center text-[0.9rem] my-12 bg-gray-800 w-[40%] rounded-lg py-6 mx-auto'>
        <h1>Registreer met UID</h1>

        <input
            type="number"
            name="UID"
            placeholder='UID'
            className="bg-white border-gray-400 border-[3px] h-[2.5rem] my-6 rounded-lg w-[60%] text-black text-[0.9rem] placeholder:text-gray-400"
            onChange={(e) => setData('UID', e.target.value)}
        />
    </form>
</>
    );
}