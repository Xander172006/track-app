import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, data, GameAccount }) {
    const [ setBanners ] = useState([]);
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            
        >
            <Head title="Dashboard" />

            <div className="py-5">
                <div className="max-w-7xl mx-3 sm:mx-auto sm:px-6 lg:px-8 grid grid-cols-1 gap-[0.5rem] sm:grid-cols-3">
                    <div className="bg-gray-900 text-white p-6 overflow-hidden shadow-sm sm:rounded-lg">
                        <h1 className='text-[0.9remrem]'>Using SalmonRun-stats-api</h1>
                    </div>
                    <div className="bg-gray-900 text-white p-6 overflow-hidden shadow-sm sm:rounded-lg flex flex-row  items-center gap-2">
                        {GameAccount && (
                            <>
                                <img src="https://cdn.accounts.nintendo.com/account/images/common/defaults/mii.png?t=1693897123" alt="No-profile" className='w-[20%] rounded-3xl' />
                                <p>{GameAccount.username}</p>
                            </>
                        )}
                        {!GameAccount && (
                            <>
                                <img src="https://cdn.accounts.nintendo.com/account/images/common/defaults/mii.png?t=1693897123" alt="No-profile" className='w-[20%] rounded-3xl' />
                                <p>Unnamed</p>
                            </>
                        )}
                    </div>
                    <div className="bg-gray-900 text-white p-6 overflow-hidden shadow-sm sm:rounded-lg flex flex-col items-center gap-2">
                        <h1>Game stats</h1>

                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
