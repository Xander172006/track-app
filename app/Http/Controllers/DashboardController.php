<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Bosses;
use App\Models\game_accounts;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\SalmonrunStatsApiController;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $response = Http::post('http://localhost/api/salmon-run/game-data');

        if ($request->input('evp')) {
            $api = new SalmonrunStatsApiController();
            $GameData = $api->GameData($request->input('evp'));
        } else {
            $GameData = $response->json();
        }

        $user = Auth::user();
        $gameAccount = game_accounts::where('user_id', Auth::id())->first();
        $bosses = Bosses::where('account_id', Auth::id())->first();
        
    
        return Inertia::render('Dashboard', [
            'GameData' => $GameData,
            'GameAccount' => $gameAccount,
            'user' => $user,
            'bosses' => $bosses,
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
                $account->save();

                return response()->json(['message' => 'success']);
            } else {
                return response()->json(['message' => 'Account not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating Bosses data', 'error' => $e->getMessage()], 500);
        }
    }
}
