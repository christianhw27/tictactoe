# ♾️ Infinite Tic Tac Toe

![Project Status](https://img.shields.io/badge/status-active-success) ![License](https://img.shields.io/badge/license-MIT-blue) ![Language](https://img.shields.io/badge/language-HTML%20%7C%20CSS%20%7C%20JS-yellow)

> **Tic Tac Toe, but the game never ends until someone wins.** > A strategic twist on the classic game where your oldest moves disappear as you play. No draws, just pure strategy.

---

## 🎮 The Concept

We all know Tic Tac Toe usually ends in a draw. **Infinite Tic Tac Toe** fixes that.

The rules are simple but change the strategy entirely:
1.  **Limited Moves:** Depending on the board size, you can only have a specific number of symbols (X or O) on the board at once.
2.  **FIFO Mechanic:** Once you reach the limit (e.g., 3 symbols on a 3x3 board), placing a **4th symbol** will automatically **remove your 1st (oldest) symbol**.
3.  **No Draws:** Because symbols keep disappearing to make room for new ones, the board never gets "stuck." The game continues until a player aligns the required number of symbols.

---

## ✨ Key Features

* **🔄 Endless Gameplay:** The "draw" condition is removed. Keep playing until a true winner emerges.
* **📏 Dynamic Board Sizes:**
    * **3x3 (Classic):** Max 3 symbols, Match 3 to win. Fast and chaotic.
    * **5x5 (Medium):** Max 4 symbols, Match 4 to win. More space for tactics.
    * **6x6 (Hard):** Max 5 symbols, Match 5 to win. Complex territory control.
* **📱 Fully Responsive:** Optimized for Desktop, Tablet, and Mobile. The board scales perfectly to fit your screen.
* **🎨 Minimalist Dark UI:** Clean design with smooth animations and "fading" indicators for symbols about to be removed.
* **🌐 Online Multiplayer:** (Feature in progress) Play with friends remotely.

---

## 🚀 Play Now

You can play the latest stable version of the game directly in your browser. No installation required.

[**👉 Click Here to Play (Demo)**](https://christianhw27.github.io/tictactoe/)

---

## 🛠️ Built With

* **Frontend:** HTML5, CSS3 (Grid/Flexbox), Vanilla JavaScript (ES6+).
* **Styling:** Custom CSS variables for easy theming.

---

## 🕹️ How to Play

1.  **Select a Level:** Choose between 3x3, 5x5, or 6x6 on the main menu.
2.  **Place Your Symbol:** Click on an empty cell to place X or O.
3.  **Watch the Queue:**
    * On a **3x3 board**, you only have **3** marks available.
    * If you place a 4th mark, your **1st mark disappears**.
    * *Tip: The symbol that is about to disappear will fade out visually.*
4.  **Win:** Align your symbols (Horizontal, Vertical, or Diagonal) based on the board's winning condition.

---

## 💻 Running Locally

Want to modify the code or run it offline? Follow these steps:

### Prerequisites
* A modern web browser (Chrome, Firefox, Edge, etc.).

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/christianhw27/tictactoe.git](https://github.com/christianhw27/tictactoe.git)
    cd tictactoe
    ```

2.  **Run the Game**
    Simply open the `index.html` file in your browser.
    ```bash
    # Or if you use VS Code Live Server
    code .
    ```

---

## 📝 Development Notes & Roadmap

This project is currently in **Active Development**.

- [x] Core Infinite Logic (FIFO Queue)
- [x] Responsive Design (Mobile/Desktop)
- [x] Multiple Board Sizes (3x3, 5x5, 6x6)
- [ ] **Next Up:** Sound Effects & Haptic Feedback
- [ ] **Next Up:** AI Bot with Difficulty Levels (Minimax Algorithm)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/christianhw27/tictactoe/issues).

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

<div align="center">
  <p>Don't forget to give this project a ⭐️ if you liked it!</p>
</div>

```


Ada lagi yang bisa saya bantu untuk melengkapi repo ini? Misalnya menambahkan file `LICENSE`?
