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




displayComments(blogIndex);
displayAnalytics(blogIndex);

function displayComments(i){
    let comments = blogs[i].comments


    const commentsCont = document.querySelector('.comments-cont');
    commentsCont.innerHTML = '';

    comments.forEach(comment => {
        const commentItem = document.createElement('div');
        commentItem.classList.add('comment-item');
    
        const commentHeader = document.createElement('div');
        commentHeader.classList.add('comment-header');
        const cnameCont = document.createElement('div');
        cnameCont.classList.add('c-name');
        const pPicCont = document.createElement('p');
        const pPic = document.createElement('span');
        pPic.setAttribute('id','p-pic')
        pPic.innerText = 'AU';
        pPicCont.appendChild(pPic);
        let cName = document.createElement('p');
        cName.innerText = comment.cName;
    
        cnameCont.appendChild(pPicCont);
        cnameCont.appendChild(cName);
    
        const dateCont = document.createElement('p');
        dateCont.innerText = '12/12/2024';
    
        commentHeader.appendChild(cnameCont);
        commentHeader.appendChild(dateCont);
    
        const commentBody = document.createElement('div');
        commentBody.classList.add('comment-body');
        let commentBodyText = document.createElement('p');
        commentBody.appendChild(commentBodyText);
        commentBody.innerText = comment.cBody

    
        commentItem.appendChild(commentHeader);
        commentItem.appendChild(commentBody); 

        commentsCont.appendChild(commentItem);
    });
    

}

function displayAnalytics(i){

    const analyticsCont = document.querySelector('.comment-analytics');
    analyticsCont.innerHTML = '';

    const likeCont = document.createElement('div');
    likeCont.classList.add('analytic-cont');
    let likeBtnCont = document.createElement('p');
    likeBtnCont.innerText  = blogs[i].likeCount;
    const likeBtn = document.createElement('i');
    likeBtn.classList.add("fa-solid","fa-thumbs-up");
    likeBtnCont.appendChild(likeBtn);
    likeCont.appendChild(likeBtnCont);

    const commentCont = document.createElement('div');
    commentCont.classList.add('analytic-cont');
    let commentBtnCont = document.createElement('p');
    commentBtnCont.innerText = blogs[i].comments.length;
    const commentBtn = document.createElement('i');
    commentBtn.classList.add("fa-solid","fa-comment");
    commentBtnCont.appendChild(commentBtn);
    commentCont.appendChild(commentBtnCont);

    const blogDateCont = document.createElement('div');
    const blogDate = document.createElement('p');
    blogDate.innerText = '12/12/24';

    analyticsCont.appendChild(likeCont);
    analyticsCont.appendChild(commentCont);
    analyticsCont.appendChild(blogDateCont);

}