        ---
        name: h5-game
        description: >-
          H5 game skill for Phaser-first projects, supporting both 2D and 3D via dedicated subskills.
        ---

        # H5 Game Skill

- Prefer Phaser 3 for 2D H5
- Use 3D only when the task truly needs it
- Do not break game loop
- Avoid heavy work inside update()
- Avoid per-frame allocations
- Keep mobile-first rendering
- Keep logic deterministic when possible

If the task is 2D, open h5-game-2d.
If the task is 3D, open h5-game-3d.

