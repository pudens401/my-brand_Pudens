

const menuBtn = document.querySelector("#menu-btn")
const menuBtnIcon = document.querySelector("#menu-btn i")
const dropDownMenu = document.querySelector(".dropdown-menu")

menuBtn.onclick = function(){
    dropDownMenu.classList.toggle("open")
    const isOpen = dropDownMenu.classList.contains("open")
    
    menuBtnIcon.classList = isOpen? 'fa-solid fa-xmark': 'fa-solid fa-bars'
    
}

//Message form validation 

const form = document.getElementById('m-form');
const mName = document.getElementById('m-name');
const email = document.getElementById('m-email');
const mMessage = document.getElementById('m-message');

form.addEventListener('submit',e=>{
   let errorCount = validateMessage();
   if (errorCount>0){
        e.preventDefault();
   }else{
        e.preventDefault();
        showSuccess();
   }
    
});


const setError = (e,m)=>{
    const inputCtrl = e.parentElement;

    const errorDiv = inputCtrl.querySelector('.m-error');

    errorDiv.innerText = m;
}

const setSuccess = (e)=>{

    const inputCtrl = e.parentElement;

    const errorDiv = inputCtrl.querySelector('.m-error');

    errorDiv.innerText = '';

    e.classList.add('.success');
    e.classList.remove('.error');
}

const showSuccess = ()=>{
    const successDiv = document.querySelector('.show-success');
    successDiv.innerText = 'Message Sent successfully';
    mName.value = '';
    email.value = '';
    mMessage.value = '';

}




const validateMessage = ()=>{
    const mNameValue = mName.value.trim();
    const messageValue = mMessage.value.trim();
    const emailValue = email.value.trim();
    let errorCount = 0;

    if(mNameValue===''){
        setError(mName,'Name must not be empty');
        errorCount++;
    }else {
        setSuccess(mName);
    }

    if(messageValue===''){
        setError(mMessage,'Message must not be empty');
        errorCount++;
    }else {
        setSuccess(mMessage);
    }

    return errorCount;

}