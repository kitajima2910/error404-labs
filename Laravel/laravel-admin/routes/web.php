<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // return view('welcome');
    return response()->json("Hello, World!");
});

Route::get("/test", function () {
    // return response()->json("Test!");
    return view("hello");
});