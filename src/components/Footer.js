"use client"

import { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaLinkedin, FaPhoneAlt, FaGooglePlusG } from 'react-icons/fa';
import { FaXTwitter, FaLinkedinIn, FaYoutube, FaLocationDot } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HTMLReactParser from 'html-react-parser';
import Link from 'next/link';
import styles from '@/styles/Footer.module.css';
import Image from 'next/image';


const Footer = ({footer}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://admin.moatamad.com/api/storeSubscribe', {
                fullname: name,
                email: email,
            });

            if (response) {
                setDataSubmit(response.data);
                toast.success(response.data.message);
                setName('');
                setEmail('');
            }
        } catch (error) {
            toast.error(error.response.data.data.fullname && error.response.data.data.fullname[0])
            toast.error(error.response.data.data.email[0])

        }
    }
  return (
    <>
            <Container className={styles.footerContainer} fluid >
                <Row className={styles.footerFirstContainer}>
                    <Col lg={9} md={9}>
                        <Row className={styles.footerIconSubscribe}>
                            {footer && footer.Statistics.map((item) => (
                                <Col lg={3} md={3} key={item.id}>
                                    <>
                                        <div className='text-center'>
                                            <img src={item.image} width='62px' className='mb-3' alt={item.title_en} />
                                        </div>
                                        <p className='footer-reviews-title'>{item.title_en}</p>
                                        <span className={styles.footerReviewsContent}>{HTMLReactParser(item.summery_en)}</span>
                                    </>

                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col lg={3} md={3}>
                        <h6 className={styles.subHeading}>Subscribe for Updates!</h6>
                        <Form onSubmit={handleSubmit}>
                            <Form.Control
                                placeholder='Enter your name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Control
                                placeholder='Enter your email'
                                className='mb-3 mt-3'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button type='submit' className={styles.subcribeBtn}>
                                Subscribe
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row className={styles.footerMenuRow}>
                    <Col lg={3} md={3} xs={12} sm={12}>
                        <div>
                            <h5>Quick Links</h5>
                            <hr />
                            {footer && footer.QuickLinks && footer.QuickLinks.map((item) => (
                                <p key={item.id}>
                                    <Link href={"/" + item.slug} style={{ color: "black", textDecoration: "none" }}>
                                        {item.menu_name_en}
                                    </Link>
                                </p>
                            ))}
                        </div>
                    </Col>
                    <Col lg={3} md={3} xs={12} sm={12}>
                        <div>
                            <h5>Information</h5>
                            <hr />
                            {footer && footer.Information && footer.Information.map((item) => (
                                <p key={item.id}>
                                    <Link href={"/" + item.link} style={{ color: "black", textDecoration: "none" }}>
                                        {item.menu_name_en}
                                    </Link>
                                </p>
                            ))}
                        </div>
                    </Col>

                    <Col lg={3} md={3} xs={12} sm={12} >
                        <div>
                            <h5>Get In Touch</h5>
                            <hr />
                            <p className='d-flex align-items-center gap-2'><FaLocationDot /> {footer && footer.get_in_touch.content && footer.get_in_touch.content.address_en}</p>
                            <p className='d-flex align-items-center gap-2'><FaPhoneAlt size='12px' />&nbsp;{footer && footer.get_in_touch.content.phone}</p>
                            <p className='d-flex align-items-center gap-2'><MdOutlineEmail />&nbsp;{footer && footer.get_in_touch.content.email}</p>

                        </div>
                    </Col>
                    <Col lg={3} md={3} xs={12} sm={12}>
                        <div>
                            <h5>Follow Us</h5>
                            <hr />
                            <div className={styles.footerIcons} style={{ display: "flex", width: '120px', justifyContent: 'space-between', marginTop: '5%', marginLeft: '-1%' }}>
                                <a target='_blank' href={footer && footer.socail_media_links.content.facebook_url}><FaFacebookF /></a>
                                <a target='_blank' href={footer && footer.socail_media_links.content.instagram_url}><FaInstagram /></a>
                                <a target='_blank' href={footer && footer.socail_media_links.content.youtube_url} ><FaYoutube /></a>
                                <a target='_blank' href={footer && footer.socail_media_links.content.linked_in_link} ><FaLinkedinIn /></a>
                                <a target='_blank' href={footer && footer.socail_media_links.content.twitter_url}><FaXTwitter /></a>

                            </div>

                        </div>
                    </Col>
                </Row>
                <Row className={styles.footerPageIconRow}>
                    <Col lg={8}>
                        <div>
                            <p className='mt-2 mb-1' style={{ marginBottom: "0px", fontSize: "12px", color: "white" }}> © 2024 Moatamad Pre-Owned Cars. All Rights Reserved.</p>

                            <div style={{ marginBottom: "0px", display: "grid" }}>
                                {footer && footer.leagal && footer.leagal.map((item) => (
                                    <a key={item.id} href={item.slug} style={{ color: "black", textDecoration: "none", paddingRight: '20px', fontSize: "12px", color: "white" }} >
                                        {item.menu_name_en}
                                    </a>
                                ))}
                            </div>

                        </div>
                    </Col>
                    <Col lg={4}>
                        {/* Additional content can be added here */}
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </>
  )
}

export default Footer