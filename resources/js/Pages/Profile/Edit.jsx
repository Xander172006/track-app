import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { handleSubmit } from '@/Pages/Profile/validations/handleSubmit';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RegisterAccount from '@/Pages/Profile/validations/RegisterAccount';
import ActiveTab from '@/Pages/Profile/validations/ActiveTabs';
import GebruikersInformatie from '@/Pages/Profile/validations/gebruikersinformatie';
import SecurityInformation from '@/Pages/Profile/validations/Beveiliging';
import GameAccountStats from '@/Pages/Profile/validations/GameAccountStats';

import { Head } from '@inertiajs/react';

const Edit = ({ auth, error, success, gameAccount, user }) => {
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
            <main className='p-8'>
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6'>
                    {!gameAccount && (
                        <h1 className='text-[1.5rem] flex justify-center text-white'>Register Game account</h1>
                    )}
                    <div className="p-4 sm:p-8 bg-black text-white shadow sm:rounded-lg">
                        {!gameAccount ? (
                            <RegisterAccount data={data} error={error} success={success} auth={auth} gameAccount={gameAccount} user={user} />
                        ) : (
                            <div className='grid grid-cols-2 place-items-center px-[10%] mt-[2rem]'>
                                <ActiveTab gameAccount={gameAccount} activeTab={activeTab} setActiveTab={setActiveTab} user={user}/>
                                <div className='flex flex-col w-full mb-auto'>
                                    {activeTab === 'gebruikersinformatie' && (
                                        <GebruikersInformatie user={user} />
                                    )}
                                    {activeTab === 'beveiliging' && (
                                        <SecurityInformation user={user} />
                                    )}
                                    {activeTab === 'gameAccountSettings' && (
                                        <GameAccountStats activeTab={activeTab} user={user} gameAccount={gameAccount} success={success} error={error} auth={auth} />
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
