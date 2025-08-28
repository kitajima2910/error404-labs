
@echo off
setlocal enabledelayedexpansion

REM Đọc từng dòng trong repo-libs.txt
for /f "tokens=1,2" %%a in (repo-libs.txt) do (
    echo Adding submodule %%a at %%b
    git submodule add %%a %%b
)

echo Done adding submodules!
pause