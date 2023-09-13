<?php

namespace App\Http\Controllers;

use App\Models\game_accounts;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
        // Check if the user is logged in
        if (!Auth::check()) {
            return Inertia::render('Profile/Edit')->with('error', 'You do not have permission to create a game account.');
        }

        // Check if the user already has a game account
        $existingAccount = game_accounts::where('user_id', Auth::id())->first();

        if ($existingAccount) {
            return Inertia::render('Profile/Edit')->with('error', 'You already have a game account.');
        }

        // Verify the user's password
        $user = Auth::user();
        $userPassword = $user->password;

        if (!Hash::check($request->input('password'), $userPassword)) {
            return Inertia::render('Profile/Edit')->with('error', 'Incorrect password.');
        }

        // If the password is correct, proceed to create the game account
        $account = new game_accounts();
        $generate_new_UID = str_pad(rand(0, 9999999999), 10, '0', STR_PAD_LEFT);

        $account->user_id = Auth::id();
        $account->username = $request->input('username');
        $account->UID = $generate_new_UID;
        $account->save();

        return redirect()->route('profile.edit', ['success' => 'Account has been created.']);
    }

    public function updateAccountStats(Request $request)
    {       
        $gameAccount = game_accounts::where('user_id', Auth::id())->first();

        if ($gameAccount) {
            $gameAccount->Shiftsworked = $request->input('shifts');
            $gameAccount->GoldenEggsCollected = $request->input('goldeneggs');
            $gameAccount->PowerEggsCollected = $request->input('powereggs');
            $gameAccount->KingSalmonidsDefeated = $request->input('kings');
            $gameAccount->CrewMembersRescued = $request->input('crewmembers');
            $gameAccount->TotalPoints = $request->input('totalPoints');
            
            $gameAccount->save();
        } else {
            return response()->json(['message' => 'Game account not found'], 404);
        }

    }
}
