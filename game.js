// DINO-PAC

const TILE = 28;
const COLS = 19;
const ROWS = 21;
const H = TILE / 2;

// Fossil (fruit) spawn position — open cell in all 3 mazes
const FRUIT_COL = 9;
const FRUIT_ROW = 15;

// 1=wall, 0=dot, 2=power egg, 3=empty, 4=gate
// Ghost house rows 6-12 are IDENTICAL across all mazes.
// Row 4 and Row 13 are always fully open (connectivity anchors).
// Row 18 is always fully open (player spawn).
// Corridors run along col 4 and col 14 through the ghost house.

const GHOST_HOUSE_ROWS = [
  [1,1,1,1,0,1,1,3,3,3,3,3,1,1,0,1,1,1,1],  // 6
  [1,1,1,1,0,1,3,1,3,3,3,1,3,1,0,1,1,1,1],  // 7
  [1,1,1,1,0,1,3,1,4,3,4,1,3,1,0,1,1,1,1],  // 8 — gates at col 8,10
  [0,0,0,0,0,3,3,1,3,3,3,1,3,3,0,0,0,0,0],  // 9 — tunnel
  [1,1,1,1,0,1,3,1,3,3,3,1,3,1,0,1,1,1,1],  // 10
  [1,1,1,1,0,1,3,3,3,3,3,3,3,1,0,1,1,1,1],  // 11
  [1,1,1,1,0,1,3,1,1,1,1,1,3,1,0,1,1,1,1],  // 12
];

// ── MAZE 1 — Simple (19×21) ──────────────────────────────────────────────
// 3 = empty traversable (no dot), 0 = dot, 2 = power egg, 1 = wall
const MAZE1 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],  // 0
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],  // 1  top corridor
  [1,2,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,2,1],  // 2  power eggs
  [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],  // 3
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],  // 4  open connector
  [1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1],  // 5
  ...GHOST_HOUSE_ROWS,                          // 6-12
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],  // 13 open connector
  [1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1],  // 14
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],  // 15 fruit at col 9
  [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],  // 16
  [1,2,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,2,1],  // 17 power eggs
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],  // 18 player spawn
  [1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1],  // 19
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],  // 20
];

// ── MAZE 2 — Open Fields (19×21) ─────────────────────────────────────────
const MAZE2 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],  // 0
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],  // 1
  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],  // 2 — open pillars
  [1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1],  // 3 — wide open + power eggs
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],  // 4 — open
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1],  // 5
  ...GHOST_HOUSE_ROWS,                          // 6-12
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],  // 13
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1],  // 14
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],  // 15 fruit at col 9
  [1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1],  // 16 — wide center + power eggs
  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],  // 17 — open pillars
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],  // 18 player spawn
  [1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1],  // 19
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],  // 20
];

// ── MAZE 3 — Tight corridors (19×21) ─────────────────────────────────────
const MAZE3 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],  // 0
  [1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1],  // 1 — segmented top
  [1,0,1,0,1,0,1,0,0,1,0,0,1,0,1,0,1,0,1],  // 2
  [1,2,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,2,1],  // 3 — power eggs
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],  // 4 — open row
  [1,1,1,0,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1],  // 5 — tight chokepoints
  ...GHOST_HOUSE_ROWS,                          // 6-12
  [1,1,1,0,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1],  // 13 — tight chokepoints
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],  // 14 — open row
  [1,0,1,0,0,0,1,0,1,1,1,0,1,0,0,0,1,0,1],  // 15 fruit at col 9
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1],  // 16
  [1,2,1,0,1,0,1,0,0,1,0,0,1,0,1,0,1,2,1],  // 17 — power eggs inner
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],  // 18 player spawn
  [1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1],  // 19
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],  // 20
];

const MAZE_TEMPLATES = [MAZE1, MAZE2, MAZE3];

// Visual theme per maze — colors shift as difficulty increases
const MAZE_THEMES = [
  { bg: '#020d02', wallFill: '#071507', wallStroke: '#1faa1f', wallGlow: '#00ff41', dotColor: '#77dd77', dotGlow: '#33ff55', eggColor: '#ccffcc', eggGlow: '#00ff88' },
  { bg: '#020814', wallFill: '#070f1e', wallStroke: '#1a66cc', wallGlow: '#44aaff', dotColor: '#88bbff', dotGlow: '#66aaff', eggColor: '#aaddff', eggGlow: '#88ccff' },
  { bg: '#120402', wallFill: '#1e0a04', wallStroke: '#bb4411', wallGlow: '#ff6622', dotColor: '#ffaa66', dotGlow: '#ff8844', eggColor: '#ffddaa', eggGlow: '#ffaa22' },
];

