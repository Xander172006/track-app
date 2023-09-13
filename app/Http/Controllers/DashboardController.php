<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\game_accounts;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $response = Http::post('http://localhost/api/salmon-run-stats');
        
        $find_account = game_accounts::where('user_id', Auth::id())->first();
        $gameAccount = $find_account;

        if ($response->status() === 200) {
            $data = $response->json();
    
            // var_dump($data['shiftResults'][0]['results'][0]['quota']);
            return Inertia::render('Dashboard', [
                'data' => $data,
                'GameAccount' => $gameAccount
            ]);
        } else {
            return Inertia::render('ErrorPage');
        }
    }
}
