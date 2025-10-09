<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

<<<<<<< HEAD
    protected $fillable = [
    'fullname',
    'contact_number',
    'email',
    'address',
    'date_registered',
=======
    protected $primaryKey = 'customer_id';

    protected $fillable = [
        'fullname',
        'contact_number',
        'email',
        'address',
        'date_registered',
>>>>>>> parent of c612c06 (changes)
    ];
}
