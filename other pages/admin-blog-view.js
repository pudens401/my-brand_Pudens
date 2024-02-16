const menuBtn = document.querySelector("#d-drop-left")
const dropMenu = document.querySelector(".drop-menu")
const menuBtnIcon = document.querySelector("#d-drop-left i")

menuBtn.onclick = function(){
    dropMenu.classList.toggle("open")
    const isOpen = dropMenu.contains("open")

    menuBtnIcon.classList = isOpen?"fa-solid fa-xmark":"fa-solid fa-bars"
}

//

let blogs = [];
loadBlogs();

function loadBlogs(){
    let savedBlogs = localStorage.getItem('blogs');
    blogs = savedBlogs? JSON.parse(savedBlogs):[];
}

var queryParams = new URLSearchParams(window.location.search);
var blogIndex = parseInt(queryParams.get('blogIndex'));
var blog = blogs[blogIndex];

let blogMain = document.querySelector('.blog-main');
blogMain.innerHTML = '';

let blogImageCont = document.createElement('div');
blogImageCont.classList.add('blog-main-img'); 
let blogImage = document.createElement('img');

if(blog.image){
    blogImage.setAttribute('src',blog.image);
}else{
    blogImage.setAttribute('src','./images/images_portraits/portrait.png');
}

blogImageCont.appendChild(blogImage);

let blogMainBody = document.createElement('div');
blogMainBody.classList.add('"blog-main-body'); 

let blogTitleCont = document.createElement('div');
blogTitleCont.classList.add('a-title-cont');

let blogMTitle = document.createElement('h2');
blogMTitle.classList.add('blog-main-title'); 
blogMTitle.innerText = blog.title

let manageIconsCont = document.createElement('div');
manageIconsCont.classList.add("high-icons","manage-icons"); 

let editIcon = document.createElement('i');
editIcon.classList.add("fa-solid","fa-square-pen");

editIcon.onclick=function(){
    editBlog(blogIndex);
}

let deleteIcon = document.createElement('i');
deleteIcon.classList.add("fa-solid","fa-trash");

deleteIcon.onclick = ()=>{
    deleteIndividualBlog(blogIndex);
}

manageIconsCont.appendChild(editIcon);
manageIconsCont.appendChild(deleteIcon);

blogTitleCont.appendChild(blogMTitle);
blogTitleCont.appendChild(manageIconsCont);

let blogMainText = document.createElement('p');
blogMainText.classList.add('blog-main-text');
blogMainText.innerText = blog.body;

blogMainBody.appendChild(blogTitleCont);
blogMainBody.appendChild(blogMainText);

blogMain.appendChild(blogImageCont);
blogMain.appendChild(blogMainBody);


function deleteIndividualBlog(i){
    blogs.splice(i,1);
    window.location.href = 'Dashboard-landing.html';
    saveBlogs();   
}

function saveBlogs() {                                            //saveblgs to local storage
    localStorage.setItem('blogs', JSON.stringify(blogs));
    displayBlogs();
}

function editBlog(i){
    window.location.href = 'admin-blog-edit.html?username=&password=&blogIndex='+blogIndex;
}