const PTERO_CFG = [
  { color: '#ff4444', name: 'Rex',   scatterCol: 16, scatterRow: 1  },
  { color: '#ff88cc', name: 'Petra', scatterCol: 2,  scatterRow: 1  },
  { color: '#44ccff', name: 'Styg',  scatterCol: 16, scatterRow: 19 },
  { color: '#ff8800', name: 'Anky',  scatterCol: 2,  scatterRow: 19 },
];

const cx = col => col * TILE + H;
const cy = row => row * TILE + H;
const pxCol = x => Math.floor(x / TILE);
const pxRow = y => Math.floor(y / TILE);
const snapX = x => Math.round((x - H) / TILE) * TILE + H;
const snapY = y => Math.round((y - H) / TILE) * TILE + H;

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx    = this.canvas.getContext('2d');
    this.canvas.width  = COLS * TILE;
    this.canvas.height = ROWS * TILE;
    this.animFrame = null;
    this.running   = false;
    this.lastTime  = 0;
    this.queuedDir = null;

    this.audioCtx = null;
    this.dotPhase = 0;
    this.lastDotSound = 0;
    this.hiScore = parseInt(localStorage.getItem('dinopac-hi') || '0');
    this.floatingTexts = [];

    document.addEventListener('keydown', e => {
      const map = {
        ArrowUp:'u', ArrowDown:'d', ArrowLeft:'l', ArrowRight:'r',
        w:'u', s:'d', a:'l', d:'r', W:'u', S:'d', A:'l', D:'r',
      };
      if (map[e.key]) { this.queuedDir = map[e.key]; e.preventDefault(); }
    });

    // Touch / swipe controls
    let touchStartX = 0, touchStartY = 0;
    document.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) < 15 && Math.abs(dy) < 15) return;
      if (Math.abs(dx) > Math.abs(dy)) this.queuedDir = dx > 0 ? 'r' : 'l';
      else this.queuedDir = dy > 0 ? 'd' : 'u';
    }, { passive: true });

    document.getElementById('startBtn').addEventListener('click',   () => { this.initAudio(); this.startGame(); });
    document.getElementById('restartBtn').addEventListener('click', () => { this.initAudio(); this.startGame(); });
  }

  // --- Audio ---
  initAudio() {
    if (this.audioCtx) return;
    try { this.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  }

  playSound(type) {
    const ctx = this.audioCtx;
    if (!ctx) return;

    if (type === 'dot') {
      const now2 = performance.now();
      if (now2 - this.lastDotSound < 90) return;
      this.lastDotSound = now2;
    }

    const t = ctx.currentTime;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    let dur = 0.1;
    switch (type) {
      case 'dot':
        osc.type = 'square';
        osc.frequency.value = this.dotPhase ? 523 : 440;
        this.dotPhase ^= 1;
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
        dur = 0.07; break;
      case 'powerup':
        osc.type = 'sawtooth';
        [392, 494, 587, 784].forEach((f, i) => osc.frequency.setValueAtTime(f, t + i * 0.08));
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
        dur = 0.38; break;
      case 'eatghost':
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, t);
        osc.frequency.exponentialRampToValueAtTime(220, t + 0.25);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        dur = 0.25; break;
      case 'death':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(110, t + 0.9);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
        dur = 0.9; break;
      case 'fruit':
        osc.type = 'triangle';
        [880, 1047, 1319, 1568].forEach((f, i) => osc.frequency.setValueAtTime(f, t + i * 0.06));
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        dur = 0.35; break;
      case 'levelclear':
        osc.type = 'triangle';
        [523, 659, 784, 1047].forEach((f, i) => osc.frequency.setValueAtTime(f, t + i * 0.12));
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
        dur = 0.6; break;
      default:
        osc.disconnect(); return;
    }
    osc.start(t);
    osc.stop(t + dur);
  }

  startGame() {
    document.getElementById('overlay').style.display           = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    this.score = 0; this.lives = 3; this.level = 1;
    this.floatingTexts = [];
    this.particles = [];
    this.updateHUD();
    this.initLevel();
    this.running  = true;
    this.lastTime = performance.now();
    cancelAnimationFrame(this.animFrame);
    this.animFrame = requestAnimationFrame(t => this.loop(t));
  }

  initLevel() {
    // Progress through mazes: level 1→easy, 2→medium, 3+→hard (stays hard)
    const template = MAZE_TEMPLATES[Math.min(this.level - 1, MAZE_TEMPLATES.length - 1)];
    this.maze = template.map(r => [...r]);

    this.maze[18][9] = 3; // clear player spawn cell BEFORE counting dots

    this.totalDots = 0; this.dotsEaten = 0;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (this.maze[r][c] === 0 || this.maze[r][c] === 2) this.totalDots++;

    // Theme changes with maze
    this.theme = MAZE_THEMES[Math.min(this.level - 1, MAZE_THEMES.length - 1)];

    // Speed ramps up then caps
    const pSpeed = Math.min(1.4, 0.52 + (this.level - 1) * 0.08);
    const gSpeed = Math.min(0.9, 0.36 + (this.level - 1) * 0.06);
    this.player = {
      x: cx(9), y: cy(18),
      vx: 0, vy: 0, speed: pSpeed,
      powered: false, powerTimer: 0,
      mouth: 0, mouthDir: 1,
      dead: false, deathTimer: 0,
    };
    this.queuedDir = null;

    // Start with 2 ghosts, add one every 3 levels (max 4)
    const numGhosts = Math.min(2 + Math.floor((this.level - 1) / 3), PTERO_CFG.length);
    this.ghosts = PTERO_CFG.slice(0, numGhosts).map((cfg, i) => {
      const houseCol = 8 + (i % 2) * 2;
      const houseRow = 9 + Math.floor(i / 2);
      return {
        ...cfg,
        x: cx(houseCol), y: cy(houseRow),
        speed: gSpeed,
        mode: 'house',
        houseCol, houseRow,
        houseWait: i * 3500,
        houseTimer: 0,
        fromCol: houseCol, fromRow: houseRow + 1,
        targetCol: houseCol, targetRow: houseRow,
        frightened: false, blink: false,
        eaten: false,
        wing: Math.random() * Math.PI * 2,
      };
    });

    // Ghost randomness: fades from 70% random on level 1 to 0% by level 11
    this.ghostRandomness = Math.max(0, 0.70 - (this.level - 1) * 0.07);

    // Ghost respawn delay: 2 min on level 1, 1 min on level 2, 30s on level 3+
    const respawnMs = [120000, 60000, 30000];
    this.ghostRespawnDelay = respawnMs[Math.min(this.level - 1, respawnMs.length - 1)];

    this.phaseTimer = 0;
    this.modePhase  = 0;
    this.phaseDurations = [7000, 20000, 7000, 20000, 5000, 20000, 5000, 1e9];
    this.eatBonus   = 200;
    this.levelDone  = false;
    this.levelDoneTimer = 0;
    this.fruit = { active: false, timer: 0, triggerIdx: 0, value: 0 };
    this.particles = [];
  }

  updateHUD() {
    document.getElementById('score').textContent         = this.score;
    document.getElementById('lives').textContent         = this.lives;
    document.getElementById('hi-score').textContent      = this.hiScore;
    document.getElementById('level-display').textContent = this.level;
  }

  loop(ts) {
    if (!this.running) return;
    const dt = Math.min(ts - this.lastTime, 50);
    this.lastTime = ts;
    this.update(dt);
    this.draw();
    this.animFrame = requestAnimationFrame(t => this.loop(t));
  }

  // --- Maze helpers ---
  cell(col, row) {
    if (row < 0 || row >= ROWS) return 1;
    col = ((col % COLS) + COLS) % COLS;
    return this.maze[row][col];
  }
  setCell(col, row, v) {
    if (row < 0 || row >= ROWS) return;
    col = ((col % COLS) + COLS) % COLS;
    this.maze[row][col] = v;
  }

  blocked(x, y, vx, vy, r, ghost) {
    const nx = x + vx, ny = y + vy;
    for (const [ox, oy] of [[-r, -r], [-r, r], [r, -r], [r, r]]) {
      const t = this.cell(pxCol(nx + ox), pxRow(ny + oy));
      if (t === 1) return true;
      if (t === 4 && !ghost) return true;
    }
    return false;
  }

  // --- Update ---
  update(dt) {
    const p = this.player;

    if (this.levelDone) {
      this.levelDoneTimer -= dt;
      if (this.levelDoneTimer <= 0) { this.level++; this.initLevel(); }
      return;
    }

    if (p.dead) {
      p.deathTimer += dt;
      if (p.deathTimer > 1800) {
        this.lives--;
        this.updateHUD();
        if (this.lives <= 0) { this.gameOver(); return; }
        this.resetPositions();
      }
      return;
    }

    // Chase/scatter phase
    this.phaseTimer += dt;
    while (this.phaseTimer >= this.phaseDurations[this.modePhase]) {
      this.phaseTimer -= this.phaseDurations[this.modePhase];
      this.modePhase++;
    }
    const chasing = this.modePhase % 2 === 1;

    // Power timer
    if (p.powered) {
      p.powerTimer -= dt;
      if (p.powerTimer <= 0) {
        p.powered = false;
        this.ghosts.forEach(g => { g.frightened = false; g.blink = false; });
      } else if (p.powerTimer < 2000) {
        const b = Math.floor(p.powerTimer / 300) % 2 === 0;
        this.ghosts.forEach(g => { if (g.frightened) g.blink = b; });
      }
    }

    this.movePlayer(dt);
    this.eatDot();
    this.updateFruit(dt);

    if (this.dotsEaten >= this.totalDots) {
      if (!this.levelDone) this.playSound('levelclear');
      this.levelDone = true; this.levelDoneTimer = 2500; return;
    }

    this.ghosts.forEach(g => this.moveGhost(g, dt, chasing));
    this.checkCollisions();

    this.floatingTexts = this.floatingTexts.filter(ft => {
      ft.timer -= dt;
      ft.y -= dt * 0.025;
      return ft.timer > 0;
    });

    this.particles = this.particles.filter(pt => {
      pt.life -= dt;
      pt.x += pt.vx;
      pt.y += pt.vy;
      return pt.life > 0;
    });
  }

  // --- Fossil (fruit) ---
  updateFruit(dt) {
    const triggers = [70, 140];
    if (!this.fruit.active) {
      if (this.fruit.triggerIdx < triggers.length &&
          this.dotsEaten >= triggers[this.fruit.triggerIdx]) {
        this.fruit.active = true;
        this.fruit.timer  = 10000;
        this.fruit.value  = 100 * this.level;
        this.fruit.triggerIdx++;
      }
    } else {
      this.fruit.timer -= dt;
      if (this.fruit.timer <= 0) { this.fruit.active = false; return; }
      const p  = this.player;
      const fx = cx(FRUIT_COL), fy = cy(FRUIT_ROW);
      const d2 = (p.x - fx) ** 2 + (p.y - fy) ** 2;
      if (d2 < (TILE * 0.85) ** 2) {
        const v = this.fruit.value;
        this.score += v;
        this.fruit.active = false;
        this.updateHUD();
        this.playSound('fruit');
        this.floatingTexts.push({ x: fx, y: fy - 10, text: `+${v}`, timer: 1500, color: '#ffdd00' });
      }
    }
  }

  // --- Player movement ---
  movePlayer(dt) {
    const p = this.player;
    const spd = p.speed;
    const R = H - 4;
    const DVX = { u: 0, d: 0, l: -spd, r: spd };
    const DVY = { u: -spd, d: spd, l: 0, r: 0 };

    if (this.queuedDir) {
      const nvx = DVX[this.queuedDir], nvy = DVY[this.queuedDir];
      const tx = nvx !== 0 ? p.x : snapX(p.x);
      const ty = nvy !== 0 ? p.y : snapY(p.y);
      const offPerp = nvx !== 0 ? Math.abs(p.y - snapY(p.y)) : Math.abs(p.x - snapX(p.x));
      if (offPerp <= spd + 1 && !this.blocked(tx, ty, nvx, nvy, R, false)) {
        p.x = tx; p.y = ty;
        p.vx = nvx; p.vy = nvy;
        this.queuedDir = null;
      }
    }

    if (!this.blocked(p.x, p.y, p.vx, p.vy, R, false)) {
      p.x += p.vx; p.y += p.vy;
    } else {
      p.x = snapX(p.x); p.y = snapY(p.y);
      p.vx = 0; p.vy = 0;
    }

    if (p.x < 0)           p.x = COLS * TILE - 1;
    if (p.x >= COLS * TILE) p.x = 1;

    p.mouth += p.mouthDir * 3;
    if (p.mouth > 35) p.mouthDir = -1;
    if (p.mouth <  1) p.mouthDir =  1;
  }

  eatDot() {
    const p = this.player;
    const col = pxCol(p.x), row = pxRow(p.y);
    const v = this.cell(col, row);
    if (v === 0) {
      this.maze[row][col] = 3;
      this.score += 10; this.dotsEaten++; this.updateHUD();
      this.playSound('dot');
      this.spawnParticles(cx(col), cy(row), 4);
    } else if (v === 2) {
      this.maze[row][col] = 3;
      this.score += 50; this.dotsEaten++; this.updateHUD();
      this.player.powered = true; this.player.powerTimer = 18000;
      this.eatBonus = 200;
      this.ghosts.forEach(g => {
        if (!g.eaten && g.mode !== 'house' && g.mode !== 'exit') {
          g.frightened = true; g.blink = false;
        }
      });
      this.playSound('powerup');
    }
  }

  // --- Ghost movement ---
  moveGhost(g, dt, chasing) {
    if (g.eaten) return;
    g.wing += dt * 0.005;

    if (g.mode === 'house') {
      g.houseTimer += dt;
      g.y = cy(g.houseRow) + Math.sin(g.houseTimer * 0.003) * 4;
      if (g.houseTimer >= g.houseWait) {
        g.mode = 'exit';
        g.x = cx(g.houseCol); g.y = cy(g.houseRow);
      }
      return;
    }

    if (g.mode === 'exit') {
      const tx = cx(9), ty = cy(6);
      const dx = tx - g.x, dy = ty - g.y;
      const dist = Math.hypot(dx, dy);
      const spd  = g.speed * 1.5;
      if (dist <= spd) {
        g.x = tx; g.y = ty;
        g.fromCol = 9; g.fromRow = 7;
        this.pickNextCell(g, chasing);
        g.mode = 'normal';
      } else {
        g.x += (dx / dist) * spd;
        g.y += (dy / dist) * spd;
      }
      return;
    }

    const spd = g.frightened ? g.speed * 0.6 : g.speed;
    const tx = cx(g.targetCol), ty = cy(g.targetRow);
    const dx = tx - g.x, dy = ty - g.y;
    const dist = Math.hypot(dx, dy);

    if (dist <= spd) {
      g.x = tx; g.y = ty;
      g.fromCol = pxCol(tx); g.fromRow = pxRow(ty);
      if (g.fromCol < 0)    g.fromCol = COLS - 1;
      if (g.fromCol >= COLS) g.fromCol = 0;
      this.pickNextCell(g, chasing);
    } else {
      g.x += (dx / dist) * spd;
      g.y += (dy / dist) * spd;
    }

    if (g.x < 0)           g.x = COLS * TILE - 1;
    if (g.x >= COLS * TILE) g.x = 1;
  }

  pickNextCell(g, chasing) {
    const curCol = pxCol(g.x);
    const curRow = pxRow(g.y);
    const revDC = curCol - g.fromCol;
    const revDR = curRow - g.fromRow;

    const p = this.player;
    let tgx, tgy;
    if (g.frightened) {
      tgx = Math.random() * COLS * TILE;
      tgy = Math.random() * ROWS * TILE;
    } else if (!chasing) {
      tgx = cx(g.scatterCol); tgy = cy(g.scatterRow);
    } else {
      const pdx = Math.sign(p.vx), pdy = Math.sign(p.vy);
      switch (g.name) {
        case 'Rex':
          tgx = p.x; tgy = p.y; break;
        case 'Petra':
          tgx = p.x + pdx * TILE * 4; tgy = p.y + pdy * TILE * 4; break;
        case 'Styg': {
          const rex = this.ghosts[0];
          const ax = p.x + pdx * TILE * 2, ay = p.y + pdy * TILE * 2;
          tgx = ax * 2 - rex.x; tgy = ay * 2 - rex.y; break;
        }
        case 'Anky': {
          const d2 = (g.x - p.x) ** 2 + (g.y - p.y) ** 2;
          tgx = d2 > (TILE * 8) ** 2 ? p.x : cx(g.scatterCol);
          tgy = d2 > (TILE * 8) ** 2 ? p.y : cy(g.scatterRow);
          break;
        }
        default: tgx = p.x; tgy = p.y;
      }
    }

    const dirs = [[0,-1],[1,0],[0,1],[-1,0]];
    let bestDist = Infinity, bestDC = 0, bestDR = 0, found = false;
    const goRandom = g.frightened || Math.random() < this.ghostRandomness;
    const order = goRandom ? dirs.sort(() => Math.random() - 0.5) : dirs;

    for (const [dc, dr] of order) {
      if (dc === revDC && dr === revDR) continue;
      const nc = curCol + dc, nr = curRow + dr;
      const t = this.cell(nc, nr);
      if (t === 1 || t === 4) continue;
      const ex = cx(nc), ey = cy(nr);
      const dist = (ex - tgx) ** 2 + (ey - tgy) ** 2;
      if (!found || dist < bestDist) {
        bestDist = dist; bestDC = dc; bestDR = dr; found = true;
      }
    }

    if (!found) { bestDC = -revDC; bestDR = -revDR; }

    g.targetCol = curCol + bestDC;
    g.targetRow = curRow + bestDR;
    if (g.targetCol < 0)    g.targetCol = COLS - 1;
    if (g.targetCol >= COLS) g.targetCol = 0;
  }

  checkCollisions() {
    const p = this.player;
    for (const g of this.ghosts) {
      if (g.eaten || g.mode === 'house' || g.mode === 'exit') continue;
      const d2 = (p.x - g.x) ** 2 + (p.y - g.y) ** 2;
      if (d2 < (TILE * 0.75) ** 2) {
        if (g.frightened) {
          g.frightened = false; g.blink = false; g.eaten = true;
          this.score += this.eatBonus;
          this.floatingTexts.push({ x: g.x, y: g.y - 8, text: `+${this.eatBonus}`, timer: 1200, color: '#00ffff' });
          this.eatBonus = Math.min(this.eatBonus * 2, 1600);
          this.updateHUD();
          this.playSound('eatghost');
          setTimeout(() => {
            g.x = cx(g.houseCol); g.y = cy(g.houseRow);
            g.fromCol = g.houseCol; g.fromRow = g.houseRow + 1;
            g.targetCol = g.houseCol; g.targetRow = g.houseRow;
            g.mode = 'house'; g.houseTimer = 0; g.houseWait = 2000;
            g.eaten = false;
          }, this.ghostRespawnDelay);
        } else {
          p.dead = true; p.deathTimer = 0;
          this.ghosts.forEach(gg => { gg.frightened = false; gg.blink = false; });
          this.playSound('death');
        }
      }
    }
  }

  resetPositions() {
    const p = this.player;
    p.x = cx(9); p.y = cy(18);
    p.vx = 0; p.vy = 0;
    p.dead = false; p.deathTimer = 0;
    p.powered = false; p.powerTimer = 0;
    this.queuedDir = null;
    this.ghosts.forEach((g, i) => {
      g.x = cx(g.houseCol); g.y = cy(g.houseRow);
      g.fromCol = g.houseCol; g.fromRow = g.houseRow + 1;
      g.targetCol = g.houseCol; g.targetRow = g.houseRow;
      g.mode = 'house'; g.houseTimer = 0; g.houseWait = i * 2500;
      g.frightened = false; g.blink = false; g.eaten = false;
    });
  }

  gameOver() {
    this.running = false;
    const isNew = this.score > this.hiScore;
    if (isNew) {
      this.hiScore = this.score;
      localStorage.setItem('dinopac-hi', this.hiScore);
    }
    document.getElementById('end-title').textContent   = isNew ? 'NEW HI SCORE!' : 'GAME OVER';
    document.getElementById('final-score').textContent =
      `Score: ${this.score}\nHi: ${this.hiScore}`;
    document.getElementById('game-over-overlay').style.display = 'flex';
  }

  // =========== DRAW ===========

  draw() {
    const ctx = this.ctx;
    const cw = this.canvas.width, ch = this.canvas.height;

    // Themed background
    ctx.fillStyle = this.theme.bg;
    ctx.fillRect(0, 0, cw, ch);

    // Faint cell-dot grid texture
    ctx.fillStyle = 'rgba(255,255,255,0.018)';
    for (let x = H; x < cw; x += TILE)
      for (let y = H; y < ch; y += TILE) {
        ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
      }

    // Vignette
    const vg = ctx.createRadialGradient(cw/2, ch/2, cw*0.15, cw/2, ch/2, cw*0.78);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(0,0,0,0.5)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, cw, ch);

    this.drawMaze();
    this.drawDots();
    this.drawParticles();
    this.drawFruit();
    this.drawPlayer();
    this.ghosts.forEach(g => this.drawGhost(g));
    this.drawFloatingTexts();
    this.drawProgressBar();
    if (this.levelDone) this.drawBanner(`LEVEL ${this.level} CLEAR!`);
  }

  drawMaze() {
    const ctx = this.ctx;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const v = this.maze[r][c];
        if (v === 1) {
          ctx.fillStyle = this.theme.wallFill;
          ctx.fillRect(c * TILE, r * TILE, TILE, TILE);
          this.drawWallEdges(ctx, c, r);
        } else if (v === 4) {
          ctx.fillStyle = '#ff88ff';
          ctx.fillRect(c * TILE + 3, r * TILE + H - 2, TILE - 6, 4);
        }
      }
    }
  }

  drawWallEdges(ctx, c, r) {
    const x = c * TILE, y = r * TILE, m = 3;
    const adj = (dc, dr) => {
      const nc = c + dc, nr = r + dr;
      if (nc < 0 || nr < 0 || nc >= COLS || nr >= ROWS) return true;
      return this.maze[nr][nc] === 1;
    };
    ctx.save();
    ctx.strokeStyle = this.theme.wallStroke;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    if (!adj( 0,-1)) { ctx.moveTo(x+m, y+m);      ctx.lineTo(x+TILE-m, y+m);      }
    if (!adj( 0, 1)) { ctx.moveTo(x+m, y+TILE-m);  ctx.lineTo(x+TILE-m, y+TILE-m); }
    if (!adj(-1, 0)) { ctx.moveTo(x+m, y+m);       ctx.lineTo(x+m, y+TILE-m);      }
    if (!adj( 1, 0)) { ctx.moveTo(x+TILE-m, y+m);  ctx.lineTo(x+TILE-m, y+TILE-m); }
    ctx.stroke();
    ctx.restore();
  }

  drawDots() {
    const ctx = this.ctx;
    const t = Date.now();
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const v = this.maze[r][c];
        if (v === 0) {
          ctx.beginPath();
          ctx.arc(cx(c), cy(r), 2.5, 0, Math.PI * 2);
          ctx.fillStyle = this.theme.dotColor;
          ctx.fill();
        } else if (v === 2) {
          const pulse = 4 + Math.sin(t / 200) * 1.5;
          ctx.beginPath();
          ctx.ellipse(cx(c), cy(r), pulse * 0.75, pulse, 0, 0, Math.PI * 2);
          ctx.fillStyle = this.theme.eggColor;
          ctx.fill();
        }
      }
    }
  }

  spawnParticles(x, y, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.8;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 250 + Math.random() * 200,
        maxLife: 450,
        size: 1 + Math.random() * 1.5,
      });
    }
  }

  drawParticles() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.theme.dotGlow;
    for (const pt of this.particles) {
      ctx.globalAlpha = pt.life / pt.maxLife;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawProgressBar() {
    if (!this.totalDots) return;
    const ctx = this.ctx;
    const w = this.canvas.width, y = this.canvas.height - 5;
    const pct = this.dotsEaten / this.totalDots;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, y, w, 5);
    const grd = ctx.createLinearGradient(0, 0, w * pct, 0);
    grd.addColorStop(0, this.theme.wallGlow);
    grd.addColorStop(1, this.theme.dotGlow);
    ctx.fillStyle = grd;
    ctx.fillRect(0, y, w * pct, 5);
  }

  drawFruit() {
    if (!this.fruit.active) return;
    const ctx = this.ctx;
    const fx = cx(FRUIT_COL), fy = cy(FRUIT_ROW);
    const pulse = 1 + Math.sin(Date.now() / 220) * 0.08;
    ctx.save();
    ctx.translate(fx, fy);
    ctx.scale(pulse, pulse);
    ctx.font = `${TILE * 0.9}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🦴', 0, 2);
    ctx.restore();

    const pct = this.fruit.timer / 10000;
    ctx.fillStyle = 'rgba(255,220,0,0.7)';
    ctx.fillRect(fx - 12, fy + 14, 24 * pct, 3);
  }

  drawPlayer() {
    const p = this.player;
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);

    let angle = 0;
    if      (p.vx > 0) angle = 0;
    else if (p.vx < 0) angle = Math.PI;
    else if (p.vy < 0) angle = -Math.PI / 2;
    else if (p.vy > 0) angle =  Math.PI / 2;
    ctx.rotate(angle);

    if (p.dead) {
      const t = Math.min(p.deathTimer / 1200, 1);
      ctx.scale(1 - t * 0.95, 1 - t * 0.95);
      ctx.globalAlpha = 1 - t;
    }

    const r = H - 1;
    const mf = p.mouth / 35; // 0→1 mouth openness
    const base  = p.powered ? '#33ff99' : '#44bb44';
    const dark  = p.powered ? '#00aa55' : '#2a7a2a';

    // Tail
    ctx.beginPath();
    ctx.moveTo(-r*0.35, r*0.08);
    ctx.quadraticCurveTo(-r*1.05, r*0.45, -r*1.25, r*0.05);
    ctx.quadraticCurveTo(-r*1.0, -r*0.15, -r*0.35, -r*0.08);
    ctx.closePath();
    ctx.fillStyle = dark;
    ctx.fill();

    // Body
    const gr = ctx.createRadialGradient(-r*0.15, -r*0.2, 1, 0, 0, r*0.75);
    gr.addColorStop(0, lighten(base, 40));
    gr.addColorStop(1, base);
    ctx.beginPath();
    ctx.ellipse(-r*0.05, r*0.06, r*0.58, r*0.48, 0, 0, Math.PI*2);
    ctx.fillStyle = gr;
    ctx.fill();

    // Tiny stub arm
    ctx.beginPath();
    ctx.moveTo(r*0.18, r*0.02);
    ctx.lineTo(r*0.42, r*0.26);
    ctx.lineTo(r*0.28, r*0.38);
    ctx.lineTo(r*0.1,  r*0.2);
    ctx.closePath();
    ctx.fillStyle = dark;
    ctx.fill();

    // Upper jaw
    const jawUp = mf * r * 0.28;
    ctx.beginPath();
    ctx.moveTo(r*0.12, -r*0.06);
    ctx.lineTo(r*0.52, -r*0.22 - jawUp);
    ctx.lineTo(r*1.05, -r*0.06 - jawUp);
    ctx.lineTo(r*0.95,  r*0.04);
    ctx.lineTo(r*0.12,  r*0.02);
    ctx.closePath();
    ctx.fillStyle = base;
    ctx.fill();

    // Lower jaw
    const jawDn = mf * r * 0.18;
    ctx.beginPath();
    ctx.moveTo(r*0.12,  r*0.06);
    ctx.lineTo(r*1.0,   r*0.06 + jawDn);
    ctx.lineTo(r*0.88,  r*0.2  + jawDn);
    ctx.lineTo(r*0.12,  r*0.14);
    ctx.closePath();
    ctx.fillStyle = base;
    ctx.fill();

    // Mouth interior + teeth when open
    if (mf > 0.08) {
      ctx.beginPath();
      ctx.moveTo(r*0.18,  r*0.01);
      ctx.lineTo(r*0.96, -jawUp * 0.5);
      ctx.lineTo(r*0.96,  r*0.05 + jawDn * 0.5);
      ctx.lineTo(r*0.18,  r*0.07);
      ctx.fillStyle = '#1a0000';
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 3; i++) {
        const tx = r * (0.32 + i * 0.2);
        ctx.beginPath(); // upper tooth (points down)
        ctx.moveTo(tx, -jawUp * 0.35);
        ctx.lineTo(tx + r*0.07, r*0.06);
        ctx.lineTo(tx + r*0.14, -jawUp * 0.35);
        ctx.fill();
        ctx.beginPath(); // lower tooth (points up)
        ctx.moveTo(tx, r*0.05 + jawDn * 0.35);
        ctx.lineTo(tx + r*0.07, r*0.0);
        ctx.lineTo(tx + r*0.14, r*0.05 + jawDn * 0.35);
        ctx.fill();
      }
    }

    // Eye
    ctx.beginPath();
    ctx.arc(r*0.46, -r*0.34, r*0.15, 0, Math.PI*2);
    ctx.fillStyle = '#ffee00';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(r*0.49, -r*0.34, r*0.09, 0, Math.PI*2);
    ctx.fillStyle = '#111';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(r*0.45, -r*0.37, r*0.04, 0, Math.PI*2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    // Power aura
    if (p.powered) {
      ctx.strokeStyle = `rgba(0,255,136,${0.6 + Math.sin(Date.now()/100)*0.4})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(-r*0.05, r*0.06, r*0.65, r*0.55, 0, 0, Math.PI*2);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawGhost(g) {
    if (g.eaten) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(g.x, g.y);
    if (g.mode === 'house') ctx.globalAlpha = 0.75;

    let body = g.color, wing = g.color;
    if (g.frightened) {
      body = g.blink ? '#eee' : '#3355ff';
      wing = g.blink ? '#ccc' : '#2244cc';
    }

    const r = H - 1;
    const flap = Math.sin(g.wing) * 5;

    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(side * r*0.25, 0);
      ctx.quadraticCurveTo(side * r*1.25, -r*0.4 + flap, side * r*1.45, r*0.3);
      ctx.quadraticCurveTo(side * r*0.85, r*0.5, side * r*0.2, r*0.25);
      ctx.closePath();
      ctx.fillStyle = wing; ctx.fill();
    }

    const bg = ctx.createRadialGradient(-r*0.1, -r*0.15, r*0.05, 0, 0, r*0.6);
    bg.addColorStop(0, lighten(body, 55)); bg.addColorStop(1, body);
    ctx.beginPath();
    ctx.ellipse(0, r*0.05, r*0.42, r*0.58, 0, 0, Math.PI*2);
    ctx.fillStyle = bg; ctx.fill();

    ctx.beginPath();
    ctx.ellipse(0, -r*0.48, r*0.28, r*0.28, 0, 0, Math.PI*2);
    ctx.fillStyle = body; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-r*0.14, -r*0.62); ctx.lineTo(0, -r*0.98); ctx.lineTo(r*0.14, -r*0.62);
    ctx.fillStyle = '#ffcc44'; ctx.fill();

    if (!g.frightened) {
      for (const [ex, ey] of [[-r*0.1, -r*0.54], [r*0.1, -r*0.54]]) {
        ctx.beginPath(); ctx.arc(ex, ey, r*0.11, 0, Math.PI*2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(ex + r*0.03, ey, r*0.065, 0, Math.PI*2);
        ctx.fillStyle = '#111'; ctx.fill();
      }
    } else {
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
      for (const ex of [-r*0.1, r*0.1]) {
        const ey = -r*0.54, d = r*0.07;
        ctx.beginPath();
        ctx.moveTo(ex-d, ey-d); ctx.lineTo(ex+d, ey+d);
        ctx.moveTo(ex+d, ey-d); ctx.lineTo(ex-d, ey+d);
        ctx.stroke();
      }
    }

    ctx.beginPath();
    ctx.moveTo(-r*0.18, r*0.62);
    ctx.quadraticCurveTo(-r*0.4, r*1.0, -r*0.22, r*1.2);
    ctx.quadraticCurveTo(0, r*1.32, r*0.22, r*1.2);
    ctx.quadraticCurveTo(r*0.4, r*1.0, r*0.18, r*0.62);
    ctx.fillStyle = body; ctx.fill();

    ctx.restore();
  }

  drawFloatingTexts() {
    const ctx = this.ctx;
    for (const ft of this.floatingTexts) {
      const alpha = Math.min(1, ft.timer / 300);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = ft.color || '#ffffff';
      ctx.font = `bold 13px 'Courier New'`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }
  }

  drawBanner(text) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, this.canvas.height/2 - 28, this.canvas.width, 56);
    ctx.fillStyle = '#7fff00';
    ctx.font = `bold ${TILE * 1.2}px 'Courier New'`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, this.canvas.width/2, this.canvas.height/2);
    ctx.restore();
  }
}

function lighten(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${Math.min(255,(n>>16)+amt)},${Math.min(255,((n>>8)&0xff)+amt)},${Math.min(255,(n&0xff)+amt)})`;
}

const game = new Game();
