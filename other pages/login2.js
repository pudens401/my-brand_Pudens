//Protected login form
let login_status = localStorage.getItem('current_user');
let login_type = localStorage.getItem('current_type');

if(login_type==='guest'){
    window.location.href = '../index.html';
}else if(login_type==='admin'){
    window.location.href = 'Dashboard-landing.html';
}


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
const btn = document.getElementById('submit-btn')
let uNameValue = uName.value.trim();
let pwdValue = pwd.value.trim();
const successCont = document.querySelector(".l-success");

let users = [];
loadUsers();



form.addEventListener('submit', e =>{
    let errorCount = validateInputs();
   
    if(errorCount>0){
        e.preventDefault();
        console.log('validation errors found');
    }
    else{
        
        let status = findUser();
        if(status){
            let privileges = status.u_type;
            if(privileges==='guest'){
                e.preventDefault();
                console.log('guest in');
                window.location.href = '../index.html?type=guest'
                localStorage.setItem('current_user',status.u_name);
                localStorage.setItem('current_type','guest');
            }else{
                e.preventDefault();
                console.log('admin in');
                window.location.href = 'Dashboard-landing.html?type=admin'
                localStorage.setItem('current_user',status.u_name);
                localStorage.setItem('current_type','admin');
            }
            
        }else{
            e.preventDefault();
            setError(pwd,'user or password incorect');
            console.log('cred error');
        }
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

    uNameValue = uName.value.trim();
    pwdValue = pwd.value.trim();

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

const findUser = ()=>{

    uNameValue = uName.value.trim();
    pwdValue = pwd.value.trim();
    
    let status  = users.filter((user)=>{
        return user.u_name===uNameValue&&user.u_password===pwdValue;  
    });
    if(status){
        return status[0];
    }

    return false;

}





function loadUsers(){
    const existingUsers = localStorage.getItem('users');
    users = existingUsers?JSON.parse(existingUsers):[];
}










//     for(let i=0;i<users.length;i++){

//         let obj = users[i];
//         let storedName = obj.u_name;
//         let storedPwd = obj.u_password;
//         let privileges = obj.u_type;

//         if(storedName===uNameValue&&storedPwd===pwdValue&&privileges==='Admin'){
//             return true;
//         }else if(storedName===uNameValue&&storedPwd===pwdValue&&privileges==='guest'){
//             return 'guest'+storedName;
//         }
//         else if(storedName===uNameValue&&storedPwd!==pwdValue){
//             setError(pwd,'Password is not true');
            
//         }else if(storedName!==uNameValue){
//             setError(uName,'User not found');
            
//         }

//     }

//     return false;
  


// 