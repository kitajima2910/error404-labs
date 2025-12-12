<h1>Danh Sách Người Dùng</h1>

<ul>
    @foreach ($users as $user)
        <li>{{ $user->name }} - {{ $user->email }} - {{ $user->role }}</li>
    @endforeach
</ul>