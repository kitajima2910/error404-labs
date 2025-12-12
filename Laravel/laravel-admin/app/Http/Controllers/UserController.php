<?php

namespace App\Http\Controllers;

use App\Http\Middleware\ChackAccessTime;
use App\Models\User;
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
        return view("nguoi-dung", [
            "users" => $users,
            "title" => $title
        ]);
    }
}
