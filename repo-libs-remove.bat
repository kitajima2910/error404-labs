@echo off
setlocal enabledelayedexpansion

rem --- Kiểm tra Git ---
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo Git is not installed or not in PATH.
    pause
    exit /b 1
)

for /f "delims=" %%G in ('where git') do (
    set "GIT=%%G"
    goto :break
)
:break
echo Using Git at: %GIT%
echo.

if not exist repo-libs.txt (
    echo repo-libs.txt not found!
    exit /b 1
)

for /f "tokens=1,2" %%A in (repo-libs.txt) do (
    set "repo=%%A"
    set "path=%%B"

    echo.
    echo ============================================
    echo Removing: !path! (repo: !repo!)
    echo ============================================

    if exist "!path!" (
        rem Deinit submodule trước khi xóa
        git submodule deinit -f "!path!" >nul 2>&1

        rem Xóa index của submodule
        git rm -rf --cached "!path!" >nul 2>&1

        rem Xóa folder vật lý
        rmdir /s /q "!path!"
        echo Deleted folder !path!
    ) else (
        echo Skipped: !path! not found
    )
)

echo.
echo Done removing all repos listed in repo-libs.txt
pause
