

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
// let login_user = urlParams.get('user');
// let login_type = urlParams.get('type');

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

        window.location.href = 'individual-blog.html?blogIndex='+blogIndex;
    })
    login_btn2.addEventListener('click',()=>{
        localStorage.removeItem('current_user');
        localStorage.removeItem('current_type');

        window.location.href = 'individual-blog.html?blogIndex='+blogIndex;
    })
}





const commentSpaceCont = document.querySelector('.comment-space-cont');
const commentArea = document.getElementById('comment-input');
const commentBtn = document.getElementById('comment-send');


displayBlog(blogIndex);
displayComments(blogIndex);
displayAnalytics(blogIndex);


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


    


    //Commenting section
    
    

    commentBtn.addEventListener('click',()=>{
        addComment(blogIndex);
        displayComments();
    }); 

    function addComment(index){
        let commentAreaValue = commentArea.value.trim();
        if(commentAreaValue===''){
            setError("Comment can't be empty");
        }else{
            setSuccess();
            let newComment ={
                cName:login_user_og?login_user_og:'Anonymous User',
                cBody:commentAreaValue,
                date:new Date()
            }
            blogs[index].comments.unshift(newComment);
            saveBlogs();
            
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

function saveBlogs() {                                            //saveblgs to local storage
    localStorage.setItem('blogs', JSON.stringify(blogs));
}


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
        dateCont.innerText = comment.date.slice(0,10);
    
        commentHeader.appendChild(cnameCont);
        commentHeader.appendChild(dateCont);
    
        const commentBody = document.createElement('div');
        commentBody.classList.add('comment-body');
        let commentBodyText = document.createElement('p');
        commentBody.appendChild(commentBodyText);
        commentBody.innerText = comment.cBody;

    
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
    likeBtnCont.onclick = function (){
        blogs[blogIndex].likeCount++;
        saveBlogs();
    }
    likeBtnCont.innerText  = blogs[i].likeCount;
    const likeBtn = document.createElement('i');
    likeBtn.classList.add("fa-solid","fa-thumbs-up");
    likeBtnCont.addEventListener('click',()=>{
        blogs[blogIndex].likeCount++;
    })
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