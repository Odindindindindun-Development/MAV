<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
    User::factory()->createMany([
        ['name' => 'Alice', 'email' => 'alice@example.com', 'role' => 'Admin'],
        ['name' => 'Bob', 'email' => 'bob@example.com', 'role' => 'Student'],
        ['name' => 'Charlie', 'email' => 'charlie@example.com', 'role' => 'Teacher'],
    ]);
}

}
