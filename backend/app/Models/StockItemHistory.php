<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockItemHistory extends Model
{
    use HasFactory;

    protected $table = 'StockItem_History';
    protected $primaryKey = 'HistoryID';
    public $timestamps = false; // Using EditedAt instead

    protected $fillable = [
        'StockItemID',
        'FieldChanged',
        'OldValue',
        'NewValue',
        'EditedAt',
    ];

    protected $casts = [
        'EditedAt' => 'datetime',
    ];
}
