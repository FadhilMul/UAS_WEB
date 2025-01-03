@extends('layouts.app')

@section('content')
<div class="container py-5">
    <h3>Order #{{ $order['orderNumber'] }}</h3>
    <ul class="list-group">
        @foreach ($order['items'] as $item)
        <li class="list-group-item d-flex justify-content-between">
            {{ $item['name'] }} x {{ $item['quantity'] }}
            <span>Rp{{ number_format($item['price'], 0, ',', '.') }}</span>
        </li>
        @endforeach
    </ul>
    <form method="POST" action="{{ route('order.store') }}">
        @csrf
        <input type="hidden" name="order_number" value="{{ $order['orderNumber'] }}">
        <input type="hidden" name="discount" value="{{ $order['discount'] }}">
        <input type="hidden" name="subtotal" value="{{ $order['subtotal'] }}">
        <label for="customer-name">Customer Name</label>
        <input type="text" name="customer_name" id="customer-name" required>
        <label for="phone-number">Phone Number</label>
        <input type="tel" name="phone_number" id="phone-number" required>
        <label for="payment-method">Payment Method</label>
        <select name="payment_method">
            <option value="Cash">Cash</option>
            <option value="QRIS">QRIS</option>
        </select>
        <label for="order-type">Order Type</label>
        <select name="order_type">
            <option value="Dine In">Dine In</option>
            <option value="Take Away">Take Away</option>
        </select>
        <button type="submit">Confirm Payment</button>
    </form>
</div>
@endsection