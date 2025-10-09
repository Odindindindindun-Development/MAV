<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/users', function () {
    return [
        ['id' => 1, 'name' => 'Stefan'],
        ['id' => 2, 'name' => 'Marie'],
    ];
});
