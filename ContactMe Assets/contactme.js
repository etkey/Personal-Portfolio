//dropdown menu
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

//mail redirection via default mail

const mail = document.querySelector("contact-links-image-section");

function mailRedirect(){
    window.location.href = "enestalhakeles@gmail.com";
}

mail.addEventListener("click", mailRedirect);