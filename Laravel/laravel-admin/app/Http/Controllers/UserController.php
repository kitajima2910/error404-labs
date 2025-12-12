<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
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
