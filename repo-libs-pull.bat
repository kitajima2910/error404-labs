@echo off
setlocal enabledelayedexpansion

for /f "delims=" %%i in ('where git') do set "GIT=%%i" & goto :found
:found
echo Using Git at: %GIT%

"%GIT%" submodule sync --recursive
"%GIT%" submodule update --init --recursive

for /f "usebackq tokens=1* delims= " %%a in ("repo-libs.txt") do (
    set "url=%%a"
    set "path=%%b"

    echo -------------------------------
    echo Pulling latest from !url! in !path!

    if exist "!path!" (
        pushd "!path!"
        "%GIT%" pull
        popd
    ) else (
        echo Path !path! not found!
    )
)

echo -------------------------------
echo Done pulling submodules!
pause
