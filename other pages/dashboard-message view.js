const menuBtn = document.querySelector("#d-drop-left")
const dropMenu = document.querySelector(".drop-menu")
const menuBtnIcon = document.querySelector("#d-drop-left i")

menuBtn.onclick = function(){
    dropMenu.classList.toggle("open")
    const isOpen = dropMenu.contains("open")

    menuBtnIcon.classList = isOpen?"fa-solid fa-xmark":"fa-solid fa-bars"
}