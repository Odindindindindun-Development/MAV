<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        return Customer::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fullname' => 'required|string',
            'contact_number' => 'required|string',
            'email' => 'required|email|unique:customers',
            'address' => 'required|string',
            'date_registered' => 'required|date',
        ]);

        $customer = Customer::create($validated);
        return response()->json($customer, 201);
    }

    public function show($id)
    {
        return Customer::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->update($request->all());
        return $customer;
    }

    public function destroy($id)
    {
        Customer::destroy($id);
        return response()->json(['message' => 'Customer deleted']);
    }
}
