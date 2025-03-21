"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
import { ThreeDots } from 'react-loader-spinner';
import styles from '@/styles/Dealer.module.css'


const Dealer = ({dealerdata}) => {
    const [loading, setLoading] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showModalone, setShowModalone] = useState(false);
    const [selectedVehicles, setSelectedVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState([]);
    const [bidPrices, setBidPrices] = useState([]);
    const router = useRouter();

    const handleSelectVehicle = (id) => {
        setSelectedVehicles(prevState => {
            if (prevState.includes(id)) {
                return prevState.filter(vehicleId => vehicleId !== id);
            } else {
                return [...prevState, id];
            }
        });
    };

    const handleBidPriceChange = (id, value) => {
        setBidPrices(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleShowDetails = (vehicle) => {
        setShowModal(true);
    };


    const imagemodel = () => {
        setShowModalone(true);


    }


    const handlecloseimage = () => {
        setShowModalone(false)
    }
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedVehicle(null);
    };

    const handleSubmit = (e, router) => {
        e.preventDefault();
        router.push("/bid-review");
      };
      
  return (
    <>
    {loading ? 
                <div className='text-center mt-3' style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>  <ThreeDots className='text-center' /> </div> :
                <>
                    <Container fluid className={`mb-5 ${styles.dealerPageContainer}`} style={{ padding: '0px 40px' }} >
                        <Row>
                            <Col md={12}>
                                <h1 className=' mt-5 text-center' style={{ marginBottom: '0px', fontWeight: '700' ,fontSize:'26px'}}>Browse through our Collections</h1>
                                <p className=' text-center mb-4'>The prices displayed are excluding    VAT </p>
                            </Col>
                        </Row>

                        <Form onSubmit={handleSubmit} id="biddingForm">
                            <div className={`table-responsive ${styles.dealsTabel}`} style={{ height: '340px', overflowY: 'auto'}}>
                                <Table bordered striped >
                                    <thead className='table-main-head' style={{ backgroundColor: "#FF9A8A" }}>
                                        <tr>
                                            <th className="col-md-1" style={{ width: "40px" }}></th>
                                            <th className="col-md-1" style={{ textAlign: 'center' }}>Vehicle Image</th>
                                            <th className="col-md-1" style={{ textAlign: 'center' }}>Make</th>
                                            <th className="col-md-1" style={{ textAlign: 'center' }}>Model</th>
                                            <th className="col-md-1" style={{ textAlign: 'center' }}>Variant</th>
                                            <th className="col-md-1" style={{ textAlign: 'center' }}>Year</th>
                                            <th className="col-md-1" style={{ textAlign: 'center' }}>Body</th>
                                            <th className="col-md-2" style={{ textAlign: 'center' }}>Mileage</th>
                                            <th className="col-md-2" style={{ textAlign: 'center' }}>Specification</th>

                                            <th className="col-md-2" style={{ textAlign: 'center' }}>Bid Price<span style={{ fontSize: "10px" }}>&nbsp;(AED)</span> </th>
                                            <th className="col-md-1" style={{ textAlign: 'center' }}>More Info</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dealerdata && dealerdata.map((vehicle, index) => (
                                            <tr style={{ height: "fit-content" }} key={index}>
                                                <td style={{ height: "98px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Form.Check
                                                       type="checkbox"
                                                       checked={selectedVehicles.includes(index)}
                                                       onChange={() => handleSelectVehicle(index)}
                                                       id={`checkbox-${index}`}
                                                       label=""
                                                       className="custom-checkbox"
                                                    />
                                                </td>
                                                <td>
                                                    <img src={vehicle.car_image} onClick={() => { imagemodel() }} className="media-photo" style={{ objectFit: 'cover', cursor: 'pointer' }} width={'170px'} height={'80px'} alt={`${vehicle.make_en} ${vehicle.Model}`} />
                                                </td>

                                                <td style={{ height: "98px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <div>{vehicle.make_en}</div>
                                                </td>
                                                <td style={{ height: '98px' }}>
                                                    <div style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center" }}>{vehicle.model_en}</div>
                                                </td>

                                                <td style={{ height: '98px' }}>
                                                    <div style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center" }}>-</div>
                                                </td>
                                                <td style={{ height: "98px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{vehicle.year}</td>
                                                <td style={{ height: "98px" }}>
                                                    <div style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{vehicle.body_type_en}</div>
                                                </td>
                                                <td style={{ height: "98px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{vehicle.kilometers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                                <td style={{ width: "180px", height: "98px" }}>
                                                    <div style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        -
                                                    </div>
                                                </td>

                                                <td style={{ height: '98px' }}>
                                                    <div style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Form.Control
                                                            type="text"
                                                            value={bidPrices[index] || ''}
                                                            onChange={(e) => handleBidPriceChange(index, e.target.value)}
                                                            className={styles.bidPriceFont}
                                                        />
                                                    </div>
                                                </td>
                                                <td style={{ width: "180px", height: "98px" }}>
                                                    <div style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Button variant="primary" style={{ width: '140px' }} onClick={() => {handleShowDetails() ;setSelectedVehicle(vehicle)}}>View Details</Button>
                                                    </div>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <Row className="justify-content-md-center">
                                <Col md={4}>
                                    <Button type="submit" className="btn-bottom" style={{ width: '100%' }}>Place Bid</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>

                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Vehicle Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedVehicle && (
                                <>
                                    <Row>
                                   
                                        <Col lg={6}>
                                            <p><strong>Make:</strong> {selectedVehicle.make_en}</p>
                                            <p><strong>Model:</strong> {selectedVehicle.model_en}</p>
                                            <p><strong>Year:</strong> {selectedVehicle.year}</p>
                                            <p><strong>Body:</strong> {selectedVehicle.body_type_en}</p>
                                            <p><strong>Mileage:</strong> {selectedVehicle.kilometers}</p>
                                            <p><strong>Price:</strong> {selectedVehicle.price}</p>
                                            <p><strong>Engine:</strong> {selectedVehicle.engine}</p>
                                            <p><strong>Body Condition:</strong> {selectedVehicle.body_condition_en}</p>

                                        </Col>
                                        
                                        <Col lg={6}>
                                        <p><strong>Color:</strong> {selectedVehicle.vehicle_color_en}</p>
                                            <p><strong>Transmission:</strong> {selectedVehicle.transmission_en}</p>
                                            <p><strong>Description:</strong> {selectedVehicle.description_en}</p>
                                            <p><strong>Fuel:</strong> {selectedVehicle.fuel_en}</p>
                                            <p><strong>Doors:</strong> {selectedVehicle.door_count}</p>
                                            <p><strong>Cylinders:</strong> {selectedVehicle.cylinder}</p>
                                            <p><strong>Warranty:</strong> {selectedVehicle.regional_specs_en}</p>
                                        </Col>
                                        <Col lg={6}>
                                            <img src={selectedVehicle.car_image} className="media-photo" width="200px" height="180px" alt="Vehicle Image"  style={{objectFit:"contain"}}/>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showModalone} onHide={handlecloseimage}  >
                        <img src="https://www.moatamadcars.com/uploads/vehicles/Untitled-1.png" className="media-photo" style={{ objectFit: 'cover' }} width={'100%'} height={'100%'} />

                    </Modal>
                </>
            }
    </>
  )
}

export default Dealer