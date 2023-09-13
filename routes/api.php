<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GameAccountController;
use App\Http\Controllers\SalmonrunStatsController;

Route::get('/banners', [GameAccountController::class, 'getIngameBanners']);
Route::post('/salmon-run-stats', [SalmonrunStatsController::class, 'GameData']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
