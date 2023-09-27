<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\SalmonrunStatsResource;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SalmonrunStatsApiController extends Controller
{
    public function GameData($playerEvp, $losses)
    {
        $playerEvp += (20 * $losses);

        $totalBossCounts = [
            'steelhead' => 0,
            'scrapper' => 0,
            'flyfish' => 0,
            'maws' => 0,
            'stinger' => 0,
            'steeleals' => 0,
            'drizzlers' => 0,
            'slamonlids' => 0,
            'flippers' => 0,
            'fishsticks' => 0,
            'Big shots' => 0,
        ];

        // link to this official information: https://splatoonwiki.org/wiki/Salmon_Run_Next_Wave_data
        $hazardLevels = [
            ['minEvp' => 0, 'maxEvp' => 18, 'hazard' => 160, 'quota' => [22, 23, 25], 'bossCount' => [16, 18, 20]],
            ['minEvp' => 19, 'maxEvp' => 49, 'hazard' => 163.8, 'quota' => [22, 24, 26], 'bossCount' => [17, 19, 21]],
            ['minEvp' => 50, 'maxEvp' => 50, 'hazard' => 170, 'quota' => [23, 24, 26], 'bossCount' => [17, 19, 21]],
            ['minEvp' => 64, 'maxEvp' => 64, 'hazard' => 172.8, 'quota' => [23, 25, 27], 'bossCount' => [18, 20, 22]],
            ['minEvp' => 100, 'maxEvp' => 109, 'hazard' => 180, 'quota' => [24, 25, 27], 'bossCount' => [18, 20, 22]],
            ['minEvp' => 110, 'maxEvp' => 149, 'hazard' => 182, 'quota' => [24, 26, 28], 'bossCount' => [19, 21, 23]],
            ['minEvp' => 150, 'maxEvp' => 154, 'hazard' => 190, 'quota' => [25, 26, 28], 'bossCount' => [19, 21, 23]],
            ['minEvp' => 155, 'maxEvp' => 199, 'hazard' => 191, 'quota' => [25, 27, 29], 'bossCount' => [21, 22, 25]],
            ['minEvp' => 200, 'maxEvp' => 332, 'hazard' => 200, 'quota' => [26, 28, 30], 'bossCount' => [22, 24, 26]],
            ['minEvp' => 333, 'maxEvp' => 366, 'hazard' => 226.6, 'quota' => [26, 28, 31], 'bossCount' => [22, 25, 27]],
            ['minEvp' => 367, 'maxEvp' => 465, 'hazard' => 233.4, 'quota' => [27, 29, 31], 'bossCount' => [24, 26, 28]],
            ['minEvp' => 466, 'maxEvp' => 532, 'hazard' => 253.2, 'quota' => [27, 29, 32], 'bossCount' => [25, 27, 29]],
            ['minEvp' => 533, 'maxEvp' => 598, 'hazard' => 266.6, 'quota' => [28, 30, 32], 'bossCount' => [26, 28, 30]],
            ['minEvp' => 599, 'maxEvp' => 698, 'hazard' => 279.8, 'quota' => [28, 30, 33], 'bossCount' => [27, 29, 31]],
            ['minEvp' => 699, 'maxEvp' => 731, 'hazard' => 299.8, 'quota' => [29, 31, 33], 'bossCount' => [28, 30, 32]],
            ['minEvp' => 732, 'maxEvp' => 864, 'hazard' => 306.4, 'quota' => [29, 31, 34], 'bossCount' => [29, 31, 33]],
            ['minEvp' => 865, 'maxEvp' => 2000, 'hazard' => 333, 'quota' => [30, 32, 35], 'bossCount' => [30, 32, 35]],
        ];

        $quota = [];
        $bossCount = [];

        $totalCohozunas = 0;
        $totalhorrorburus = 0;

        $rand = 0;
        $tides = ['normal', 'low', 'high'];
        
        $currentEvp = 40;
        $spawnedBosses = [];
        $totalBossCount = 0;
        $kingBossCount = 0;

        while ($currentEvp <= $playerEvp) {
            if ($kingBossCount >= 5 && $currentEvp >= 100) {
                $kingBoss = rand(0, 1) === 0 ? 'horrorborus' : 'cohozuna';
                $kingBossCount = 0;

                if ($kingBoss === 'horrorborus') {
                    $totalhorrorburus++;
                } else {
                    $totalCohozunas++;
                }
            } else {
                $kingBoss = null;
                $kingBossCount++;
            }

            foreach ($hazardLevels as $level) {
                if ($currentEvp >= $level['minEvp'] && $currentEvp <= $level['maxEvp']) {
                    $quota = $level['quota'];
                    $bossCount = $level['bossCount'];
                    break;
                }
            }

            // Generate the list of spawned bosses for the current EVP
            $bossesForCurrentEvp = [];

            for ($i = 0; $i < count($quota); $i++) {
                $rand = rand(1, 5);

                if ($rand <= 3) {
                    $givenTide = $tides[0]; // normal tide 60%
                } elseif ($rand == 4) {
                    $givenTide = $tides[1]; // low tide 20%
                } else {
                    $givenTide = $tides[2]; // high tide 20%
                }

                // Check if a night wave occurs for results of waves
                $nightWaveOccurrence = rand(1, 5) == 5;
                $nightWave = 'daytime';

                if ($nightWaveOccurrence) {
                    $nightWaves = $this->nightWaves();
                    foreach ($nightWaves as $wave => $waveData) {
                        if (in_array($givenTide, $waveData['tides']) && rand(1, $waveData['chance']) == 1) {
                            $nightWave = $wave;

                            if ($nightWave == 'rush' || $nightWave == 'grillers' || $nightWave == 'tornado' || $nightWave == 'mudmouth' ||
                                $nightWave == 'mothership' || $nightWave == 'goldie_seeking') {
                                $bossCount[$i] = 0;
                            }
                            break;
                        }
                    }
                }

                // Retrieve individual boss spawns
                $bosses = $this->bosses();
                $bossNames = array_keys($bosses);
                $bossCounts = [];

                // Calculate minimum count for each boss type
                $minBossCount = floor($bossCount[$i] / count($bossNames));
                $remainingBosses = $bossCount[$i] % count($bossNames);

                // Initialize the boss counts with the minimum count
                foreach ($bossNames as $bossName) {
                    $bossCounts[$bossName] = $minBossCount;
                }

                // Distribute the remaining bosses evenly
                $bossNames = array_merge($bossNames, $bossNames); // Duplicate the boss names to ensure fairness
                for ($j = 0; $j < $remainingBosses; $j++) {
                    $bossCounts[$bossNames[$j]]++;
                }

                $boss = [
                    'quota' => $quota[$i],
                    'bossCounts' => $bossCounts,
                    'tide' => $givenTide,
                    'nightWave' => $nightWave,
                ];
                $bossesForCurrentEvp[] = $boss;
            }

            $totalAmountBosses = array_sum($bossCount);

            // Add the spawned bosses to the overall list
            $spawnedBosses[] = [
                'evp' => $currentEvp,
                'results' => $bossesForCurrentEvp,
                'totalAmountBosses' => $totalAmountBosses,
            ];

            // If a King Boss appeared, add it as one extra wave
            if ($kingBoss) {
                $totalAmountBosses += 1; // Count it as an extra wave
                $spawnedBosses[] = [
                    'evp' => $currentEvp,
                    'results' => [
                        [
                            'quota' => 1, // Quota for King Boss
                            'bossCounts' => [$kingBoss => 1], // One King Boss
                            'tide' => $givenTide,
                            'nightWave' => $nightWave,
                        ],
                    ],
                    'totalAmountBosses' => 1, // Total boss count for this wave
                ];
            }

            // Get the total boss count
            $totalBossCount += $totalAmountBosses;

            // Increase EVP by 20 (assuming a win)
            $currentEvp += 20;
        }

        foreach ($spawnedBosses as $shiftResult) {
            foreach ($shiftResult['results'] as $result) {
                foreach ($result['bossCounts'] as $bossType => $count) {
                    if ($bossType === 'cohozuna' || $bossType === 'horrorborus') {
                        // For King Bosses
                        $totalCohozunas += ($bossType === 'cohozuna') ? $count : 0;
                        $totalhorrorburus += ($bossType === 'horrorborus') ? $count : 0;
                    } else {
                        // For regular bosses
                        $totalBossCounts[$bossType] += $count;
                    }
                }
            }
        }
        

        return new SalmonrunStatsResource([
            'playerEvp' => $playerEvp,
            'shiftResults' => $spawnedBosses,
            'totalAmountBosses' => $totalBossCount,
            'totalAmountKings' => [
                'cohozuna' => $totalCohozunas,
                'horrorborus' => $totalhorrorburus,
            ],
        ]);
    }

    public function nightWaves()
    {
        $nightWaves = [
            'rush' => [
                'tides' => ['normal', 'high'],
                'chance' => 1 / 6,
            ],
            'grillers' => [
                'tides' => ['normal', 'high'],
                'chance' => 1 / 6,
            ],
            'fog' => [
                'tides' => ['normal', 'low', 'high'],
                'chance' => 1 / 8,
            ],
            'cohack_charge' => [
                'tides' => ['low'],
                'chance' => 1 / 4,
            ],
            'tornado' => [
                'tides' => ['low'],
                'chance' => 1 / 4,
            ],
            'mudmouth' => [
                'tides' => ['normal', 'high'],
                'chance' => 1 / 6,
            ],
            'mothership' => [
                'tides' => ['normal', 'low', 'high'],
                'chance' => 1 / 8,
            ],
            'goldie_seeking' => [
                'tides' => ['normal', 'high'],
                'chance' => 1 / 6,
            ],
        ];

        return $nightWaves;
    }

    public function bosses()
    {
        $bosses = [
            'steelhead' => ['normal', 'low', 'high'],
            'scrapper' => ['normal', 'low', 'high'],
            'flyfish' => ['normal', 'low', 'high'],
            'maws' => ['normal', 'low', 'high'],
            'stinger' => ['normal', 'low', 'high'],
            'steeleals' => ['normal', 'low', 'high'],
            'drizzlers' => ['normal', 'low', 'high'],
            'slamonlids' => ['normal', 'low', 'high'],
            'flippers' => ['normal', 'low', 'high'],
            'fishsticks' => ['normal', 'low', 'high'],
            'Big shots' => ['normal', 'low'],
        ];

        return $bosses;
    }
}
