<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/order-confirmation', [OrderController::class, 'confirm'])->name('order.confirm');
Route::post('/order', [OrderController::class, 'store'])->name('order.store');
