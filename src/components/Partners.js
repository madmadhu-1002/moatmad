
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import styles from '@/styles/Partners.module.css'

const Partners = () => {
    const [partnerLogos, setPartnerLogos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerSlide = 4;
    const slideInterval = 3000; // Interval time in milliseconds

    useEffect(() => {
        const fetchPartnerLogos = async () => {
            try {
                const response = await axios.get('https://admin.moatamad.com/api/getCompanyLogos');
                setPartnerLogos(response.data.data);
            } catch (error) {
                console.error('Error fetching partner logos:', error);
            }
        };

        fetchPartnerLogos();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, slideInterval);

        return () => clearInterval(interval);
    }, [currentIndex, partnerLogos.length]);

    const handleNext = () => {
        if (currentIndex + itemsPerSlide < partnerLogos.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(partnerLogos.length - itemsPerSlide);
        }
    };

    const visibleLogos = partnerLogos.slice(currentIndex, currentIndex + itemsPerSlide);

    return (
        <Row className={styles.partnerSlider}>
            <h3 className="text-center mt-5 mb-5">OUR PARTNERS</h3>
            <div className={styles.sliderContainer}>
                <button className="prev-btn" onClick={handlePrev}>❮</button>

                <div className="slider">
                    <div
                        className={`${styles.sliderItems} ${styles.smoothTransition}`}
                        style={{
                            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
                            width: `${partnerLogos.length * (100 / itemsPerSlide)}%`,
                        }}
                    >
                        {partnerLogos.map((logo) => (
                            <div
                                key={logo.id}
                                className={styles.sliderItem}
                                style={{ width: `${100 / itemsPerSlide}%` }}
                            >
                                <a href={logo.link || "#"} className="anchor-tage-box-shadow">
                                    <img
                                        src={logo.image}
                                        className={styles.cardImgTop}
                                        alt={logo.title_en || "Partner logo"}
                                        loading="lazy"
                                        style={{ maxHeight: '80px' }}
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="next-btn" onClick={handleNext}>❯</button>
            </div>
        </Row>
    );
};

export default Partners;
