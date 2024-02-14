
//responsive nav bar

const menuBtn = document.querySelector("#menu-btn");
const menuBtnIcon = document.querySelector("#menu-btn i");
const dropDownMenu = document.querySelector(".dropdown-menu");

menuBtn.onclick = function(){
    dropDownMenu.classList.toggle("open");
    const isOpen = dropDownMenu.classList.contains("open");
    
    menuBtnIcon.classList = isOpen? 'fa-solid fa-xmark': 'fa-solid fa-bars';
    
}


//Login client side form validation 

const uName = document.getElementById("username");
const pwd = document.getElementById('password');
const form = document.getElementById('login-form');

const successCont = document.querySelector(".l-success");

form.addEventListener('submit', e =>{
    let errorCount = validateInputs();
    if(errorCount>0){
        e.preventDefault();
    }
    else{
        showSuccess();
        // e.preventDefault();                                     // This line prevents discrupts without backend
    }

});

const setError = (e,msg)=>{
    const inputCont = e.parentElement;
    const inputController = inputCont.parentElement;
    const errorDiv = inputController.querySelector('.l-error');

    inputCont.classList.add("error");
    inputCont.classList.remove("success");
    errorDiv.innerText = msg;
    successCont.innerText = '';
}

const setSuccess = (e)=>{
    const inputCont = e.parentElement;
    const inputController = inputCont.parentElement;
    const errorDiv = inputController.querySelector('.l-error');

    inputCont.classList.remove("error");
    inputCont.classList.add("success");
    errorDiv.innerText = "";
}

const showSuccess = ()=>{
    successCont.innerText = 'Login Success';

    uName.value = '';
    pwd.value = '';
}

const validateInputs = ()=>{
    let errorCount = 0;

    const uNameValue = uName.value.trim();
    const pwdValue = pwd.value.trim();

    if(uNameValue===''){
        setError(uName,'User name must not be empty');
        errorCount++;
    }else{
        setSuccess(uName);
    }

    if(pwdValue===''){
        setError(pwd,'Password must not be empty');
        errorCount++;
    }else if(pwdValue.length < 8){
        setError(pwd,'Password must be 8 characters long.');
        errorCount++;
    }
    else{
        setSuccess(pwd);
    }

    return errorCount;


}

