
import DealerDetails from "@/components/DealerDetails";
import { fetchDealerDetails } from "@/utils/fetchApi";

export async function generateMetadata() {
  const { seo } = await fetchDealerDetails();

  return {
    title: seo?.meta_title || "Default Title",
    description: seo?.meta_description || "Default description",
    keywords: seo?.meta_keywords || "",
    robots: seo?.robots || "index, follow",
    alternates: {
      canonical: seo?.canonical_url || "",
    },
    openGraph: {
      title: seo?.og_title || seo?.meta_title || "Default OG Title",
      description: seo?.og_description || seo?.meta_description || "Default OG Description",
      images: seo?.og_image
        ? [{ 
            url: seo?.og_image, 
            alt: seo?.image_alt || "Default Image Alt Text" 
          }]
        : [],
      locale: seo?.og_locale || "en_US",
      type: seo?.og_type || "website",
      url: seo?.og_url || "",
    }
  };
}

const Page = async () => {
    const {vehicle_details} = await fetchDealerDetails();
    
    
    return (
      <>
      <DealerDetails dealerdata={vehicle_details}/>
      </>
    )
  }
  
  
  
  export default Page