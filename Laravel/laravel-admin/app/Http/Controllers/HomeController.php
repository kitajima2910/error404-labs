<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view("trang-chu");
    }

    public function about()
    {
        return "Trang Chủ  - About Us";
    }
}
