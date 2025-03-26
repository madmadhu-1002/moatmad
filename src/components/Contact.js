"use client"

import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { MdLocationPin } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import styles from '@/styles/Contact.module.css'

const Contact = ({data}) => {
    const [contactdetails, setContactDetails] = useState({
        fullname: '',
        email: '',
        phone: '',
        message: '',
        is_agree: ''
      });
      const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setContactDetails(prevData => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
       
    
        try {
          const response = await axios.post('https://admin.moatamad.com/api/saveTheContactUsDetails',{
            fullname: contactdetails.fullname,
            email: contactdetails.email,
            phone: contactdetails.phone,
            message: contactdetails.message,
            is_agree:contactdetails.is_agree
          });
          toast.success(response.data.message);
          if (response) {
            setContactDetails({
              fullname: '',
              email: '',
              phone: '',
              message: '',
              is_agree: ''
            });
          }
        } catch (error) {
          console.log(error)
          const obj = Object.values(error.response.data.data);
          const flattenedArray = obj.flat();
          flattenedArray.forEach((item) => {
            toast.error(item);
          });
        }
      };
  return (
    <>
    <section id="contact" className={`${styles.contact} section`}>
      <div className={`mt-5 mb-5 ${styles.productsHeading}`}>
        <h1>Contact Us</h1>
      </div>

      <Container fluid className='mb-5' style={{ padding: "0px 40px" }}>
        {data &&
          <Row className="gy-4">
            <Col lg={6}>
              <div className="info-item d-flex flex-column justify-content-center align-items-center">
                <i><MdLocationPin color='red' className="bi bi-geo-alt" /></i>
                <h3>Location 2</h3>
                <p>{data.address_en}</p>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <div className="info-item d-flex flex-column justify-content-center align-items-center">
                <i><FaPhoneAlt color='red' className="bi bi-telephone" /></i>
                <h3>Call Us</h3>
                <p>{data.phone}</p>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <div className="info-item d-flex flex-column justify-content-center align-items-center">
                <i><MdOutlineEmail color='red' className="bi bi-envelope" /></i>
                <h3>Email Us</h3>
                <p>{data.email}</p>
              </div>
            </Col>
          </Row>
        }
        <Row className="gy-4 mt-1">
          <Col lg={6}>
            <iframe
              src={data && data.map_link}
              width={600}
              height={450}
              style={{ border: 0, width: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Col>

          <Col lg={6} className={styles.contactFormBg}>
            <Form onSubmit={handleSubmit} className='form-col'>
              <Row className="gy-4">
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="fullname"
                    value={contactdetails.fullname}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                  />
                </Col>

                <Col md={6}>
                  <Form.Control
                    type="email"
                    name="email"
                    value={contactdetails.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                  />
                </Col>

                <Col md={12}>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={contactdetails.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                  />
                </Col>

                <Col md={12}>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={contactdetails.message}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Message"
                  />
                </Col>

                <Col md={12}>
                  <Form.Check
                    type="checkbox"
                    name="is_agree"
                    checked={contactdetails.is_agree}
                    onChange={handleInputChange}
                    label="I agree to the privacy statement and understand how my personal data will be processed."
                  />
                </Col>

                <Col md={12} className="text-center">
                  <Button type="submit" style={{ background: "red", border: 'none' }}>Submit</Button>
                </Col>
              </Row>
            </Form>
            <ToastContainer />
          </Col>
        </Row>
      </Container>
      
    </section>
    </>
  )
}

export default Contact