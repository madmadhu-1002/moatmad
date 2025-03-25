"use client"

import { useState, useEffect } from 'react';
import { Col, Container, Form, Row, Table, Button } from 'react-bootstrap';
import { MdLocationPin } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useGlobalContext } from "@/context/GlobalContext";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Image from 'next/image';
import styles from '@/styles/DealerDetails.module.css'

const DealerDetails = ({dealerdata}) => {
    const { selectedVehicles, setSelectedVehicles, bidPrices, setBidPrices } = useGlobalContext();
    const filteredVehicleData = dealerdata.filter((_, index) => selectedVehicles.includes(index));
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        contact_no: '',
    });
    const [totalBidAmount, setTotalBidAmount] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (bidPrices) {
            // Convert the bidPrices object to an array of values
            const bidValues = Object.values(bidPrices);
    
            // Calculate the total by summing up the values
            const total = bidValues.reduce((acc, price) => acc + (parseFloat(price) || 0), 0);
    
            // Update the state with the total amount, formatted to 2 decimal places
            setTotalBidAmount(total.toFixed(2));
        }
    }, [bidPrices]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("jhy")
    
        try {
            // Extract vehicle IDs and join them into a comma-separated string
            const vehicleIds = filteredVehicleData.map(vehicle => vehicle.vehicle_id).join(',');
    
            const bidPricesArray = Object.values(bidPrices);
            const bidPricesString = bidPricesArray.join(', ');
    
            // Post bid details using async/await
            const response = await axios.post('https://admin.moatamad.com/api/storeBidDetails', {
                fullname: formData.fullname,
                email: formData.email,
                contact_no: formData.contact_no,
                total_amount: totalBidAmount,
                vehicle_id: vehicleIds, 
                car_bid_price: bidPricesString // Include the comma-separated vehicle IDs
            });
    
            // Show success message

            if(response.data){
                toast.success(response.data.message);
    
                // Reset form data after successful submission
                setFormData({
                    fullname: '',
                    email: '',
                    contact_no: '',
                });
        

            }
           
        } catch (error) {
            console.log(error);
            toast.success("error");
            // Handle error
        }
    };

    return (
        <>
            <Container fluid className='mt-5 mb-5' style={{ padding: "0px 45px" }}>
                <Row>
                    <Col lg={9} className={styles.dealsTabel}>
                        <div className={`mb-5 ${styles.productsHeading}`}>
                            <h3>Bid Review</h3>
                        </div>
                        <div className="table-responsive">
                        <Table bordered striped>
                            <thead style={{ backgroundColor: "#FF9A8A" }}>
                                <tr>
                                    <th className="col-md-2" style={{ textAlign: 'center' }}>Car Image</th>
                                    <th className="col-md-1" style={{ textAlign: 'center' }}>Make</th>
                                    <th className="col-md-2" style={{ textAlign: 'center' }}>Model</th>
                                    <th className="col-md-1" style={{ textAlign: 'center' }}>Year</th>
                                    <th className="col-md-1" style={{ textAlign: 'center' }}>Body</th>
                                    <th className="col-md-2" style={{ textAlign: 'center' }}>Mileage</th>
                                    <th className="col-md-2" style={{ textAlign: 'center' }}>Bid Price (AED)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVehicleData.map((vehicle, index) => (
                                    <tr key={vehicle.vehicle_id}>
                                        <td>
                                            <Image height={80} width={170} src={vehicle.car_image} className="media-photo" style={{ objectFit: 'cover' }} alt={`${vehicle.make_en} ${vehicle.model_en}`} />
                                        </td>
                                        <td className={`text-center ${styles.delierDeatilsTable}`}>{vehicle.make_en}</td>
                                        <td className={`text-center ${styles.delierDeatilsTable}`}>{vehicle.model_en}</td>
                                        <td className={`text-center ${styles.delierDeatilsTable}`}>{vehicle.year}</td>
                                        <td className={`text-center ${styles.delierDeatilsTable}`}>{vehicle.body_type_en}</td>
                                        <td className={`text-center ${styles.delierDeatilsTable}`}>{vehicle.kilometers}</td>
                                        <td className={styles.delierDeatilsTable}>
                                            <Form.Control
                                                type="text"
                                                value={bidPrices[index] || ''}
                                                readOnly
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        </div>
                        <Container fluid className='mt-5' style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.1) 0px 1px 3px" }}>
                            <Col lg={12} style={{ boxShadow: "0 0 4px color-mix(in srgb, var(--default-color), transparent 85%)", padding: "30px" }}>
                                <Form onSubmit={handleSubmit}>
                                    <h5 style={{ color: 'red' }}>Confirm Bid</h5>
                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group className="mb-3" controlId="formfullname">
                                                <Form.Control 
                                                    placeholder='Full Name *' 
                                                    type="text" 
                                                    name="fullname" 
                                                    value={formData.fullname} 
                                                    onChange={handleInputChange} 
                                                    required 
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-3" controlId="formEmail">
                                                <Form.Control 
                                                    placeholder='Email-ID *' 
                                                    type="email" 
                                                    name="email" 
                                                    value={formData.email} 
                                                    onChange={handleInputChange} 
                                                    required 
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-3" controlId="formContactNumber">
                                                <Form.Control 
                                                    placeholder='Contact Number *' 
                                                    type="text" 
                                                    name="contact_no" 
                                                    value={formData.contact_no} 
                                                    onChange={handleInputChange} 
                                                    required 
                                                />
                                            </Form.Group>
                                        </Col>
                                       
                                        <Col lg={6}>
                                            <Form.Group className="mb-3" controlId="formTotalAmount">
                                                <Form.Control 
                                                    placeholder={totalBidAmount}
                                                    type="text" 
                                                    readOnly // Make this read-only as it's calculated
                                                />
                                            </Form.Group>
                                        </Col>      
                                    </Row>
                                    <Row className='text-center' style={{display:"flex",justifyContent:'center'}}>
                                    <Col lg={6} className='mt-3' style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                                            <Button className=' btn btn-dark' style={{ height: 'fit-content', width: '100%' }} type="submit">
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                                <ToastContainer/>
                            </Col>
                        </Container>
                    </Col>
                    <Col lg={3}>
                        <div className={`mb-5 ${styles.productsHeading}`}>
                            <h3>CONTACT US</h3>
                        </div>
                        <Row className="gy-4">
                            <Col lg={12}>
                                <div className={`${styles.infoItem} d-flex flex-column justify-content-center align-items-center `} style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.1) 0px 1px 3px" }}>
                                    <i>
                                        <MdLocationPin color='red' size={'20px'} className="bi bi-geo-alt mb-3" />
                                    </i>
                                    <h3>Location</h3>
                                    <p className='text-center'>Souq Al Haraj Showroom Showroom #166 Souq Al Haraj, Sharjah</p>
                                </div>
                            </Col>

                            <Col lg={12}>
                                <div className={`${styles.infoItem} d-flex flex-column justify-content-center align-items-center`} style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.1) 0px 1px 3px" }}>
                                    <i>
                                        <FaPhoneAlt color='red' size={'20px'} className="bi bi-phone mb-3" />
                                    </i>
                                    <h3>Phone Number</h3>
                                    <p className='text-center'>06-5530039</p>
                                </div>
                            </Col>

                            <Col lg={12}>
                                <div className={`${styles.infoItem} d-flex flex-column justify-content-center align-items-center`} style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.1) 0px 1px 3px" }}>
                                    <i>
                                        <MdOutlineEmail color='red' size={'20px'} className="bi bi-envelope mb-3" />
                                    </i>
                                    <h3>Email Address</h3>
                                    <p className='text-center'>info@moatamadcars.com</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DealerDetails