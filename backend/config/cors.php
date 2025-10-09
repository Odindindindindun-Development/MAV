<?php

return [

<<<<<<< HEAD
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | This config controls cross-origin requests such as those from your
    | React frontend (http://localhost:5173). It defines which origins,
    | methods, and headers are allowed.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],
=======
    'paths' => ['api/*', 'sanctum/csrf-cookie', '*'],
>>>>>>> parent of c612c06 (changes)

    'allowed_methods' => ['*'],

    'allowed_origins' => [
<<<<<<< HEAD
        'http://localhost:5173',
        'http://127.0.0.1:5173',
=======
        'http://localhost:5173', // your React app (Vite)
        'http://127.0.0.1:5173',
        'http://backend.test',   // your Laravel Herd site
>>>>>>> parent of c612c06 (changes)
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
<<<<<<< HEAD

=======
>>>>>>> parent of c612c06 (changes)
];
