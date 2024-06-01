<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index');
    }
    public function index(){
        $products = Product::all();
        return response()->json([
            'products'=>$products
        ]);
    }
    public function show(Product $product){

        return response()->json([
            'product'=>$product,
            'added_by'=>User::find($product->added_by),
            'updated_by'=>User::find($product->updated_by),

        ]);
    }
    public function store(Request $request)
{
    $data = $request->validate([
        'name' => 'required|max:255',
        'description' => 'required|max:255',
        'price' => 'required|integer',
        'quantity' => 'required|integer',
        'main_image' => 'required|image',
        'second_image' => 'nullable|image',
        'third_image' => 'nullable|image',
        'isAvailable'=>'nullable'
    ]);

    $data['ref'] = Str::uuid();
    $data['added_by'] = Auth::id();
    $data['updated_by'] = Auth::id();


    if ($request->hasFile('main_image')) {
        $mainImage = $request->file('main_image');
        $mainImageName = 'product_' . time() . '.' . $mainImage->getClientOriginalExtension();
        $mainImage->storeAs('products', $mainImageName,'public');
        $data['main_image'] = $mainImageName;
    }

    if ($request->hasFile('second_image')) {
        $secondImage = $request->file('second_image');
        $secondImageName = 'product_' . time() . '.' . $secondImage->getClientOriginalExtension();
        $secondImage->storeAs('products', $secondImageName,'public');
        $data['second_image'] = $secondImageName;
    }

    if ($request->hasFile('third_image')) {
        $thirdImage = $request->file('third_image');
        $thirdImageName = 'product_' . time() . '.' . $thirdImage->getClientOriginalExtension();
        $thirdImage->storeAs('products', $thirdImageName,'public');
        $data['third_image'] = $thirdImageName;
    }
    
    $product = Product::create($data);
    return response()->json([
        'message' => 'Product created successfully!',
        'product' => $product,
    ]);
}

    public function update(Request $request,Product $product){
        $data = $request->validate([
            'name' => 'nullable|max:255',
            'description' => 'nullable|max:255',
            'price' => 'nullable|integer',
            'quantity' => 'nullable|integer',
            'main_image' => 'nullable|image',
            'second_image' => 'nullable|image',
            'third_image' => 'nullable|image',
            'isAvailable'=>'nullable'
        ]);
        
        $data['updated_by'] = Auth::id();
    
        if ($request->hasFile('main_image')) {
            $mainImage = $request->file('main_image');
            $mainImageName = 'product_' . time() . '.' . $mainImage->getClientOriginalExtension();
            $mainImage->storeAs('products', $mainImageName,'public');
            $data['main_image'] = $mainImageName;
        }
    
        if ($request->hasFile('second_image')) {
            $secondImage = $request->file('second_image');
            $secondImageName = 'product_' . time() . '.' . $secondImage->getClientOriginalExtension();
            $secondImage->storeAs('products', $secondImageName,'public');
            $data['second_image'] = $secondImageName;
        }
    
        if ($request->hasFile('third_image')) {
            $thirdImage = $request->file('third_image');
            $thirdImageName = 'product_' . time() . '.' . $thirdImage->getClientOriginalExtension();
            $thirdImage->storeAs('products', $thirdImageName,'public');
            $data['third_image'] = $thirdImageName;
        }
        if ($request->has('isAvailable')) {
            $data['isAvailable'] = $request->input('isAvailable');
        }
        $product->update($data);
        return response()->json([
            'message' => 'Product updated successfully!',
            'product' => $product,
        ]);
    }
    public function destroy(Product $product){
        if($product->main_image){
            Storage::disk('public')->delete($product->main_image);
        }
        if($product->second_image){
            Storage::disk('public')->delete($product->second_image);
        }
        if($product->third_image){
            Storage::disk('public')->delete($product->third_image);
        }

        $product->delete();
        return response()->json([
            'message'=>'Product deleted succesfully!'
        ]);
    }
}
