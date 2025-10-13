<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\StockItemHistory;

class StockItem extends Model
{
    use HasFactory;

    protected $table = 'StockItem';
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

    // 👇 Automatically log changes to StockItem_History
    protected static function booted()
    {
        static::updating(function ($stockItem) {
            $changed = $stockItem->getDirty(); // Only changed fields

            foreach ($changed as $field => $newValue) {
                $oldValue = $stockItem->getOriginal($field);

                // Log into StockItem_History
                StockItemHistory::create([
                    'StockItemID' => $stockItem->StockItemID,
                    'FieldChanged' => $field,
                    'OldValue' => $oldValue,
                    'NewValue' => $newValue,
                    'EditedAt' => now(),
                ]);
            }
        });
    }
}
