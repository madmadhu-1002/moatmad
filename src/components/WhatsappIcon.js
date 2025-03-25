"use client"

import Image from "next/image";

const WhatsappIcon = ({footer}) => {
  const fottermobile = footer && footer.socail_media_links.content.whats_app_number
    const message = 'Hello, I would like to know more about your services.'; // Default message

    const whatsappLink = `https://wa.me/${fottermobile}?text=${encodeURIComponent(message)}`;
  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={styles.icon}>
      <Image src='/assets/logo/whatsaap-icon-logo_895118-4053__1_-removebg-preview.png' alt="whatsapp icon" width={50} height={50} />
    </a>
    
  )
}

const styles = {
    icon: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 1000,
    },
  };

export default WhatsappIcon