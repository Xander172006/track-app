<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\records;

class RecordsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'steelhead' => [
                '100' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/36/S3_Badge_Steelhead_100.png/48px-S3_Badge_Steelhead_100.png',
                '1000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/e/ef/S3_Badge_Steelhead_1000.png/48px-S3_Badge_Steelhead_1000.png',
                '10000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/9/9f/S3_Badge_Steelhead_10000.png/48px-S3_Badge_Steelhead_10000.png'
            ],
            'flyfish' => [
                '100' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/1/18/S3_Badge_Flyfish_100.png/48px-S3_Badge_Flyfish_100.png',
                '1000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/9/90/S3_Badge_Flyfish_1000.png/48px-S3_Badge_Flyfish_1000.png',
                '10000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/5/5d/S3_Badge_Flyfish_10000.png/48px-S3_Badge_Flyfish_10000.png'
            ],
            'maws' => [
                '100' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/34/S3_Badge_Maws_100.png/48px-S3_Badge_Maws_100.png',
                '1000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/7/72/S3_Badge_Maws_1000.png/48px-S3_Badge_Maws_1000.png',
                '10000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/9/9d/S3_Badge_Maws_10000.png/48px-S3_Badge_Maws_10000.png'
            ],
            'steeleals' => [
                '100' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/5/56/S3_Badge_Steel_Eel_100.png/48px-S3_Badge_Steel_Eel_100.png',
                '1000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/2/22/S3_Badge_Steel_Eel_1000.png/48px-S3_Badge_Steel_Eel_1000.png',
                '10000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/5/54/S3_Badge_Steel_Eel_10000.png/48px-S3_Badge_Steel_Eel_10000.png'
            ],
            'stinger' => [
                '100' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/a/ad/S3_Badge_Stinger_100.png/48px-S3_Badge_Stinger_100.png',
                '1000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/7/76/S3_Badge_Stinger_1000.png/48px-S3_Badge_Stinger_1000.png',
                '10000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/9/9f/S3_Badge_Stinger_10000.png/48px-S3_Badge_Stinger_10000.png'
            ],
            'scrapper' => [
                '100' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/7/79/S3_Badge_Scrapper_100.png/48px-S3_Badge_Scrapper_100.png',
                '1000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/9/9f/S3_Badge_Scrapper_1000.png/48px-S3_Badge_Scrapper_1000.png',
                '10000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/8/8d/S3_Badge_Scrapper_10000.png/48px-S3_Badge_Scrapper_10000.png'
            ],
            'drizzlers' => [
                '100' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/38/S3_Badge_Drizzler_100.png/48px-S3_Badge_Drizzler_100.png',
                '1000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/b/b7/S3_Badge_Drizzler_1000.png/48px-S3_Badge_Drizzler_1000.png',
                '10000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/4/42/S3_Badge_Drizzler_10000.png/48px-S3_Badge_Drizzler_10000.png'
            ],
            'flippers' => [
                '100' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/1/18/S3_Badge_Flipper-Flopper_100.png/48px-S3_Badge_Flipper-Flopper_100.png',
                '1000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/f/fb/S3_Badge_Flipper-Flopper_1000.png/48px-S3_Badge_Flipper-Flopper_1000.png',
                '10000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/e/e6/S3_Badge_Flipper-Flopper_10000.png/48px-S3_Badge_Flipper-Flopper_10000.png'
            ],
            'slamonlids' => [
                '100' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/0e/S3_Badge_Slammin%27_Lid_100.png/48px-S3_Badge_Slammin%27_Lid_100.png',
                '1000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/09/S3_Badge_Slammin%27_Lid_1000.png/48px-S3_Badge_Slammin%27_Lid_1000.png',
                '10000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/e/ef/S3_Badge_Slammin%27_Lid_10000.png/48px-S3_Badge_Slammin%27_Lid_10000.png'
            ],
            'fishsticks' => [
                '100' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/7/79/S3_Badge_Fish_Stick_100.png/48px-S3_Badge_Fish_Stick_100.png',
                '1000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/4/4b/S3_Badge_Fish_Stick_1000.png/48px-S3_Badge_Fish_Stick_1000.png',
                '10000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/5/5d/S3_Badge_Fish_Stick_10000.png/48px-S3_Badge_Fish_Stick_10000.png'
            ],
            'Big shots' => [
                '100' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/31/S3_Badge_Big_Shot_100.png/48px-S3_Badge_Big_Shot_100.png',
                '1000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/8/85/S3_Badge_Big_Shot_1000.png/48px-S3_Badge_Big_Shot_1000.png',
                '10000' => 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/5/52/S3_Badge_Big_Shot_10000.png/48px-S3_Badge_Big_Shot_10000.png'
            ]
        ];

        foreach ($data as $badgecount => $badgeData) {
            foreach ($badgeData as $boss => $badgeImage) {
                DB::table('records')->insert([
                    'badgeImage' => $badgeImage,
                    'badgecount'  => $badgecount,
                    'Boss'       => $boss,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
