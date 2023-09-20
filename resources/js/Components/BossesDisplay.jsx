import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function ActiveTab({ GameData }) {
  let shiftscount = Math.ceil(GameData.data.playerEvp - 40 / 20);

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
    'steelhead': "https://cdn.wikimg.net/en/splatoonwiki/images/9/9a/S3_Steelhead_icon.png?20221009043423",
    'flyfish': "https://cdn.wikimg.net/en/splatoonwiki/images/2/24/S3_Flyfish_icon.png?20221009043406",
    'maws': "https://cdn.wikimg.net/en/splatoonwiki/images/8/83/S3_Maws_icon.png?20221009043400",
    'steeleals': "https://cdn.wikimg.net/en/splatoonwiki/images/6/62/S3_Steel_Eel_icon.png?20221009043416",
    'stinger': "https://cdn.wikimg.net/en/splatoonwiki/images/b/b5/S3_Stinger_icon.png?20221009043427",
    'scrapper': "https://cdn.wikimg.net/en/splatoonwiki/images/8/8c/S3_Scrapper_icon.png?20221009043355",
    'drizzlers': "https://cdn.wikimg.net/en/splatoonwiki/images/0/09/S3_Drizzler_icon.png?20221009043335",
    'flippers': "https://cdn.wikimg.net/en/splatoonwiki/images/6/65/S3_Flipper-Flopper_icon.png?20221009043339",
    'slamonlids': "https://cdn.wikimg.net/en/splatoonwiki/images/f/fa/S3_Slammin%27_Lid_icon.png?20221009043343",
    'fishsticks': "https://cdn.wikimg.net/en/splatoonwiki/images/a/a5/S3_Fish_Stick_icon.png?20221009043313",
    'Big shots': "https://cdn.wikimg.net/en/splatoonwiki/images/9/92/S3_Big_Shot_icon.png?20221009043319"
  }

  for (let i = 0; i <= shiftscount; i++) {
    const shiftResults = GameData.data.shiftResults[i];

    if (shiftResults) {
      for (let j = 1; j <= 3; j++) {
        if (shiftResults.results[j]) {
          const bossCounts = shiftResults.results[j].bossCounts;

          // Update the counts for each boss
          steelheadCount += bossCounts.steelhead || 0;
          scrapperCount += bossCounts.scrapper || 0;
          flyfishCount += bossCounts.flyfish || 0;
          mawsCount += bossCounts.maws || 0;
          stingerCount += bossCounts.stinger || 0;
          steeleelsCount += bossCounts.steeleals || 0;
          drizzlersCount += bossCounts.drizzlers || 0;
          salmonlidsCount += bossCounts.slamonlids || 0;
          flippersCount += bossCounts.flippers || 0;
          fishsticksCount += bossCounts.fishsticks || 0;
          bigShotsCount += bossCounts["Big shots"] || 0;
        }
      }
    }
  }

  return (
    <>
      <form className='flex flex-row p-3'>
        <span className='flex flex-row'><img src={bossIcons['steelhead']} alt="" width="35%" /><input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="" value={steeleelsCount} /></span>
        <span className='flex flex-row'><img src={bossIcons['steelhead']} alt="" width="35%" /><input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="" value={steeleelsCount} /></span>
        <span className='flex flex-row'><img src={bossIcons['steelhead']} alt="" width="35%" /><input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="" value={steeleelsCount} /></span>
        <span className='flex flex-row'><img src={bossIcons['steelhead']} alt="" width="35%" /><input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="" value={steeleelsCount} /></span>
        <span className='flex flex-row'><img src={bossIcons['steelhead']} alt="" width="35%" /><input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="" value={steeleelsCount} /></span>
        <span className='flex flex-row'><img src={bossIcons['steelhead']} alt="" width="35%" /><input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="" value={steeleelsCount} /></span>
        <span className='flex flex-row'><img src={bossIcons['steelhead']} alt="" width="35%" /><input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="" value={steeleelsCount} /></span>
        <span className='flex flex-row'><img src={bossIcons['steelhead']} alt="" width="35%" /><input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="" value={steeleelsCount} /></span>
        <span className='flex flex-row'><img src={bossIcons['steelhead']} alt="" width="35%" /><input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="" value={steeleelsCount} /></span>
        <span className='flex flex-row'><img src={bossIcons['steelhead']} alt="" width="35%" /><input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="" value={steeleelsCount} /></span>
        <span className='flex flex-row'><img src={bossIcons['steelhead']} alt="" width="35%" /><input className='w-[4rem] text-[0.9rem] bg-gray-900 border-none text-white' type="number" name="" value={steeleelsCount} /></span>
      </form>
    </>
  )
}