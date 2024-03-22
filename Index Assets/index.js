const menu = document.querySelector(".menu-items");
const revealMenu = document.querySelector(".header-menu-segment");

function menuRevealer() {
  if (menu.classList.contains("menu-items")) {
    menu.classList.remove("menu-items");
  } else {
    menu.classList.add("menu-items");
  }
}

revealMenu.addEventListener("click", menuRevealer);
