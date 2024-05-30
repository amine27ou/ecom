<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'=>User::all()->random()->id,
            'order_date' => fake()->dateTimeBetween('+1 week', '+1 month')->format('Y-m-d'),
            'status'=>fake()->randomElement(['Pending','Shipped','Delivered','Canceled']),
            'total_amount'=>fake()->numberBetween('50','1000'),
            'shipping_address'=>fake()->address(),  
        ];
    }
}
