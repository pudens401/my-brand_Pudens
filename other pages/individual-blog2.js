// const loadBlogs = fetch("https://my-brand-backend-qcoe.onrender.com/blogs")
//                     .then((res)=>res.json())
//                     .then(data=>{
//                         console.log(data)
//                         displayBlogs(data);
//                     });

let urlParams = new URLSearchParams(window.location.search);
let blogIndex = urlParams.get('blogIndex');
let blogId = urlParams.get('blogId')

const commentSpaceCont = document.querySelector('.comment-space-cont');
const commentArea = document.getElementById('comment-input');
const commentBtn = document.getElementById('comment-send');
let cBlog;
const loadBlog = fetch(`https://my-brand-backend-qcoe.onrender.com/blogs/${blogId}`)
                    .then((res)=>res.json())
                    .then(data=>{
                        console.log(data.data)
                        cBlog = data.data
                        displayBlog(data.data);
                        
});

function displayBlog(blog){
    
    
    const blogMain = document.querySelector('.blog-main');
    blogMain.innerHTML = '';
    
    const blogMainImageCont = document.createElement('div');
    blogMainImageCont.classList.add('blog-main-img');
    let blogMainImage = document.createElement('img');

    blogMainImage.setAttribute('src',blog.image.url);
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
        // window.location.reload();
        addComment(blogId);
        
        // displayComments();
    }); 

    function addComment(id){
        let commentAreaValue = commentArea.value.trim();
        if(commentAreaValue===''){
            setError("Comment can't be empty");
        }else{
            
            let newComment ={
                cName:'Anonymous User',
                cBody:commentAreaValue,
                date:new Date()
            }
            sendComment(id,newComment)
            
            
            
        }
    }  
}

function sendComment(id,comment){
    const url = `https://my-brand-backend-qcoe.onrender.com/blogs/${id}/comments`
    const data = comment
    const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }

    fetch(url,options)
    .then(response=>{
        console.log(response);
        if(response.status!==201){
            setError("Not logged in")
        }else{
            setSuccess("Comment sent")
        }
        return response.json()
    })
    .then((data)=>{
        console.log(data)
    })
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


const loadComments= fetch(`https://my-brand-backend-qcoe.onrender.com/blogs/${blogId}/comments`)
                    .then((res)=>res.json())
                    .then(data=>{
                        console.log(data.data);
                        allComments = data.data;
                        displayComments(data.data);
                        displayAnalytics(cBlog);
                    }
)

function displayComments(comments){
    allComments = comments
    
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
        cName.innerText = comment.commenter;
    
        cnameCont.appendChild(pPicCont);
        cnameCont.appendChild(cName);
    
        // const dateCont = document.createElement('p');
        // dateCont.innerText = comment.date.slice(0,10);
    
        commentHeader.appendChild(cnameCont);
        // commentHeader.appendChild(dateCont);
    
        const commentBody = document.createElement('div');
        commentBody.classList.add('comment-body');
        let commentBodyText = document.createElement('p');
        commentBody.appendChild(commentBodyText);
        commentBody.innerText = comment.commentBody;

    
        commentItem.appendChild(commentHeader);
        commentItem.appendChild(commentBody); 

        commentsCont.appendChild(commentItem);
    });
    

}

function displayAnalytics(blog){
    let bId = blog._id
    const analyticsCont = document.querySelector('.comment-analytics');
    analyticsCont.innerHTML = '';

    const likeCont = document.createElement('div');
    likeCont.classList.add('analytic-cont');
    let likeBtnCont = document.createElement('p');
    likeBtnCont.onclick = function (){
        const url = `https://my-brand-backend-qcoe.onrender.com/blogs/${bId}/like`
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        }

        fetch(url,options)
        .then(response=>{
            console.log(response);
            return response.json()
        })
        .then((data)=>{
            console.log(data)
        })
            // window.location.reload();
    }

    likeBtnCont.innerText  = blog.likes.length;
    const likeBtn = document.createElement('i');
    likeBtn.classList.add("fa-solid","fa-thumbs-up");
    likeBtnCont.appendChild(likeBtn);
    likeCont.appendChild(likeBtnCont);

    const commentCont = document.createElement('div');
    commentCont.classList.add('analytic-cont');
    let commentBtnCont = document.createElement('p');
    commentBtnCont.innerText = allComments.length;
    
    const commentBtn = document.createElement('i');
    commentBtn.classList.add("fa-solid","fa-comment");
    commentBtnCont.appendChild(commentBtn);
    commentCont.appendChild(commentBtnCont);

    // const blogDateCont = document.createElement('div');
    // const blogDate = document.createElement('p');
    // blogDate.innerText = '12/12/24';

    analyticsCont.appendChild(likeCont);
    analyticsCont.appendChild(commentCont);
    // analyticsCont.appendChild(blogDateCont);
}



