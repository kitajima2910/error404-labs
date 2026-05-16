
const fs = require('fs');
const path = require('path');

const roadmapRows = [
    [
        { genre: 'Runner', games: ['AI Velocity Sprint', 'Neural Token Dash', 'Cyber Cloud Leap'] },
        { genre: 'Puzzle', games: ['Quantum Block Shift', 'Meta Crate Logic', 'Web3 Key Protocol'] },
        { genre: 'Arcade', games: ['Spatial Dodge Zone', 'AI Spike Frenzy', 'Cyber Pipe Runner'] },
        { genre: 'Simulation', games: ['Meta Farm Builder', 'AI Pet Simulator', 'Web3 Market Boss'] }
    ],
    [
        { genre: 'Arcade', games: ['AI Flappy Neural'] },
        { genre: 'Arcade', games: ['AI Velocity Sprint'] },
        { genre: 'Arcade', games: ['Cyber Geo Dash'] },
        { genre: 'Arcade', games: ['Meta Helix Drop'] }
    ],
    [
        { genre: 'Shooter', games: ['AI Slime Blaster', 'Cyber Wave Shield', 'Web3 Base Guard'] },
        { genre: 'Arcade', games: ['Spatial Pop Blast', 'AI Duck Hunter', 'Cyber UFO Zap'] },
        { genre: 'Shooter', games: ['Meta Arsenal Run', 'AI Boss Rush', 'Web3 Squad Strike'] },
        { genre: 'Action', games: ['Cyber Slash Dash', 'AI Shuriken Storm', 'Meta Boxing Ring'] }
    ],
    [
        { genre: 'Puzzle', games: ['Neural Mosaic Quest', 'Cyber Maze Core', 'Web3 Switch Lab'] },
        { genre: 'Logic', games: ['AI Sort Factory', 'Cyber Balance AI', 'Meta Power Grid'] },
        { genre: 'Puzzle', games: ['Spatial Crate Push', 'AI Pin Dungeon', 'Cyber Light Tower'] },
        { genre: 'Arcade', games: ['Meta Hoop Shot', 'AI Trick Toss', 'Cyber Pinball Mini'] }
    ],
    [
        { genre: 'Action', games: ['AI Combo Rookie', 'Cyber Combo Forge', 'Web3 Counter Strike'] },
        { genre: 'Boss Fight', games: ['AI Slime King', 'Cyber Robot Raid', 'Meta Dragon Trial'] },
        { genre: 'Action', games: ['AI Jump Strike', 'Cyber Blade Dash', 'Web3 Cyclone Slash'] },
        { genre: 'Arcade', games: ['AI Survival Ring', 'Cyber Battle Dome', 'Meta Trial Gate'] }
    ],
    [
        { genre: 'Rhythm', games: ['AI Beat Reactor', 'Cyber Dance Sync', 'Web3 Bass Drop'] },
        { genre: 'Music', games: ['AI Piano Rush', 'Cyber Note Pop', 'Meta Synth Jam'] },
        { genre: 'Rhythm', games: ['AI Beat Dodge', 'Cyber Timing Dash', 'Web3 Combo Groove'] },
        { genre: 'Arcade', games: ['AI Dance Floor', 'Cyber Disco Orb', 'Meta Melody Ride'] }
    ],
    [
        { genre: 'Collect', games: ['AI Coin Magnet', 'Cyber Diamond Mine', 'Web3 Starfall'] },
        { genre: 'Adventure', games: ['AI Crystal Cave', 'Cyber Lost Key', 'Meta Treasure Run'] },
        { genre: 'Collect', games: ['AI Fruit Frenzy', 'Cyber Relic Run', 'Web3 Parcel Sprint'] },
        { genre: 'Simulation', games: ['AI Farm Loop', 'Cyber Fishing Dock', 'Meta Chef Rush'] }
    ],
    [
        { genre: 'Effect', games: ['AI Blast Sandbox', 'Cyber Comet Trail', 'Web3 Frost Burst'] },
        { genre: 'Skill', games: ['AI Flame Forge', 'Cyber Ice Weaver', 'Meta Thunder Skill'] },
        { genre: 'Effect', games: ['AI Heal Pulse', 'Cyber Spark Lab', 'Web3 FX Trial'] },
        { genre: 'Action', games: ['AI Dash Runner', 'Cyber Leap Quest', 'Meta Blast Hero'] }
    ],
    [
        { genre: 'Upgrade', games: ['AI Core Upgrade', 'Cyber Damage Forge', 'Web3 Skill Tower'] },
        { genre: 'Shop', games: ['AI Weapon Shop', 'Cyber Gear Lab', 'Meta Pet Shop'] },
        { genre: 'Progression', games: ['AI XP Climb', 'Cyber Skill Tree', 'Web3 Rank Reactor'] },
        { genre: 'Adventure', games: ['AI Quest Signal', 'Cyber Quest Harbor', 'Meta Daily Quest'] }
    ],
    [
        { genre: 'AI Enemy', games: ['AI Patrol Bot', 'Cyber Drone Maze', 'Web3 Sniper Bot'] },
        { genre: 'AI Pattern', games: ['AI Spiral Duel', 'Cyber Pattern Core', 'Meta Pattern Arena'] },
        { genre: 'Boss AI', games: ['AI Boss Protocol', 'Cyber Phase Titan', 'Web3 Overlord'] },
        { genre: 'Simulation', games: ['AI NPC Village', 'Cyber Squad Tactics', 'Meta World Engine'] }
    ],
    [
        { genre: 'Free Build', games: ['AI Platformer Lab', 'Cyber Puzzle Forge', 'Web3 Shooter Arena'] },
        { genre: 'Theme Pack', games: ['AI Forest Run', 'Cyber Ocean Quest', 'Meta Space Colony'] },
        { genre: 'Game Idea', games: ['AI Game Spark', 'Cyber Game Seed', 'Web3 Creator Mode'] },
        { genre: 'Mechanic Mix', games: ['AI Mechanic Fusion', 'Cyber System Remix', 'Meta Combo Exp'] }
    ],
    [
        { genre: 'UI & Menu', games: ['AI Menu Command', 'Cyber Level Nexus', 'Web3 Shop UI'] },
        { genre: 'Polish', games: ['AI Sound Studio', 'Cyber Juice FX', 'Meta Final Touch'] },
        { genre: 'Test & Fix', games: ['AI QA Arena', 'Cyber Patch Lab', 'Web3 Bug Hunt'] },
        { genre: 'Showcase', games: ['AI Trailer Cut', 'Cyber Poster Maker', 'Meta Demo Day'] }
    ]
];

