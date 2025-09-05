@echo off
setlocal enabledelayedexpansion

REM Đường dẫn tuyệt đối tới git.exe (nếu PATH không nhận)
set GIT_EXE="C:\Program Files\Git\bin\git.exe"

REM Kiểm tra git
%GIT_EXE% --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Cannot find git.exe at %GIT_EXE%
    echo Please update the path in this script or fix your system PATH.
    pause
    exit /b
)

REM Đọc từng dòng trong repo-libs.txt
for /f "tokens=1,2" %%a in (repo-libs.txt) do (
    set "url=%%a"
    set "path=%%b"

    echo.
    echo ==============================
    echo Processing submodule: !url! at !path!
    echo ==============================

    if exist "!path!\.git" (
        echo Updating existing submodule at !path! ...
        pushd "!path!" >nul
        %GIT_EXE% fetch origin
        %GIT_EXE% checkout main 2>nul || %GIT_EXE% checkout master 2>nul
        %GIT_EXE% pull
        popd >nul
    ) else (
        echo Adding submodule !url! at !path! ...
        %GIT_EXE% submodule add !url! !path!
    )
)

echo.
echo Syncing all submodules ...
%GIT_EXE% submodule init
%GIT_EXE% submodule update --remote --merge

echo.
echo Done processing submodules!
pause
