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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('ref');
            $table->string('name');
            $table->string('description');
            $table->integer('price');
            $table->integer('product_quantity');
            $table->string('main_image');
            $table->string('second_image')->nullable();
            $table->string('third_image')->nullable();
            $table->string('isAvailable')->default(false);
            $table->foreignId('added_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
