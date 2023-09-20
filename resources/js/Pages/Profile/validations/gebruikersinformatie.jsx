import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function GebruikersInformatie({ user }) {
    const { data, setData, post } = useForm({
        username: user.name,
        geboortedatum: user.geboortedatum,
        geslacht: user.geslacht,
        regio: user.Land,
    });

    // sets value to the users information
    const [AccountUsername, setUsername] = useState(user.name);
    const [AccountGeboortedatum, setGeboortedatum] = useState(user.geboortedatum);
    const [AccountGeslacht, setGeslacht] = useState(user.geslacht);
    const [AccountRegio, setRegio] = useState(user.Land);
    

    // name
    const HandleUsername = (e) => {
        setUsername(e.target.value);
        setData('username', e.target.value);
        localStorage.setItem('AccountUsername', e.target.value);
    }

    // birth
    const HandleGeboortedatum = (e) => {
        setGeboortedatum(e.target.value);
        setData('geboortedatum', e.target.value);
        localStorage.setItem('AccountGeboortedatum', e.target.value);
    }

    // gender
    const HandleGeslacht = (e) => {
        setGeslacht(e.target.value);
        setData('geslacht', e.target.value);
        localStorage.setItem('AccountGeslacht', e.target.value);
    }

    // region
    const HandleRegio = (e) => {
        setRegio(e.target.value);
        setData('regio', e.target.value);
        localStorage.setItem('AccountRegio', e.target.value);
    }


    // returns the success message after updating user account info
    const [updateSuccess, setUpdateSuccess] = useState(false);

    // updates the user account information
    const UpdateUserAccount = async(e) => {
        e.preventDefault();
        try {
            post('/update-user-account', data);
            setUpdateSuccess(true);
        } catch (error) {
            console.log('Error updating user account', error);
        }
    }
    
    return (
        <>
        <h1 className='text-[1.75rem]'>Gebruikersinformatie</h1>                   
                <div className='bg-gray-800 mt-6 rounded-lg'>
                    <form className='flex flex-col' onSubmit={UpdateUserAccount}>
                        <div className='flex flex-row justify-between px-7 py-4'>
                        <h2 className='font-bold text-[1.1rem]'>Profiel</h2>
                        <button className='text-[0.85rem] border-[2px] border-gray-600 px-3 rounded-xl
                         hover:bg-gray-600 transition duration-300 ease-in-out'>Wijzigen</button>
                    </div>
                        <ul className=' bg-gray-700 rounded-b-lg'>
                        <li className='px-6 py-3 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'>
                            <span>Gebruikersnaam: </span>
                            <input
                                className='ml-auto w-[45%] bg-gray-700 h-7 border-none text-gray-100 text-[0.9rem] placeholder:text-gray-300'
                                value={AccountUsername}
                                onChange={HandleUsername}
                                type='text'
                                name='username'
                            />
                        </li>
                       <li className='px-6 py-3 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'>
                            <span>Geboortedatum:  </span>
                            <input 
                                className='ml-auto w-[45%] bg-gray-700 h-7 border-none text-gray-100 text-[0.9rem] placeholder:text-gray-300'
                                value={AccountGeboortedatum}
                                onChange={HandleGeboortedatum}
                                type='date'
                                name='geboortedatum'
                            />
                        </li>
                        <li className='px-6 py-3 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'>
                            <span>Geslacht:       </span>
                            <input 
                                className='ml-auto w-[45%] bg-gray-700 h-7 border-none text-gray-100 text-[0.9rem] placeholder:text-gray-300'
                                value={AccountGeslacht}
                                onChange={HandleGeslacht}
                                type='text'
                                name='geslacht'
                            />
                        </li>
                        <li className='px-6 py-3 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'>
                            <span>Land/regio:     </span>
                            <input 
                                className='ml-auto w-[45%] bg-gray-700 h-7 border-none text-gray-100 text-[0.9rem] placeholder:text-gray-300'
                                value={AccountRegio}
                                onChange={HandleRegio}
                                type='text'
                                name='regio'
                            />
                        </li>
                        <li className='px-6 py-3 mx-6 font-thin text-[0.8rem] flex flex-row text-gray-400 rounded-b-lg'>
                            <span>Account bestaat sinds:  </span><span className='ml-auto'>{user.created_at}</span>
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