
//Responsive nav bar
const menuBtn = document.querySelector("#menu-btn");
const menuBtnIcon = document.querySelector("#menu-btn i");
const dropDownMenu = document.querySelector(".dropdown-menu");

menuBtn.onclick = function(){
    dropDownMenu.classList.toggle("open");
    const isOpen = dropDownMenu.classList.contains("open");
    
    menuBtnIcon.classList = isOpen? 'fa-solid fa-xmark': 'fa-solid fa-bars';
    
}



//Protected login form


let login_status = localStorage.getItem('current_user');
let login_type = localStorage.getItem('current_type');

if(login_type==='guest'){
    window.location.href = '../index.html';
}else if(login_type==='admin'){
    window.location.href = 'Dashboard-landing.html';
}

//Signup Form validation

let users = []
loadUsers();


const form = document.getElementById('signup-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const pwd = document.getElementById('password');
const cPwd = document.getElementById('confirm-password');

let usernameValue = username.value.trim();  
let emailValue = email.value.trim();
let pwdValue = pwd.value.trim();
let cPwdValue = cPwd.value.trim();

const successMsg = document.getElementById('s-success');        //This line must go back into submitSucces after backed dvpmnt

form.addEventListener('submit', e =>{
    let errorCount = validateInputs();
    if(errorCount>0){
        e.preventDefault();
    }
    else{
        submitSuccess();
        e.preventDefault();                                     // This line prevents discrupts without backend
        storeUser();
    }

});


const submitSuccess = () =>{
    successMsg.innerText = 'You have registered. Now login';
    username.value = '';
    email.value = '';
    pwd.value = '';
    cPwd.value = '';
}


const setError = (element,message) =>{
    const inputCont = element.parentElement;
    const inputControl = inputCont.parentElement;
    const errorDisplay = inputControl.querySelector(".s-error");
    errorDisplay.innerText = message;
    inputCont.classList.add('error');
    inputCont.classList.remove('success');

    successMsg.innerText = '';                                  //Line for just the frontend design to remove the successmsg just in case of error
};

const setSuccess = element =>{
    const inputCont = element.parentElement;
    const inputControl = inputCont.parentElement;
    const errorDisplay = inputControl.querySelector(".s-error");
    errorDisplay.innerText = '';
    inputCont.classList.remove('error');
    inputCont.classList.add('success');
};



const validateInputs = () =>{
    let errorCount = 0;
     usernameValue = username.value.trim();
     emailValue = email.value.trim();
     pwdValue = pwd.value.trim();
    cPwdValue = cPwd.value.trim();

    if(usernameValue===''){
        setError(username, 'Username is required');
        errorCount++;
    }else{
        setSuccess(username);
    }


    if(emailValue===''){
        setError(email, 'Email is required');
        errorCount++;
    }else{
        setSuccess(email);
    }


    if(pwdValue===''){
        setError(pwd, 'Password is required');
        errorCount++;
    }else if(pwdValue.length < 8){
        setError(pwd, 'Password length must be 8');
        errorCount++;
    }
    else{
        setSuccess(pwd);
    }

    if(cPwdValue !== pwdValue ){
        setError(cPwd, 'Passwords do not match');
        errorCount++;
    }
    else if(pwdValue===cPwdValue && pwdValue!==''){
        setSuccess(cPwd);
    }
return errorCount;

}


function storeUser(){
    let newUser = {
        u_name :usernameValue,
        u_email:emailValue,
        u_password:pwdValue,
        u_type:'guest'
    }

    users.push(newUser);
    saveUsers();
}

function saveUsers(){
    localStorage.setItem('users',JSON.stringify(users));
}

function loadUsers(){
    const existingUsers = localStorage.getItem('users');
    users = existingUsers?JSON.parse(existingUsers):[];
}
