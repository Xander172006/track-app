<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class RotationsController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $schedulesApi = Http::get('https://splatoon3.ink/data/schedules.json');

        if ($schedulesApi->successful()) {
            $rotations = $schedulesApi->json();

            return Inertia::render('Rotations', [
                'user' => $user,
                'rotations' => $rotations
            ]);
        }
    }
}
