import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Footer from '@/Layouts/footer';

// Function to simplify timezone and format the date
function simplifyTimezoneAndFormat(dateTimeString) {
  const date = new Date(dateTimeString);
  const simplifiedDate = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  );
  return simplifiedDate.toLocaleString();
}


export default function({ auth, user, rotations }) {
    const api = rotations.data.coopGroupingSchedule.regularSchedules.nodes;
    console.log(api);

    return (
    <AuthenticatedLayout user={auth.user}>
      <Head title='Rotations' />
        <main className='sm:max-w-[100%] max-w-[90%] mt-5 mx-auto sm:px-6 lg:px-8 pb-5 space-y-6'>
            <div className='sm:grid sm:grid-cols-3 grid grid-cols-1 place-content-center items-center gap-8'>
                {api.map((schedules, index) => (
                <section key={index} className='bg-black p-5 rounded-md shadow-md shadow-gray-800 hover:scale-[1.025] transition duration-500 ease-in-out'>
                    <div className='text-white flex flex-col justify-center items-center bg-[#1C1C1C] rounded-lg'>
                        <div className='flex justify-between gap-[3rem] sm:gap-[6rem] text-[0.75rem] p-3'>
                            <div className='flex flex-col'>
                                <p className='text-gray-400'>Starting time</p>
                                <p>{simplifyTimezoneAndFormat(schedules.startTime).slice(0, -3)}</p>
                            </div>

                            <div className='flex flex-col'>
                                <p className='text-gray-400'>Ending time</p>
                                <p>{simplifyTimezoneAndFormat(schedules.endTime).slice(0, -3)}</p>
                            </div>
                        </div>

                        <div className='grid sm:grid-cols-2 w-full justify-center items-center gap-3'>
                            <div>
                                <img className='w-full sm:rounded-bl-lg' src={schedules.setting.coopStage.image.url} alt="stageImage"/>
                            </div>
                            <div className='mb-auto flex flex-col justify-center items-center'>
                                <p className='sm:text-[0.8rem] font-bold'>playable weapons</p>
                                <div className='grid grid-cols-4 gap-1 w-[90%] my-2 bg-black p-1 rounded-3xl'>
                                    <img src={schedules.setting.weapons[0].image.url} alt="weapon1" />
                                    <img src={schedules.setting.weapons[1].image.url} alt="weapon2" />
                                    <img src={schedules.setting.weapons[2].image.url} alt="weapon3" />
                                    <img src={schedules.setting.weapons[3].image.url} alt="weapon4" />
                                </div>
                                <p className='font-bold text-[0.75rem] sm:text-[0.65rem] relative sm:right-[105%] sm:bottom-0 bottom-[9rem] left-[25%] sm:left-auto sm:top-2 bg-black p-1 max-w-[90%] flex justify-center rounded-lg'>{schedules.setting.coopStage.name}</p>
                            </div>
                        </div>
                    </div>
                </section>
                ))}
            </div>
        </main>
        <div className='mt-[10%]'>
            <Footer/>
        </div>
    </AuthenticatedLayout>
  );
}
