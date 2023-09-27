import React, { useState, useEffect } from 'react';

export default function Progressbar({ bosses, records }) {
  const bossValues = {
    'steelheads': bosses.steelheads,
    'flyfishes': bosses.flyfishes,
    'maws': bosses.maws,
    'steeleals': bosses.steeleals,
    'stingers': bosses.stingers,
    'scrappers': bosses.scrappers,
    'drizzlers': bosses.drizzlers,
    'flippers': bosses.flippers,
    'slamonlids': bosses.slamonlids,
    'fishticks': bosses.fishticks,
    'bigshots': bosses.bigshots,
  };

  const checkpointFlags = [100, 1000, 10000];

  return (
    <>
        <div className='grid grid-cols-2 sm:grid-cols-2'>
            <div className='grid grid-cols-3 place-items-center w-full'>
            {records.map((record, index) => (
                <div key={index} className='px-1 py-2 flex flex-row justify-start text-[0.6rem] sm:text-[0.75rem] items-center gap-2'>
                    <img className='w-[50%] sm:w-[35%] mr-auto' src={record.badgeImage} alt={`Badge ${index}`} />
                    <span>{record.Boss}</span>
                </div>
            ))}
            </div>

            <div className='grid grid-cols-1 place-content-center gap-[4.5%] sm:gap-[3.75%] text-[0.5rem] sm:text-[0.8rem] items-center text-center'>
                {Object.entries(bossValues).map(([bossType, bossValue]) => (
                    <div key={bossValue} className='w-[85%] sm:w-[90%] ml-auto sm:mr-4 bg-gray-800 my-1 h-3 sm:h-5 rounded-md relative'>
                        <div style={{ width: `${Math.ceil(bossValue / 100)}%` }} className={`h-3 sm:h-5 bg-blue-600 relative rounded-e-sm rounded-s-md`}>
                            <span className='ml-auto flex justify-end pr-1'>{bossValue}</span>
                        </div>
                        <div>
                            <span className='absolute left-[0.9%] text-[0.35rem] sm:left-[0.9%] sm:text-[0.6rem] mt-[0.1rem] text-yellow-700 font-bold'>100</span>
                            <span className='absolute left-[9%] text-[0.35rem] sm:left-[9%] sm:text-[0.6rem] mt-[0.1rem] text-gray-200 font-bold'>1000</span>
                            <span className='absolute left-[85%] text-[0.35rem] sm:left-[90%] sm:text-[0.6rem] mt-[0.1rem] text-yellow-400 font-bold'>10000</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  );
}
