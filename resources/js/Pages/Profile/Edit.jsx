import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { handleSubmit } from '@/Pages/Profile/validations/handleSubmit';

import Footer from '@/Layouts/footer';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RegisterAccount from '@/Pages/Profile/validations/RegisterAccount';
import ActiveTab from '@/Pages/Profile/validations/ActiveTabs';
import Salmonrungear from '@/Pages/Profile/validations/Salmonrungear';
import GebruikersInformatie from '@/Pages/Profile/validations/gebruikersinformatie';
import SecurityInformation from '@/Pages/Profile/validations/Beveiliging';
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title='account' />
            <main className='p-4'>
                <div className='max-w-[80%] mx-auto sm:px-6 lg:px-8 space-y-6'>
                    <div className='flex justify-center'>
                        <img className='w-[25%]' src="https://vignette.wikia.nocookie.net/fantendo/images/c/c0/Salmonrun_logo.png/revision/latest/scale-to-width-down/300?cb=20180128193715" alt="SalmonRun"/>
                    </div>
                    
                    <div className="p-4 sm:p-8 text-white shadow sm:rounded-lg">
                        {!gameAccount ? (
                            <RegisterAccount data={data} error={error} success={success} auth={auth} gameAccount={gameAccount} user={user} />
                        ) : (
                            <>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 place-content-center'>
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
                            </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer/>
        </AuthenticatedLayout>
    );
};

export default Edit;
