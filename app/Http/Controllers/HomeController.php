<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\Menu;

class HomeController extends Controller
{
    public function index()
    {
        $restaurant = Restaurant::where('user_id', auth()->id())->first();
        $menus = Menu::all();

        return view('index', [
            'restaurant' => $restaurant,
            'menus' => $menus,
        ]);
    }
}

