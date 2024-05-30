<?php

namespace App\Http\Controllers;

use App\Models\Order;
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
    public function show (Order $order){
        return response()->json([
            'order'=>$order
        ]);
    }
    public function store(Request $request){
        $data = $request->validate([
            'order_date'=>'required',
            'status'=>'required',
            'total_amount'=>'required|integer',
            'shipping_address'=>'required',
        ]);
        $data['user_id'] = Auth::id();

        Order::create($data);
        return response()->json([
            'message'=>'Order placed successfully!'
        ]);
    }
    public function update(Request $request,Order $order){
        $data = $request->validate([
            'user_id'=>'nullable',
            'order_date'=>'nullable',
            'status'=>'nullable',
            'total_amount'=>'nullable',
            'shipping_address'=>'nullable',
        ]);
        $order->update($data);
        return response()->json([
            'message'=>'Order updated successfully!'
        ]);
    }
    public function destory(Order $order){
        $order->delete();
        return response()->json([
            'message'=>'Order deleted successfully!'
        ]);
    }
}
