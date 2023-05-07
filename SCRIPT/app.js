const App = {
  $: {
    actionMenu: document.querySelector(".menu"),
    menuItems: document.querySelector("[data-id='menu-items']"),
    resetBtn: document.querySelector("[data-id='reset-btn']"),
    newRoundBtn: document.querySelector("[data-id='new-round-btn']"),
    gameSquares: document.querySelectorAll("[data-id='main-game-squares']"),
  },

  init() {
    App.allEventListeners();
  },

  allEventListeners() {
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
        console.log(`Square with ID: ${event.target.id} was clicked`);
      });
    });
  },
};

window.addEventListener("load", App.init);
