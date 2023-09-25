import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function Salmonrungear({ SalmonrunApi }) {

    console.log(SalmonrunApi);
    return (
        <>
            <h1 className='font-bold text-[1.5rem] text-green-600'>This month's gear</h1>
            
            <div className='flex justify-center flex-col items-center mt-3'>
                <img className='w-[40%]' src={SalmonrunApi.data.coopResult.monthlyGear.image.url} alt="MonthlyGear"/>
                <p className='text-[1.25rem] text-yellow-500 font-bold'>{SalmonrunApi.data.coopResult.monthlyGear.name}</p>
            </div>
        </>
    )
}