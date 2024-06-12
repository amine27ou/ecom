<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index');
    
    }
    public function index(){
        $OrderItems = OrderItem::all();
        return response()->json([
            'OrderItems'=>$OrderItems
        ]);
    }

    
}
