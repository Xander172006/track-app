import React, { useState, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';

export default function StatsUpdateDisplay({ GameData, bosses }) {
  let shiftscount = Math.ceil(GameData.data.playerEvp / 20) - 2;

  // Initialize variables to store the count for each boss
  let steelheadCount = 0;
  let scrapperCount = 0;
  let flyfishCount = 0;
  let mawsCount = 0;
  let stingerCount = 0;
  let steeleelsCount = 0;
  let drizzlersCount = 0;
  let salmonlidsCount = 0;
  let flippersCount = 0;
  let fishsticksCount = 0;
  let bigShotsCount = 0;


  const bossesarray = {
    'boss1': 0,
    'boss2': 0,
    'boss3': 0,
    'boss4': 0,
    'boss5': 0,
    'boss6': 0,
    'boss7': 0,
    'boss8': 0,
    'boss9': 0,
    'boss10': 0,
    'boss11': 0,
  }
  

  // gives the correct sum of each bosscount for shifts
  for (let i = 0; i <= shiftscount; i++) {
    const shiftResults = GameData.data.shiftResults[i];

    if (shiftResults) {
      for (let j = 1; j <= 3; j++) {
        if (shiftResults.results[j]) {
          const bossCounts = shiftResults.results[j].bossCounts;

          bossesarray.boss1 += bossCounts.steelhead,
          bossesarray.boss2 += bossCounts.flyfish,
          bossesarray.boss3 += bossCounts.maws,
          bossesarray.boss4 += bossCounts.steeleals,
          bossesarray.boss5 += bossCounts.stinger,
          bossesarray.boss6 += bossCounts.scrapper,
          bossesarray.boss7 += bossCounts.drizzlers,
          bossesarray.boss8 += bossCounts.flippers,
          bossesarray.boss9 += bossCounts.slamonlids,
          bossesarray.boss10 += bossCounts.fishsticks,
          bossesarray.boss11 += bossCounts['Big shots'],

          // Update the counts for each boss
          steelheadCount += bossCounts.steelhead;
          scrapperCount += bossCounts.scrapper;
          flyfishCount += bossCounts.flyfish;
          mawsCount += bossCounts.maws;
          stingerCount += bossCounts.stinger;
          steeleelsCount += bossCounts.steeleals;
          drizzlersCount += bossCounts.drizzlers;
          salmonlidsCount += bossCounts.slamonlids;
          flippersCount += bossCounts.flippers;
          fishsticksCount += bossCounts.fishsticks;
          bigShotsCount += bossCounts["Big shots"];
        }
      }
    }
  }


  let sum = 0;

  for (const key in bossesarray) {
    if (bossesarray.hasOwnProperty(key)) {
      sum += bossesarray[key];
    }
  }

   // label names of each boss
   const bossLabels = [
    `Steelhead: ${steelheadCount}`,
    `Flyfish: ${flyfishCount}`,
    `Maws: ${mawsCount}`,
    `Steeleels: ${steeleelsCount}`,
    `Stinger: ${stingerCount}`,
    `Scrapper: ${scrapperCount}`,
    `Drizzlers: ${drizzlersCount}`,
    `Flippers: ${flippersCount}`,
    `Fishsticks: ${fishsticksCount}`,
    `Salmonlids: ${salmonlidsCount}`,
    `Big Shots: ${bigShotsCount}`,
  ];


  // sets the values for post request of the bosscounts
  const { data, post } = useForm({
    boss1: steelheadCount,
    boss2: flyfishCount,
    boss3: mawsCount,
    boss4: steeleelsCount,
    boss5: stingerCount,
    boss6: scrapperCount,
    boss7: drizzlersCount,
    boss8: flippersCount,
    boss9: fishsticksCount,
    boss10: salmonlidsCount,
    boss11: bigShotsCount,
  });


  const bossValues = [
    steelheadCount,
    flyfishCount,
    mawsCount,
    steeleelsCount,
    stingerCount,
    scrapperCount,
    drizzlersCount,
    flippersCount,
    fishsticksCount,
    salmonlidsCount,
    bigShotsCount,
  ];

  // sends a post request to route /update-bosscounts
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const updateBossesStats = async (e) => {
    try {
      post('/update-bosscounts', data);
      setUpdateSuccess(true);
    } catch (error) {
      console.error('Error updating Bosses data', error);
    }
  };
  
  return (
    <div className='grid grid-cols-1 gap-3 w-full'>
       <div className='bg-black w-full h-full pb-auto rounded-lg flex flex-col items-center shadow-lg shadow-gray-900'>
        <form className='flex flex-col gap-4 w-[70%] mr-auto mt-3' onSubmit={updateBossesStats}>
          <p className='text-[0.85rem] text-gray-300 w-[70%]'>Save the new boss values to your game stats</p>
          {updateSuccess ? (
              <div className="text-green-600 my-2 px-6 py-3 mx-6 font-thin text-[0.8rem] flex flex-row w-[80%]">Bosses have successfully been updated</div>
          ) : null}
          <button className='bg-orange-700 py-1 rounded-lg w-[35%] mt-4 hover:scale-[1.05] transition duration-300 ease-in-out' type="submit">save</button>
        </form>
      </div>
    </div>
  );
}