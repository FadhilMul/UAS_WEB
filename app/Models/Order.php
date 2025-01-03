<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'customer_name',
        'phone_number',
        'payment_method',
        'order_type',
        'discount',
        'subtotal',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
