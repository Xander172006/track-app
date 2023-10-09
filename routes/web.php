<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GameAccountController;
use App\Http\Controllers\RotationsController;


Route::middleware(['auth'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });
});

// webpages routes
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/rotations', [RotationsController::class, 'index'])->middleware(['auth', 'verified'])->name('rotations');

// update stat route
Route::post('/update-stats', [DashboardController::class, 'index']);
Route::get('/update-stats', [DashboardController::class, 'index']);
Route::post('/update-bosscounts', [DashboardController::class, 'updateBosses']);


// game account routes
Route::post('/create-account', [GameAccountController::class, 'createAccount'])->name('createAccount');
Route::post('/find-account', [GameAccountController::class, 'findAccount'])->name('findAccount');



Route::post('/update-profile-picture', [GameAccountController::class, 'editProfilePicture'])->name('editProfilePicture');
Route::post('/update-user-bio', [GameAccountController::class, 'updateBio'])->name('updateBio');

Route::post('/update-game-account', [GameAccountController::class, 'updateGameAccount'])->name('updateGameAccount');
Route::post('/update-user-account', [GameAccountController::class, 'updateUserAccount'])->name('updateUserAccount');
Route::post('/update-user-security', [GameAccountController::class, 'updateUserSecurity'])->name('updateUserSecurity');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [GameAccountController::class, 'displayAccount'])->name('profile.edit');
});

require __DIR__.'/auth.php';
