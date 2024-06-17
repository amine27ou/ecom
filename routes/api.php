<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('products',ProductController::class);
Route::apiResource('orders',OrderController::class)->middleware('auth:sanctum');
Route::apiResource('blogs',BlogController::class);

Route::get('/order-items', function () {
    $order_items = OrderItem::all();
    foreach($order_items as $item){
        $item->product = Product::find($item->product_id);
    };
    return response()->json([
        'order_items' => $order_items
    ]);
})->middleware('auth:sanctum');

Route::get('/users', function () {
    $users = User::all();
    if(Auth::user()->role === 'admin'){
        return response()->json([
            'users' => $users
        ]);
    }else{
        return response()->json([
            'message'=>'You do not have access'
        ]);
    }
})->middleware('auth:sanctum');

Route::put('/user/update', [RegisteredUserController::class, 'updateUserData'])->middleware('auth:sanctum');

