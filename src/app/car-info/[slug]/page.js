"use client"
import { useRouter } from "next/navigation";

const page = ({params}) => {
    const { slug } = params;  // Dynamic slug from URL
    

    return (
        <div>
            
            <p>Fetching details for: {slug}</p>
        </div>
    )
}

export default page