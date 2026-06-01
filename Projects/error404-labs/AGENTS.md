# AGENTS

This is the only entry file you need.

## Startup
Always do this first:
1. Read .aiignore
2. Read STATUS.md
3. Read PROJECT.md
4. Read only the source files relevant to the current task
5. Follow the rules below
6. Do only the requested task
7. Update STATUS.md after finishing
8. Update PROJECT.md only if the project reality changed
9. Explain the result in Vietnamese

## Core rules
- Make the smallest safe patch
- Do not redesign unless asked
- Do not rename variables/functions/classes/files unless needed
- Do not touch unrelated code
- Do not load big files, logs, build output, or generated files unless necessary
- Keep context and token usage low
- Prefer simple, stable, maintainable changes

## PROJECT.md maintenance
PROJECT.md is long-term memory, not a changelog.

Update PROJECT.md only when one of these changes:
- tech stack changes
- architecture changes
- major modules are added or removed
- important decisions change
- current systems change

Keep PROJECT.md short and current.
Remove obsolete information.
Keep it under 150 lines when possible.

## STATUS.md maintenance
STATUS.md is short-term memory.
Update it after every task with:
- current task
- current focus
- completed work
- modified files
- known issues
- next step

## Output format
After each task, respond in Vietnamese with:
- Đã làm gì
- File nào đã sửa
- Vì sao sửa
- Ảnh hưởng hệ thống
- Bước tiếp theo
- Commit message
