import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';


export default function ActiveTab({ GameData }) {

    return (
       <>
       <ul className='mt-3 text-[0.85rem] flex flex-col gap-1'>
            <li className='flex flex-row items-center gap-1'>
                <p className='flex flex-row items-center w-[60%]'><span>Shifts played:</span> <span className='ml-auto'>{Math.ceil(GameData.data.playerEvp / 20) - 3}</span></p>
                <img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/0e/S2_Mem_Cake_Power_Egg.png/120px-S2_Mem_Cake_Power_Egg.png" alt="hazardLvl" className='w-[1.5rem]' />
            </li>

            <li className='flex flex-row items-center gap-1'>
                <p className='flex flex-row items-center w-[60%]'><span>eggsectutive vp rank:</span> <span className='ml-auto'>{GameData.data.playerEvp}</span></p>
                <img src="https://th.bing.com/th/id/R.2dd03bd66ba3d0578b80ba357a5d5af0?rik=rp5sRhr%2fTG6OSw&pid=ImgRaw&r=0" alt="hazardLvl" className='w-[2rem]' />
            </li>

            <li className='flex flex-row items-center gap-1'>   
                <p className='flex flex-row items-center w-[60%]'><span>Total Amount of bosses found:</span> <span className='ml-auto'>{GameData.data.totalAmountBosses}</span></p>
                <img src="https://cdn.wikimg.net/en/splatoonwiki/images/9/9a/S3_Steelhead_icon.png?20221009043423" alt="totalBosses" className='w-[2rem]' />
            </li>

            <br/>
        </ul>
                
       </>
    )
}