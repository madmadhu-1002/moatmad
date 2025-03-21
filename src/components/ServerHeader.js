import Header from "./Header";
import {fetchMenus} from "@/utils/fetchApi.js"


export default async function ServerHeader() {
  const menus = await fetchMenus();
  return <Header menus={menus} />;
}