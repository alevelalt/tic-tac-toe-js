const App = {
  $: {
    actionMenu: document.querySelector(".menu"),
    menuItems: document.querySelector("[data-id='menu-items']"),
    resetBtn: document.querySelector("[data-id='reset-btn']"),
    newRoundBtn: document.querySelector("[data-id='new-round-btn']"),
    gameSquares: document.querySelectorAll("[data-id='main-game-squares']"),
    yourTurn: document.getElementById("your-turn"),
    turnIcon: document.getElementById("turn-icon"),
    modalToggle: document.getElementById("unhide-modal"),
    modalText: document.getElementById("modal-text"),
    modalBtn: document.getElementById("modal-btn"),
  },

  state: {
    currentPlayer: 1,
    gameMoves: [],
  },

  getGameStatus(moves) {
    const player1Moves = moves
      .filter((obj) => obj.playerId === 1)
      .map((obj) => +obj.squareId);

    const player2Moves = moves
      .filter((obj) => obj.playerId === 2)
      .map((obj) => +obj.squareId);

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    winningPatterns.forEach((pattern) => {
      const player1Wins = pattern.every((squareid) =>
        player1Moves.includes(squareid)
      );
      const player2Wins = pattern.every((squareid) =>
        player2Moves.includes(squareid)
      );

      if (player1Wins) winner = 1;
      if (player2Wins) winner = 2;
    });

    return {
      status:
        moves.length === 9 || winner !== null ? "complete" : "in-progress",
      gameWinner: winner,
    };
  },

  init() {
    App.allEventListeners();
  },

  allEventListeners() {
    // Hide/unhide Action dropdown menu
    App.$.actionMenu.addEventListener("click", () => {
      App.$.menuItems.classList.toggle("hidden");
    });

    App.$.resetBtn.addEventListener("click", () => {
      console.log("Reset Game.");
    });

    App.$.newRoundBtn.addEventListener("click", () => {
      console.log("Go to new round.");
    });

    // endgame modal play again button
    this.$.modalBtn.addEventListener("click", () => {
      this.$.modalToggle.classList.add("hidden");
      this.$.gameSquares.forEach((sqr) => {
        sqr.replaceChildren();
      });
      this.state.gameMoves = [];
      this.state.currentPlayer = 1;
    });

    App.$.gameSquares.forEach((element) => {
      element.addEventListener("click", (event) => {
        // If square already has a move, return early
        if (element.hasChildNodes()) {
          return;
        }

        const icon = document.createElement("i");

        //  Determine which icon to add in square
        if (this.state.currentPlayer === 1) {
          icon.classList.add("fa-solid", "fa-x", "color-turquoise");
          App.state.gameMoves.push({
            squareId: +element.id,
            playerId: App.state.currentPlayer,
          });

          this.state.currentPlayer = 2;
          App.$.yourTurn.innerText = "Player 2, your turn!";
          App.$.yourTurn.classList.toggle("color-yellow");
          App.$.yourTurn.classList.toggle("color-turquoise");
          App.$.turnIcon.classList.replace("fa-x", "fa-o");
          App.$.turnIcon.classList.replace("color-turquoise", "color-yellow");
        } else {
          icon.classList.add("fa-solid", "fa-o", "color-yellow");
          App.state.gameMoves.push({
            squareId: +element.id,
            playerId: App.state.currentPlayer,
          });
          this.state.currentPlayer = 1;
          App.$.yourTurn.innerText = "Player 1, your turn!";
          App.$.yourTurn.classList.toggle("color-yellow");
          App.$.yourTurn.classList.toggle("color-turquoise");
          App.$.turnIcon.classList.replace("fa-o", "fa-x");
          App.$.turnIcon.classList.replace("color-yellow", "color-turquoise");
        }

        event.target.replaceChildren(icon);

        // check if there is a winner or is it a tie

        const gameStatus = this.getGameStatus(App.state.gameMoves);

        if (gameStatus.gameWinner === 1) {
          this.$.modalToggle.classList.remove("hidden");
          this.$.modalText.innerText = "Player 1 won.";
        }
        if (gameStatus.gameWinner === 2) {
          this.$.modalToggle.classList.remove("hidden");
          this.$.modalText.innerText = "Player 2 won.";
        }
        if (gameStatus.status === "complete") {
          if (gameStatus.gameWinner === null) {
            this.$.modalToggle.classList.remove("hidden");
            this.$.modalText.innerText = "it's a tie.";
          }
        }
      });
    });
  },
};

window.addEventListener("load", App.init);
