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
let blogIndex = parseInt(queryParams.get('blogIndex'));
let blog = blogs[blogIndex];

const blogMain = document.querySelector(".blog-main");
blogMain.innerHTML = '';

const blogMainImageCont = document.createElement("div");
blogMainImageCont.classList.add('blog-main-img')
const blogMainImage = document.createElement("img");

if(blog.image){
    blogMainImage.setAttribute("src",blog.image);
}else{
    blogMainImage.setAttribute("src","./images/images_portraits/portrait.png");
}

const blogMainEditImage = document.createElement("div");
blogMainEditImage.setAttribute('id',"edit-pic");
const imageEditLabel = document.createElement('label');
imageEditLabel.setAttribute('for','upload-button')

const blogMainEditImageIcon = document.createElement("i");
blogMainEditImageIcon.classList.add('fa-solid','fa-image');
const blogMainImageUpload = document.createElement("input");
blogMainImageUpload.setAttribute('type',"file");
blogMainImageUpload.setAttribute('id',"upload-button");

imageEditLabel.appendChild(blogMainEditImageIcon);

blogMainEditImage.appendChild(imageEditLabel);
blogMainEditImageIcon.innerText = ' Edit cover Image';
blogMainEditImage.appendChild(blogMainImageUpload);

blogMainImageCont.appendChild(blogMainImage);
blogMainImageCont.appendChild(blogMainEditImage);


const blogMainBodyCont = document.createElement("div");
blogMainBodyCont.classList.add('blog-main-body');
const blogMainTitleCont = document.createElement("div");
blogMainTitleCont.classList.add('a-title-cont');
const blogMainTitle = document.createElement("h2");
blogMainTitle.classList.add('blog-main-title')
blogMainTitle.innerText = blog.title;
const blogManageIcons = document.createElement("div");
blogManageIcons.classList.add('high-icons','manage-icons');
const blogDeleteIcon = document.createElement("i");
blogDeleteIcon.classList.add('fa-solid','fa-trash');
const blogSaveIcon = document.createElement("i");
blogSaveIcon.classList.add('fa-solid','fa-circle-check');



blogManageIcons.appendChild(blogDeleteIcon);
blogManageIcons.appendChild(blogSaveIcon);

blogMainTitleCont.appendChild(blogMainTitle);
blogMainTitleCont.appendChild(blogManageIcons);

const blogTextArea = document.createElement('textarea');
blogTextArea.setAttribute('id','blog-edit-area');
blogTextArea.setAttribute('cols','95');
blogTextArea.setAttribute('rows','20');
blogTextArea.innerText = blog.body;

blogMainBodyCont.appendChild(blogMainTitleCont);
blogMainBodyCont.appendChild(blogTextArea);

blogMain.appendChild(blogMainImageCont);
blogMain.appendChild(blogMainBodyCont);



let imgData ='';

let bodyValue = blogTextArea.value.trim();
let titleValue = blogMainTitle.value;
let imageValue = imgData;


blogMainImageUpload.addEventListener('change', (event) => {
    const image = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(image)

    reader.addEventListener('load', () => {
        imgData = reader.result;
    })
})



blogSaveIcon.onclick = function(){
    // blogs[blogIndex].title = titleValue;
    let bodyValue = blogTextArea.value.trim();
    let titleValue = blogMainTitle.value;   
    let imageValue = imgData;
    blogs[blogIndex].body = bodyValue;
    if(imgData){
    blogs[blogIndex].image = imageValue;
    }
    saveBlogs();
    location.replace('./Dashboard-landing.html');
}



function saveBlogs() {                                            //saveblgs to local storage
    localStorage.setItem('blogs', JSON.stringify(blogs));
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