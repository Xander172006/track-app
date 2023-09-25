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
        Schema::create('bosses', function (Blueprint $table) {
            $table->id();
            $table->integer('playerEvp')->default(0);
            $table->integer('steelheads')->default(0);
            $table->integer('flyfishes')->default(0);
            $table->integer('maws')->default(0);
            $table->integer('steeleals')->default(0);
            $table->integer('stingers')->default(0);
            $table->integer('scrappers')->default(0);
            $table->integer('drizzlers')->default(0);
            $table->integer('flippers')->default(0);
            $table->integer('slamonlids')->default(0);
            $table->integer('fishticks')->default(0);
            $table->integer('bigshots')->default(0);
            $table->unsignedBigInteger('account_id')->nullable();
            $table->timestamps();

            $table->foreign('account_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bosses');
    }
};
