<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Blog;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // \App\Models\User::factory()->create([
        //     'first_name' => 'Amine',
        //     'last_name' => 'Outkacha',
        //     'email' => 'amine@example.com',
        //     'password'=>'12345678',
        //     'role'=>'admin'
        // ]);

        // Product::factory(10)->create();
        // Order::factory(10)->create();
        Blog::factory(5)->create();
    }
}
