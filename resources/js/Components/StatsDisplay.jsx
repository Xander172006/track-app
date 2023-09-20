import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function ActiveTab({ GameData }) {
    let rank = Math.ceil(GameData.data.playerEvp / 20) - 3;

    const waveResults = [];
    const bossesSum = [];
    
    for (let i = 0; i < 3; i++) {
        waveResults.push(
        <li key={i} className='border-[1px] border-orange-600 rounded-xl p-4'>
            <h3 className='font-bold text-[1.1rem]'>Wave {i + 1} results:</h3>

            <p className='text-[0.85rem] flex flex-row w-full gap-2'>
                <span>quota: </span>
                <span className='flex flex-row ml-auto'>
                    {GameData.data.shiftResults[rank].results[i].quota}
                    <img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/cf/S2_Icon_Golden_Egg.png/120px-S2_Icon_Golden_Egg.png" alt="goldeggs" className='w-[1.2rem]' />
                </span>
            </p>

            <p className='text-[0.85rem] flex flex-row w-full gap-2'>
                <span>wave type: </span> <span className='ml-auto'>{GameData.data.shiftResults[rank].results[i].nightWave}</span>
            </p>

            <p className='text-[0.85rem] flex flex-row w-full gap-2'>
                <span>tide type: </span> <span className='ml-auto'>{GameData.data.shiftResults[rank].results[i].tide}</span>
            </p>
        </li>
        );
    }

    return (
       <>
        <ul className='flex flex-col gap-2 mt-3 text-[0.9rem]'>
            <li className='flex flex-row w-[35%]'><span>You have reached rank: </span><span className='ml-auto'>{GameData.data.shiftResults[rank].evp}</span></li>
            <li className='flex flex-row w-[35%]'><span>Total bosses found in shift: </span><span className='ml-auto'>{GameData.data.shiftResults[rank].totalAmountBosses}</span></li>

            <ul className='flex flex-row mt-4 justify-around'>
                {waveResults}
            </ul>
        </ul>
       </>
    )
}