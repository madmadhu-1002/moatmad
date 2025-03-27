
import BrandDetails from "@/components/BrandDetails";
import { fetchBrandDetails } from "@/utils/fetchApi";

export async function generateMetadata({ params: { slug } }) {
    const { seo } = await fetchBrandDetails(slug);
  console.log(seo.canonical_url);
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

const page = async ({params}) => {
    const { slug } = params;  // Dynamic slug from URL
    const vehicledata = await fetchBrandDetails(slug);

    return (
        <div>
            <BrandDetails vehicledata={vehicledata}/>
        </div>
    )
}

export default page