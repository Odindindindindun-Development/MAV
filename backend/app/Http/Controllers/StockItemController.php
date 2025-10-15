<?php

namespace App\Http\Controllers;

use App\Models\StockItem;
use Illuminate\Http\Request;

class StockItemController extends Controller
{
    // Fetch all inventory
    public function index()
{
    $items = StockItem::where('isArchived', false) // only non-archived
        ->get()
        ->map(function ($item) {
            // add a helper field for frontend
            $item->is_low_stock = $item->QuantityOnHand <= $item->ReorderLevel;
            return $item;
        });

    return response()->json($items);
}

    // Add a new item
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ItemName' => 'required|string|max:255',
            'Description' => 'nullable|string',
            'QuantityOnHand' => 'required|integer|min:0',
            'UnitPrice' => 'required|numeric|min:0',
            'Supplier' => 'nullable|string|max:255',
            'ReorderLevel' => 'nullable|integer|min:0',
        ]);

        $item = StockItem::create($validated);
        return response()->json($item, 201);
    }

    // Update existing item
    public function update(Request $request, $id)
    {
        $item = StockItem::findOrFail($id);
        $item->update($request->all());
        return response()->json($item);
    }

    // Return low-stock items
    public function lowStock()
{
    $lowStockItems = \App\Models\StockItem::whereColumn('QuantityOnHand', '<=', 'ReorderLevel')->get();

    return response()->json($lowStockItems);
}

public function archive($id)
{
    $item = StockItem::findOrFail($id);
    $item->isArchived = true;
    $item->save();

    return response()->json(['message' => 'Item archived successfully']);
}

public function unarchive($id)
{
    $item = StockItem::findOrFail($id);
    $item->isArchived = false;
    $item->save();

    return response()->json(['message' => 'Item unarchived successfully']);
}

}
