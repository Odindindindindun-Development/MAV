<?php

use App\Http\Controllers\Api\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StockItemController;

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



Route::get('/StockItem', [StockItemController::class, 'index']);
Route::get('/StockItem/low', [StockItemController::class, 'lowStock']);
Route::post('/StockItem', [StockItemController::class, 'store']);
Route::put('/StockItem/{id}', [StockItemController::class, 'update']);
Route::delete('/StockItem/{id}', [StockItemController::class, 'destroy']);
