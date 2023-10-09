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

  return (
    <>
        <div className='grid grid-cols-2 sm:grid-cols-2 my-5'>
            <div className='grid grid-cols-3 place-items-center w-full'>
            {records.map((record, index) => (
                <div key={index} className='px-1 py-2 flex flex-row justify-center text-[0.6rem] sm:text-[0.75rem] items-center'>
                    <img className='w-[50%] sm:w-[35%] mr-1' src={record.badgeImage} alt={`Badge ${record.id}`} />
                    <span>{record.Boss}</span>
                </div>
            ))}
            </div>

            <div className='grid grid-cols-1 place-content-center gap-[4.5%] sm:gap-[3.75%] text-[0.5rem] sm:text-[0.8rem] items-center text-center h-[90%] my-auto'>
                {Object.entries(bossValues).map(([bossType, bossValue]) => (
                    <div 
                        key={`${bossType}-${bossValue}`} 
                        className='w-[85%] sm:w-[80%] ml-auto bg-gray-800 my-1 h-3 sm:h-4 rounded-md relative'
                        >
                        <span className='absolute text-yellow-400 text-[70%] ml-[40%]'>10000</span>
                        <div style={{ width: `${Math.ceil(bossValue / 100)}%` }} className={`h-3 sm:h-4 bg-blue-600 relative rounded-e-sm rounded-s-md`}>
                            
                            <span className='text-[75%] absolute right-0'>{bossValue}</span>
                        </div>               
                    </div>
                ))}
            </div>
        </div>
    </>
  );
}
