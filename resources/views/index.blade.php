@extends('layouts.app')

@section('title', 'Menu')

@section('content')
<div class="container py-5">
  <h1>Dashboard - {{ $restaurant->name }}</h1>
  <div class="menu-section">
    @foreach ($menus as $menu)
    <div class="menu-item-card">
      <img src="{{ $menu->image_url }}" alt="Menu Image">
      <p>{{ $menu->name }}</p>
      <p>Rp{{ number_format($menu->price, 0, ',', '.') }}</p>
      <button class="add-to-cart-btn"
        data-id="{{ $menu->id }}"
        data-name="{{ $menu->name }}"
        data-price="{{ $menu->price }}">
        Add to Cart
      </button>
    </div>
    @endforeach
  </div>
</div>
@endsection