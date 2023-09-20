<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SalmonrunStatsApiController;

Route::post('/salmon-run/game-data', [SalmonrunStatsApiController::class, 'GameData']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

