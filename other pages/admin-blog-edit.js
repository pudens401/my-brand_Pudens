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
    window.history.back();
}



function saveBlogs() {                                            //saveblgs to local storage
    localStorage.setItem('blogs', JSON.stringify(blogs));
}