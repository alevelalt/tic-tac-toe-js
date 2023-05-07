const actionMenu = document.querySelector(".menu");
const menuItems = actionMenu.querySelector(".items");

actionMenu.addEventListener("click", () => {
  menuItems.classList.toggle("hidden");
});
