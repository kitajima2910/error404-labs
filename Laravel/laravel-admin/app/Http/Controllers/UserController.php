<?php

namespace App\Http\Controllers;

use App\Http\Middleware\ChackAccessTime;
use App\Http\Requests\CreateUserRequest;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;

class UserController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            // ChackAccessTime::class,
            // "access.time"
        ];
    }

    public function index()
    {

        $users = User::all();
        $title = "Danh Sách Người Dùng - Laravel Admin";

        // return view("nguoi-dung", compact("users", "title"));
        return view("nguoi-dung-v3.trang-chu", [
            "users" => $users,
            "title" => $title
        ]);
    }

    public function create()
    {
        return view("nguoi-dung-v3.dang-ki");
    }

    public function store(CreateUserRequest $request)
    {
        // $request->validate([
        //     "name" => "required|string",
        //     "email" => "required|email|unique:users,email",
        //     "password" => "required|confirmed|min:8|max:16"
        // ]);

        User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password)
        ]);

        return redirect()->route("nguoi-dung-v3.trang-chu");
    }
}
