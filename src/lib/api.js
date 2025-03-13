export async function fetchHeaderData() {
    try {
      const res = await fetch("https://admin.moatamad.com/api/getHeaderData", {
        cache: "no-store", // Ensures fresh data on every request
      });
  
      const metaData = await res.json();
  
      if (metaData?.data?.header_section?.content) {
        return metaData.data.header_section.content.geo_tag1 || metaData.data.header_section.content.geo_tag2;
      }
    } catch (error) {
      console.error("Error fetching header data:", error);
    }
  
    return null;
  }
  