import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

import '../../../../css/style.css';

export default function ActiveTab({ gameAccount, activeTab, setActiveTab, user }) {
    const { data, setData, post } = useForm({});

    // update requests success
    const [updatedProfileSuccess, setUpdateProfileSuccess] = useState(false);
    const [updatedBioSuccess, setUpdateBioSuccess] = useState(false);

    const [AccountBio, setAccountBio] = useState(user.bio)

    const handleFileChange = (e) => {
        setData('ProfileInput', e.target.files[0]);
    };

    const HandleAccountBio = (e) => {
        setAccountBio(e.target.value);
        setData('bio', e.target.value);
        localStorage.setItem('AccountBio', e.target.value);
    }

    const handleSubmit = async (e) => {
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

    const UpdateAccountBio = async(e) => {
        try {
            post('/update-user-bio', data);
            setUpdateBioSuccess(true);
        } catch (errror) {
            console.log('Error updating user bio', error);
        }
    };

    return (
        <div className='flex flex-col'>
            <form className='flex flex-col items-center' onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='flex flex-row 2xl:justify-start items-center gap-4 w-full'>
                    <label className="custom-file-upload">
                        {user.profiel ? (
                            <img
                                src={`/storage/images/${user.profiel}`}
                                alt="profilePicture"
                                className='h-[3rem] w-[15rem] rounded-full sm:w-[15rem] sm:h-[4.5rem] sm:rounded-full hover:scale-[1.05] transition duration-300 ease-in-out'
                            />                        
                        ) : (
                            <img src="https://cdn.accounts.nintendo.com/account/images/common/defaults/mii.png?t=1693897123" alt="profilePicture" className='w-full rounded-[20px] hover:scale-[1.05] transition duration-300 ease-in-out'/>
                        )}
                        <input type="file" name="ProfileInput" onChange={handleFileChange} />
                    </label>
                    <h1 className='sm:text-[1.3rem]'>{gameAccount.username}</h1>
                </div>
                <input className='flex justify-start sm:ml-3 mr-auto text-gray-300 p-2 text-[0.75rem] rounded-lg hover:scale-[1.15] transition duration-300 ease-in-out' type="submit" name='SubmitProfile' value="change"/>
            </form>
            {updatedProfileSuccess ? (
                <p className="text-green-600 text-[0.9rem]">Updated profile picture</p>
            ) : null}

            <div>
                <div className='flex flex-col gap-5 mt-5 text-[0.8rem] sm:text-[1.1rem]'>
                    <button onClick={() => setActiveTab("gebruikersinformatie")} className={`flex flex-row items-center gap-3  ${activeTab === "gebruikersinformatie" ? "text-orange-500" : "text-white"}`}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                            </svg>
                        </span>
                        <span className='transition hover:translate-x-2 duration-300 ease-in-out'>User account information</span>
                    </button>

                    <button onClick={() => setActiveTab("gameAccountSettings")} className={`flex flex-row items-center gap-3 ${activeTab === "gameAccountSettings" ? "text-orange-500" : "text-white"}`}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-controller" viewBox="0 0 16 16">
                            <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"/>
                            <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"/>
                            </svg>
                        </span>
                        <span className='transition hover:translate-x-2 duration-300 ease-in-out'>Game Account Settings</span>
                    </button>
                </div>
            </div>
               
            <form className='flex flex-col w-[80%] sm:w-[60%] mt-6' onSubmit={UpdateAccountBio}>
                <h3 className='text-gray-400'>Bio</h3>

                <div className='flex flex-row w-full gap-5'>
                    <textarea 
                        className='bg-gray-900 border-[1.5px] border-gray-600 text-[0.9rem]' 
                        name="bio" 
                        id="bio" 
                        value={AccountBio}
                        onChange={HandleAccountBio}
                        cols="25" 
                        rows="4" 
                        placeholder='Add some information about youself'
                    >
                    </textarea>
                    <button className='bg-gray-600 p-[6px] rounded-md text-[0.9rem] sm:w-[20%] h-[10%] mt-auto' type='submit'>change</button>
                </div>
                {updatedBioSuccess ? (
                    <p className="text-green-600 text-[0.9rem]">Updated bio information</p>
                ) : null}
            </form>
        </div>
    )
}