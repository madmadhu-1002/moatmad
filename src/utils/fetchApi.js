async function fetchMenus() {
  const res = await fetch("https://admin.moatamad.com/api/getMenus", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch menu");
  const data = await res.json();
  return data.data.menus;
}

async function fetchFooter() {
    const res = await fetch("https://admin.moatamad.com/api/geFooterData", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch footer");
    const data = await res.json();
    return data.data;
}

async function fetchAbout(){
    const res = await fetch("https://admin.moatamad.com/api/getAboutUsPageDataBySlug/about-us", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch about seo");
    const data = await res.json();
    return data.data.original.data;
}

async function fetchBlog(){
  const res = await fetch("https://admin.moatamad.com/api/getBlogsPageDataBySlug/blog", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch about blog");
    const data = await res.json();
    return data.data;
}

async function fetchCareer(){
  const res = await fetch("https://admin.moatamad.com/api/getCareerPageDataBySlug/careers", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch about blog");
    const data = await res.json();
    return data.data;
}

async function fetchFinance(){
  const res = await fetch("https://admin.moatamad.com/api/getFinancePageDataBySlug/finance", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch finance");
    const data = await res.json();
    return data.data;
}

async function fetchDealer(){
  const res = await fetch("https://admin.moatamad.com/api/getDealersPageDataBySlug/dealer", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch dealer");
    const data = await res.json();
    return data.data;
}

async function fetchCompareSeo(){
  const res = await fetch("https://admin.moatamad.com/api/getComparePageDataBySlug/compare", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch dealer");
    const data = await res.json();
    return data.data;
}

async function fetchOffers(){
  const res = await fetch("https://admin.moatamad.com/api/getOffersPageDataBySlug/offers", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch offers");
    const data = await res.json();
    return data.data;
}

async function fetchSellSeo(){
  const res = await fetch("https://admin.moatamad.com/api/getSellPageDataBySlug/sell", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch Sell seo");
    const data = await res.json();
    return data.data;
}

async function fetchUsedCar(){
  const res = await fetch("https://admin.moatamad.com/api/getBuyersGuidePageDataBySlug/used-car-inspections-and-tests", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch used car inspection tests");
    const data = await res.json();
    return data.data;
}

async function fetchPaperWork(){
  const res = await fetch("https://admin.moatamad.com/api/getBuyersGuidePageDataBySlug/paperwork", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch used car paper work");
    const data = await res.json();
    return data.data;
}

async function fetchCarRating(){
  const res = await fetch("https://admin.moatamad.com/api/getBuyersGuidePageDataBySlug/car-rating-methodology", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch used car Raing methodology");
    const data = await res.json();
    return data.data;
}

async function fetchBuy(){
  const res = await fetch("https://admin.moatamad.com/api/getBuyPageDataBySlug/buy", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch buy data");
    const data = await res.json();
    return data.data;
}

async function fetchHome(){
  const res = await fetch("https://admin.moatamad.com/api/getHomePageDataBySlug/homes", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch Home");
    const data = await res.json();
    return data.data;
}


  export { fetchMenus, fetchFooter, fetchAbout, fetchBlog, fetchCareer, fetchFinance, fetchDealer, fetchCompareSeo, fetchOffers, fetchSellSeo, fetchUsedCar, fetchPaperWork,fetchCarRating, fetchBuy, fetchHome };
