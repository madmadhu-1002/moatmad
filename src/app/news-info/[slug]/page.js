import BlogDetails from '@/components/BlogDetails';
import { fetchBlog, fetchBlogDetails } from '@/utils/fetchApi';


const page = async ({ params }) => {
    const {slug} = params;
    const {blogs} = await fetchBlog();
    const blogscontent = await fetchBlogDetails(slug);
    const remainingBlogContent = blogs && blogs.filter(
        (blog) => blog.slug !== slug
    );
    
return (
    <>
    <BlogDetails remainingBlogContent={remainingBlogContent} blogscontent={blogscontent} />
    </>
)
}

export default page