import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function Salmonrungear({ SalmonrunApi }) {

    console.log(SalmonrunApi);
    return (
        <>
        <div className='grid grid-cols-1 sm:grid-cols-2 place-items-center gap-12 sm:gap-5'>
            <div className='flex justify-center flex-col items-center'>
                <h1 className='font-bold text-[1.5rem] text-green-600'>This month's gear</h1>
                <img className='w-[40%]' src={SalmonrunApi.data.coopResult.monthlyGear.image.url} alt="MonthlyGear"/>
                <p className='text-[1.25rem] text-yellow-500 font-bold'>{SalmonrunApi.data.coopResult.monthlyGear.name}</p>
            </div>
            <div className='flex justify-center flex-col items-center '>
                <h2 className='font-bold text-[1.5rem] text-green-600'>Scales</h2>
                
                <ul className='flex flex-row gap-6 my-2'>
                    <li>
                        <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/a/a1/S3_Icon_bronze_fish_scale.png/36px-S3_Icon_bronze_fish_scale.png" alt="bronzescale" width="40px" /></span>
                        <span></span>
                    </li>

                    <li>
                        <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/00/S3_Icon_silver_fish_scale.png/36px-S3_Icon_silver_fish_scale.png" alt="silverscale" width="40px" /></span>
                        <span></span>
                    </li>

                    <li>
                        <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/2/20/S3_Icon_gold_fish_scale.png/36px-S3_Icon_gold_fish_scale.png" alt="goldscale" width="40px" /></span>
                        <span></span>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}