import BlogDetails from '@/components/BlogDetails';
import { fetchBlog, fetchBlogDetails } from '@/utils/fetchApi';

export async function generateMetadata({ params: { slug } }) {
    const blogscontent = await fetchBlogDetails(slug);
    return {
      title: blogscontent?.meta_title || "Default Title",
      description: blogscontent?.meta_description || "Default description",
      keywords: blogscontent?.meta_keywords || "",
      robots: blogscontent?.robots || "index, follow",
      alternates: {
        canonical: blogscontent?.canonical_url || "",
      }
    };
  }

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