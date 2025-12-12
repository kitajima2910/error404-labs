<h1>{{ $title }}</h1>

<a href="{{ route("nguoi-dung-v3.dang-ki") }}"
    style="display: block; margin-top: 10px; margin-bottom: 10px; text-decoration: none; color: #ccc; background-color: #000; padding: 10px; width: fit-content">Đăng
    Kí</a>

<ul>
    @foreach ($users as $user)
        <li>{{ $user->name }} - {{ $user->email }} - {{ $user->role }}</li>
    @endforeach
</ul>