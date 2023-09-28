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


  // gives the correct sum of each bosscount for shifts
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
  const updateBossesStats = async (e) => {
    try {
      post('/update-bosscounts', data);
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
                '#1C1C1C',
                '#BE8003',
                '#BB7861',
                '#294C2B',
                '#F1F7F2',
                '#ADD3E0',
                '#5A3A29',
                '#FCC454',
                '#FF5733',
                '#750000',
                '#A300A3'
              ],
              borderWidth: 2,
              borderColor: 'black',
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: 'left',
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
      <div className='w-full sm:w-[100%]'>
          <h1 className='font-bold text-white text-[1.3rem]'>Bosses found: </h1>
          <canvas className='grid grid-cols-2 place-content-center gap-3 w-full' id='MyDonutchart'></canvas>
          <span className='relative left-[60%] bottom-[11.5rem] font-bold'>total: {GameData.data.totalAmountBosses}</span>

      </div>
  );
}