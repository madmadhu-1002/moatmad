import Footer from "./Footer";
import {fetchFooter} from "@/utils/fetchApi.js"


export default async function ServerFooter() {
  const footer = await fetchFooter();
  return <Footer footer={footer} />;
}