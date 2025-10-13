<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockItem extends Model
{
    use HasFactory;

    protected $table = 'StockItem'; // 👈 tell Laravel the exact table name
    protected $primaryKey = 'StockItemID';

    protected $fillable = [
        'ItemName',
        'Description',
        'QuantityOnHand',
        'UnitPrice',
        'Supplier',
        'ReorderLevel'
    ];

    protected $casts = [
    'UnitPrice' => 'float',
    'QuantityOnHand' => 'integer',
    'ReorderLevel' => 'integer',
];
}
