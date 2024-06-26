import React, { useState, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import Chart from 'chart.js/auto';

export default function DonutChartcomponent({ GameData, bosses }) {
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

  // image icons for each boss
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

  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById('MyDonutchart');
  
    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
  
      chartRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: bossLabels,
          datasets: [
            {
              data: bossValues,
              backgroundColor: [
                '#C13D00',
                '#890D00 ',
                '#AD5C00',
                '#C13D00',
                '#890D00',
                '#AD5C00',
                '#C13D00',
                '#890D00',
                '#AD5C00',
                '#C13D00',
                '#890D00'
              ],
              borderWidth: 2,
              borderColor: 'black',
              animation: {
                rotate: true,
                scale: true
              },
            },
          ],
        },
        options: {
          cutout: 45,
          plugins: {
            legend: {
              position: 'hidden',
              align: 'center', 
              labels: {
                color: 'white',
              },
            },
          },
        },
      });
    }
  }, [bosses, bossValues]);
  


  return (
    <div className='grid grid-cols-2 gap-3 w-full'>
       <div className='bg-black w-full rounded-lg flex flex-col items-center shadow-lg shadow-gray-900 p-1 border-orange-800 border-[4px]'>
          <h1 className='p-2'><strong>Bosses chart</strong></h1>
          <span className='relative left-0 top-[5.5rem] sm:top-[7rem] font-bold text-[0.9rem]'>Total: {sum}</span>
          <canvas className='grid grid-cols-2 place-content-center gap-3 w-full p-2 border-[2px] border-orange-800 rounded-[50%]' id='MyDonutchart'></canvas>
       </div>
       <div className='bg-black w-full rounded-lg flex flex-col items-center shadow-lg shadow-gray-900  mb-auto border-orange-800 border-[4px] p-2'>
          <h1 className='p-2'><strong>All bosses found:</strong></h1>
          <ul className='grid grid-cols-2 gap-2 w-[85%] text-[0.9rem]'>
            <li className='flex flex-row justify-around p-1 rounded-md items-center border-[1px] border-orange-800'>
              <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/36/S3_Badge_Steelhead_100.png/48px-S3_Badge_Steelhead_100.png" alt="steelhead" className='w-[2rem]' /></span>
              <span>{bossValues[0]}</span>
            </li>

            <li className='flex flex-row justify-around p-1 rounded-md items-center border-[1px] border-orange-800'>
              <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/1/18/S3_Badge_Flyfish_100.png/48px-S3_Badge_Flyfish_100.png" alt="flyfish" className='w-[2rem]' /></span>
              <span>{bossValues[1]}</span>
            </li>

            <li className='flex flex-row justify-around p-1 rounded-md items-center border-[1px] border-orange-800'>
              <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/34/S3_Badge_Maws_100.png/48px-S3_Badge_Maws_100.png" alt="maws" className='w-[2rem]' /></span>
              <span>{bossValues[2]}</span>
            </li>

            <li className='flex flex-row justify-around p-1 rounded-md items-center border-[1px] border-orange-800'>
              <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/5/56/S3_Badge_Steel_Eel_100.png/48px-S3_Badge_Steel_Eel_100.png" alt="eels" className='w-[2rem]' /></span>
              <span>{bossValues[3]}</span>
            </li>

            <li className='flex flex-row justify-around p-1 rounded-md items-center border-[1px] border-orange-800'>
              <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/a/ad/S3_Badge_Stinger_100.png/48px-S3_Badge_Stinger_100.png" alt="stinger" className='w-[2rem]' /></span>
              <span>{bossValues[4]}</span>
            </li>

            <li className='flex flex-row justify-around p-1 rounded-md items-center border-[1px] border-orange-800'>
              <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/7/79/S3_Badge_Scrapper_100.png/48px-S3_Badge_Scrapper_100.png" alt="scrapper" className='w-[2rem]' /></span>
              <span>{bossValues[5]}</span>
            </li>

            <li className='flex flex-row justify-around p-1 rounded-md items-center border-[1px] border-orange-800'>
              <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/38/S3_Badge_Drizzler_100.png/48px-S3_Badge_Drizzler_100.png" alt="drizzler" className='w-[2rem]' /></span>
              <span>{bossValues[6]}</span>
            </li>

            <li className='flex flex-row justify-around p-1 rounded-md items-center border-[1px] border-orange-800'>
              <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/1/18/S3_Badge_Flipper-Flopper_100.png/48px-S3_Badge_Flipper-Flopper_100.png" alt="flipper" className='w-[2rem]' /></span>
              <span>{bossValues[7]}</span>
            </li>

            <li className='flex flex-row justify-around p-1 rounded-md items-center border-[1px] border-orange-800'>
              <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/0e/S3_Badge_Slammin%27_Lid_100.png/48px-S3_Badge_Slammin%27_Lid_100.png" alt="slamonlid" className='w-[2rem]' /></span>
              <span>{bossValues[8]}</span>
            </li>

            <li className='flex flex-row justify-around p-1 rounded-md items-center border-[1px] border-orange-800'>
              <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/7/79/S3_Badge_Fish_Stick_100.png/48px-S3_Badge_Fish_Stick_100.png" alt="fishsticks" className='w-[2rem]' /></span>
              <span>{bossValues[9]}</span>
            </li>

            <li className='flex flex-row justify-around p-1 rounded-md items-center border-[1px] border-orange-800'>
              <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/31/S3_Badge_Big_Shot_100.png/48px-S3_Badge_Big_Shot_100.png" alt="bigshots" className='w-[2rem]' /></span>
              <span>{bossValues[10]}</span>
            </li>
          </ul>
       </div>
      {/* <div className='w-full sm:w-[100%]'>
          <canvas className='grid grid-cols-2 place-content-center gap-3 w-full p-2' id='MyDonutchart'></canvas>
         
      </div> */}

      {/* <form className='flex flex-col justify-center items-center gap-4' onSubmit={updateBossesStats}>
          <h2 className='font-bold text-[1.2rem]'>save boss values</h2>
          <button className='bg-orange-700 p-2 rounded-lg w-[40%] hover:scale-[1.05] transition duration-300 ease-in-out' type="submit">save</button>
          {updateSuccess ? (
              <div className="text-green-600 my-2 px-6 py-3 mx-6 font-thin text-[0.8rem] flex flex-row">Bosses have successfully been updated</div>
          ) : null}
      </form> */}
    </div>
  );
}