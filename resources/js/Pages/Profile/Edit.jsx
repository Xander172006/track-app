import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { handleSubmit } from '@/Pages/Profile/validations/handleSubmit';

import Footer from '@/Layouts/footer';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RegisterAccount from '@/Pages/Profile/validations/RegisterAccount';

import ActiveTab from '@/Pages/Profile/validations/ActiveTabs';

import GebruikersInformatie from '@/Pages/Profile/validations/gebruikersinformatie';
import Beveiliging from '@/Pages/Profile/validations/Beveiliging';

import Salmonrungear from '@/Pages/Profile/validations/Salmonrungear';
import GameAccountStats from '@/Pages/Profile/validations/GameAccountStats';

import { Head } from '@inertiajs/react';

const Edit = ({ auth, error, success, gameAccount, user, SalmonrunApi }) => {
    const { data, setData, post } = useForm({
        username: '',
        password: '',
        UID: '',
    });

    // Define the activeTab state variable and its setter function
    const [activeTab, setActiveTab] = useState("gebruikersinformatie");
    const [AccountBio, setAccountBio] = useState(user.bio)

    if (activeTab == 'gebruikersinformatie') {
        console.log('user: current');
    }

    const HandleAccountBio = (e) => {
        setAccountBio(e.target.value);
        setData('bio', e.target.value);
        localStorage.setItem('AccountBio', e.target.value);
    }

    const UpdateAccountBio = async(e) => {
        try {
            post('/update-user-bio', data);
            setUpdateBioSuccess(true);
        } catch (errror) {
            console.log('Error updating user bio', error);
        }
    };

    return (
        <>
        <AuthenticatedLayout user={auth.user}>
            <Head title='account' />
            <main className='p-4'>
                 
                    
                    {!gameAccount ? (
                        <div className='sm:max-w-[80%] max-w-[95%] mt-5 mx-auto sm:px-6 lg:px-8 space-y-6'>
                            <div className="p-0 sm:p-8 text-white shadow sm:rounded-lg">
                                <RegisterAccount data={data} error={error} success={success} auth={auth} gameAccount={gameAccount} user={user} />
                            </div>
                        </div>
                    ) : (
                        <>

                        <div className='grid grid-cols-2 place-content-start items-center sm:w-[25%] w-[100%] gap-2 sm:ml-[10%] bg-gray-600 rounded-xl shadow-md shadow-gray-900 text-[0.9rem]'>
                            <button onClick={() => setActiveTab("gebruikersinformatie")} className={`w-full items-center rounded-md text-center py-1 px-2 gap-3 min-h-[100%]  ${activeTab === "gebruikersinformatie" ? "bg-gray-800 text-white rounded-l-xl font-semibold" : ""}`}>user settings</button>
                            <button onClick={() => setActiveTab("gameAccountSettings")} className={`w-full items-center rounded-md text-center py-1 px-2 gap-3 min-h-[100%] ${activeTab === "gameAccountSettings" ? "bg-gray-800 text-white rounded-r-xl font-semibold" : ""}`}>game account settings</button>
                        </div>
                            {activeTab === 'gebruikersinformatie' && (
                                <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 my-[2%] sm:w-[90%] w-full place-content-center items-center ml-auto text-[#BCBCBC]">
                                    <div className="bg-[#191919] rounded-md sm:col-span-1 sm:w-[90%] w-full grid grid-cols-1 place-content-center shadow-lg shadow-gray-950 mb-auto pt-2 border-[0.5px] border-gray-900">
                                        {user.profiel ? (
                                            <>
                                                <img
                                                    src={`/storage/images/${user.profiel}`}
                                                    alt="profilePicture"
                                                    className='w-[60%] p-4 flex justify-center mx-auto rounded-[50%]'
                                                />
                                            </>                      
                                        ) : (
                                            <>
                                                <img className='w-[60%] p-4 flex justify-center mx-auto rounded-[50%]' src="https://cdn.accounts.nintendo.com/account/images/common/defaults/mii.png?t=1693897123" alt="profilePicture"/>
                                            </>
                                        )}
                                        <div className='mx-auto'>
                                            <h1 className='text-[1.35rem] font-semibold'>{user.name}</h1>
                                            <span className='flex flex-row items-center justify-start gap-4'>
                                                <p className='text-gray-500 text-[1.2rem]' style={{fontWeight: 100}}>{gameAccount.username}</p>
                                                <p className='text-gray-500 text-[1.2rem]'>{user.geslacht}</p>
                                            </span>
                                        </div>

                                        <form className='mx-auto w-[60%] mb-7' onSubmit={UpdateAccountBio}>
                                            <div className='mx-auto my-4'>
                                                <p className='ml-3 font-semibold'>bio</p>
                                                <textarea 
                                                    className='text-[0.9rem] w-[90%] ml-3 mb-3 bg-transparent border-[0.5px] border-gray-600 mx-auto focus:outline-none focus:border-gray-500 focus:ring-0' 
                                                    name="" 
                                                    id="" 
                                                    cols="30" 
                                                    rows="4"
                                                    defaultValue={AccountBio}
                                                    onChange={HandleAccountBio}
                                                >
                                                </textarea>
                                            </div>
                                            <button className='font-bold bg-gray-800 py-1 rounded-md border-[0.5px] border-gray-600 w-full hover:bg-gray-700 transition duration-300 ease-in-out text-[0.8rem]'>Edit bio</button>
                                        </form>

                                        {user.geboortedatum && user.Land && (
                                            <div>
                                                <span className="flex flex-row items-center ml-auto w-[80%] gap-3 text-[0.9rem] my-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cake2" viewBox="0 0 16 16">
                                                    <path d="m3.494.013-.595.79A.747.747 0 0 0 3 1.814v2.683c-.149.034-.293.07-.432.107-.702.187-1.305.418-1.745.696C.408 5.56 0 5.954 0 6.5v7c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 15.773 5.898 16 8 16c2.102 0 4.022-.227 5.432-.603.701-.187 1.305-.418 1.745-.696.415-.261.823-.655.823-1.201v-7c0-.546-.408-.94-.823-1.201-.44-.278-1.043-.51-1.745-.696A12.418 12.418 0 0 0 13 4.496v-2.69a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 12 1.813V4.3a22.03 22.03 0 0 0-2-.23V1.806a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 9 1.813v2.204a28.708 28.708 0 0 0-2 0V1.806A.747.747 0 0 0 7.092.802l-.598-.79-.595.792A.747.747 0 0 0 6 1.813V4.07c-.71.05-1.383.129-2 .23V1.806A.747.747 0 0 0 4.092.802l-.598-.79Zm-.668 5.556L3 5.524v.967c.311.074.646.141 1 .201V5.315a21.05 21.05 0 0 1 2-.242v1.855c.325.024.659.042 1 .054V5.018a27.685 27.685 0 0 1 2 0v1.964c.341-.012.675-.03 1-.054V5.073c.72.054 1.393.137 2 .242v1.377c.354-.06.689-.127 1-.201v-.967l.175.045c.655.175 1.15.374 1.469.575.344.217.356.35.356.356 0 .006-.012.139-.356.356-.319.2-.814.4-1.47.575C11.87 7.78 10.041 8 8 8c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 6.639 1 6.506 1 6.5c0-.006.012-.139.356-.356.319-.2.814-.4 1.47-.575ZM15 7.806v1.027l-.68.907a.938.938 0 0 1-1.17.276 1.938 1.938 0 0 0-2.236.363l-.348.348a1 1 0 0 1-1.307.092l-.06-.044a2 2 0 0 0-2.399 0l-.06.044a1 1 0 0 1-1.306-.092l-.35-.35a1.935 1.935 0 0 0-2.233-.362.935.935 0 0 1-1.168-.277L1 8.82V7.806c.42.232.956.428 1.568.591C3.978 8.773 5.898 9 8 9c2.102 0 4.022-.227 5.432-.603.612-.163 1.149-.36 1.568-.591Zm0 2.679V13.5c0 .006-.012.139-.356.355-.319.202-.814.401-1.47.576C11.87 14.78 10.041 15 8 15c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575-.344-.217-.356-.35-.356-.356v-3.02a1.935 1.935 0 0 0 2.298.43.935.935 0 0 1 1.08.175l.348.349a2 2 0 0 0 2.615.185l.059-.044a1 1 0 0 1 1.2 0l.06.044a2 2 0 0 0 2.613-.185l.348-.348a.938.938 0 0 1 1.082-.175c.781.39 1.718.208 2.297-.426Z"/>
                                                    </svg>
                                                    <p>{user.geboortedatum}</p>
                                                </span>
                                                <span className="flex flex-row items-center ml-auto w-[80%] gap-3 text-[0.9rem] my-1 mb-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                                    </svg>
                                                    <p>{user.Land}</p>
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="sm:col-span-2 grid grid-cols-1 mb-auto sm:w-[80%] w-full gap-6">
                                        <div className='bg-[#191919] rounded-lg shadow-md shadow-gray-900 border-[0.5px] border-gray-800'>
                                            <GebruikersInformatie user={user} />
                                        </div>

                                        <div className='bg-[#191919] rounded-lg shadow-md shadow-gray-900 border-[0.5px] border-gray-800'>
                                            <Beveiliging user={user}/>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'gameAccountSettings' && (
                                <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 my-[2.5%] sm:w-[90%] place-content-center items-center ml-auto text-[#BCBCBC]">
                                    <div className="bg-[#191919] sm:w-[90%] rounded-md sm:col-span-1 grid grid-cols-1 place-content-center shadow-lg shadow-gray-950">
                                        {user.profiel ? (
                                            <>
                                                <img
                                                    src={`/storage/images/${user.profiel}`}
                                                    alt="profilePicture"
                                                    className='w-[60%] p-4 flex justify-center mx-auto rounded-[50%]'
                                                />
                                            </>                      
                                        ) : (
                                            <>
                                                <img className='w-[60%] p-4 flex justify-center mx-auto rounded-[50%]' src="https://cdn.accounts.nintendo.com/account/images/common/defaults/mii.png?t=1693897123" alt="profilePicture"/>
                                            </>
                                        )}
                                        <div className='mx-auto'>
                                            <h1 className='text-[1.35rem] font-semibold'>{user.name}</h1>
                                            <span className='flex flex-row items-center justify-start gap-4'>
                                                <p className='text-gray-500 text-[1.2rem]' style={{fontWeight: 100}}>{gameAccount.username}</p>
                                                <p>{gameAccount.geslacht}</p>
                                            </span>
                                        </div>

                                        <div className='mx-auto my-4'>
                                            <p className='ml-3 font-semibold'>bio</p>
                                            <textarea 
                                                className='text-[0.9rem] w-[90%] ml-3 mb-3 bg-transparent border-[0.5px] border-gray-600 mx-auto focus:outline-none focus:border-gray-500 focus:ring-0' 
                                                name="" 
                                                id="" 
                                                cols="30" 
                                                rows="4"
                                                defaultValue={AccountBio}
                                                onChange={HandleAccountBio}
                                            >
                                            </textarea>
                                        </div>
                                        <form className='mx-auto w-[60%] mb-7' action="">
                                            <button className='font-bold bg-gray-800 py-1 rounded-md border-[0.5px] border-gray-600 w-full hover:bg-gray-700 transition duration-300 ease-in-out text-[0.8rem]'>Edit bio</button>
                                        </form>

                                        {user.geboortedatum && user.Land && (
                                            <div>
                                                <span className="flex flex-row items-center ml-auto w-[80%] gap-3 text-[0.9rem] my-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cake2" viewBox="0 0 16 16">
                                                    <path d="m3.494.013-.595.79A.747.747 0 0 0 3 1.814v2.683c-.149.034-.293.07-.432.107-.702.187-1.305.418-1.745.696C.408 5.56 0 5.954 0 6.5v7c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 15.773 5.898 16 8 16c2.102 0 4.022-.227 5.432-.603.701-.187 1.305-.418 1.745-.696.415-.261.823-.655.823-1.201v-7c0-.546-.408-.94-.823-1.201-.44-.278-1.043-.51-1.745-.696A12.418 12.418 0 0 0 13 4.496v-2.69a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 12 1.813V4.3a22.03 22.03 0 0 0-2-.23V1.806a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 9 1.813v2.204a28.708 28.708 0 0 0-2 0V1.806A.747.747 0 0 0 7.092.802l-.598-.79-.595.792A.747.747 0 0 0 6 1.813V4.07c-.71.05-1.383.129-2 .23V1.806A.747.747 0 0 0 4.092.802l-.598-.79Zm-.668 5.556L3 5.524v.967c.311.074.646.141 1 .201V5.315a21.05 21.05 0 0 1 2-.242v1.855c.325.024.659.042 1 .054V5.018a27.685 27.685 0 0 1 2 0v1.964c.341-.012.675-.03 1-.054V5.073c.72.054 1.393.137 2 .242v1.377c.354-.06.689-.127 1-.201v-.967l.175.045c.655.175 1.15.374 1.469.575.344.217.356.35.356.356 0 .006-.012.139-.356.356-.319.2-.814.4-1.47.575C11.87 7.78 10.041 8 8 8c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 6.639 1 6.506 1 6.5c0-.006.012-.139.356-.356.319-.2.814-.4 1.47-.575ZM15 7.806v1.027l-.68.907a.938.938 0 0 1-1.17.276 1.938 1.938 0 0 0-2.236.363l-.348.348a1 1 0 0 1-1.307.092l-.06-.044a2 2 0 0 0-2.399 0l-.06.044a1 1 0 0 1-1.306-.092l-.35-.35a1.935 1.935 0 0 0-2.233-.362.935.935 0 0 1-1.168-.277L1 8.82V7.806c.42.232.956.428 1.568.591C3.978 8.773 5.898 9 8 9c2.102 0 4.022-.227 5.432-.603.612-.163 1.149-.36 1.568-.591Zm0 2.679V13.5c0 .006-.012.139-.356.355-.319.202-.814.401-1.47.576C11.87 14.78 10.041 15 8 15c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575-.344-.217-.356-.35-.356-.356v-3.02a1.935 1.935 0 0 0 2.298.43.935.935 0 0 1 1.08.175l.348.349a2 2 0 0 0 2.615.185l.059-.044a1 1 0 0 1 1.2 0l.06.044a2 2 0 0 0 2.613-.185l.348-.348a.938.938 0 0 1 1.082-.175c.781.39 1.718.208 2.297-.426Z"/>
                                                    </svg>
                                                    <p>{user.geboortedatum}</p>
                                                </span>
                                                <span className="flex flex-row items-center ml-auto w-[80%] gap-3 text-[0.9rem] my-1 mb-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                                    </svg>
                                                    <p>{user.Land}</p>
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="sm:col-span-2 grid grid-cols-1 mb-auto  sm:w-[90%] gap-6">
                                        <div className='grid sm:grid-cols-2 items-center gap-5'>
                                            <GameAccountStats gameAccount={gameAccount}/>
                                        </div>
                                        <div className='bg-[#191919]'>

                                        </div>
                                    </div>
                                </div>
                            )}

                                {/* <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 place-content-center'>
                                    <div className='bg-black p-4 sm:p-8 rounded-xl shadow-lg shadow-gray-800'><ActiveTab gameAccount={gameAccount} activeTab={activeTab} setActiveTab={setActiveTab} user={user}/></div>

                                    {activeTab === 'gebruikersinformatie' && (
                                        <div className='bg-black p-0 rounded-xl shadow-lg shadow-gray-800'><GebruikersInformatie user={user} /></div>
                                    )}
                                    {activeTab === 'gameAccountSettings' && (
                                        <div className='bg-black p-0 rounded-xl shadow-lg shadow-gray-800'><GameAccountStats activeTab={activeTab} user={user} gameAccount={gameAccount} success={success} error={error} auth={auth} /></div>
                                    )}

                                    <div className={`bg-black p-6 rounded-xl shadow-lg shadow-gray-800 relative 
                                        ${activeTab === "gebruikersinformatie" ? "bottom-0" : "bottom-0"}
                                        ${activeTab === "beveiliging" ? "bottom-0" : "bottom-0"}
                                        ${activeTab === "gameAccountSettings" ? "bottom-0" : "bottom-0"}
                                    `}>
                                        <Salmonrungear SalmonrunApi={SalmonrunApi}/>
                                    </div>
                                    <div className='bg-black p-0 rounded-xl shadow-lg shadow-gray-800'><SecurityInformation user={user} /></div>
                                </div> */}
                            </>
                        )}
                    </main>
            </AuthenticatedLayout>
        <Footer/>
        </>
    );
};

export default Edit;
