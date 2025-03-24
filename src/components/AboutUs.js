"use client"

import { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { RotatingLines } from 'react-loader-spinner';
import parse from 'html-react-parser';
import axios from 'axios';
import styles from '@/styles/AboutUs.module.css'
import Image from 'next/image';
import AboutUsForm from '@/components/AboutUsForm'

const AboutUs = ({aboutlinks}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const [selectedEventKey, setSelectedEventKey] = useState(1);
  const [aboutdata, setAboutData] = useState();
  const [aboutdata4, setAboutData4] = useState();
  const [aboutloading, setAboutLoading] = useState(true);

  useEffect(() => {
    if (selectedEventKey) {
      axios.get(`https://admin.moatamad.com/api/getAboutUsDataByCategory/${selectedEventKey}`)
        .then((response) => {
          setAboutData(response.data)
          setAboutLoading(false)
        })
    }

  }, [selectedEventKey])
  console.log(aboutdata);

  useEffect(() => {
    axios.get(`https://admin.moatamad.com/api/getAboutUsDataByCategory/4`)
      .then((response) => {
        setAboutData4(response.data)
      })
  }, [])
  

  return (
    <>
    <Container fluid className={`${styles.tabesContainer}  mt-5 mb-5`}>
        <Tab.Container id="left-tabs-example" defaultActiveKey={"1"}>
          <Row>
            <Col sm={12} className={styles.productsBrandMenu}>
              <Nav variant="pills" className={`flex-row ${styles.aboutNavPills}`}>


                <Nav.Item className={`{styles.aboutLinks} fs-6`}>

                  {aboutlinks && aboutlinks.map((items) => {
                    return (

                      <Nav.Link key={items.id}  eventKey={items.id}
                        onClick={() => setSelectedEventKey(items.id)}>{items.name_en}</Nav.Link>
                    )
                  })}


                </Nav.Item>

              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content className='mt-5 '>
                <Tab.Pane eventKey={selectedEventKey}>
                  {aboutloading ? (
                    <div className="text-center">
                      <RotatingLines
                        visible={true}
                        height="50"
                        width="50"
                        color="red"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  ) : (
                    <>
                      {aboutdata && (
                        <Container fluid className="mt-5" style={{ padding: "0px" }}>
                          {aboutdata.category_id === 1 &&
                            <>
                              <Row style={{ width: "100%", margin: "0" }} className="mt-5 mb-5">
                                <Col lg={6}>
                                  <div>
                                    {aboutdata.section_01_description_en && parse(aboutdata.section_01_description_en)}
                                  </div>
                                </Col>
                                <Col lg={6} style={{ display: "flex", justifyContent: "end" }}>
                                  <img src={aboutdata.section_01_image} width={"560px"} height={"360px"} />
                                </Col>
                              </Row>
                              <Row style={{ padding: "0px 12px" }}>
                                <Col lg={4}>
                                  <Row style={{ display: "grid" }}>
                                    <Col lg={2} style={{ marginRight: "10px" }}>
                                      <div style={{ height: "110px" }}>
                                        <img src={aboutdata.section_02_image} width={"100px"}  style={{maxWidth: "none"}}/>
                                      </div>
                                    </Col>
                                    <Col lg={6}>
                                      {aboutdata.section_02_description_en && parse(aboutdata.section_02_description_en)}
                                    </Col>
                                  </Row>
                                </Col>
                                <Col lg={4}>
                                  <Row style={{ display: "grid" }}>
                                    <Col lg={2} style={{ marginRight: "10px" }}>
                                      <div style={{ height: "110px" }}>
                                        <img src={aboutdata.section_03_image} width={"100px"} style={{maxWidth: "none"}}/>
                                      </div>
                                    </Col>
                                    <Col lg={9}>
                                      {aboutdata.section_03_description_en && parse(aboutdata.section_03_description_en)}
                                    </Col>
                                  </Row>
                                </Col>
                                <Col lg={4}>
                                  <Row style={{ display: "grid" }}>
                                    <Col lg={2} style={{ marginRight: "10px" }}>
                                      <div style={{ height: "110px" }}>
                                        <img src={aboutdata.section_04_image} width={"100px"} style={{maxWidth: "none"}}/>
                                      </div>
                                    </Col>
                                    <Col lg={9} className="about-values">
                                      {aboutdata.section_04_description_en && parse(aboutdata.section_04_description_en)}
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </>

                          }

                          {
                            aboutdata.category_id === 2 &&
                            <>

                              <div className=" mt-5 container-fluid" style={{ padding: 0 }}>
                                <div className="row" style={{ padding: "0px 20px" }}>
                                  <div className={`${styles.createVedioBox} col-lg-4`}>
                                    <h6
                                      className="mt-3"
                                      style={{ color: "black", display: "flex", alignItems: "center" }}
                                    >
                                      <img src="/assets/why-choose/8410178.png" width="20px" />
                                      &nbsp;CORPORATE&nbsp;VIDEO
                                    </h6>
                                    <video
                                      width="100%"
                                      height="auto"
                                      controls=""
                                      poster="https://www.moatamadcars.com/uploads/pages/image@4x-100.jpg"
                                    >
                                      <source src="video.mp4" type="video/mp4" />
                                      Your browser does not support the video tag.
                                    </video>
                                    <h6
                                      className="mt-1 mb-3 text-end"
                                      style={{
                                        color: "red",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "end"
                                      }}
                                    >
                                      <img src="/assets/why-choose/15505902.png" width="20px" />
                                      &nbsp;WATCH&nbsp;VIDEO
                                    </h6>
                                  </div>
                                  <div className="col-lg-8" style={{ paddingLeft: 35 }}>
                                    <p>
                                      Why choose <span style={{ color: "red" }}>Moatamad</span> Pre-owned
                                      Cars?
                                    </p>
                                    <p>
                                      Choosing a Pre-owned car from our extensive stock offers you greater
                                      peace of mind. You can buy confidently in the knowledge that your car
                                      has been inspected professionally by a certified service technician on
                                      various parameters.
                                    </p>
                                    <p>
                                      Every Pre-owned car at Moatamad comes with a comprehensive warranty*
                                      package to protect your investment. You can rest easy knowing you are
                                      buying a vehicle backed by a Moatamad guarantee.
                                    </p>
                                    <p style={{ marginBottom: 0 }}>
                                      Moatamad cars believes in building and maintaining a relationship with
                                      our customers forever.
                                    </p>
                                  </div>
                                  <div className="mt-5 col-lg-8">
                                    <h5 style={{ color: "red" }}>Our Facility</h5>
                                    <p>
                                      We are located in the heart of Sharjah, and strive to make your
                                      experience as seamless and positive as possible.
                                    </p>
                                    <p>
                                      The workforce at moatamadcars is committed to excellence in serving
                                      all esteemed customers.
                                    </p>
                                    <p>
                                      The Sales Team is made up of dedicated showroom and field executives
                                      who are professionally trained. They are adept at guiding the customer
                                      through the entire sales process right from assisting in the choice of
                                      model, colour, and features to lending a helping hand in providing
                                      attractive offers. And also arranging finance at competitive rates.
                                    </p>
                                    <p>
                                      The showroom and yard Centre is armed with the state-of-the-art
                                      equipment and is in-line with moatamadcars exacting Global standards.
                                    </p>
                                    <p>
                                      The service team is technically qualified and trained to analyze and
                                      provide solutions adhering to Quality Care, to satisfy even the most
                                      demanding customers.
                                    </p>
                                  </div>
                                  <div className="mt-5 col-lg-4">
                                    <iframe
                                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019667749064!2d144.9537363153183!3d-37.816279179751885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727f9e0aef2b0!2sFlinders%20St%20Station!5e0!3m2!1sen!2sau!4v1614128774790!5m2!1sen!2sau"
                                      width="100%"
                                      height="100%"
                                      allowFullScreen=""
                                      loading="lazy"
                                    />
                                  </div>
                                </div>

                              </div>

                            </>




                          }
                          {aboutdata.category_id === 3 &&
                            <Row style={{ width: '100%', margin: '0' }} className='mt-5 mb-5'>
                              <Col lg={6} style={{ display: 'flex', justifyContent: 'end', paddingRight: '10px' }}>
                                <img src={"/assets/Banners/Banner1.png"} width={'100%'} style={{ objectFit: 'cover' }} />
                              </Col>
                              <Col lg={6} style={{ paddingRight: '0px' }}>
                                  {console.log(aboutdata.description_en)}
                                  {aboutdata && aboutdata.description_en && <div className="m-5" dangerouslySetInnerHTML={{ __html: aboutdata.description_en }} />}

                              </Col>

                            </Row>

                          }





                        </Container>
                      )}
                    </>
                  )}
                </Tab.Pane>





                <Tab.Pane eventKey={'4'}>

                  <Container fluid className={`mb-5 ${styles.meetTeamContainer}`}>
                    <Row>
                      {aboutdata4 &&
                        aboutdata4.map((item) => {
                          return (
                            <Col lg={3} key={item.id || index}>
                              <Card>
                                <Image src={"https://www.indiafilings.com/learn/wp-content/uploads/2023/03/Can-a-single-person-own-a-firm-in-India.jpg"} alt='a person ' className="rounded-image" width={100} height={100}/>
                                <h6 className='text-center mt-4'>{item.name_en}</h6>
                                <p className="d-flex align-items-center gap-2"><img src='https://cdn-icons-png.freepik.com/256/2857/2857527.png?ga=GA1.1.769605160.1678772043&semt=ais_hybrid' width={'20px'} /> {item.designation_en}</p>
                                <p className="d-flex align-items-center gap-2"><img src='https://cdn-icons-png.freepik.com/256/4866/4866761.png?ga=GA1.1.769605160.1678772043&semt=ais_hybrid' width={'20px'} /> {item.phone}</p>
                              </Card>

                            </Col>
                          )
                        })}
                    </Row>
                    <Row>
                      <Col lg={6} className='mt-5'>
                        <h5 style={{ color: 'red' }}>Want to Join? Our Team</h5>
                        <p>We are located in the heart of Sharjah, and strive to make your experience as seamless and positive as possible.</p>
                        <p>The workforce at moatamadcars is committed to excellence in serving all esteemed customers.</p>
                        <p>The Sales Team is made up of dedicated showroom and field executives who are professionally trained. They are adept at guiding the customer through the entire sales process right from assisting in the choice of model, colour, and features to lending a helping hand in providing attractive offers. And also arranging finance at competitive rates.</p>
                        <p>The showroom and yard Centre is armed with the state-of-the-art equipment and is in-line with moatamadcars exacting Global standards.</p>
                        <p>The service team is technically qualified and trained to analyze and provide solutions adhering to Quality Care, to satisfy even the most demanding customers.</p>
                      </Col>
                      <Col lg={6} className={`mt-5 ${styles.aboutForm}`} >
                        <AboutUsForm />
                      </Col>

                    </Row>

                  </Container>


                </Tab.Pane>



              </Tab.Content>



            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  )
}

export default AboutUs