<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['ref','name','description','price','product_quantity','isAvailable','main_image','second_image','third_image','updated_by','added_by'];

    
}
