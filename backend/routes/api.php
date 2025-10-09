<?php

<<<<<<< HEAD
use App\Http\Controllers\Api\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/users', function () {
    return [
        ['id' => 1, 'name' => 'Stefan'],
        ['id' => 2, 'name' => 'Marie'],
    ];
});


Route::get('/customers', [CustomerController::class, 'index']);
Route::post('/customers', [CustomerController::class, 'store']);
Route::get('/customers/{id}', [CustomerController::class, 'show']);
Route::put('/customers/{id}', [CustomerController::class, 'update']);
=======
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;

Route::get('/customers', [CustomerController::class, 'index']);
Route::post('/add/customers', [CustomerController::class, 'store']);
Route::get('/customers/{id}', [CustomerController::class, 'show']);
Route::put('/customers/{id}', [CustomerController::class, 'update']);
Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);
>>>>>>> parent of c612c06 (changes)

