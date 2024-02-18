
//The navbar rensponsiveness

const menuBtn = document.querySelector("#d-drop-left")
const dropMenu = document.querySelector(".drop-menu")
const menuBtnIcon = document.querySelector("#d-drop-left i")

menuBtn.onclick = function(){
    dropMenu.classList.toggle("open")
    const isOpen = dropMenu.contains("open")

    menuBtnIcon.classList = isOpen?"fa-solid fa-xmark":"fa-solid fa-bars"
}


    //Blog add validation, saving and loading

    
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
        blogBody.innerText= '';
        blogTitle.innerText = '';
        imgData = '';
        // clearInputs(blogTitleValue,blogBodyValue);
    }





});


blogImage.addEventListener('change', (event) => {
    const image = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(image)

    reader.addEventListener('load', () => {
        imgData = reader.result;
    })
})





const setError = (msg)=>{
    let errorDiv = document.getElementById("add-blog-error");
    errorDiv.innerText="";
    errorDiv.innerText = "Please solve these errors\n"+msg
}


//Add blogs
const addBlog = (title,body,imgData)=>{
    let newBlogItem = {
        title:title,
        comments:[],
        body:body,
        image:imgData,
        likeCount:0
    } ;
    blogs.unshift(newBlogItem);
    saveBlogs();
}


function saveBlogs() {                                            //saveblgs to local storage
    localStorage.setItem('blogs', JSON.stringify(blogs));
    displayBlogs();
}

//Fetch blogs from localstorage
function loadBlogs() {
    const storedBlogs = localStorage.getItem('blogs');
    blogs = storedBlogs ? JSON.parse(storedBlogs) : [];
}


//Display recent blogs in the recent blogs section

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
        // rLikeIcon.textContent = '12';
        recentStatIcons.classList.add('fa-solid','fa-thumbs-up');
        let rCommentIcon = document.createElement('i');
        // rCommentIcon.textContent='13';
        rCommentIcon.classList.add('fa-solid','fa-comments');

        recentStatIcons.appendChild(rLikeIcon);
        rLikeIcon.innerText=blog.likeCount;
        recentStatIcons.appendChild(rCommentIcon);
        rCommentIcon.innerText=blog.comments.length;
        

        recentBlogTitle.appendChild(recentBlogTitleHeader);
        recentBlogTitle.appendChild(recentStatIcons);
        


        let rBlogManageIcons = document.createElement('div');
        rBlogManageIcons.classList.add('r-blog-manage-icons');
        let rOpenIcon = document.createElement('i');
        rOpenIcon.classList.add('fa-solid','fa-square-arrow-up-right');
        rOpenIcon.onclick=function(){
            openBlog(index);
        }
        let rEditIcon = document.createElement('i');
        rEditIcon.classList.add('fa-solid','fa-square-pen');
        rEditIcon.onclick=function(){
            editBlog(index);
        }

        let rDeleteIcon = document.createElement('i');
        rDeleteIcon.classList.add('fa-solid','fa-trash');

        rBlogManageIcons.appendChild(rOpenIcon);
        rBlogManageIcons.appendChild(rEditIcon);
        rBlogManageIcons.appendChild(rDeleteIcon);


        blogItemDiv.appendChild(recentBlogTitle);
        blogItemDiv.appendChild(rBlogManageIcons);
        recentBlogsList.appendChild(blogItemDiv);

        rDeleteIcon.addEventListener('click',()=>{
            let index = blogs.indexOf(blog);
            blogs.splice(index,1);
            saveBlogs();
            displayBlogs();
        })
    });
}



function openBlog(i){
    window.location.href = 'admin-blog-view.html?username=&password=&blogIndex='+i;
}
function editBlog(i){
    window.location.href = 'admin-blog-edit.html?username=&password=&blogIndex='+i;
}



//Display messages

let receivedMessages = [];
loadMessages();
displayMessages();

function loadMessages(){
    const savedMessages = localStorage.getItem('sentMessages');
    receivedMessages = savedMessages?JSON.parse(savedMessages):[];
}

function saveMessage(){
    localStorage.setItem('sentMessages', JSON.stringify(receivedMessages));
}

function displayMessages(){
    let recentMessagesCont = document.querySelector('.recent-messages-cont');
    recentMessagesCont.innerHTML = '';


    receivedMessages.forEach((msg, index)=>{

    let messageItem = document.createElement('div');
    messageItem.classList.add('d-m-item');

    let messageId = document.createElement('div');
    messageId.classList.add('m-id');
    
    let messageIdName = document.createElement('p');
    messageIdName.classList.add('m-name');
    messageIdName.innerText = msg.sender.slice(0,7)+'...';
    messageIdName.addEventListener('click',()=>{
        openMessage(index);
    })
    let messageIdEmail = document.createElement('p');
    messageIdEmail.classList.add('m-email');
    messageIdEmail.innerText=msg.email.slice(0,5)+'...';
    let messageIdIcon = document.createElement('i');
    messageIdIcon.classList.add('fa-solid','fa-envelope-open-text');
    messageId.appendChild(messageIdName);
    messageId.appendChild(messageIdEmail);
    messageId.appendChild(messageIdIcon);

    let messageBody = document.createElement('div');
    messageBody.classList.add('m-body');
    messageBody.innerText = msg.message.slice(0,100)+'...';

    messageItem.appendChild(messageId);
    messageItem.appendChild(messageBody);

    recentMessagesCont.appendChild(messageId);
    recentMessagesCont.appendChild(messageBody);

})

}

function openMessage(i){
    window.location.href = 'd-m-view2.html?msgIndex='+i;
}




// export {blogs,loadBlogs};