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

  const KingsFound = GameData.data.totalAmountKings;

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

    cohozuna: KingsFound.cohozuna,
    horrorborrus: KingsFound.horrorborus
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
      <form onSubmit={updateBossesStats}>
        <div className='bg-black w-[75%] h-full pb-auto rounded-lg flex flex-col gap-4 items-center shadow-lg shadow-gray-900 p-3'>
            <h1 className='mr-auto'><strong>Kings found</strong></h1>
            <div className='flex flex-row justify-center items-center w-[75%] gap-5 my-auto'>
              <span className='flex flex-row items-center w-full gap-1 border-[1px] border-orange-700 p-2 rounded-md'><img className='w-[35%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/7/7a/S3_Cohozuna_icon.png/120px-S3_Cohozuna_icon.png" alt="Cohozuna" /><p>{KingsFound.cohozuna}</p></span>
              <span className='flex flex-row items-center w-full gap-1 border-[1px] border-orange-700 p-2 rounded-md'><img className='w-[35%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/0a/S3_Horrorboros_icon.png/180px-S3_Horrorboros_icon.png" alt="Horrorborrus" /><p>{KingsFound.horrorborus}</p></span>
            </div>

            {updateSuccess ? (
              <div className="text-green-600 my-2 mx-6 font-thin text-[0.8rem] flex flex-row w-[60%]">Bosses have successfully been updated</div>
            ) : null}
            <button className='bg-orange-700 py-1 px-3 rounded-lg w-[100%] mx-auto hover:scale-[1.05] transition duration-300 ease-in-out mt-7' type="submit">update stats</button>
        </div>
      </form>
    </div>
  );
}