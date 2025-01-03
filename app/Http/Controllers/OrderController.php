<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Menu;

class OrderController extends Controller
{
    public function confirm(Request $request)
    {
        $orderData = json_decode($request->order, true);

        return view('order-confirmation', [
            'order' => $orderData,
        ]);
    }

    public function store(Request $request)
    {
        $order = Order::create([
            'order_number' => $request->order_number,
            'customer_name' => $request->customer_name,
            'phone_number' => $request->phone_number,
            'payment_method' => $request->payment_method,
            'order_type' => $request->order_type,
            'discount' => $request->discount,
            'subtotal' => $request->subtotal,
        ]);

        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'menu_id' => $item['menu_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return redirect()->route('order.receipt', ['order' => $order->id]);
    }
}

