// import {blogs,loadBlogs} from './Dashboard-landing.js' 

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
displayBlogs();


function loadBlogs() {
    const storedBlogs = localStorage.getItem('blogs');
    blogs = storedBlogs ? JSON.parse(storedBlogs) : [];
}

function displayBlogs() {
    const blogsList = document.querySelector("#all-blogs-cont");
    blogsList.innerHTML = '';

    let newBlog = blogs[0];
    const newBlogCont = document.querySelector('.new-blog')
    newBlogCont.innerHTML = '';
    const newBlogImgCont = document.createElement('div');
    newBlogImgCont.classList.add('new-blog-img');
    let newBlogImg = document.createElement('img')
    newBlogImg.setAttribute('src',newBlog.image);

    newBlogImgCont.appendChild(newBlogImg);

    const newBlogTextCont =document.createElement('div');
    newBlogTextCont.classList.add('new-blog-text-cont');
    const newBlogtext = document.createElement('div');
    newBlogtext.setAttribute('id','new-blog-text');
    let newBlogHeader = document.createElement('h1');
    newBlogHeader.innerText =newBlog.title
    let newBlogSummary = document.createElement('p');
    newBlogSummary.innerText = newBlog.body.slice(0,50);

    newBlogtext.appendChild(newBlogHeader);
    newBlogtext.appendChild(newBlogSummary);

    const readMore = document.createElement('button');
    readMore.setAttribute('id','new-blog-more');
    readMore.innerText='Read More...'


    newBlogTextCont.appendChild(newBlogtext);
    newBlogTextCont.appendChild(readMore);

    newBlogCont.appendChild(newBlogImgCont);
    newBlogCont.appendChild(newBlogTextCont);
    












    blogs.forEach((blog, index) => {
        let blogArticleSum = document.createElement('article');
        blogArticleSum.classList.add('blog-article-summary');
        

        blogArticleSum.onclick = ()=>{
            let i = blogs.indexOf(blog);
            window.location.href = "individual-blog.html?blogIndex="+i;
        }



        let imgCont = document.createElement('div');
        imgCont.classList.add('blog-img');
        let htmlImage = document.createElement('img');

        if(blog.image){
            htmlImage.setAttribute('src',blog.image);
        }else{
            htmlImage.setAttribute('src','./images/images_portraits/portrait.png');
        }
        imgCont.appendChild(htmlImage);
        blogArticleSum.appendChild(imgCont);


        let blogSummary = document.createElement('div');
        blogSummary.classList.add('blog-summary');

        let blogSummaryText = document.createElement('div');
        blogSummaryText.classList.add('blog-summary-text');

        let blogSummaryHeader = document.createElement('h4');
        blogSummaryHeader.innerText = (blog.title);
        let blogSummaryBody = document.createElement('p');
        blogSummaryBody.innerText = blog.body.slice(0,150)+'.....';

        blogSummaryText.appendChild(blogSummaryHeader);
        blogSummaryText.appendChild(blogSummaryBody);
        blogSummary.appendChild(blogSummaryText);

        let blogSummaryAnalytics = document.createElement('div');
        blogSummaryAnalytics.classList.add('blog-summary-analytics');

        let likeAnalyticsCont = document.createElement('div');
        likeAnalyticsCont.classList.add('analytic-cont');
        let likeIconCont = document.createElement('p');
        let dlikeIcon = document.createElement('i');
        dlikeIcon.classList.add('fa-solid','fa-thumbs-up')
        likeIconCont.textContent='12';
        likeIconCont.appendChild(dlikeIcon);
        
        likeAnalyticsCont.appendChild(likeIconCont);

        let commentAnalyticsCont = document.createElement('div');
        commentAnalyticsCont.classList.add('analytic-cont');
        let commentIconCont = document.createElement('p');
        let dCommentIcon = document.createElement('i');
        dCommentIcon.classList.add('fa-solid','fa-comments');
        commentIconCont.textContent='12';
        commentIconCont.appendChild(dCommentIcon);
        
        commentAnalyticsCont.appendChild(commentIconCont);

        let dateAnalyticsCont = document.createElement('div');
        dateAnalyticsCont.classList.add('analytic-cont');
        let dateIconCont = document.createElement('p');
        dateIconCont.textContent='12/12/2024';
        dateAnalyticsCont.appendChild(dateIconCont);

        blogSummaryAnalytics.appendChild(likeAnalyticsCont);
        blogSummaryAnalytics.appendChild(commentAnalyticsCont);
        blogSummaryAnalytics.appendChild(dateAnalyticsCont);

        blogArticleSum.appendChild(imgCont);
        blogArticleSum.appendChild(blogSummary);
        blogArticleSum.appendChild(blogSummaryAnalytics);

        blogsList.appendChild(blogArticleSum);
       
        


    });

    
}
