<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    // Store a new customer
    public function store(Request $request)
{
    $validated = $request->validate([
        'fullname' => 'required|string|max:255',
        'contact_number' => 'required|string|max:20',
        'email' => 'required|email|unique:customers,email',
        'address' => 'required|string|max:255',
        'date_registered' => 'required|date',
    ]);

    $validated['date_registered'] = $validated['date_registered'] ?? now()->toDateString();

    $customer = Customer::create($validated);

    return response()->json([
        'message' => 'Customer added successfully!',
        'data' => $customer
    ], 201);
}

    // Fetch all customers
    public function index()
    {
        return Customer::all();
    }
}
