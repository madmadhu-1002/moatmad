"use client"

import { Accordion, Card, Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { useState, useEffect } from "react";
import Slider from "react-slick";
import Link from 'next/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { FaHandPointRight } from "react-icons/fa";
import Partners from './Partners';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { FaEye } from "react-icons/fa";
import styles from '@/styles/Products.module.css';
import AOS from "aos";
import "aos/dist/aos.css";

const Products = ({ homepage, vehicles }) => {
  const [slug, setSlug] = useState(1);
  const [loading, setLoading] = useState(false);
  const [carbodytypes, setCarBodyTypes] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Ensures animation happens only once
    });
  }, []);

  useEffect(() => {
    AOS.init();
    setLoading(true); // Set loading to true before making the API call
    
    axios.get(`https://admin.moatamad.com/api/getCarBodyTypesWithVehiclesData/${slug}`)
        .then(carbodyresponse => {
            setCarBodyTypes(carbodyresponse.data);
            setLoading(false); // Set loading to false after data is fetched
        })
        .catch(error => {
            // Handle error
            setLoading(false); // Set loading to false in case of error
        });
}, [slug]);


  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    accessibility: true,
    responsive: [
      {
        breakpoint: 768, // Mobile and smaller screens
        settings: {
          slidesToShow: 1, // Show one slide
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
        {
          breakpoint: 1016, // Tablets and smaller screens
          settings: {
            slidesToShow: 2, // Show two slides
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576, // Mobile and smaller screens
          settings: {
            slidesToShow: 1, // Show one slide
            slidesToScroll: 1,
          },
        },
      ],
  };

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
        {
            breakpoint: 1240, // Tablets and smaller screens
            settings: {
              slidesToShow: 3, // Show two slides
              slidesToScroll: 1,
            },
          },
        {
          breakpoint: 1016, // Tablets and smaller screens
          settings: {
            slidesToShow: 2, // Show two slides
            slidesToScroll: 1,
          },
        },
        {
            breakpoint: 768, // Tablets and smaller screens
            settings: {
              slidesToShow: 1, // Show two slides
              slidesToScroll: 1,
            },
          },
        {
          breakpoint: 576, // Mobile and smaller screens
          settings: {
            slidesToShow: 1, // Show one slide
            slidesToScroll: 1,
          },
        },
      ],
  };
  console.log(vehicles);
  return (
    <>
      <section className={`${styles.addBrandSlides} mt-3`} style={{height:"70px"}}>
        <Slider {...settings}>
          {vehicles.map((image, index) => (
            <div className='pe-2' key={index}>
            <Card as={Link} href={`car-info/${image.slug}`} key={index} >
              <Container >
                <Row className={styles.homePageAddRow}>
                  <Col lg={3} xs={4} sm={4}>
                    <Image
                      src={image.car_image}
                      alt={image.alt || `Slide ${index}`}
                      width={100}
                      height={50}
                      style={{ objectFit: "cover" }}
                    />
                  </Col>
                  <Col lg={5} xs={4} sm={4}>
                    <h5 className={styles.homeAddHeading}>
                      {image.body_type_en} {image.car_title_en}
                    </h5>
                    <p className="full-price">
                      AED{" "}
                      <span>
                        {image.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                    </p>
                  </Col>
                  <Col lg={4} xs={4} sm={4}>
                    <h5>{image.fuel_en}</h5>
                    <p>
                      EMI: <span style={{ fontSize: "12px" }}>AED</span>{" "}
                      <span className="emi-rate">
                        {Number(image.emi_amount) >= 1000 ? Number(image.emi_amount).toLocaleString("en-US") : Number(image.emi_amount).toFixed(0)}

                      </span>{" "}
                      <span className="per-month">per month</span>
                    </p>

                  </Col>
                </Row>
              </Container>
            </Card>
            </div>
          ))}
        </Slider>
      </section>
      <div className={`mt-5 mb-5 ${styles.productsHeading}`}>
        <h6 >{homepage && homepage.CarsMakesAndModels.category_title_en}</h6>
        {homepage && homepage.CarsMakesAndModels.highlight_en && <div className={styles.findCarHedaing} style={{ fontSize: "24px" }} dangerouslySetInnerHTML={{ __html: homepage.CarsMakesAndModels.highlight_en }} />}
      </div>
      {/* find best vehicles */}
      <Container fluid className={styles.tabesContainer}>
            <Tab.Container id="left-tabs-example" defaultActiveKey={homepage?.CarBodyTypes[0]?.id}>
                <Row>
                    <Col sm={12} className={styles.productsBrandMenu}>
                        <Nav variant="pills" className="flex-row ">
                            {homepage && homepage.CarBodyTypes.map((item) => (
                                <Nav.Item key={item.id} className={`{styles.navItem1} mb-3 col`}>
                                    <Nav.Link eventKey={item.id} onClick={() => setSlug(item.id)}>
                                        {item.body_type_en}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Col>
                    <Col sm={12} style={{ padding: "0px" }}>
                        <Tab.Content className='mt-5'>
                            <Tab.Pane eventKey={slug}>
                                {loading ? (
                                    <div className='text-center'>
                                        <RotatingLines
                                            visible={true}
                                            height="50"
                                            width="50"
                                            color="red"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            ariaLabel="rotating-lines-loading"
                                        />
                                    </div>
                                ) : carbodytypes.length > 0 ? (
                                    <Slider { ...settings2} data-aos="zoom-in">
                                        {carbodytypes.map((item) => (
                                             <div key={item.id} style={{ width: "316px", margin: "0 auto" }} className='p-1'> 
                                            <Card as={Link} href={`/car-info/${item.slug}`} style={{ textDecoration: 'none', padding: "0px", }} className={`best-vehicles-card ${styles.item}`} key={item.id}>
                                                <Card.Header className={styles.productsCardHeader} style={{ position: 'relative' }}>
                                                    <Image src={item.car_image} style={{ height: "100%" }} alt={item.car_title_en} width={457} height={293}/>
                                                    <h6 className={styles.availableH6}>available</h6>
                                                    <div className={styles.faEyeIconDiv}>
                                                        <FaEye className='fa-eye-icon' />
                                                    </div>
                                                </Card.Header>
                                                <div className={styles.brandNameDiv}>
                                                    <h6>{item.car_title_en}</h6>
                                                </div>
                                                <div className='pricing-section' style={{ padding: "0px 20px", textAlign: "center" }}>
                                                    <h6 className='full-amount-price'>
                                                        <span style={{ fontSize: "12px" }}>AED</span>&nbsp;
                                                        <span style={{ fontSize: "16px", fontWeight: '500', color: "red" }}>
                                                            {item.price.toLocaleString()}
                                                        </span>
                                                    </h6>
                                                    <h6 className='emi-price'>
                                                        EMI : <span style={{ fontSize: "12px" }}>AED</span>
                                                        <span className='emi-price' style={{ fontSize: "24px", fontWeight: '500', color: "red" }}>
                                                            {Number(item.emi_amount).toLocaleString("en-US")}
                                                        </span>
                                                        <span style={{ fontSize: "10px" }}> per month</span>
                                                    </h6>
                                                </div>
                                                <div className={`{styles.infoWithIcon} mt-3 p-2 `} style={{fontSize:"10px"}}>
                                                    <Row>
                                                      <Col className='d-flex align-items-center justify-content-center w-100 p-0'>
                                                        <CarFeature icon="/assets/product-feture-icons/kms.png" value={item.kilometers.toLocaleString()} />
                                                        <CarFeature icon="/assets/product-feture-icons/autogere.png" value={item.transmission_en} />
                                                        <CarFeature icon="/assets/product-feture-icons/calender.png" value={item.year} />
                                                        <CarFeature icon="/assets/product-feture-icons/engine.png" value={item.engine && item.engine.includes(',') ? item.engine.split(',')[1] : item.engine} />
                                                        <CarFeature icon="/assets/product-feture-icons/globe.png" value={item.regional_specs_en} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card>
                                            </div>
                                        ))}
                                    </Slider>
                                ) : (
                                    <h4 className='text-center'>No data available</h4>
                                )}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>

      {/* who are we */}
      {homepage &&
        <Container fluid className={`${styles.whoAreSection} mt-5`}>
          <Row style={{ width: '100%', margin: '0', padding: "0px 15px 0px 18px" }} className='mt-5 mb-5'>
            <Col lg={6} md={6}>
              <div>
                <h3>{homepage.WhoAreWe.category_title_en}</h3>

                <div
                  className="find-car-heading"
                  style={{ fontSize: "16px" }}
                  dangerouslySetInnerHTML={{
                    __html:
                      homepage.WhoAreWe &&
                      homepage.WhoAreWe.content &&
                      homepage.WhoAreWe.content.section_01_short_description_en,
                  }}
                />
                <h6 className={styles.knowMore} ><Link href={'/about-us'} style={{ textDecoration: "none ", color: "white" }}>KNOW MORE</Link></h6>
              </div>

            </Col>
            <Col lg={6} md={6} style={{ display: 'flex', justifyContent: 'end' }}>
              <Image src={homepage.WhoAreWe && homepage.WhoAreWe.image.section_01_image} className='who-we-are-image' width={458} height={293} alt='who are we image'/>
            </Col>
          </Row>

        </Container>
      }
      {/* partners */}
      <Partners />

      {/* faqs */}
      {homepage &&
                <Container fluid className={styles.homepageFaqs}>
                    <Row style={{ display: "flex", justifyContent: 'center' }}>
                        <div className={`mt-5 mb-5 ${styles.productsHeading}`}>
                            <h6 className='text-uppercase'>{homepage.faqSection.category_title_en}</h6>
                            {homepage.faqSection && <div className='text-center' style={{ fontSize: "24px" }} dangerouslySetInnerHTML={{ __html: homepage.faqSection.highlight_en }} />}
                        </div>
                        <Col lg={10}>
                            <Accordion defaultActiveKey="1">
                                {homepage.faqSection.faqs.map((item) => {
                                    return (
                                        <Accordion.Item key={item.id} eventKey={item.id}>
                                            <Accordion.Header>Q. {item.question_en}</Accordion.Header>
                                            <Accordion.Body className={styles.accordionBodyHomepage}>
                                                <div className='right-hand-icon'>
                                                    <FaHandPointRight />
                                                </div>&nbsp;
                                                <div  dangerouslySetInnerHTML={{ __html: item.answer_en }} />
                                            </Accordion.Body>

                                        </Accordion.Item>
                                    )
                                })}
                            </Accordion>

                        </Col>
                    </Row>
                </Container>
            }

            {/* why choose us */}
            {homepage &&
                <Container fluid className={styles.whyChooseUs}>
                    <div className={`mt-5 mb-5 ${styles.productsHeading} `}>
                        <h3>{homepage.WhyChooseUS.category_title_en}</h3>
                    </div>
                    <Row style={{ padding: "0px 18px" }}>
                        {homepage.WhyChooseUS && homepage.WhyChooseUS.sections.map((item, index) => {
                            return (


                                <Col key={index} lg={2} md={4} className='why-choose-ua-col-md'>
                                    <div className={styles.flipCard} >
                                        <div className={styles.flipCardInner}>
                                            <div className={styles.flipCardFront}>
                                                <div className={styles.flipFrontImgDiv}>
                                                    <Image src={item.icon_file_or_image} alt='flip-card' width={100} height={100}/>
                                                    <h3>{item.sort_order}</h3>
                                                </div>
                                                {index % 2 === 0 ?
                                                    <div>
                                                        <h4 className='text-capitalize'>{item.section_title_en}</h4>
                                                        <h3 className='heading-name'>{item.section_sub_title_en}</h3>
                                                    </div> : <div>
                                                        <h3 className='heading-name'>{item.section_title_en}</h3>
                                                        <h4 className='text-capitalize'>{item.section_sub_title_en}</h4>
                                                    </div>}
                                            </div>
                                            <div className={styles.flipCardBack}>
                                                <Image src={item.second_image} width={100} height={100} alt='flip card back'/>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}

                    </Row>
                </Container>
            }

            {/* Latest News */}
            {homepage &&
                <Container fluid>
                    <div className={`mt-5 mb-5 ${styles.productsHeading}`}>
                        <h3>{homepage.LatestNews.category_title_en}</h3>
                    </div>
                    <Row>
                        <Col lg={12}>
                            <Row>
                                {homepage.LatestNews.blogs.map((item) => {
                                    return (
                                        <Col key={item.id} lg={4} md={4} as={Link} href={'blog/' + item.slug} style={{ textDecoration: "none" }}>

                                            <Card className={styles.latestNews}>
                                                <Image src={item.medium_image} alt='blogs' width={100} height={100}/>
                                                <h6>{item.post_date}</h6>
                                                <p>< FaHandPointRight /> {item.title_en}</p>
                                            </Card>

                                        </Col>
                                    )
                                })}

                            </Row>
                        </Col>

                    </Row>





                </Container>
            }
            {/* Testimonials */}
            {homepage &&
                <Container fluid className={`mb-5 ${styles.textimonials}`}>
                <Row>
                    <Col lg={12}>
                        <div className={`mt-5 mb-4 ${styles.productsHeading}`}>
                            <h1>{homepage.Testimonials.category_title_en}</h1>
                        </div>
                        <Slider {...settings1}>
                            {homepage.Testimonials.testimonials.map((item, index) => (
                                <div key={index}  className=' p-3'>
                                    <div className={`card ${styles.testimonialCards}`} >
                                        <div className={styles.newPost}>
                                            <span>
                                                <img src="https://i.imgur.com/i06xx2I.png" className={styles.quoteImg} alt="quote" />
                                            </span>
                                            <div className={styles.postTxt} dangerouslySetInnerHTML={{ __html: item.message_en }} />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <div className={styles.arrowDown}></div>
                                    </div>
                                    <div className="row d-flex justify-content-center">
                                        <p className={styles.profileName}>{item.name_en}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </Col>
                </Row>
            </Container>
            }
    </>
  )
}

// Reusable component for car features
const CarFeature = ({ icon, value }) => (
  <Col lg={2} style={{ padding: '0px' }}>
      <Row>
          <Col lg={12} className='d-flex justify-content-center'>
              <img src={icon} style={{ width: '30px' }} alt="Feature Icon" />
          </Col>
          <Col lg={12} className='text-center p-0'>
              <p>{value}</p>
          </Col>
      </Row>
  </Col>
);

export default Products