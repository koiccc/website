const blogSection = document.querySelector('.blogs-section');

db.collection("blogs").get().then((blogs) => {
    blogs.forEach(blog => {
        if(blog.id !== decodeURI(location.pathname.split("/").pop())) {
            createBlog(blog);
        }
    });
});

const createBlog = (blog) => {
    let data = blog.data();

    // Check if title and article exist and provide fallback values if not
    const blogTitle = data.title || 'Untitled Blog'; // Default value if title is missing
    const blogArticle = data.article || 'No content available'; // Default value if article is missing

    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage || 'default-image.png'}" class="blog-image" alt="Blog Banner">
        <h1 class="blog-title">${blogTitle.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${blogArticle.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
};