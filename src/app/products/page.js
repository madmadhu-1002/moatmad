// app/page.js (Next.js 15 Server Component)
async function fetchData() {
    const res = await fetch('https://badcow-frontend.vercel.app/api/products', { cache: 'no-store' }); // No cache, always fresh
    const data = await res.json();
    return data;
  }
  
  export default async function Page() {
    const data = await fetchData();
    console.log(data);
    return <div>Data:
        <p>{data[0].title}</p>
    </div>;
  }
  