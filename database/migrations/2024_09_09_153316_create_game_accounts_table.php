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
            $table->string('UID', 10)->nullable();
            $table->text('username');
            $table->integer('Shiftsworked')->nullable();
            $table->integer('GoldenEggsCollected')->nullable();
            $table->integer('PowerEggsCollected')->nullable();
            $table->integer('KingSalmonidsDefeated')->nullable();
            $table->integer('CrewMembersRescued')->nullable();
            $table->integer('Totalpoints')->nullable();

            $table->integer('bronzescales')->nullable();
            $table->integer('silverscales')->nullable();
            $table->integer('goldscales')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });

        // Add a foreign key relationship between game_accounts and bosses
        Schema::table('bosses', function (Blueprint $table) {
            $table->unsignedBigInteger('game_account_id')->nullable();
            $table->foreign('game_account_id')->references('id')->on('game_accounts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove the foreign key relationship between game_accounts and bosses
        Schema::table('bosses', function (Blueprint $table) {
            $table->dropForeign(['game_account_id']);
        });

        Schema::dropIfExists('game_accounts');
    }
};
