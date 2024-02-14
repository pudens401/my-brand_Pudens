
//The navbar rensponsiveness

const menuBtn = document.querySelector("#d-drop-left")
const dropMenu = document.querySelector(".drop-menu")
const menuBtnIcon = document.querySelector("#d-drop-left i")

menuBtn.onclick = function(){
    dropMenu.classList.toggle("open")
    const isOpen = dropMenu.contains("open")

    menuBtnIcon.classList = isOpen?"fa-solid fa-xmark":"fa-solid fa-bars"
}


    //Main body


let blogs = [];
loadBlogs();
displayBlogs();

const blogSubmitBtn = document.getElementById("blog-submit-btn");
const blogTitle = document.getElementById("add-blog-title");
const blogBody = document.getElementById("add-blog-text");
const blogImage = document.getElementById("new-blog-pic");
let imgData = '';

blogSubmitBtn.addEventListener("click",()=>{
    let errorDiv = document.getElementById("add-blog-error");
    errorDiv.innerText="";

    let blogTitleValue = blogTitle.value.trim();
    let blogBodyValue = blogBody.value.trim();

    if(blogTitleValue===""&&(blogBodyValue===""||blogBodyValue==="Type your blog here...")){
        setError(".Title can't be empty\n.Body can't be empty or only a placeholder");
    }else if(blogTitleValue===""&&(blogBodyValue!==""||blogBodyValue!=="Type your blog here...")){
        setError(".Title can't be empty");
    }
    else if((blogBodyValue===""||blogBodyValue==="Type your blog here...")&&blogTitleValue!==""){
        setError(".Body can't be empty or only a placeholder");
    }else{
        addBlog(blogTitleValue,blogBodyValue,imgData);
        blogBodyValue= '';
        blogTitleValue = '';
        imgData = '';
        // clearInputs(blogTitleValue,blogBodyValue);
    }





});


blogImage.addEventListener('change', (event) => {
    const image = event.target.files[0]

    // Create file reader object
    const reader = new FileReader()

    // Convert image to data URL
    reader.readAsDataURL(image)

    reader.addEventListener('load', () => {
        // Save data URL to local storage
        imgData = reader.result;
    })
})





const setError = (msg)=>{
    let errorDiv = document.getElementById("add-blog-error");
    errorDiv.innerText="";
    errorDiv.innerText = "Please solve these errors\n"+msg
}

const addBlog = (title,body,imgData)=>{
    let newBlogItem = {
        title:title,
        body:body,
        image:imgData
    } ;
    blogs.push(newBlogItem);
    saveBlogs();
}


function saveBlogs() {                                            //saveblgs to local storage
    localStorage.setItem('blogs', JSON.stringify(blogs));
    displayBlogs();
}


function loadBlogs() {
    const storedBlogs = localStorage.getItem('blogs');
    blogs = storedBlogs ? JSON.parse(storedBlogs) : [];
}



function displayBlogs() {
    const recentBlogsList = document.querySelector(".d-recent-blogs-cont");
    recentBlogsList.innerHTML = '';

    blogs.forEach((blog, index) => {
        let blogItemDiv = document.createElement('div');
        blogItemDiv.classList.add('d-recent-blog-item');

        let imgCont = document.createElement('div');
        imgCont.classList.add('recent-blog-img');
        let htmlImage = document.createElement('img');

        if(blog.image){
            htmlImage.setAttribute('src',blog.image);
        }else{
            htmlImage.setAttribute('src','./images/images_portraits/portrait.png');
        }
        imgCont.appendChild(htmlImage);
        blogItemDiv.appendChild(imgCont);


        let recentBlogTitle = document.createElement('div');
        recentBlogTitle.classList.add('recent-blog-title');
        let recentBlogTitleHeader = document.createElement('h4');
        recentBlogTitleHeader.textContent = blog.title;
        let recentStatIcons = document.createElement('div');
        recentStatIcons.classList.add('r-blog-stat-icons');
        let rLikeIcon = document.createElement('i');
        rLikeIcon.textContent = '12';
        recentStatIcons.classList.add('fa-solid','fa-thumbs-up');
        let rCommentIcon = document.createElement('i');
        rCommentIcon.textContent='13';
        recentStatIcons.classList.add('fa-solid','fa-comments');

        recentStatIcons.appendChild(rLikeIcon);
        recentStatIcons.appendChild(rCommentIcon);

        recentBlogTitle.appendChild(recentBlogTitleHeader);
        recentBlogTitle.appendChild(recentStatIcons);
        


        let rBlogManageIcons = document.createElement('div');
        rBlogManageIcons.classList.add('r-blog-manage-icons');
        let rOpenIcon = document.createElement('i');
        rOpenIcon.classList.add('fa-solid','fa-square-arrow-up-right');
        let rEditIcon = document.createElement('i');
        rEditIcon.classList.add('fa-solid','fa-square-pen');
        let rDeleteIcon = document.createElement('i');
        rDeleteIcon.classList.add('fa-solid','fa-trash');

        rBlogManageIcons.appendChild(rOpenIcon);
        rBlogManageIcons.appendChild(rEditIcon);
        rBlogManageIcons.appendChild(rDeleteIcon);


        blogItemDiv.appendChild(recentBlogTitle);
        blogItemDiv.appendChild(rBlogManageIcons);
        recentBlogsList.appendChild(blogItemDiv);

        rDeleteIcon.addEventListener('click',(index)=>{
            blogs.splice(index,1);
            saveBlogs();
            displayBlogs();
        })
    });
}



export {blogs,loadBlogs};