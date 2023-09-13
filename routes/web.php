<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GameAccountController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// displays the stats dashboard 
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

// creates a new Game Account
Route::post('/create-account', [GameAccountController::class, 'createAccount'])->name('createAccount');

// Updates Game Account Stats
Route::post('/update-game-account', [GameAccountController::class, 'updateAccountStats'])->name('updateAccountStats');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [GameAccountController::class, 'displayAccount'])->name('profile.edit');
});

require __DIR__.'/auth.php';
