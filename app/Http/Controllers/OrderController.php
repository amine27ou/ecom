<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index(){
        $orders = Order::all();
        return response()->json([
            'orders'=>$orders
        ]);
    }
    // public function show (Order $order){
    //     return response()->json([
    //         'order'=>$order
    //     ]);
    // }
    public function store(Request $request)
{
    $data = $request->validate([
        'total_amount' => 'required|integer',
        'shipping_address' => 'required',
        'order_items' => 'required|array', // assuming order_items is an array of items
        'order_items.*.product_id' => 'required|integer|exists:products,product_id', // validate each item
        'order_items.*.quantity' => 'required|integer|min:1',
        'order_items.*.price' => 'required|numeric|min:0',
    ]);

    $user = Auth::user();

    $data['user_id'] = $user->id;
    $data['status'] = 'pending';
    $data['order_date'] = now();

    // Create the order
    $order = Order::create($data);

    // Create the order items
    foreach ($data['order_items'] as $item) {
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $item['product_id'],
            'quantity' => $item['quantity'],
            'price' => $item['price'],
        ]);
    }

    // Return a successful response
    return response()->json([
        'message' => 'Order placed successfully!'
    ]);
}
    // public function update(Request $request,Order $order){
    //     $data = $request->validate([
    //         'user_id'=>'nullable',
    //         'order_date'=>'nullable',
    //         'status'=>'nullable',
    //         'total_amount'=>'nullable',
    //         'shipping_address'=>'nullable',
    //     ]);
    //     $order->update($data);
    //     return response()->json([
    //         'message'=>'Order updated successfully!'
    //     ]);
    // }
    // public function destory(Order $order){
    //     $order->delete();
    //     return response()->json([
    //         'message'=>'Order deleted successfully!'
    //     ]);
    // }
    
}
