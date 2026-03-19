@echo off
set "src=C:\Users\Admin\.gemini\antigravity\brain\6b775959-e9ba-4f51-858f-786f5fa88f19"
set "dest=d:\error404-labs\game\Vibe\CreateSanke3D\assets"

if not exist "%dest%" mkdir "%dest%"

copy "%src%\ai_snake_1_1773927963472.png" "%dest%\ai_snake_1.png" /Y
copy "%src%\ai_snake_2_1773927984504.png" "%dest%\ai_snake_2.png" /Y
copy "%src%\ai_snake_3_1773928001975.png" "%dest%\ai_snake_3.png" /Y

echo Done.
