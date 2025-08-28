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

REM Đọc từng dòng trong repo-libs.txt
for /f "tokens=1,2" %%a in (repo-libs.txt) do (
    echo Adding submodule %%a at %%b
    git submodule add %%a %%b
)

echo.
echo Done adding submodules!
pause
