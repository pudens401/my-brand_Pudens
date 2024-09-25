const uName = document.getElementById("username");
const pwd = document.getElementById('password');
const form = document.getElementById('login-form');
const btn = document.getElementById('submit-btn')
let uNameValue = uName.value.trim();
let pwdValue = pwd.value.trim();
const successCont = document.querySelector(".l-success");


form.addEventListener('submit', e =>{
    let errorCount = validateInputs();
   
    if(errorCount>0){
        e.preventDefault();
        console.log('validation errors found');
    }
    else{
        e.preventDefault();
        tryLogin(); 
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
        setError(uName,'Email must not be empty');
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


function tryLogin(){
    const url = "https://my-brand-backend-qcoe.onrender.com/auth/login"
    const data = {
        email: uNameValue,
        password: pwdValue
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
        console.log(response)
        return response.json()
    })
    .then((data)=>{
        // if(error){
        //    submitError(data.message)
        //     // setError(submitError,data.message)
        // }else{
        //     submitSuccess()
        // }
        console.log(data);
    })
}