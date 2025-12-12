<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserCloneController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ChackAccessTime;
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

// Route::get("/nguoi-dung", [UserController::class, "index"])->middleware("access.time")->name("user.index");
// Route::get("/nguoi-dung", [UserController::class, "index"])->name("user.index")->middleware("access.time");
// Route::get("/nguoi-dung", [UserController::class, "index"])->name("user.index")->middleware(["access.time"]);
// Route::get("/nguoi-dung", [UserController::class, "index"])->name("user.index");
// Route::get("/nguoi-dung", [UserController::class, "index"])->name("user.index")->middleware(ChackAccessTime::class);
// Route::get("/nguoi-dung", [UserController::class, "index"])->name("user.index")->middleware([ChackAccessTime::class]);
Route::prefix("/nguoi-dung-v3")->controller(UserController::class)->name("nguoi-dung-v3.")->group(function () {
    Route::get("/", "index")->name("trang-chu");
    Route::get("/trang-chu", "index")->name("trang-chu");
    Route::get("/dang-ki", "create")->name("dang-ki");
    Route::post("/luu-dang-ki", "store")->name("luu-dang-ki");
});

// Route::get("/", [HomeController::class, "index"])->name("home.index");
// Route::redirect("/trang-chu-1", "/");
// Route::redirect("/trang-chu-2", "/");
// Route::redirect("/trang-chu-3", "/");

// Route::get("/trang-chu/about", [HomeController::class, "about"])->name("trang-chu.about");

Route::controller(HomeController::class)->group(function () {
    Route::get("/trang-chu", "index")->name("trang-chu.index")->middleware("auth");
    Route::get("/trang-chu/about", "about")->name("trang-chu.about");
});

Route::get("/login", function () {
    return "Login Page";
})->name("login");

Route::resource("/nguoi-dung-v2", UserCloneController::class);