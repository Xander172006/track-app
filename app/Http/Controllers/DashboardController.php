<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Bosses;
use App\Models\records;
use App\Models\game_accounts;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\SalmonrunStatsApiController;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $response = Http::post('http://localhost/api/salmon-run/game-data');
        $response_gear = Http::get('https://splatoon3.ink/data/coop.json');
        $schedulesApi = Http::get('https://splatoon3.ink/data/schedules.json');

        if ($request->input('evp')) {
            $api = new SalmonrunStatsApiController();
            $GameData = $api->GameData($request->input('evp'), $request->input('losses'));
        } else {
            $GameData = $response->json();
        }

        $user = Auth::user();
        $gameAccount = game_accounts::where('user_id', Auth::id())->first();
        $bosses = Bosses::where('account_id', Auth::id())->first();
        $records = records::all();
        
        if ($gameAccount == null) {
            return redirect()->route('profile.edit');
        }
        
        if ($response_gear->successful()) {
            $gear = $response_gear->json();
        }

        if ($schedulesApi->successful()) {
            $rotations = $schedulesApi->json();
        }

        return Inertia::render('Dashboard', [
            'GameData' => $GameData,
            'GameAccount' => $gameAccount,
            'user' => $user,
            'bosses' => $bosses,
            'records' => $records,
            'gear' => $gear,
            'rotations' => $rotations 
        ]);
    }


    public function updateBosses(Request $request)
    {
        try {
            $account = Bosses::where('account_id', Auth::id())->first();

            if ($account) {
                var_dump(intval($request->input('boss1')));
                
                $account->steelheads += intval($request->input('boss1'));
                $account->flyfishes += intval($request->input('boss2'));
                $account->maws += intval($request->input('boss3'));
                $account->steeleals += intval($request->input('boss4'));
                $account->stingers += intval($request->input('boss5'));
                $account->scrappers += intval($request->input('boss6'));
                $account->drizzlers += intval($request->input('boss7'));
                $account->flippers += intval($request->input('boss8'));
                $account->slamonlids += intval($request->input('boss9'));
                $account->fishticks += intval($request->input('boss10'));
                $account->bigshots += intval($request->input('boss11'));

                $account->cohozuna += intval($request->input('cohozuna'));
                $account->horrorborrus += intval($request->input('horrorborrus'));
                $account->save();
            } else {
                return response()->json(['message' => 'Account not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating Bosses data', 'error' => $e->getMessage()], 500);
        }
    }
}
