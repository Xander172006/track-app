import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import "../../../../css/style.css"

export default function GebruikersInformatie({ user }) {
    const { data, setData, post } = useForm({
        username: user.name,
        geboortedatum: user.geboortedatum,
        geslacht: user.geslacht,
        regio: user.Land,
    });

    // returns the success message after updating user account info
    const [updateSuccess, setUpdateSuccess] = useState(false);

    // handles the state of the profile image
    const handleFileChange = (e) => {
        setData('ProfileInput', e.target.files[0]);
    };

    // updates the profile picture
    const handleProfile = async (e) => {
        const formData = new FormData();
        formData.append('ProfileInput', data.ProfileInput);

        try {
            await post('/update-profile-picture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUpdateProfileSuccess(true);
        } catch (error) {
            console.log('Error updating profile picture', error);
        }
    };





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


    // updates the user account information
    const UpdateUserAccount = async(e) => {
        e.preventDefault;
        try {
            post('/update-user-account', data);
            setUpdateSuccess(true);
        } catch (error) {
            console.log('Error updating user account', error);
        }
    }
    
    return (
        <>           
            <div className='flex flex-col rounded-lg'>
                <div className='flex flex-row justify-between bg-[#262626] rounded-t-lg p-4'>
                    <h2 className='font-semibold text-[1.1rem]'>Profile</h2>
                </div>
                    <ul className='bg-[#191919] rounded-b-xl'>
                        <li className='w-[80%] ml-4 text-[0.8rem] border-b-[1px] border-gray-700'>
                            <form className='w-[60%] flex flex-row item-center p-4 items-center justify-between' onSubmit={handleProfile} encType="multipart/form-data">
                                <label className="custom-file-upload">
                                    {user.profiel ? (
                                        <img
                                            src={`/storage/images/${user.profiel}`}
                                            alt="profilePicture"
                                            className='w-[85%] rounded-[50%] hover:scale-[1.075] hover:border-[1px] hover:border-orange-800 transition duration-400 ease-in-out'
                                        />                        
                                    ) : (
                                        <img className="w-[80%] rounded-[50%] hover:scale-[1.075] hover:border-[1px] hover:border-orange-800 transition duration-400 ease-in-out" src="https://cdn.accounts.nintendo.com/account/images/common/defaults/mii.png?t=1693897123" alt="profilePicture"/>
                                    )}
                                    <input type="file" name="ProfileInput" onChange={handleFileChange} />
                                </label>
                                <input className='flex justify-start sm:ml-3 mr-auto text-gray-300 p-2 text-[0.75rem] rounded-lg hover:scale-[1.15] transition duration-300 ease-in-out' type="submit" name='SubmitProfile' value="change"/>
                            </form>
                        </li>

                        <form onSubmit={UpdateUserAccount}>
                            <div className='flex justify-end w-[95%]'>
                                <button className='text-[0.85rem] border-[2px] border-gray-700 px-3 rounded-xl w-[5%] hover:cursor-pointer hover:bg-gray-700 transition duration-300 ease-in-out absolute'>Edit</button>
                            </div>
                            <li className='w-[95%] mx-auto text-[0.8rem] border-b-[1px] border-gray-700'>
                                <div className='w-[60%] flex flex-row item-center p-4 items-center justify-between'>
                                    <p style={{fontWeight: 100}} className='text-gray-400'>name: </p>
                                    <input
                                        className='text-[0.85rem] w-[50%] rounded-md border-[1.5px] border-gray-600 bg-transparent h-9 focus:outline-none focus:border-gray-500 focus:ring-0 dark:focus:ring-orange-800 dark:focus:ring-offset-gray-800'
                                        value={AccountUsername}
                                        onChange={HandleUsername}
                                        type='text'
                                        name='username'
                                    />
                                </div>
                            </li>
                            <li className='w-[95%] mx-auto text-[0.8rem] border-b-[1px] border-gray-700'>
                                <div className='w-[60%] flex flex-row item-center p-4 items-center justify-between'>
                                    <p style={{fontWeight: 100}} className='text-gray-400'>Birthday:  </p>
                                    <input 
                                        className='text-[0.85rem] w-[50%] rounded-md border-[1.5px] border-gray-600 bg-transparent h-9 focus:outline-none focus:border-gray-500 focus:ring-0 dark:focus:ring-orange-800 dark:focus:ring-offset-gray-800'
                                        id='calendar-icon'
                                        value={AccountGeboortedatum}
                                        onChange={HandleGeboortedatum}
                                        type='date'
                                        name='geboortedatum'
                                    />
                                </div>
                            </li>
                            <li className='w-[95%] mx-auto text-[0.8rem] border-b-[1px] border-gray-700'>
                                <div className='w-[60%] flex flex-row item-center p-4 items-center justify-between'>
                                    <p style={{fontWeight: 100}} className='text-gray-400'> Pronounce as:</p>
                                    <select
                                        className='text-[0.85rem] w-[50%] rounded-md border-[1.5px] border-gray-600 bg-transparent h-10 focus:outline-none focus:border-gray-500 focus:ring-0'
                                        value={AccountGeslacht}
                                        onChange={HandleGeslacht}
                                        name='geslacht'
                                    >
                                        <option value='he/him'>he/him</option>
                                        <option value='she/her'>she/her</option>
                                        <option value='they'>they</option>
                                    </select>
                                </div>
                            </li>
                            <li className='w-[95%] mx-auto text-[0.8rem]'>
                                <div className='w-[60%] flex flex-row item-center p-4 items-center justify-between'>
                                    <p style={{fontWeight: 100}} className='text-gray-400'> Country/region:     </p>
                                    <input 
                                        className='text-[0.85rem] w-[50%] rounded-md border-[1.5px] border-gray-600 bg-transparent h-9 focus:outline-none focus:border-gray-500 focus:ring-0 dark:focus:ring-orange-800 dark:focus:ring-offset-gray-800'
                                        value={AccountRegio}
                                        onChange={HandleRegio}
                                        type='text'
                                        name='regio'
                                    />
                                </div>
                            </li>
                        </form>
                        {updateSuccess ? (
                            <div className="text-green-600 my-3 px-6 mx-6 font-thin text-[0.8rem] flex flex-row">User information updated successfully</div>
                        ) : null}
                    </ul>
            </div>
        </>
    )
}