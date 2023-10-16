<?php

namespace App\Http\Controllers;

use App\Models\Bosses;
use App\Models\game_accounts;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameAccountController extends Controller
{
    public function displayAccount()
    {
        $user = User::where('id', Auth::id())->first();
        $GameAccount = game_accounts::where('user_id', Auth::id())->first();

        // gets the gearset of the month in salmon run
        $response = Http::get('https://splatoon3.ink/data/coop.json');


        if ($response->successful()) {
            $salmonrunApi = $response->json();
            
            return Inertia::render('Profile/Edit', [
                'status' => session('status'),
                'error' => '',
                'success' => '',
                'gameAccount' => $GameAccount,
                'user' => $user,
                'SalmonrunApi' => $salmonrunApi
            ]);
        }
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


        //Creates a bosses table for the GameAccount
        $findGameAccount = game_accounts::where('user_id', Auth::id())->first();
        $Bosses = new Bosses();
        $Bosses->account_id = $findGameAccount->id;
        $Bosses->save();

        return redirect()->route('profile.Edit', ['success' => 'Account has been created.']);
    }

    public function findAccount(Request $request)
    {
        if (!Auth::check()) {
            return Inertia::render('Profile/Edit')->with('error', 'You do not have permission to create a game account.');
        }

        $UID = $request->input('UID');
        $userId = Auth::user()->id;

        $existingGameAccount = game_accounts::where('UID', $UID)->first();

        if ($existingGameAccount) {
            $newGameAccount = new game_accounts();
            $newGameAccount->user_id = $userId;
            $newGameAccount->username = $existingGameAccount->username;
            $newGameAccount->UID = $UID;
            $newGameAccount->save();

            $account = game_accounts::where('user_id', Auth::id())->first();
            $account->boss()->create();

            return redirect()->route('profile.Edit')->with('success', 'Game account created.');
        } else {
            return redirect()->route('profile.Edit')->with('error', 'Game account not found.');
        }
    }


    public function editProfilePicture(Request $request)
    {
        if (!Auth::check()) {
            return Inertia::render('Profile/Edit')->with('error', 'You do not have permission to change your profile picture.');
        }

        if ($request->file('ProfileInput')) {
            $file = $request->file('ProfileInput');
            $fileName = $file->getClientOriginalName();
            $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        
            $newFileName = uniqid('profile-', true) . '.' . $fileExt;
            $file->storeAs('/public/images', $newFileName);
        
            $user = User::where('id', Auth::id())->first();
            $user->profiel = $newFileName;
            $user->save();

            header('Refresh:0');
        }
    }

    public function updateBio(Request $request)
    {
        if (!Auth::check()) {
            return Inertia::render('Profile/Edit')->with('error', 'You do not have permission to change your bio information.');
        }

        if ($request->input('bio')) {
            $user = User::where('id', Auth::id())->first();
            $user->bio = $request->input('bio');
            $user->save();
        }
    }

    public function updateUserAccount(Request $request)
    {
        $account = User::where('id', Auth::id())->first();
    
        if ($account) {
            $username = $request->input('username');
            
            if (!empty($username)) {
                $account->name = $username;
                $account->geboortedatum = $request->input('geboortedatum');
                $account->geslacht = $request->input('geslacht');
                $account->Land = $request->input('regio');
                $account->save();

                return redirect()->back();
            } else {
                return response()->json(['message' => 'Username cannot be empty'], 400);
            }
        } else {
            return response()->json(['message' => 'User account not found'], 404);
        }
    }

    public function updateUserSecurity(Request $request)
    {
        $user = User::find(Auth::id());
    
        if (!$user) {
            return response()->json(['message' => 'User account not found'], 404);
        }
    
        // Validate the current password
        $currentPassword = $request->input('currentPassword');
        if (!Hash::check($currentPassword, $user->password)) {
            return redirect()->back()->with('error', 'Current password is incorrect');
        }
    
        $newEmail = $request->input('email');
        $user->email = $newEmail;
    
        // Check if a new password is provided
        $newPassword = $request->input('newPassword');
        if (!empty($newPassword)) {
            $user->password = Hash::make($newPassword);
        }
    
        $user->save();
    
        return redirect()->back()->with('success', 'User security information updated successfully');
    }

    public function updateGameAccount(Request $request)
    {   
        $gameAccount = game_accounts::where('user_id', Auth::id())->first();

        if ($gameAccount) {
            $gameAccount->Shiftsworked = $request->input('shifts');
            $gameAccount->GoldenEggsCollected = $request->input('goldeneggs');
            $gameAccount->PowerEggsCollected = $request->input('powereggs');
            $gameAccount->KingSalmonidsDefeated = $request->input('kings');
            $gameAccount->CrewMembersRescued = $request->input('crewmembers');
            $gameAccount->Totalpoints = $request->input('totalPoints');
            $gameAccount->save();
        } else {
            return response()->json(['message' => 'Game account not found'], 404);
        }
    }

    public function updateScales(Request $request)
    {
        $gameAccount = game_accounts::where('user_id', Auth::id())->first();

        if ($gameAccount){
            $gameAccount->bronzescales = $request->input('bronzescales');
            $gameAccount->silverscales = $request->input('silverscales');
            $gameAccount->goldscales = $request->input('goldscales');
            $gameAccount->save();
        } else {
            return response()->json(['message' => 'Scales updating not found']);
        }
    }
}
