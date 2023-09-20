<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bosses extends Model
{
    use HasFactory;

    public function gameAccount()
    {
        return $this->belongsTo(GameAccount::class);
    }
}