const workspaceRoot = 'd:/error404-labs/Projects/error404-labs';
const promptDir = path.join(workspaceRoot, 'src/data/game-roadmap');
const sqlFile = path.join(workspaceRoot, '.gemini/antigravity/brain/d7096d4c-0262-46cc-abc7-f60d6052fd2e/scratch/migrate_roadmap.sql');

let sql = '';

roadmapRows.forEach((weeks, mIdx) => {
    const monthNo = mIdx + 1;
    weeks.forEach((week, wIdx) => {
        const weekNo = wIdx + 1;
        week.games.forEach((game) => {
            let promptContent = '';
            const filePath = path.join(promptDir, `${game}.txt`);
            if (fs.existsSync(filePath)) {
                promptContent = fs.readFileSync(filePath, 'utf8').replace(/'/g, "''");
            }
            sql += `INSERT INTO error404labs.roadmap_games (name, genre, month_no, week_no, prompt_content) VALUES ('${game.replace(/'/g, "''")}', '${week.genre.replace(/'/g, "''")}', ${monthNo}, ${weekNo}, '${promptContent}') ON CONFLICT (name) DO UPDATE SET genre = EXCLUDED.genre, month_no = EXCLUDED.month_no, week_no = EXCLUDED.week_no, prompt_content = EXCLUDED.prompt_content;\n`;
        });
    });
});

fs.writeFileSync(sqlFile, sql);
console.log('SQL migration generated at ' + sqlFile);
