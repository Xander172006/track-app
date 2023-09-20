import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function ActiveTab({ GameData }) {
  let shiftscount = Math.ceil(GameData.data.playerEvp / 20) - 3;

  // Initialize an object to store the counts for each boss
  let bossCounts = {
    'steelhead': 0,
    'scrapper': 0,
    'flyfish': 0,
    'maws': 0,
    'stinger': 0,
    'steeleals': 0,
    'drizzlers': 0,
    'slamonlids': 0,
    'flippers': 0,
    'fishsticks': 0,
    'Big shots': 0,
  };

  for (let i = 0; i <= shiftscount; i++) {
    const shiftResults = GameData.data.shiftResults[i];

    if (shiftResults) {
      for (let j = 1; j <= 3; j++) {
        if (shiftResults.results[j]) {
          const shiftBossCounts = shiftResults.results[j].bossCounts;

          // Update the counts for each boss in the object
          for (const bossName in shiftBossCounts) {
            if (bossCounts.hasOwnProperty(bossName)) {
              bossCounts[bossName] += shiftBossCounts[bossName];
            }
          }
        }
      }
    }
  }

  // Display each boss's count dynamically
  return (
    <>
      <div>
        {Object.entries(bossCounts).map(([bossName, count]) => (
          <p key={bossName}>
                {bossName}: {count}
          </p>
        ))}
      </div>
    </>
  )
}
