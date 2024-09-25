const form = document.getElementById('signup-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const pwd = document.getElementById('password');
const cPwd = document.getElementById('confirm-password');
const submitErrorCont = document.getElementById('submit-error');

let usernameValue = username.value.trim();  
let emailValue = email.value.trim();
let pwdValue = pwd.value.trim();
let cPwdValue = cPwd.value.trim();

const successMsg = document.getElementById('s-success');        //This line must go back into submitSucces after backed dvpmnt

form.addEventListener('submit', e =>{
    resetErrors();
    let errorCount = validateInputs();
    if(errorCount>0){
        e.preventDefault();
    }
    else{
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

const submitError = (message) =>{
    
    submitErrorCont.innerText = message;
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


function resetErrors(){
    const errorFields = document.querySelectorAll('.s-error')
    errorFields.forEach((field)=>{
        field.innerText = '';
    });
    successMsg.innerText = '';
    submitErrorCont.innerText = '';
}


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
    const url = "https://my-brand-backend-qcoe.onrender.com/auth/signup"
    const data = {
        username: usernameValue,
        email: emailValue,
        password: pwdValue,
        confirmPassword: cPwdValue
    }
    const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }
    let error;
    fetch(url,options)
    .then(response=>{
        console.log(response)
        if(response!==201) error = true;
        
        return response.json()
    })
    .then((data)=>{
        if(error){
           submitError(data.message)
            // setError(submitError,data.message)
        }else{
            submitSuccess()
        }
        console.log(data);
    })
}