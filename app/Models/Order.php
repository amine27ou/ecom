<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = ['order_date','status','total_amount','shipping_address','user_id'];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
