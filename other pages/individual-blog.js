

const menuBtn = document.querySelector("#menu-btn")
const menuBtnIcon = document.querySelector("#menu-btn i")
const dropDownMenu = document.querySelector(".dropdown-menu")

menuBtn.onclick = function(){
    dropDownMenu.classList.toggle("open")
    const isOpen = dropDownMenu.classList.contains("open")
    
    menuBtnIcon.classList = isOpen? 'fa-solid fa-xmark': 'fa-solid fa-bars'
    
}



let blogs = [];
loadBlogs();

function loadBlogs(){
    let savedBlogs = localStorage.getItem('blogs');
    blogs = savedBlogs?JSON.parse(savedBlogs):[];
}


let urlParams = new URLSearchParams(window.location.search);
let blogIndex = urlParams.get('blogIndex');


const commentSpaceCont = document.querySelector('.comment-space-cont');
const commentArea = document.getElementById('comment-input');
const commentBtn = document.getElementById('comment-send');


displayBlog(blogIndex);

let comments = [];

function displayBlog(i){
    
    let blog = blogs[i];

    const blogMain = document.querySelector('.blog-main');
    blogMain.innerHTML = '';
    
    const blogMainImageCont = document.createElement('div');
    blogMainImageCont.classList.add('blog-main-img');
    let blogMainImage = document.createElement('img');

    if(blog.image){
        blogMainImage.setAttribute('src',blog.image);
    }else{
        blogMainImage.setAttribute('src','./images/images_portraits/portrait.png');
    }
    blogMainImageCont.appendChild(blogMainImage);

    const blogMainBody = document.createElement('div');
    blogMainBody.classList.add('blog-main-body');
    let blogMainTitle = document.createElement('h2');
    blogMainTitle.classList.add('blog-main-title');
    blogMainTitle.innerText = blog.title;
    let blogMainText = document.createElement('p');
    blogMainText.classList.add('blog-main-text');
    blogMainText.innerText = blog.body;

    blogMainBody.appendChild(blogMainTitle);
    blogMainBody.appendChild(blogMainText);

    blogMain.appendChild(blogMainImageCont);
    blogMain.appendChild(blogMainBody);


    
    blog.commentCount = 0;
    blog.likeCount = 0;


    //Commenting section
    
    

    commentBtn.addEventListener('click',addComment); 

    function addComment(){
        let commentAreaValue = commentArea.value.trim();
        if(commentAreaValue===''){
            setError("Comment can't be empty");
        }else{
            setSuccess();
            let newComment ={
                cName: 'Anonymous User',
                cBody:commentAreaValue
            }
            comments.unshift(newComment);
            saveComments();
        }

    }








}


const setError = (m)=>{
    const errorDiv = commentSpaceCont.querySelector('.s-error');
    errorDiv.innerText = m;
}

const setSuccess = ()=>{
    const errorDiv = commentSpaceCont.querySelector('.s-error');
    errorDiv.innerText = 'Comment Sent';
    errorDiv.style.color = 'Green';
    commentArea.value = '';
}

function saveComments(){
    localStorage.setItem('comments',JSON.stringify(comments));
}