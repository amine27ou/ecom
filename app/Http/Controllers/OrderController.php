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
        $pending_orders = Order::where('status','Pending')->count();
        $delivered_orders = Order::where('status','Delivered')->count();
        $shipped_orders = Order::where('status','Shipped')->count();
        $canceled_orders = Order::where('status','Canceled')->count();

        return response()->json([
            'orders'=>$orders,
            'pending_orders'=>$pending_orders,
            'delivered_orders'=>$delivered_orders,
            'shipped_orders'=>$shipped_orders,
            'canceled_orders'=>$canceled_orders,
            
        ]);
    }

    public function store(Request $request)
{
    $data = $request->validate([
        'total_amount' => 'required|integer',
        'shipping_address' => 'required',
        'order_items' => 'required|array', 
        'order_items.*.product_id' => 'required|integer|exists:products,id', 
        'order_items.*.quantity' => 'required|integer|min:1',
        'order_items.*.price' => 'required|numeric|min:0',
    ]);

    $user = Auth::user();

    $orderData = [
        'user_id' => $user->id,
        'total_amount' => $data['total_amount'],
        'shipping_address' => $data['shipping_address'],
        'status' => 'pending',
        'order_date' => now(),
    ];
    $order = Order::create($orderData);

    foreach ($data['order_items'] as $item) {
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $item['product_id'],
            'quantity' => $item['quantity'],
            'price' => $item['price'],
        ]);
    }

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
