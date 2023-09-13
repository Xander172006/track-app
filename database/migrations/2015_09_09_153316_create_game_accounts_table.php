<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('game_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('UID', 10)->unique();
            $table->text('username');
            $table->integer('Shiftsworked')->nullable();
            $table->text('GoldenEggsCollected')->nullable();
            $table->text('PowerEggsCollected')->nullable();
            $table->text('KingSalmonidsDefeated')->nullable();
            $table->text('CrewMembersRescued')->nullable();
            $table->text('Totalpoints')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_accounts');
    }
};
