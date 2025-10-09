<?php

use Illuminate\Support\Facades\Route;

<<<<<<< HEAD
Route::get('/', function () {
    return view('welcome');
});

Route::get('/users', function () {
    return [
        ['id' => 1, 'name' => 'Stefan'],
        ['id' => 2, 'name' => 'Marie'],
    ];
});
=======
Route::get('/hello', function () {
    return response()->json(['message' => 'Hello this is me!!!']);
});



require __DIR__.'/api.php';
>>>>>>> parent of c612c06 (changes)
