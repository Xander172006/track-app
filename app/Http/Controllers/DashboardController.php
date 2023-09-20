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
}
