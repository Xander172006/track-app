<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SalmonrunStatsResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'playerEvp' => $this->resource['playerEvp'],
            'shiftResults' => $this->formatShiftResults($this->resource['shiftResults']),
            'totalAmountBosses' => $this->resource['totalAmountBosses'],
            'totalAmountKings' => $this->resource['totalAmountKings'], // Add this line
        ];
    }

    private function formatShiftResults($shiftResults)
    {
        return collect($shiftResults)->map(function ($shiftResult) {
            return [
                'evp' => $shiftResult['evp'],
                'results' => $this->formatBossResults($shiftResult['results']),
                'totalAmountBosses' => $shiftResult['totalAmountBosses'],
            ];
        });
    }

    private function formatBossResults($bossResults)
    {
        return collect($bossResults)->map(function ($result) {
            return [
                'quota' => $result['quota'],
                'bossCounts' => $result['bossCounts'],
                'tide' => $result['tide'],
                'nightWave' => $result['nightWave'],
            ];
        });
    }
}
