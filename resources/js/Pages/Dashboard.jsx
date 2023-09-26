import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Footer from '@/Layouts/footer'; 

import Chartcomponent from '@/Components/Chartcomponent';
import ShiftDisplay from '@/Components/ShiftDisplay';
import StatsDisplay from '@/Components/StatsDisplay';
import BossesDisplay from '@/Components/BossesDisplay';

export default function Dashboard({ auth, GameAccount, user, bosses, GameData }) {
    const { data, setData, post } = useForm({
        evp: ''
    });


    const [EvpLevel, setEvplevel] = useState('');

    const HandleEvpLevel = (e) => {
        setEvplevel(e.target.value);
        setData('evp', e.target.value);
        localStorage.setItem('EvpLevel', e.target.value);
    }

    console.log(GameData);
    
    const updateStats = async (e) => {
        e.preventDefault();

        try {
            const response = await post('/update-stats', {
                evp: EvpLevel,
            });
            
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    };
    
    return (
        <AuthenticatedLayout
        user={auth.user}
        
        >
            <Head title="Dashboard" />

            <div className="py-5">
                <div className="max-w-7xl mx-3 sm:mx-auto sm:px-6 lg:px-1 grid grid-cols-1 gap-[1.5rem] sm:grid-cols-3">
                    <div className="bg-black text-white p-6 overflow-hidden shadow-sm sm:rounded-lg flex flex-row items-center gap-2">
                        {GameAccount && (
                            <>
                            <div className='flex flex-col'>
                                <div className='flex flex-row items-center gap-6'>
                                    {user.profiel ? (
                                        <img
                                            src={`/storage/images/${user.profiel}`}
                                            alt="profilePicture"
                                            className='rounded-[20px] w-[25%]'
                                        />                        
                                    ) : (
                                        <img src="https://cdn.accounts.nintendo.com/account/images/common/defaults/mii.png?t=1693897123" alt="profilePicture" className='w-[25%] rounded-3xl'/>
                                    )}
                                    <p className='text-[1.5rem] font-bold'>{GameAccount.username}</p>
                                </div>

                                <div className='my-5 mt-8'>
                                    <h3 className='flex justify-start p-1 border-b-[1px] border-gray-400 text-start'>Public Information</h3>

                                    <ul className='text-[0.9rem] p-4 flex flex-col gap-2'>
                                        <li className='flex flex-row'><span>{user.email}</span></li>
                                        <li className='flex flex-row'><span>{user.geboortedatum}</span></li>
                                        <li className='flex flex-row'><span>{user.geslacht}</span></li>
                                        <li className='flex flex-row'><span>{user.Land}</span></li>
                                        <li className='flex flex-row'><span>{user.timezone}</span></li>
                                    </ul>
                                </div>
                            </div>
                            </>
                        )}
                        {!GameAccount && (
                            <>
                                <img src="https://cdn.accounts.nintendo.com/account/images/common/defaults/mii.png?t=1693897123" alt="No-profile" className='w-[20%] rounded-3xl' />
                                <p>Unnamed</p>
                            </>
                        )}
                    </div>
                    <div className="bg-black text-white p-6 overflow-hidden shadow-sm sm:rounded-lg flex flex-col items-center gap-2">
                        <h1 className='text-[1.2rem]'>Game Stats</h1>

                        <div className='flex flex-col gap-5 w-[80%]'>
                            <ul className='border-b-[1px] border-gray-500 py-2'>
                                {GameAccount && (
                                    <>
                                        <li className='flex flex-row'><span className='font-bold'>username in game:</span> <span className='ml-auto'>{GameAccount.username}</span></li>
                                        <li className='flex flex-row'><span className='font-bold'>UID:             </span> <span className='ml-auto'>{GameAccount.UID}</span></li>
                                    </>
                                )}
                            </ul>
                            <ul>
                                {GameAccount && (
                                    <>
                                        <li className='flex flex-row'><span className='font-bold'>Shifts worked: </span>           <span className='ml-auto'>{GameAccount.Shiftsworked}</span></li>
                                        <li className='flex flex-row'><span className='font-bold'>Golden eggs collected: </span>   <span className='ml-auto'>{GameAccount.GoldenEggsCollected}</span></li>
                                        <li className='flex flex-row'><span className='font-bold'>Power eggs collected: </span>    <span className='ml-auto'>{GameAccount.PowerEggsCollected}</span></li>
                                        <li className='flex flex-row'><span className='font-bold'>King salmonids defeated: </span> <span className='ml-auto'>{GameAccount.KingSalmonidsDefeated}</span></li>
                                        <li className='flex flex-row'><span className='font-bold'>Crew members rescued: </span>    <span className='ml-auto'>{GameAccount.CrewMembersRescued}</span></li>
                                        <li className='flex flex-row'><span className='font-bold'>Total points: </span>            <span className='ml-auto'>{GameAccount.Totalpoints}</span></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="bg-black text-white p-6 overflow-hidden shadow-sm sm:rounded-lg">
                        <h1 className='text-white text-[1.35rem] mb-4'>Update stats</h1>

                        <p className='text-gray-400 text-[0.8rem]'>provide your rank level you ended with.
                            Important: you can only use this if you are higher then eggsectutive rank 40
                        </p>

                        <form className='my-3 flex flex-row gap-2' onSubmit={updateStats}>
                            <input 
                                className='bg-gray-900 border-orange-600 rounded-lg h-10 w-[30%] text-gray-300'
                                value={EvpLevel}
                                onChange={HandleEvpLevel}
                                type="number"
                                name='evp'
                            />
                            <button type='submit' className='text-white bg-orange-600 py-2 px-3 rounded-lg'>update</button>
                        </form>
                        {GameData && (
                            <>
                                <h1 className='pt-4 text-[1.1rem]'>Found shift results: </h1>
                                <ShiftDisplay GameData={GameData}/>
                            </>
                        )}
                    </div>
                </div>

                <div className="max-w-7xl mx-3 sm:mx-auto sm:px-6 lg:px-1 grid grid-cols-1 gap-[1.5rem] sm:grid-cols-2 py-4">
                    <div className='bg-black rounded-xl p-3'>
                        <Chartcomponent bosses={bosses} />
                        <ul className='flex flex-row px-2 ml-11 gap-5 relative bottom-0'>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/9/9a/S3_Steelhead_icon.png?20221009043423" alt="steelhead" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/2/24/S3_Flyfish_icon.png?20221009043406" alt="flyfish" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/8/83/S3_Maws_icon.png?20221009043400" alt="maws" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/6/62/S3_Steel_Eel_icon.png?20221009043416" alt="eels" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/b/b5/S3_Stinger_icon.png?20221009043427" alt="stinger" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/8/8c/S3_Scrapper_icon.png?20221009043355" alt="scrapper" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/0/09/S3_Drizzler_icon.png?20221009043335" alt="drizzler" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/6/65/S3_Flipper-Flopper_icon.png?20221009043339" alt="flipper" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/f/fa/S3_Slammin%27_Lid_icon.png?20221009043343" alt="slamonlid" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/a/a5/S3_Fish_Stick_icon.png?20221009043313" alt="fishsticks" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/9/92/S3_Big_Shot_icon.png?20221009043319" alt="bigshots" className='w-[120%]' /></li>
                        </ul>
                    </div>
                    <div className='bg-black rounded-xl p-4 text-white'>
                        {GameData ? (
                            <>
                                <h1 className='pt-4 text-[1.1rem]'>Last Game stats: </h1>
                                <StatsDisplay GameData={GameData}/>
                            </>
                        ) : (
                            <div className='flex justify-center items-center text-center w-full h-full'>
                                <p className='text-center text-[1.5rem] text-orange-700'>No stats found yet...</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="max-w-7xl mx-3 sm:mx-auto sm:px-6 lg:px-1 gap-[0.5rem] sm:grid-cols-2 py-1">
                    {GameData && (
                        <div className='bg-gray-900 rounded-xl p-3 text-white'>
                            <BossesDisplay GameData={GameData}/>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </AuthenticatedLayout>
    );
}
