<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    // 🧭 Display all customers
    public function index()
    {
        $customers = Customer::all();
        return response()->json($customers);
    }

    // 🧩 Add a new customer
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fullname' => 'required|string|max:255',
            'contact_number' => 'required|string|max:255',
            'email' => 'required|email|unique:customers',
            'address' => 'required|string',
            'date_registered' => 'required|date',
        ]);

        $customer = Customer::create($validated);

        return response()->json([
            'message' => 'Customer added successfully!',
            'data' => $customer
        ], 201);
    }

    // 🛠 Edit an existing customer (optional for later)
    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->update($request->all());
        return response()->json(['message' => 'Customer updated successfully!', 'data' => $customer]);
    }

    // 🗑 Delete a customer (optional)
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();
        return response()->json(['message' => 'Customer deleted successfully!']);
    }
}
