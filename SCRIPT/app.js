const App = {
  $: {
    actionMenu: document.querySelector(".menu"),
    menuItems: document.querySelector(".items"),
  },
};

App.$.actionMenu.addEventListener("click", () => {
  App.$.menuItems.classList.toggle("hidden");
});
