import {fetchCareer} from '@/utils/fetchApi';
import Career from '@/components/Career';

export async function generateMetadata() {
    const { seo } = await fetchCareer();
  
    return {
      title: seo?.meta_title || "Default Title",
      description: seo?.meta_description || "Default description",
      keywords: seo?.meta_keywords || "",
      robots: seo?.robots || "index, follow",
      alternates: {
        canonical: seo?.canonical_url || "",
      }
    };
  }

  const Page = async () => {
    const {jobs} = await fetchCareer();
    
    
    return (
      <>
      <Career jobs={jobs}/>
      </>
    )
  }
  
  
  
  export default Page