<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ref'=>fake()->uuid(),
            'name'=>fake()->name(),
            'description'=>fake()->paragraph(),
            'price'=>fake()->numberBetween(50,400),
            'quantity'=>fake()->numberBetween(1,30),
            'main_image'=>fake()->imageUrl(),
            'second_image'=>fake()->imageUrl(),
            'third_image'=>fake()->imageUrl(),
            'isAvailable'=>fake()->boolean(),
            
        ];
    }
}
