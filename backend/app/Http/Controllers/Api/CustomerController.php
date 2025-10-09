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


    public function show($id)
{
    $customer = \App\Models\Customer::find($id);

    if (!$customer) {
        return response()->json(['message' => 'Customer not found'], 404);
    }

    return response()->json($customer);
}

public function update(Request $request, $id)
{
    $customer = \App\Models\Customer::find($id);

    if (!$customer) {
        return response()->json(['message' => 'Customer not found'], 404);
    }

    $validated = $request->validate([
        'fullname' => 'required|string|max:255',
        'contact_number' => 'required|string|max:20',
        'email' => 'required|email|unique:customers,email,' . $id, // allows same email if unchanged
        'address' => 'required|string|max:255',
        'date_registered' => 'required|date',
    ]);

    $customer->update($validated);

    return response()->json([
        'message' => 'Customer updated successfully!',
        'data' => $customer,
    ]);
}
}
