<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;
    protected $fillable = ['title','slug','content','status','user_id','excerpt','feature_image'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
