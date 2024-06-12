<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index');
    
    }
    public function index(Request $request){
        $blogs = Blog::query();

        if($request->has('title')){
            $blogs->where('title','like','%'.$request->input('title').'%');
        }
        $blogs = $blogs->get();
        return response()->json([
            'blogs'=>$blogs
        ]);
    }

    public function show(Blog $blog)
    {
        return response()->json([
            'blog'=>$blog
        ]);
    }

    public function store(Request $request){
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'status' => 'required|in:draft,published,archived',
            'excerpt' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
            'featured_image' => 'required|image|max:2048',
        ]);
        $data['slug'] = Str::slug($request->title);

        if ($request->hasFile('featured_image')) {
            $imageName = 'blog_' . time() . '.' . $request->file('featured_image')->getClientOriginalExtension();
            $request->file('featured_image')->storeAs('blogs',$imageName,'public');
            $data['featured_image'] = $imageName;
        }

        Blog::create($data);
        return response()->json([
            'message'=>'Blog created successfully!'
        ]);
    }

    public function update(Blog $blog,Request $request){
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable',
            'status' => 'nullable|in:draft,published,archived',
            'excerpt' => 'nullable|string',
            'user_id' => 'nullable|exists:users,id',
            'featured_image' => 'nullable|image|max:2048',
        ]);
        if ($request->has('title')) {
            $data['slug'] = Str::slug($request->title);
        }
        if ($request->hasFile('featured_image')) {
            $imageName = 'blog_' . time() . '.' . $request->file('featured_image')->getClientOriginalExtension();
            $request->file('featured_image')->storeAs('blogs',$imageName,'public');
            $data['featured_image'] = $imageName;
        }

        $blog->update($data);
        return response()->json([
            'message'=>'Blog updated successfully!'
        ]);
    }
    public function destroy(Blog $blog){
        if($blog->featured_image){
            Storage::disk('public')->delete($blog->featured_image);
        }
        $blog->delete();
        return response()->json([
            'message'=>'Blog deleted successfully!'
        ]);
    }
    
}
