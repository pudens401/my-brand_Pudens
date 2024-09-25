const loadBlogs = fetch("https://my-brand-backend-qcoe.onrender.com/blogs")
                    .then((res)=>res.json())
                    .then(data=>{
                        console.log(data)
                        displayBlogs(data);
                    });





function displayBlogs(blogs) {
    const blogsList = document.querySelector("#all-blogs-cont");
    blogsList.innerHTML = '';

    let newBlog = blogs[0];
    const newBlogCont = document.querySelector('.new-blog')
    newBlogCont.innerHTML = '';
    const newBlogImgCont = document.createElement('div');
    newBlogImgCont.classList.add('new-blog-img');
    let newBlogImg = document.createElement('img')
    newBlogImg.setAttribute('src',newBlog.image.url);

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
    












    blogs.forEach((blog) => {
        let blogArticleSum = document.createElement('article');
        blogArticleSum.classList.add('blog-article-summary');
        

        blogArticleSum.onclick = ()=>{
            let i = blogs.indexOf(blog);
            let j = blog._id;
            window.location.href = "individual-blog.html?blogIndex="+i+"&blogId="+j;
        }



        let imgCont = document.createElement('div');
        imgCont.classList.add('blog-img');
        let htmlImage = document.createElement('img');
        htmlImage.setAttribute('src',blog.image.url);
       
        imgCont.appendChild(htmlImage);
        blogArticleSum.appendChild(imgCont);


        let blogSummary = document.createElement('div');
        blogSummary.classList.add('blog-summary');

        let blogSummaryText = document.createElement('div');
        blogSummaryText.classList.add('blog-summary-text');

        let blogSummaryHeader = document.createElement('h4');
        blogSummaryHeader.innerText = blog.title;
        let blogSummaryBody = document.createElement('p');
        blogSummaryBody.innerText = blog.body.slice(0,100)+'.....';

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
        likeIconCont.textContent=blog.likes.length;
        likeIconCont.appendChild(dlikeIcon);
        
        likeAnalyticsCont.appendChild(likeIconCont);

        // let commentAnalyticsCont = document.createElement('div');
        // commentAnalyticsCont.classList.add('analytic-cont');
        // let commentIconCont = document.createElement('p');
        // let dCommentIcon = document.createElement('i');
        // dCommentIcon.classList.add('fa-solid','fa-comments');
        // commentIconCont.textContent=blog.comments.length;
        // commentIconCont.appendChild(dCommentIcon);
        
        // commentAnalyticsCont.appendChild(commentIconCont);

        // let dateAnalyticsCont = document.createElement('div');
        // dateAnalyticsCont.classList.add('analytic-cont');
        // let dateIconCont = document.createElement('p');
        // dateIconCont.textContent=blog.date.slice(0,10);
        // dateAnalyticsCont.appendChild(dateIconCont);

        blogSummaryAnalytics.appendChild(likeAnalyticsCont);
        // blogSummaryAnalytics.appendChild(commentAnalyticsCont);
        // blogSummaryAnalytics.appendChild(dateAnalyticsCont);

        blogArticleSum.appendChild(imgCont);
        blogArticleSum.appendChild(blogSummary);
        blogArticleSum.appendChild(blogSummaryAnalytics);

        blogsList.appendChild(blogArticleSum);
       
        


    });

    
}

                