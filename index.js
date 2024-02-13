

const menuBtn = document.querySelector("#menu-btn")
const menuBtnIcon = document.querySelector("#menu-btn i")
const dropDownMenu = document.querySelector(".dropdown-menu")

menuBtn.onclick = function(){
    dropDownMenu.classList.toggle("open")
    const isOpen = dropDownMenu.classList.contains("open")
    
    menuBtnIcon.classList = isOpen? 'fa-solid fa-xmark': 'fa-solid fa-bars'
    
}

//Message form validation 

// const mName = document.getElementById("m-name")
// const mEmail = document.getElementById("m-email")
// const mForm = document.getElementById("m-form")
// const errorElement = document.getElementById("error")


// mForm.addEventListener('submit',(e) =>{
//     let messages = [] 
//     if(mName.value==='' || mName.value === null){
//        messages.push('Name is required')  
//     }

//     if(messages.length>0){
//         e.preventDefault()
//         errorElement.innerText = messages.join(",")
//     }
    
    
    
// })