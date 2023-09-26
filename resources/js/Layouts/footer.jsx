import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function footer() {

    return (
        <footer className='w-full mt-auto bg-black'>
            <div className='grid grid-cols-2 sm:grid-cols-4 place-items-center gap-5 text-gray-300 p-10'>
                <div className='flex flex-col justify-center items-center text-start'>
                    <h1 className='font-bold mr-auto mb-3'>Pages</h1>

                    <ul>
                        <li className='flex flex-row'><span className='mr-auto text-[0.85rem] text-gray-400'>Login/ Register</span></li>
                        <li className='flex flex-row'><span className='mr-auto text-[0.85rem] text-gray-400'>Dashboard</span></li>
                        <li className='flex flex-row'><span className='mr-auto text-[0.85rem] text-gray-400'>Profile</span></li>
                    </ul>
                </div>
                <div className='flex flex-col justify-center items-center text-start'>
                    <h1 className='font-bold mr-auto mb-3'>Templates</h1>

                    <ul>
                        <li className='flex flex-row'><span className='mr-auto text-[0.85rem] text-gray-400'>Chartcomponents</span></li>
                        <li className='flex flex-row'><span className='mr-auto text-[0.85rem] text-gray-400'>Game Stats</span></li>
                        <li className='flex flex-row'><span className='mr-auto text-[0.85rem] text-gray-400'>Navbar</span></li>
                        <li className='flex flex-row'><span className='mr-auto text-[0.85rem] text-gray-400'>Footer</span></li>
                    </ul>
                </div>
                <div className='flex flex-col justify-center items-center text-start'>
                    <h1 className='font-bold mr-auto mb-3'>Support</h1>

                    <ul>
                        <li className='flex flex-row'><span className='mr-auto text-[0.85rem] text-gray-400'>Contact Me</span></li>
                        <li className='flex flex-row'><span className='mr-auto text-[0.85rem] text-gray-400'>User guide</span></li>
                        <li className='flex flex-row'><span className='mr-auto text-[0.85rem] text-gray-400'>Help</span></li>
                    </ul>
                </div>
                <div className='flex flex-col justify-center items-center text-start'>
                    <h1 className='font-bold mr-auto mb-3'>College/ Education</h1>

                    <ul>
                        <li className='flex flex-row'><span className='mr-auto text-[0.85rem] text-gray-400'>About Me</span></li>
                        <li className='flex flex-row'><span className='mr-auto text-[0.85rem] text-gray-400'>Studies</span></li>
                        <li className='flex flex-row'><span className='mr-auto text-[0.85rem] text-gray-400'>Project details</span></li>
                    </ul>
                </div>
            </div>
            <div className='bg-gray-900 w-full grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-400 p-10 place-items-center'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row gap-4'>
                        <p>Terms & Conditions</p><span className='text-gray-600'>|</span>
                        <p>Privacy Policy</p><span className='text-gray-600'>|</span>
                        <p>Security</p>
                    </div>

                    <span className='flex flex-row items-center gap-1 text-[0.85rem] mt-6'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>Kon. Wilhelminaplein 1, 1062 HG Amsterdam</span>

                    <p className='text-[0.8rem]'>© 2023 Splatoon 3</p>
                </div>


                <div>
                    <img className='mx-auto w-[50%] sm:w-[30%]' src="https://th.bing.com/th/id/R.25120f81d0fce1b2171b52e48524999f?rik=snrh6Dlcp0qdmA&pid=ImgRaw&r=0" alt="Splatoon3" />
                </div>
            </div>

        </footer>
    )
}