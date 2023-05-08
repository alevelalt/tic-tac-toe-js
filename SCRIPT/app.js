const App = {
  $: {
    actionMenu: document.querySelector(".menu"),
    menuItems: document.querySelector("[data-id='menu-items']"),
    resetBtn: document.querySelector("[data-id='reset-btn']"),
    newRoundBtn: document.querySelector("[data-id='new-round-btn']"),
    gameSquares: document.querySelectorAll("[data-id='main-game-squares']"),
    yourTurn: document.getElementById("your-turn"),
    turnIcon: document.getElementById("turn-icon"),
  },

  state: {
    currentPlayer: 1,
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
          this.state.currentPlayer = 2;
          App.$.yourTurn.innerText = "Player 2, your turn!";
          App.$.yourTurn.classList.toggle("color-yellow");
          App.$.yourTurn.classList.toggle("color-turquoise");
          App.$.turnIcon.classList.replace("fa-x", "fa-o");
          App.$.turnIcon.classList.replace("color-turquoise", "color-yellow");
        } else {
          icon.classList.add("fa-solid", "fa-o", "color-yellow");
          this.state.currentPlayer = 1;
          App.$.yourTurn.innerText = "Player 1, your turn!";
          App.$.yourTurn.classList.toggle("color-yellow");
          App.$.yourTurn.classList.toggle("color-turquoise");
          App.$.turnIcon.classList.replace("fa-o", "fa-x");
          App.$.turnIcon.classList.replace("color-yellow", "color-turquoise");
        }

        event.target.replaceChildren(icon);
      });
    });
  },
};

window.addEventListener("load", App.init);
