import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Edit = ({ auth, error, success, gameAccount, user }) => {
    const { data, setData, post } = useForm({
        username: '',
        nintendo_uid: '', // Add a field for Nintendo UID.
    });

    const [ activeTab , setActiveTab ] = useState("gebruikersinformatie");
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        post('/create-account', data);
    };

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

    console.log(activeTab);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title='account'/>
            <main className='p-12'>
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6'>
                    <div className="p-4 sm:p-8 bg-black text-white shadow sm:rounded-lg">
                        {!gameAccount ? (
                            <form onSubmit={handleSubmit} className='flex flex-col w-[30%] justify-start'>
                                <input
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    className="bg-gray-900 border-orange-700 border-[1px] h-[2rem] rounded-lg w-[50%] text-gray-300"
                                    onChange={(e) => setData('username', e.target.value)}
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

                                <button className='flex justify-center my-3 bg-orange-700 p-2 w-[30%] items-center text-center rounded-lg' type='submit'>Submit</button>
                            </form>
                        ) : (
                            <div className='grid grid-cols-2 place-items-center px-[10%] mt-[2rem]'>
                                <div className='flex flex-col justify-center items-center gap-5 mb-auto'>
                                    <img src="https://cdn.accounts.nintendo.com/account/images/common/defaults/mii.png?t=1693897123" alt="profilePicture" className='w-[60%] rounded-[100px]'/>
                                    <h1 className='text-[1.3rem]'>{gameAccount.username}</h1>

                                    <div>
                                        <div className='flex flex-col gap-3 text-[0.9rem]'>
                                            <button onClick={() => setActiveTab("gebruikersinformatie")} className={`flex flex-row gap-3  ${activeTab === "gebruikersinformatie" ? "text-orange-500" : "text-white"}`}>
                                                <span><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                                </svg></span><span>Gebruikersinformatie</span>
                                            </button>

                                            <button onClick={() => setActiveTab("beveiliging")} className={`flex flex-row gap-3 ${activeTab === "beveiliging" ? "text-orange-500" : "text-white"}`}>
                                                <span><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                                </svg></span><span>Inlog- en beveiligingsinstellingen</span>
                                            </button>

                                            <button onClick={() => setActiveTab("gameAccountSettings")} className={`flex flex-row gap-3 ${activeTab === "gameAccountSettings" ? "text-orange-500" : "text-white"}`}>
                                                <span><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-controller" viewBox="0 0 16 16">
                                                    <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"/>
                                                    <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"/>
                                                </svg></span><span>Game Account Settings</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col w-full mb-auto'>
                                {activeTab === 'gebruikersinformatie' && (
                                    <>
                                    <h1 className='text-[1.75rem]'>Gebruikersinformatie</h1>
                                    
                                    <div className='bg-gray-800 mt-6 rounded-lg'>
                                        <form className='flex flex-col'>
                                            <div className='flex flex-row justify-between px-7 py-4'>
                                                <h2 className='font-bold text-[1.1rem]'>Profiel</h2>
                                                <button className='text-[0.85rem] border-[2px] border-gray-600 px-3 rounded-xl
                                                hover:bg-gray-600 transition duration-300 ease-in-out'>Wijzigen</button>
                                            </div>

                                            <ul className=' bg-gray-700'>
                                                <li className='px-6 py-3 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'><span>Gebruikersnaam: </span> <span className='ml-auto'>{user.name}</span></li>
                                                <li className='px-6 py-3 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'><span>Geboortedatum:  </span> <span>{user.geboortedatum}</span></li>
                                                <li className='px-6 py-3 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'><span>Geslacht:       </span> <span>{user.geslacht}</span></li>
                                                <li className='px-6 py-3 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'><span>Land/regio:     </span> <span>{user.Land}</span></li>
                                                <li className='px-6 py-3 mx-6 font-thin text-[0.8rem] flex flex-row'><span>Tijdzone:       </span> <span>{user.geboortedatum}</span></li>
                                            </ul>
                                        </form>
                                        <form className='flex flex-col'>
                                            <div className='flex flex-row justify-between px-7 py-4'>
                                                <h2>E-mailadres</h2>
                                                <button className='text-[0.85rem] border-[2px] border-gray-600 px-3 rounded-xl
                                                hover:bg-gray-600 transition duration-300 ease-in-out'>Wijzigen</button>
                                            </div>
                                            <ul className=' bg-gray-700 rounded-b-xl'>
                                                <li className='px-6 py-3 mx-6 font-thin text-[0.8rem] flex flex-row'><span>E-mailadres: </span> <span className='ml-auto'>{obscureEmail(user.email)}</span></li>
                                            </ul>
                                        </form>
                                    </div>
                                    </>
                                    )}
                                    {activeTab === 'beveiliging' && (
                                        <h1>beveiliging</h1>
                                    )}
                                    {activeTab === 'gameAccountSettings' && (
                                        <>
                                            <h1 className='text-[1.75rem]'>Game Account Settings</h1>

                                            <div className='bg-gray-800 mt-6 rounded-lg'>
                                                <form className='flex flex-col'>
                                                    <div className='flex flex-row justify-between px-7 py-4'>
                                                        <h2 className='font-bold text-[1.1rem]'>Game Stats</h2>
                                                        <button className='text-[0.85rem] border-[2px] border-gray-600 px-3 rounded-xl
                                                        hover:bg-gray-600 transition duration-300 ease-in-out'>Wijzigen</button>
                                                    </div>

                                                    <ul className=' bg-gray-700'>
                                                        <form onSubmit={}>
                                                            <li className='px-6 py-3 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'><span>Shifts worked:          </span> <input className='ml-auto bg-gray-700 h-7 border[1px] border-gray-700 text-gray-400 text-[0.9rem]' value={gameAccount['shifts worked']}/></li>
                                                            <li className='px-6 py-3 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'><span>Golden Eggs collected:  </span> <input className='ml-auto bg-gray-700 h-7 border[1px] border-gray-700 text-gray-400 text-[0.9rem]' value={gameAccount['Golden Eggs collected']}/></li>
                                                            <li className='px-6 py-3 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'><span>Power Eggs collected:   </span> <input className='ml-auto bg-gray-700 h-7 border[1px] border-gray-700 text-gray-400 text-[0.9rem]' value={gameAccount['Power Eggs collected']}/></li>
                                                            <li className='px-6 py-3 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'><span>King Salmonids defeated:</span> <input className='ml-auto bg-gray-700 h-7 border[1px] border-gray-700 text-gray-400 text-[0.9rem]' value={gameAccount['King Salmonids defeated']}/></li>
                                                            <li className='px-6 py-3 mx-6 border-b-[1px] border-gray-500 font-thin text-[0.8rem] flex flex-row'><span>Crew Members defeated:  </span> <input className='ml-auto bg-gray-700 h-7 border[1px] border-gray-700 text-gray-400 text-[0.9rem]' value={gameAccount['Crew members rescued']}/></li>

                                                            <li className='px-6 py-3 mx-6 font-thin text-[0.8rem] flex flex-row'><span>Total points:           </span> <input className='ml-auto bg-gray-700 h-7 border[1px] border-gray-700 text-gray-400 text-[0.9rem]' value={gameAccount['Total poins']}/></li>
                                                            <p className='text-gray-400 font-thin text-[0.75rem] px-6 py-2'>To get this information download the nintendo switch online app and search your in game stats on splatoon 3</p>
                                                        </form>
                                                    </ul>
                                                </form>
                                                <form className='flex flex-col'>
                                                    <div className='flex flex-row justify-between px-7 py-4'>
                                                        <h2>Game user account</h2>
                                                        <button className='text-[0.85rem] border-[2px] border-gray-600 px-3 rounded-xl
                                                        hover:bg-gray-600 transition duration-300 ease-in-out'>Wijzigen</button>
                                                    </div>
                                                    <ul className=' bg-gray-700 rounded-b-xl'>
                                                        <li className='py-3 mx-6 border-b-[1px] border-gray-500 font-thin text-[0.9rem] flex flex-row'><span>username: </span> <span className='ml-auto'>{gameAccount.username}</span></li>
                                                        <li className=' py-3 mx-6 font-thin text-[0.9rem] flex flex-row'><span>UID: </span> <span className='ml-auto'>{gameAccount.UID}</span></li>
                                                    </ul>
                                                </form>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
};

export default Edit;
