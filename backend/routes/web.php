<?php

use Illuminate\Support\Facades\Route;

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello this is me!!!']);
});



require __DIR__.'/api.php';