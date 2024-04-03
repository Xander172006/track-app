import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function BossesDisplay({ GameData }) {
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

  let bossIcons = {
    'steelhead': "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/36/S3_Badge_Steelhead_100.png/48px-S3_Badge_Steelhead_100.png",
    'flyfish': "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/1/18/S3_Badge_Flyfish_100.png/48px-S3_Badge_Flyfish_100.png",
    'maws': "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/34/S3_Badge_Maws_100.png/48px-S3_Badge_Maws_100.png",
    'steeleals': "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/5/56/S3_Badge_Steel_Eel_100.png/48px-S3_Badge_Steel_Eel_100.png",
    'stinger': "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/a/ad/S3_Badge_Stinger_100.png/48px-S3_Badge_Stinger_100.png",
    'scrapper': "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/7/79/S3_Badge_Scrapper_100.png/48px-S3_Badge_Scrapper_100.png",
    'drizzlers': "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/38/S3_Badge_Drizzler_100.png/48px-S3_Badge_Drizzler_100.png",
    'flippers': "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/1/18/S3_Badge_Flipper-Flopper_100.png/48px-S3_Badge_Flipper-Flopper_100.png",
    'slamonlids': "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/0e/S3_Badge_Slammin%27_Lid_100.png/48px-S3_Badge_Slammin%27_Lid_100.png",
    'fishsticks': "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/7/79/S3_Badge_Fish_Stick_100.png/48px-S3_Badge_Fish_Stick_100.png",
    'Big shots': "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/31/S3_Badge_Big_Shot_100.png/48px-S3_Badge_Big_Shot_100.png"
  }


  for (let i = 0; i <= shiftscount; i++) {
    const shiftResults = GameData.data.shiftResults[i];

    if (shiftResults) {
      for (let j = 1; j <= 3; j++) {
        if (shiftResults.results[j]) {
          const bossCounts = shiftResults.results[j].bossCounts;

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
      boss11: bigShotsCount
  });

  const updateBossesStats = async (e) => {
    
    try {
      post('/update-bosscounts', data);
    } catch (error) {
      console.error('Error updating Bosses data', error);
    }
  };

  return (
    <>
      <h1 className='font-bold p-3'>Total amount of bosses found: </h1>
      <form className='flex flex-col p-3' onSubmit={updateBossesStats}>
          <div className='flex flex-row'>

              <span className='flex flex-row'>
                <img src={bossIcons['steelhead']} alt="" width="35%" />
                <input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="boss1" disabled value={steelheadCount} />
              </span>

              <span className='flex flex-row'>
                <img src={bossIcons['flyfish']} alt="" width="35%" />
                <input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="boss2" disabled value={flyfishCount} />
              </span>

              <span className='flex flex-row'>
                <img src={bossIcons['maws']} alt="" width="35%" />
                <input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="boss3" disabled value={mawsCount} />
              </span>

              <span className='flex flex-row'>
                <img src={bossIcons['steeleals']} alt="" width="35%" />
                <input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="boss4" disabled value={steeleelsCount} />
              </span>

              <span className='flex flex-row'>
                <img src={bossIcons['stinger']} alt="" width="35%" />
                <input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="boss5" disabled value={stingerCount} />
              </span>

              <span className='flex flex-row'>
                <img src={bossIcons['scrapper']} alt="" width="35%" />
                <input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="boss6" disabled value={scrapperCount} />
              </span>

              <span className='flex flex-row'>
                <img src={bossIcons['drizzlers']} alt="" width="35%" />
                <input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="boss7" disabled value={drizzlersCount} />
              </span>

              <span className='flex flex-row'>
                <img src={bossIcons['flippers']} alt="" width="35%" />
                <input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="boss8" disabled value={flippersCount} />
              </span>

              <span className='flex flex-row'>
                <img src={bossIcons['slamonlids']} alt="" width="35%" />
                <input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="boss9" disabled value={salmonlidsCount} />
              </span>

              <span className='flex flex-row'>
                <img src={bossIcons['fishsticks']} alt="" width="35%" />
                <input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="boss10" disabled value={fishsticksCount} />
              </span>

              <span className='flex flex-row'>
                <img src={bossIcons['Big shots']} alt="" width="35%" />
                <input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="boss11" disabled value={bigShotsCount} />
              </span>

          </div>

          <div>
            <button className='p-2 mt-7 rounded-lg text-white bg-orange-600' type='submit'>Add bosses</button>
          </div>
      </form>
    </>
  )
}