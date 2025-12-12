<h1>Đăng Kí Người Dùng</h1>

<!-- @if ($errors->any())
    <div style="color: red">
        @foreach ($errors->all() as $error)
            <p>{{ $error }}</p>
        @endforeach
    </div>
@endif -->

<form action="{{ route("nguoi-dung-v3.luu-dang-ki") }}" method="post" novalidate>
    @csrf
    @error("name")
        <p style="color: red">{{ $message }}</p>
    @enderror
    <input type="text" name="name" value="{{ old("name") }}" placeholder="Nhập tên người dùng"><br /> <br />

    @error("email")
        <p style="color: red">{{ $message }}</p>
    @enderror
    <input type="email" name="email" value="{{ old("email") }}" placeholder="Nhập email người dùng"><br /> <br />

    @error("password")
        <p style="color: red">{{ $message }}</p>
    @enderror
    <input type="password" name="password" placeholder="Nhập mật khẩu người dùng"><br /> <br />

    @error("password_confirmation")
        <p style="color: red">{{ $message }}</p>
    @enderror
    <input type="password" name="password_confirmation" placeholder="Nhập lại mật khẩu người dùng"><br /> <br />

    <button type="submit">Đăng Kí</button>
</form>