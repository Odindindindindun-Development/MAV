<?php

namespace App\Http\Controllers;

use App\Models\StockItemHistory;

class StockItemHistoryController extends Controller
{
    public function index($id)
    {
        $history = StockItemHistory::where('StockItemID', $id)
                    ->orderByDesc('EditedAt')
                    ->get();

        return response()->json($history);
    }
}
