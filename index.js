

const menuBtn = document.querySelector("#menu-btn")
const menuBtnIcon = document.querySelector("#menu-btn i")
const dropDownMenu = document.querySelector(".dropdown-menu")

menuBtn.onclick = function(){
    dropDownMenu.classList.toggle("open")
    const isOpen = dropDownMenu.classList.contains("open")
    
    menuBtnIcon.classList = isOpen? 'fa-solid fa-xmark': 'fa-solid fa-bars'
    
}

let users = [];

loadUsers();

function loadUsers(){
let savedUsers = localStorage.getItem('users');

let defaultUser = [{
    u_name:'admin',
    u_password:'12345678',
    u_email:'kundapudens@gmail.com',
    u_type:'admin'
}];

users=savedUsers?JSON.parse(savedUsers):defaultUser;
saveUsers();
}




function saveUsers(){
    localStorage.setItem('users',JSON.stringify(users));
}





let params = new URLSearchParams(window.location.search);
let login_user = params.get('user');
let login_type = params.get('type');

let login_user_og = localStorage.getItem('current_user');
let login_type_og = localStorage.getItem('current_type');


//Login/Logout
if(login_type_og){
    let login_btn = document.getElementById('login-btn')
    let login_btn2 = document.getElementById('login-btn2')

    login_btn.innerText = 'Logout';
    login_btn2.innerText = 'Logout';

    login_btn.addEventListener('click',()=>{
        localStorage.removeItem('current_user');
        localStorage.removeItem('current_type');

        window.location.href = 'index.html'
    })
    login_btn2.addEventListener('click',()=>{
        localStorage.removeItem('current_user');
        localStorage.removeItem('current_type');

        window.location.href = 'index.html'
    })
}


//Message form validation 

let sentMessages = [];
loadMessages();

const form = document.getElementById('m-form');
const mName = document.getElementById('m-name');
const email = document.getElementById('m-email');
const mMessage = document.getElementById('m-message');

let mNameValue = mName.value.trim();
let messageValue = mMessage.value.trim();
let emailValue = email.value.trim();

form.addEventListener('submit',e=>{
   let errorCount = validateMessage();
   if (errorCount>0){
        e.preventDefault();
   }else{
        e.preventDefault();
        showSuccess();
        addMessage();
   }
    
});

function addMessage(){
    let newMessage = {
        sender:mNameValue,
        email:emailValue,
        message:messageValue
    }
    sentMessages.unshift(newMessage);
    saveMessage();
    mName.value = '';
    mMessage.value = '';
    email.value = '';
}

function saveMessage(){
    localStorage.setItem('sentMessages', JSON.stringify(sentMessages));
}

function loadMessages(){
    const savedMessages = localStorage.getItem('sentMessages');
    sentMessages = savedMessages?JSON.parse(savedMessages):[];
}



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
}

const validateMessage = ()=>{
     mNameValue = mName.value.trim();
    messageValue = mMessage.value.trim();
    emailValue = email.value.trim();
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

//Messages send











 //Blogs display
 let blogs = [];
 loadBlogs();
showRecentBlogs();


 function loadBlogs() {
    const storedBlogs = localStorage.getItem('blogs');
    blogs = storedBlogs ? JSON.parse(storedBlogs) : [];
}

function showRecentBlogs(){
const homeBlogs = document.querySelector(".recent-blogs-cont");
homeBlogs.innerHTML = '';

for(let i=0;i<3;i++){

    let homeBlog = document.createElement('article');
    homeBlog.classList.add('recent-blog');
    homeBlog.onclick = ()=>{
        window.location.href = "./other pages/individual-blog.html?blogIndex="+i;
    }

    let homeBlogImage = document.createElement('img');
    if(blogs[i].image){
        homeBlogImage.setAttribute('src',blogs[i].image);
    }else{
        homeBlogImage.setAttribute('src','./other pages/images/images_portraits/portrait.png');
    }

    let homeBlogMain = document.createElement('div');
    homeBlogMain.classList.add('recent-blog-main');

    let homeBlogTitle = document.createElement('h4');
    homeBlogTitle.classList.add('recent-blog-title','linked-text');
    let linkedTitle = document.createElement('a');
    linkedTitle.innerText = blogs[i].title;
    homeBlogTitle.appendChild(linkedTitle);

    let homeBlogSummary = document.createElement('div');
    homeBlogSummary.classList.add('recent-blog-summary');
    let homeBlogSummaryBody = document.createElement('p');
    homeBlogSummaryBody.innerText = blogs[i].body.slice(0,50);
    homeBlogSummary.appendChild(homeBlogSummaryBody);

    let homeBlogAnalytics = document.createElement('div');
    homeBlogAnalytics.classList.add('recent-blog-analytics');

    let likeAnalyticsCont = document.createElement('div');
    likeAnalyticsCont.classList.add('analytic-cont');
    let likeIconCont = document.createElement('p');
    let dlikeIcon = document.createElement('i');
    dlikeIcon.classList.add('fa-solid','fa-thumbs-up')
    likeIconCont.textContent=blogs[i].likeCount;
    likeIconCont.appendChild(dlikeIcon);
    likeAnalyticsCont.appendChild(likeIconCont);

    let commentAnalyticsCont = document.createElement('div');
    commentAnalyticsCont.classList.add('analytic-cont');
    let commentIconCont = document.createElement('p');
    let dCommentIcon = document.createElement('i');
    dCommentIcon.classList.add('fa-solid','fa-comments');
    commentIconCont.textContent=blogs[i].comments.length;
    commentIconCont.appendChild(dCommentIcon);
    commentAnalyticsCont.appendChild(commentIconCont);

    let dateAnalyticsCont = document.createElement('div');
    dateAnalyticsCont.classList.add('analytic-cont');
    let dateIconCont = document.createElement('p');
    dateIconCont.textContent=blogs[i].date.slice(0,10);
    dateAnalyticsCont.appendChild(dateIconCont);

    homeBlogAnalytics.appendChild(likeAnalyticsCont);
    homeBlogAnalytics.appendChild(commentAnalyticsCont);
    homeBlogAnalytics.appendChild(dateAnalyticsCont);


    homeBlogMain.appendChild(homeBlogTitle);
    homeBlogMain.appendChild(homeBlogSummary);
    homeBlogMain.appendChild(homeBlogAnalytics);
    homeBlog.appendChild(homeBlogImage);
    homeBlog.appendChild(homeBlogMain);
    

    homeBlogs.appendChild(homeBlog);

}
}


