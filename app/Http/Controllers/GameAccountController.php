<?php

namespace App\Http\Controllers;

use App\Models\game_accounts;
use App\Models\User;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameAccountController extends Controller
{
    public function displayAccount()
    {
        $user = User::where('id', Auth::id())->first();
        $find_account = game_accounts::where('user_id', Auth::id())->first();
        $gameAccount = null;

        if ($find_account) {
            $gameAccount = $find_account;
        }

        return Inertia::render('Profile/Edit', [
            'status' => session('status'),
            'error' => '',
            'success' => '',
            'gameAccount' => $gameAccount,
            'user' => $user,
        ]);
    }

    public function createAccount(Request $request)
    {
        
        // checks if the user is logged in
        if (!Auth::check()) {
            return Inertia::render('Profile/Edit')->with('error', 'You do not have permission to create a game account.');
        }
    
        // checks if the user already has a game account
        $existingAccount = game_accounts::where('user_id', Auth::id())->first();
    
        if ($existingAccount) {
            return Inertia::render('Profile/Edit')->with('error', 'You already have a game account.');
        } else {
            // Inserts the game account in to the database
            $account = new game_accounts();
            $generate_new_UID = str_pad(rand(0, 9999999999), 10, '0', STR_PAD_LEFT);
    
            $account->user_id = Auth::id();
            $account->username = $request->input('username');
            $account->UID = $generate_new_UID;
            $account->save();
    
            return Inertia::render('Profile/Edit')->with('success', 'Account has been created.');
        }
    }
}
