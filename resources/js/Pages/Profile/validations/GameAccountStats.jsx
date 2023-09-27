import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function gameAccountStats({ gameAccount }) {

    const { data, setData, post } = useForm({
        username: '',
        password: '',
        UID: '',
    });
    
    const [shiftsWorked, setShiftsWorked] = useState(gameAccount.Shiftsworked);
    const [GoldenEggsCollected, setGoldenEggsCollected] = useState(gameAccount.GoldenEggsCollected);
    const [PowerEggsCollected, setPowerEggsCollected] = useState(gameAccount.PowerEggsCollected);
    const [KingSalmonidsDefeated, setKingSalmonidsDefeated] = useState(gameAccount.KingSalmonidsDefeated);
    const [CrewMembersRescued, setCrewMembersRescued] = useState(gameAccount.CrewMembersRescued);
    const [Totalpoints, setTotalpoints] = useState(gameAccount.Totalpoints);

    const handleShiftsWorkedChange = (e) => {
        setShiftsWorked(e.target.value);
        setData('shifts', e.target.value);
        localStorage.setItem('shiftsWorked', e.target.value);
    };

    const handleGoldenEggsChange = (e) => {
        setGoldenEggsCollected(e.target.value);
        setData('goldeneggs', e.target.value);
        localStorage.setItem('GoldenEggsCollected', e.target.value);
    };

    const handlePowerEggsChange = (e) => {
        setPowerEggsCollected(e.target.value);
        setData('powereggs', e.target.value);
        localStorage.setItem('PowerEggsCollected', e.target.value);
    };

    const handleKingSalmonidsChange = (e) => {
        setKingSalmonidsDefeated(e.target.value);
        setData('kings', e.target.value);
        localStorage.setItem('KingSalmonidsDefeated', e.target.value);
    };

    const handleCrewMembersChange = (e) => {
        setCrewMembersRescued(e.target.value);
        setData('crewmembers', e.target.value);
        localStorage.setItem('CrewMembersRescued', e.target.value);
    };

    const handleTotalPointsChange = (e) => {
        setTotalpoints(e.target.value);
        setData('totalPoints', e.target.value);
        localStorage.setItem('Totalpoints', e.target.value);
    };


    // displays the tab of the settings menu
    const [updateSuccess, setUpdateSuccess] = useState(false);

    // Updates Game Account stats
    const updateGameStats = async (e) => {
        try {
          post('/update-game-account', data);
          setUpdateSuccess(true);
        } catch (error) {
          console.error('Error updating game stats', error);
        }
    };

    return (
        <>
        <div className='bg-black h-[1rem] rounded-t-[3rem] p-4 flex justify-center'>
            <h1 className='text-[1.25rem] text-orange-700'>Grizzco Point Card </h1>
        </div>

        <div className='mt-6'>
            <form className='flex flex-col bg-gray-900' onSubmit={updateGameStats}>
                <div className='flex flex-row justify-between px-7 py-4'>
                    <h2 className='font-bold text-[1.1rem]'>Game Stats</h2>
                    <button className='text-[0.85rem] border-[2px] border-gray-600 px-3 rounded-xl
                    hover:bg-gray-600 transition duration-300 ease-in-out'>Wijzigen</button>
                </div>

                <ul className='bg-gray-700'>

                    <li className='px-6 py-2 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'>
                        <span className='mt-1'>Shifts worked: </span>
                        <input
                            className='ml-auto text-left bg-gray-700 h-7 border-none text-gray-100 text-[0.9rem]'
                            value={shiftsWorked}
                            onChange={handleShiftsWorkedChange}
                            type='number'
                            name='shifts'
                            placeholder='No information'
                        />
                    </li>
                    <li className='px-6 py-2 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'>
                        <span className='mt-1'>Golden Eggs collected:  </span> 
                        <input 
                            className='ml-auto text-left bg-gray-700 h-7 border-none text-gray-100 text-[0.9rem]'
                            value={GoldenEggsCollected}
                            onChange={handleGoldenEggsChange} 
                            type='number' 
                            name='goldeneggs'
                            placeholder='No information'
                        />
                    </li>
                    <li className='px-6 py-2 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'>
                        <span className='mt-1'>Power Eggs collected:   </span> 
                        <input 
                            className='ml-auto text-left bg-gray-700 h-7 border-none text-gray-100 text-[0.9rem]'
                            value={PowerEggsCollected}
                            onChange={handlePowerEggsChange} 
                            type='number' 
                            name='powereggs'
                            placeholder='No information'
                        />
                    </li>
                    <li className='px-6 py-2 border-b-[1px] border-gray-500 mx-6 font-thin text-[0.8rem] flex flex-row'>
                        <span className='mt-1'>King Salmonids defeated:</span>
                        <input 
                            className='ml-auto text-left bg-gray-700 h-7 border-none text-gray-100 text-[0.9rem]'
                            value={KingSalmonidsDefeated}
                            onChange={handleKingSalmonidsChange} 
                            type='number' 
                            name='kings'
                            placeholder='No information'
                        />
                    </li>
                    <li className='px-6 py-2 mx-6 border-b-[1px] border-gray-500 font-thin text-[0.8rem] flex flex-row'>
                        <span className='mt-1'>Crew Members defeated:  </span>
                        <input 
                            className='ml-auto text-left bg-gray-700 h-7 border-none text-gray-100 text-[0.9rem]' 
                            value={CrewMembersRescued}
                            onChange={handleCrewMembersChange} 
                            type='number' 
                            name='crewmembers'
                            placeholder='No information'
                        />
                    </li>
                    <li className='px-6 py-3 mx-6 font-thin text-[0.8rem] flex flex-row'>
                        <span className='mt-1'>Total points: </span>
                        <input 
                            className='ml-auto text-left bg-gray-700 h-7 border-none text-gray-100 text-[0.9rem]' 
                            value={Totalpoints}
                            onChange={handleTotalPointsChange} 
                            type='number' 
                            name='totalPoints'
                            placeholder='No information'
                        />
                    </li>

                    {updateSuccess ? (
                        <div className="text-green-600 my-2 px-6 py-3 mx-6 font-thin text-[0.8rem] flex flex-row">Game stats updated successfully</div>
                    ) : null}
                    
                    <p className='text-gray-400 font-thin text-[0.75rem] px-6 py-2'>To get this information download the nintendo switch online app and search your in game stats on splatoon 3</p>
                </ul>
            </form>
            <form className='flex flex-col bg-gray-900 rounded-b-xl'>
                <div className='flex flex-row justify-between px-7 py-4'>
                    <h2>Game user account</h2>
                    <button className='text-[0.85rem] border-[2px] border-gray-600 px-3 rounded-xl
                    hover:bg-gray-600 transition duration-300 ease-in-out'>Wijzigen</button>
                </div>
                <ul className='rounded-b-xl bg-gray-700'>
                    <li className='py-3 mx-6 border-b-[1px] border-gray-500 font-thin text-[0.9rem] flex flex-row'><span>username: </span> <span className='ml-auto'>{gameAccount.username}</span></li>
                    <li className=' py-3 mx-6 font-thin text-[0.9rem] flex flex-row'><span>UID: </span> <span className='ml-auto'>{gameAccount.UID}</span></li>
                </ul>
            </form>
        </div>
        </>
    )
}
