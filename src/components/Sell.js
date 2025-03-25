"use client"

import Image from 'next/image';
import { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import styles from '@/styles/Sell.module.css'

const Sell = () => {
    const [formData, setFormData] = useState({
        vehicle_make: '',
        vehicle_model: '',
        variant: '',
        vehicle_year: '',
        kilometers_driven: '',
        bodyColor: '',
        transmission_name: '', // Corrected typo
        fuelType: '',
        body_condition: '',
        mechanical_condition: '',
        estimated_value: '',
        image: [],
        remarks: '',
        fullname: '',
        email: '',
        mobile: '',
        city: '',
        country: '',
        contact_time_from: '',
        contact_time_to: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: [...e.target.files] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formPayload = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image') {
                Array.from(formData.image).forEach(file => {
                    formPayload.append('image[]', file);
                });
            } else {
                formPayload.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post('https://admin.moatamad.com/api/storeTheVehicleInformation', formPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response) {
                toast.success(response.data.message);
                setFormData({
                    vehicle_make: '',
                    vehicle_model: '',
                    variant: '',
                    vehicle_year: '',
                    kilometers_driven: '',
                    bodyColor: '',
                    transmission_name: '', // Corrected typo
                    fuelType: '',
                    body_condition: '',
                    mechanical_condition: '',
                    estimated_value: '',
                    image: [],
                    remarks: '',
                    fullname: '',
                    email: '',
                    mobile: '',
                    city: '',
                    country: '',
                    contact_time_from: '',
                    contact_time_to: ''
                })


            }
        } catch (error) {
        }
    };
  return (
    <>
    <ToastContainer />
            <div className={`mt-5 mb-5 ${styles.productsHeading}`}>
                <h6>Get Your Car Evaluated For Free!</h6>
                <h1 className='text-center'>3 Simple Steps for Complete Car Evaluation</h1>
            </div>

            
            <Container fluid className={`mt-5 ${styles.sellContainer}`}>
                <Row className={`mt-5 ${styles.sellComponentRow} mb-5`}>
                    <Col lg={4}>
                        <div className='d-flex align-items-center gap-2'>
                            <Image width={100} height={100} src='https://cdn-icons-png.freepik.com/256/7064/7064309.png?ga=GA1.1.769605160.1678772043&semt=ais_hybrid' alt="Step 1" />
                            <span>Get your Free Car Evaluation</span>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='d-flex align-items-center gap-2'>
                            <Image width={100} height={100} src='/assets/product-feture-icons/226300.png' alt="Step 2" />
                            <span>Book Appointment for Car Inspection</span>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='d-flex align-items-center gap-2'>
                            <Image width={100} height={100} src="/assets/product-feture-icons/3734403.png" alt="Step 3" />
                            <span>Complete the Sale & Get Paid!</span>
                        </div>
                    </Col>
                </Row>
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col md={9} className="text-left mb-3">
                        <h2 className={styles.blockTitle}><span>Vehicle Information</span></h2>
                        <Form onSubmit={handleSubmit} className={styles.sellingForm}>
                            {/* Your form fields here */}
                            <Form.Group as={Row}>
                                <Col md={6} className='mb-4'>
                                    <Form.Control
                                        type="text"
                                        name="vehicle_make"
                                        id="vehicle_make"
                                        placeholder="Vehicle Make*"
                                        value={formData.vehicle_make}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                                <Col md={6} className='mb-3'>
                                    <Form.Control
                                        type="text"
                                        name="vehicle_model"
                                        id="vehicle_model"
                                        placeholder="Vehicle Model*"
                                        value={formData.vehicle_model}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Col md={6} className='mb-4'>
                                    <Form.Select
                                        as="select"
                                        name="variant"
                                        id="variant"
                                        value={formData.variant}
                                        onChange={handleChange}
                                    >
                                        <option>Body Type</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="SUV">SUV</option>
                                        <option value="Hatchback">Hatchback</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Crossover">Crossover</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6} className='mb-4'>
                                    <Form.Select
                                        as="select"
                                        name="vehicle_year"
                                        id="vehicle_year"
                                        value={formData.vehicle_year}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option>Model Year*</option>
                                        {Array.from({ length: 25 }, (_, i) => 2000 + i).map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Col md={6} className='mb-4'>
                                    <Form.Control
                                        type="text"
                                        name="kilometers_driven"
                                        id="kilometers_driven"
                                        placeholder="Kilometers Driven*"
                                        value={formData.kilometers_driven}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                                <Col md={6} className='mb-4'>
                                    <Form.Control
                                        type="text"
                                        name="bodyColor"
                                        id="bodyColor"
                                        placeholder="Body Color"
                                        value={formData.bodyColor}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Col md={6} className='mb-4'>
                                    <Form.Select
                                        as="select"
                                        name="transmissoin_name"
                                        id="transmissoin_name"
                                        value={formData.transmissoin_name}
                                        onChange={handleChange}
                                        required
                                        placeholder='transmissoin_name*'
                                    >
                                        <option>transmissoin_name*</option>
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Triptronic">Triptronic</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6} className='mb-4'>
                                    <Form.Select
                                        as="select"
                                        name="fuelType"
                                        id="fuelType"
                                        value={formData.fuelType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option>Fuel Type*</option>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Electric">Electric</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Col md={6} className='mb-4'>
                                    <Form.Select
                                        as="select"
                                        name="body_condition"
                                        id="body_condition"
                                        value={formData.body_condition}
                                        onChange={handleChange}
                                    >
                                        <option>Body Condition</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Very Good">Very Good</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Not Good">Not Good</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6} className='mb-4'>
                                    <Form.Select
                                        as="select"
                                        name="mechanical_condition"
                                        id="mechanical_condition"
                                        value={formData.mechanical_condition}
                                        onChange={handleChange}
                                    >
                                        <option>Mechanical Condition</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Very Good">Very Good</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Not Good">Not Good</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Col md={6} className='mb-4'>
                                    <Form.Control
                                        type="text"
                                        name="estimated_value"
                                        id="estimated_value"
                                        placeholder="Expected Price* (AED)"
                                        value={formData.estimated_value}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                                <Col md={6} className='mb-4'>
                                    <Form.Control
                                        type="file"
                                        name="files"
                                        id="ImageUpload"
                                        accept=".jpg,.png,.bmp"
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                    <p className={styles.imageAlert}><strong>Note:</strong> Max image upload 4 and max size for each image 250kb.</p>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className='mb-4'>
                                <Col md={12}>
                                    <Form.Control
                                        as="textarea"
                                        name="remarks"
                                        id="remarks"
                                        placeholder="Remarks"
                                        rows="4"
                                        value={formData.remarks}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            <h2 className="block-title"><span>Contact information</span></h2>

                            <Form.Group as={Row} >
                                <Col md={6} className='mb-4'>
                                    <Form.Control
                                        type="text"
                                        name="fullname"
                                        id="fullname"
                                        placeholder="Name"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                                <Col md={6} className='mb-4'>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Col md={6} className='mb-4'>
                                    <Form.Control
                                        type="text"
                                        name="mobile"
                                        id="mobile"
                                        placeholder="Mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                                <Col md={6} className='mb-4'>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        id="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Col md={6} className='mb-4'>
                                    <Form.Control
                                        type="text"
                                        name="country"
                                        id="country"
                                        placeholder="Country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                                <Col md={3} sm={12} className='mb-4'>
                                    <Form.Select
                                        as="select"
                                        name="contact_time_from"
                                        id="contact_time_from"
                                        value={formData.contact_time_from}
                                        onChange={handleChange}
                                    >
                                        <option>Contact Time From</option>
                                        <option value="8 AM">8 AM</option>
                                        <option value="9 AM">9 AM</option>
                                        <option value="10 AM">10 AM</option>
                                        <option value="11 AM">11 AM</option>
                                        <option value="12 PM">12 PM</option>
                                    </Form.Select>
                                </Col>
                                <Col md={3} sm={12} className='mb-4'>
                                    <Form.Select
                                        name="contact_time_to"
                                        id="contact_time_to"
                                        value={formData.contact_time_to}
                                        onChange={handleChange}
                                    >
                                        <option>Contact Time To</option>
                                        <option value="5 PM">5 PM</option>
                                        <option value="6 PM">6 PM</option>
                                        <option value="7 PM">7 PM</option>
                                        <option value="8 PM">8 PM</option>
                                        <option value="9 PM">9 PM</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            <Col lg={12} className='text-center'>
                                <Button type="submit" className={`btn btn-theme ${styles.pullRight}`}>
                                    Submit
                                </Button>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </Container>
    </>
  )
}

export default Sell