<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string",
            "email" => "required|email|unique:users,email",
            "password" => "required|confirmed|min:8|max:16"
        ];
    }

    public function messages(): array
    {
        return [
            "name.required" => "Tên người dùng không được để trống",
            "email.required" => "Email người dùng không được để trống",
            "email.email" => "Email người dùng không hợp lệ",
            "email.unique" => "Email người dùng đã tồn tại",
            "password.required" => "Mật khẩu người dùng không được để trống",
            "password.confirmed" => "Mật khẩu người dùng không khớp",
            "password.min" => "Mật khẩu người dùng phải có ít nhất 8 ký tự",
            "password.max" => "Mật khẩu người dùng phải có nhiều nhất 16 ký tự",
        ];
    }
}
