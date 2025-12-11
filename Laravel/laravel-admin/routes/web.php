<?php

use Illuminate\Support\Facades\Route;

Route::get('/home', function () {
    return view('welcome');
    // return response()->json("Hello, World!");
})->name("home");

Route::get("/test", function () {
    // return response()->json("Test!");
    return view("hello");
});

Route::get("/about", function () {
    // return "About us";
    return view("about");
})->name("about");

Route::get("/user/{name?}", function (?string $name = "PXH2910") {
    return "User name: {$name}";
});

Route::prefix("/san-pham")->group(function () {
    Route::get("/", function () {
        return "Products";
    });
    Route::get("/{id}", function ($id) {
        return "Product ID: {$id}";
    });
});

Route::fallback(function () {
    return view("404");
});