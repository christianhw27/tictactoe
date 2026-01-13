// --- CONFIGURATION & STATE ---
const CONFIG = {
    selectedSize: 3,
    winLength: 3,
    maxMoves: 3
};

const STATE = {
    board: [],
    currentPlayer: 'X',
    gameActive: false,
    xMoves: [],
    oMoves: [],
    size: 3
};

// --- DOM ELEMENTS ---
const screens = {
    menu: document.getElementById('main-menu'),
    game: document.getElementById('game-screen')
};
const boardEl = document.getElementById('board');
const levelBtns = document.querySelectorAll('.lvl-btn');
const statusEl = document.getElementById('status-display');

// --- EVENT LISTENERS ---

// 1. Level Selection
levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        levelBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update Config
        CONFIG.selectedSize = parseInt(btn.dataset.size);
        CONFIG.winLength = parseInt(btn.dataset.win);
        CONFIG.maxMoves = CONFIG.winLength; 
    });
});

// 2. Navigation
document.getElementById('btn-play').addEventListener('click', () => {
    initGame();
    switchScreen('game');
});

document.getElementById('btn-back').addEventListener('click', () => {
    switchScreen('menu');
});

document.getElementById('btn-reset').addEventListener('click', initGame);

// 3. Modal
const modal = document.getElementById('modal-howto');
document.getElementById('btn-howto').addEventListener('click', () => modal.classList.remove('hidden'));
document.getElementById('btn-close-modal').addEventListener('click', () => modal.classList.add('hidden'));

// --- CORE GAME LOGIC ---

function switchScreen(screenName) {
    if(screenName === 'game') {
        screens.menu.classList.remove('active');
        screens.menu.classList.add('hidden');
        screens.game.classList.remove('hidden');
        screens.game.classList.add('active');
    } else {
        screens.game.classList.remove('active');
        screens.game.classList.add('hidden');
        screens.menu.classList.remove('hidden');
        screens.menu.classList.add('active');
    }
}

function initGame() {
    STATE.size = CONFIG.selectedSize;
    STATE.board = Array(STATE.size * STATE.size).fill(null);
    STATE.currentPlayer = 'X';
    STATE.gameActive = true;
    STATE.xMoves = [];
    STATE.oMoves = [];

    // Update UI Info
    document.getElementById('level-display').textContent = `${STATE.size}x${STATE.size} Mode (Win ${CONFIG.winLength})`;
    document.getElementById('max-moves-display').textContent = CONFIG.maxMoves;
    updateStatus();

    // Generate Board
    createBoardUI();
}

function createBoardUI() {
    boardEl.innerHTML = '';
    
    // Set Grid CSS Dynamic
    // Kita hanya set kolomnya, ukurannya diatur otomatis oleh CSS aspect-ratio
    boardEl.style.gridTemplateColumns = `repeat(${STATE.size}, 1fr)`;
    boardEl.style.gridTemplateRows = `repeat(${STATE.size}, 1fr)`; // Tambahan agar baris juga rapi
    
    // Create Cells
    for (let i = 0; i < STATE.board.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        
        // HAPUS bagian if(window.innerWidth > 600) {...} 
        // Biarkan CSS yang menangani ukuran cell
        
        boardEl.appendChild(cell);
    }
}

function handleCellClick(e) {
    const cell = e.target.closest('.cell');
    const index = parseInt(cell.dataset.index);

    if (STATE.board[index] !== null || !STATE.gameActive) return;

    // 1. Add New Symbol
    executeMove(index);
}

function executeMove(index) {
    // Update State Logic
    STATE.board[index] = STATE.currentPlayer;
    
    // Update State Queue
    const currentQueue = STATE.currentPlayer === 'X' ? STATE.xMoves : STATE.oMoves;
    currentQueue.push(index);

    // Update UI Visuals
    const cell = boardEl.children[index];
    cell.innerHTML = `<span class="p-${STATE.currentPlayer.toLowerCase()}">${STATE.currentPlayer}</span>`;
    cell.classList.add('taken');

    // INFINITE LOGIC: Remove the oldest one
    if (currentQueue.length > CONFIG.maxMoves) {
        const removedIndex = currentQueue.shift();
        removeMoveUI(removedIndex);
    }

    // Check Win
    const winLine = checkWinDynamic();
    if (winLine) {
        endGame(winLine);
        return;
    }

    // Switch Turn
    STATE.currentPlayer = STATE.currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
    highlightNextFade();
}

function removeMoveUI(index) {
    STATE.board[index] = null;
    const cell = boardEl.children[index];
    cell.innerHTML = '';
    cell.classList.remove('taken', 'about-to-die');
}

function updateStatus() {
    statusEl.innerHTML = `Turn: <span class="p-${STATE.currentPlayer.toLowerCase()}">${STATE.currentPlayer}</span>`;
}

// Highlight symbol about to fade (Visual Feature)
function highlightNextFade() {
    // Reset indicators
    Array.from(boardEl.children).forEach(c => c.classList.remove('about-to-die'));

    const currentQueue = STATE.currentPlayer === 'X' ? STATE.xMoves : STATE.oMoves;
    
    // If queue is full, the index 0 is the one that will be removed next turn
    if (currentQueue.length === CONFIG.maxMoves) {
        const indexToFade = currentQueue[0];
        const cell = boardEl.children[indexToFade];
        if(cell) cell.classList.add('about-to-die');
    }
}

// --- DYNAMIC WIN ALGORITHM ---
function checkWinDynamic() {
    const size = STATE.size;
    const winLen = CONFIG.winLength;
    const board = STATE.board;
    const player = STATE.currentPlayer;

    const getCell = (r, c) => {
        if (r < 0 || r >= size || c < 0 || c >= size) return null;
        return board[r * size + c];
    };

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (getCell(r, c) !== player) continue;

            const directions = [
                {dr: 0, dc: 1},  // Horizontal
                {dr: 1, dc: 0},  // Vertical
                {dr: 1, dc: 1},  // Diagonal \
                {dr: 1, dc: -1}  // Diagonal /
            ];

            for (let {dr, dc} of directions) {
                let line = [];
                for (let k = 0; k < winLen; k++) {
                    let nr = r + k * dr;
                    let nc = c + k * dc;
                    if (getCell(nr, nc) === player) {
                        line.push(nr * size + nc);
                    } else {
                        break;
                    }
                }
                if (line.length === winLen) return line;
            }
        }
    }
    return null;
}

function endGame(winLine) {
    STATE.gameActive = false;
    statusEl.innerHTML = `<span class="p-${STATE.currentPlayer.toLowerCase()}">Winner: ${STATE.currentPlayer}!</span>`;
    
    // Highlight winning line
    winLine.forEach(index => {
        boardEl.children[index].classList.add('win');
    });

    // Remove fading effect
    Array.from(boardEl.children).forEach(c => c.classList.remove('about-to-die'));
}