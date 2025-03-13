import Header from "./Header";

async function fetchMenus() {
  const res = await fetch("https://admin.moatamad.com/api/getMenus", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch menu");
  const data = await res.json();
  return data.data.menus;
}

export default async function ServerHeader() {
  const menus = await fetchMenus();
  return <Header menus={menus} />;
}