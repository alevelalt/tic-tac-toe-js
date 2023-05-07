const App = {
  $: {
    actionMenu: document.querySelector(".menu"),
    menuItems: document.querySelector(".items"),
  },

  init() {
    App.$.actionMenu.addEventListener("click", () => {
      App.$.menuItems.classList.toggle("hidden");
    });
  },
};

window.addEventListener("load", App.init);
