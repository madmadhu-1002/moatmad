"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Chart, ArcElement, registerables } from 'chart.js';
import { toast, ToastContainer } from 'react-toastify';

Chart.register(...registerables, ArcElement);

const currency = "AED"; // Adjusted the currency to AED


const BrandDetails = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathSegments = router.asPath.split('/').filter(segment => segment.trim() !== '');
    const lastRouteName = pathSegments[pathSegments.length - 1];
    const [vehicleData, setVehicleData] = useState();
  return (
    <>
            <ToastContainer />

            {loading ?
                <div className='text-center'>
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
                :
                <>
                    <Container fluid >
                        <Row className='mt-5' style={{ padding: '0px 25px' }}>
                            <Col className='exterior-images-gallery' lg={8} md={8} sm={12} xs={12} style={{ padding: "10px", paddingTop: "12px" }}>
                                {/* <Interior /> */}
                                <div className='interior'>
                                    <div>
                                        <p className={`${showModal === false ? 'interior-active' : null}`} onClick={() => setShowModal(false)}>exterior</p>
                                        <p className={`${showModal === true ? 'interior-active' : null}`} onClick={() => setShowModal(true)}>interior</p>

                                    </div>
                                </div>
                                {showModal ?
                                    <ImageGallery
                                        items={images2}
                                        showFullscreenButton={false}
                                        showNav={false}
                                        showPlayButton={false}
                                        thumbnailPosition={isMobile ? 'bottom' : 'left'}
                                        showBullets={true}
                                        autoPlay={true}
                                        infinite={true} // Enable infinite looping of main images
                                        slideInterval={2000} // Set the autoplay interval for the main images
                                        loading={lazy}
                                    />
                                    : <ImageGallery
                                        items={images}
                                        showFullscreenButton={false}
                                        showNav={false} // Enable navigation for looping
                                        showPlayButton={false}
                                        thumbnailPosition={isMobile ? 'bottom' : 'left'}
                                        showBullets={true}
                                        autoPlay={true} // Enable autoplay to keep it looping
                                        infinite={false} // Enable infinite looping of images
                                        slideInterval={2000}
                                        thumbnailLoading="lazy" // or "eager"
                                        slideOnThumbnailOver={true} // or false
                                        loading={lazy}
                                    />
                                }
                            </Col>
                            <Col lg={4} md={4} className='small-box-fixed-postion'>
                                <div className='subcontent-div'>
                                    {/* <div>
                                        <h6 style={{ fontWeight: "300", fontSize: "14px", fontWeight: "700", color: "gray" }}>Ref No : {vechiledata && vechiledata.CarOverviewList.reference_no}</h6>
                                    </div> */}
                                    <div >
                                        <h6 style={{ fontSize: "20px", color: "red" }}>{vechiledata && vechiledata.CarOverviewList.car_title_en} {vechiledata && vechiledata.CarOverviewList.engine} - {vechiledata && vechiledata.CarOverviewList.year}</h6>
                                    </div>
                                    <div>
                                        <h6 style={{ fontWeight: "400", display: "flex", justifyContent: "space-between", width: '70%' }}>
                                            <p>{vechiledata && vechiledata.CarOverviewList.kilometers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} kms</p><span style={{ color: "red" }}>|</span><p>{vechiledata && vechiledata.CarOverviewList.fuel_en}</p><span style={{ color: "red" }}>|</span><p>{vechiledata && vechiledata.CarOverviewList.transmission_en}</p>
                                        </h6>
                                    </div>
                                    <div>
                                        <h6 style={{ fontWeight: "300", fontSize: "14px" }}><MdOutlineDriveEta color='green' /> Test Drive : Available</h6>
                                    </div>
                                    <div className='bottom-shadow'>
                                        <h6 style={{ fontWeight: "300", fontSize: "14px" }}><IoLocationSharp color='red' /> #166 , Souq Al Haraj , Sharjah, UAE</h6>
                                    </div>
                                    <div className='aed-dev mt-4'>
                                        <h6 style={{ fontSize: '14px', display: 'flex', alignItems: 'end' }}><span style={{ color: "black", fontSize: "12px" }}>AED</span>&nbsp;<span style={{ color: "red" }}>{vechiledata && formatCurrency(vechiledata.CarOverviewList.price)}</span></h6>
                                        <h6 style={{ fontSize: '22px', display: "flex", alignItems: 'center' }}>
                                            EMI :&nbsp;<span style={{ color: "red" }}>
                                                <span style={{ color: "black", fontSize: "14px" }}>AED</span>   {vechiledata && Number(vechiledata.CarOverviewList.emi_amount) >= 1000 ? Number(vechiledata.CarOverviewList.emi_amount).toLocaleString("en-US") : Number(vechiledata.CarOverviewList.emi_amount).toFixed(0)}

                                                

                                                <span style={{ color: "black", fontSize: "10px" }}> per month</span>
                                                </span></h6>
                                    
                                    
                                    
                                    </div>
                                    <div style={{ marginTop: "8%" }} className='book-a-text-drive mb-2'>
                                        <Button className={`${showBookNowModal ? 'active-book-now' : 'blue-btn'}`} style={{ width: "100%" }} onClick={handleShowBookNowModal}>
                                            BOOK NOW
                                        </Button>
                                    </div>
                                    <div className='book-a-text-drive'>
                                        <Button className={`${showTestDriveModal ? 'book-btn' : 'red-btn'}`} onClick={handleShowTestDriveModal}>
                                            BOOK A TEST DRIVE
                                        </Button>
                                        <Button onClick={() => { setFinance(true) }} className={`${finance ? 'active-finance' : 'red-btn'}`} >
                                            {features.map((item, index) => (
                                                item.id === "3" ?
                                                    <a style={{ textDecoration: "none", color: "white" }} href={`#${item.id}`} onClick={(e) => handleButtonClick(e, item.id)}>
                                                        FINANCE
                                                    </a> : null
                                            ))}
                                        </Button>
                                    </div>
                                    <div className='book-a-text-drive mt-2 mb-3'>
                                        <Button className={`${showRequestModal ? 'blue-btn request-btn ' : ' blue-btn request-btn-active'}`} style={{ width: "100%", textTransform: "uppercase" }} onClick={handleShowRequestModal}>
                                            Request a Call Back                </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Container fluid>
                            <Row>
                                <Col lg={8} md={8}>
                                    <Container fluid className='mt-5'>
                                        <Container fluid id="1" className='car-overview-container' style={{ padding: "0px" }}>
                                            {vechiledata ?
                                                <Row >
                                                    <h4 className="mb-2">{vechiledata.CarOverviewTitle.category_title_en}</h4>
                                                    <Col lg={12} md={12} className='car-overview-col'>
                                                        <div className='car-over-view-div'>
                                                            <Col lg={12} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                                                <Row style={{ display: "flex", justifyContent: 'center' }}>
                                                                    <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                                                        <div className='first-and-main-div  mobile-border'>
                                                                            <div className='caroverview-icon-div'>
                                                                                <img src={'https://www.moatamadcars.com/assets/car-overview/MicrosoftTeams-image%20(81).png'} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                                                            </div>
                                                                            <div className='caroverview-feture-div'>
                                                                                <h6 className='featers-main-haeding'>DESCRIPTION</h6>
                                                                                <h6>{vechiledata.CarOverviewList.description_en}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                                                        <div className='first-and-main-div'>
                                                                            <div className='caroverview-icon-div'>
                                                                                <img src={vechiledata.CarOverviewList.body_condition_icon1_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                                                            </div>
                                                                            <div className='caroverview-feture-div'>
                                                                                <h6 className='featers-main-haeding'>{vechiledata.CarOverviewList.body_type_label_en}</h6>
                                                                                <h6>{vechiledata.CarOverviewList.body_type_en}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                                                        <div className='first-and-main-div mobile-border'>
                                                                            <div className='caroverview-icon-div'>
                                                                                <img src={vechiledata.CarOverviewList.fuel_icon_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                                                            </div>
                                                                            <div className='caroverview-feture-div'>
                                                                                <h6 className='featers-main-haeding'>{vechiledata.CarOverviewList.fuel_label_en}</h6>
                                                                                <h6>{vechiledata.CarOverviewList.fuel_en}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >


                                                                        <div className='first-and-main-div'>
                                                                            <div className='caroverview-icon-div'>
                                                                                <img src={vechiledata.CarOverviewList.regional_specs_icon1_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                                                            </div>
                                                                            <div className='caroverview-feture-div'>
                                                                                <h6 className='featers-main-haeding'>{vechiledata.CarOverviewList.regional_specs_label_en}</h6>
                                                                                <h6>{vechiledata.CarOverviewList.regional_specs_en}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                                                        <div className='first-and-main-div mobile-border'>
                                                                            <div className='caroverview-icon-div' style={{ border: "none" }}>
                                                                                <img src={vechiledata.CarOverviewList.body_condition_icon_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                                                            </div>
                                                                            <div className='caroverview-feture-div'>
                                                                                <h6 className='featers-main-haeding'>{vechiledata.CarOverviewList.body_condition_label_en}</h6>
                                                                                <h6>{vechiledata.CarOverviewList.body_condition_en}</h6>
                                                                            </div>
                                                                        </div>

                                                                    </Col> <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                                                        <div className='first-and-main-div'>
                                                                            <div className='caroverview-icon-div'>
                                                                                <img src={vechiledata.CarOverviewList.warranty_icon_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                                                            </div>
                                                                            <div className='caroverview-feture-div'>
                                                                                <h6 className='featers-main-haeding'>{vechiledata.CarOverviewList.warranty_name_label_en}</h6>
                                                                                <h6>{vechiledata.CarOverviewList.warranty_name_en}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </Col> <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                                                        <div className='first-and-main-div mobile-border'>
                                                                            <div className='caroverview-icon-div'>
                                                                                <img src={vechiledata.CarOverviewList.door_icon_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                                                            </div>
                                                                            <div className='caroverview-feture-div'>
                                                                                <h6 className='featers-main-haeding'>{vechiledata.CarOverviewList.door_label_en}</h6>
                                                                                <h6>{vechiledata.CarOverviewList.door_count}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </Col> <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                                                        <div className='first-and-main-div'>
                                                                            <div className='caroverview-icon-div'>
                                                                                <img src={vechiledata.CarOverviewList.transmission_icon1_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                                                            </div>
                                                                            <div className='caroverview-feture-div'>
                                                                                <h6 className='featers-main-haeding'>{vechiledata.CarOverviewList.transmission_label_en}</h6>
                                                                                <h6>{vechiledata.CarOverviewList.transmission_en}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </Col> <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                                                        <div className='first-and-main-div mobile-border'>
                                                                            <div className='caroverview-icon-div'>
                                                                                <img src={vechiledata.CarOverviewList.cylinder_icon_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                                                            </div>
                                                                            <div className='caroverview-feture-div'>
                                                                                <h6 className='featers-main-haeding'>{vechiledata.CarOverviewList.cylinder_label_en}</h6>
                                                                                <h6>{vechiledata.CarOverviewList.cylinder}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                                                        <div className='first-and-main-div'>
                                                                            <div className='caroverview-icon-div' style={{ border: "none" }} >
                                                                                <img src={vechiledata.CarOverviewList.engine_icon1_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                                                            </div>
                                                                            <div className='caroverview-feture-div'>
                                                                                <h6 className='featers-main-haeding'>{vechiledata.CarOverviewList.engine_label_en}</h6>
                                                                                <h6>{vechiledata.CarOverviewList.engine}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </Col>

                                                                </Row>
                                                            </Col>
                                                        </div>

                                                    </Col>
                                                </Row> : null}
                                        </Container>
                                        <Container fluid id="2" className='mt-5 mb-5' style={{ width: '101.6%' }} >
                                            <Row >
                                                <h4 style={{ padding: "0px" }}>{vechiledata && vechiledata.ExtraFeaturesTitle.category_title_en}</h4>
                                                <Col lg={12} className='extra-features'>
                                                    <Row >
                                                        {vechiledata && vechiledata.ExtraFeaturesList.map((item) => {
                                                            return (
                                                                <Col lg={4} className={`${item.newnames}`}
                                                                >
                                                                    <div className='extra-features-second-div'>
                                                                        <p>{item.extra_feature_en}</p>
                                                                        <img src='https://cdn-icons-png.freepik.com/256/5290/5290058.png?ga=GA1.1.769605160.1678772043&semt=ais_hybrid' width={'14px'} height={'14px'} />
                                                                    </div>
                                                                </Col>
                                                            )
                                                        })}
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Container>
                                        <Container fluid id='3' className="mb-5 mt-5" style={{ padding: '0px 0px 0px 16px ' }}>
                                            <Row className="justify-content-md-start" >
                                                <h1 style={{ padding: "0px" ,fontSize:"24px"}} className="mb-2">EMI Calculator</h1>
                                                <Col lg={12} className="emi-calculator">
                                                    <Row className="main-1st-row">
                                                        <Col md={6} className="main-1st-col" style={{ display: 'grid' }}>
                                                            <Row className="">
                                                                <Col md={12} className="emi-starting-rate">
                                                                    <h5>EMI starting from</h5>
                                                                    <h6><span> {vechiledata && Number(vechiledata.CarOverviewList.emi_amount) >= 1000 ? Number(vechiledata.CarOverviewList.emi_amount).toLocaleString("en-US") : Number(vechiledata.CarOverviewList.emi_amount).toFixed(0)}

                               
                                                                    </span> per month</h6>
                                                                </Col>
                                                                <Col md={12} className="pie-chart-ciecle">
                                                                    <div>
                                                                        <Pie
                                                                            data={{
                                                                                labels: ["Principal Amount", "Interest Amount"],
                                                                                datasets: [
                                                                                    {
                                                                                        backgroundColor: ["#74c5e8", "red"],
                                                                                        data: [piepAmount, iAmount]
                                                                                    }
                                                                                ]
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </Col>
                                                                <Col lg={12} style={{ padding: '20px' }}>
                                                                    <div className="small-card-main-div">
                                                                        <div className="small-card">
                                                                            <div className="div-one"></div>&nbsp;
                                                                            <p>Principal Loan Amount</p>
                                                                        </div>
                                                                        <div>
                                                                            <p>{currency} {formatCurrency(pAmount - downPayment)}</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="small-card-main-div second-div">
                                                                        <div className="small-card">
                                                                            <div className="div-two"></div>&nbsp;
                                                                            <p className="">Total Interest Payable</p>
                                                                        </div>
                                                                        <div>
                                                                            <p>{currency} {formatCurrency(iAmount)}</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="small-card-main-div">
                                                                        <div className="small-card">
                                                                            <div className=""><FaMoneyBill size={'12px'} color="green" /></div>&nbsp;
                                                                            <p>Total Amount Payable</p>
                                                                        </div>
                                                                        <div>
                                                                            <p>{currency} {formatCurrency(tAmount)}</p>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md={6} className="price-range-main-col">
                                                            <div className="main-price-div">
                                                                <div className="emi-loanamount-calculator">
                                                                    <p>Loan Amount</p>
                                                                    <p>{formatCurrency(piepAmount)}</p>
                                                                </div>
                                                                <Form.Range
                                                                    value={piepAmount}
                                                                    min={0}
                                                                    max={pAmount}
                                                                    onChange={handleChangeSliderPrincipalAmount}
                                                                />
                                                                <div className="emi-loanamount-calculator-below">
                                                                    <p>{currency} 0</p>
                                                                    <p> {currency} {pAmount}</p>
                                                                </div>

                                                                <div className="emi-loanamount-calculator">
                                                                    <p>Duration of Loan</p>
                                                                    <p>{iTime} Year{iTime > 1 && "s"}</p>
                                                                </div>
                                                                <Form.Range
                                                                    value={iTime}
                                                                    min={1}
                                                                    max={5}
                                                                    onChange={handleChangeSliderTime}
                                                                />
                                                                <div className="emi-loanamount-calculator-below">
                                                                    <p>1 Year</p>
                                                                    <p>5 Years</p>
                                                                </div>

                                                                <div className="emi-loanamount-calculator">
                                                                    <p>Down Payment</p>
                                                                    <p>{formatCurrency(downPayment)}</p>
                                                                </div>
                                                                <Form.Range
                                                                    value={downPayment}
                                                                    min={0}
                                                                    max={pAmount}
                                                                    onChange={handleChangeSliderDownPayment}
                                                                />
                                                                <div className="emi-loanamount-calculator-below">
                                                                    <p>{currency} 0</p>
                                                                    <p>{currency} {formatCurrency(pAmount)}</p>
                                                                </div>
                                                            </div>

                                                            <div className="div-content-below">
                                                                <p className="process-para">Finance with MoatamadCars</p>
                                                                <div className="process-para-ul-tag" style={{ marginBottom: '0px' }}>
                                                                    <li>Lowest possible interest rate</li>
                                                                    <li>Lowest possible down payment</li>
                                                                    <li>Choice of over 10 banks</li>
                                                                    <li>We will tailor your loan to suit your budget</li>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Container>


                                    </Container>

                                    <style jsx>{`
                .sticky-top-1 {
                    position: fixed;
                    top: 11%;
                    color: white;
                    z-index: 1000;
                    transition: all 0.3s ease-in-out;
                }

                .sticky-top-1.hide {
                    display: none;
                }

                .sticky-top-1.show {
                    display: block;
                }

                .section {
                    padding: 20px;
                    margin: 20px 0;
                    border: 1px solid #ccc;
                                     }`}</style>
                                </Col>
                            </Row>
                        </Container>
                    </Container>

                    <Modal show={showBookNowModal} onHide={handleCloseBookNowModal}>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-center' style={{ width: "100%", textAlign: "center" }}>Book Now</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmitBooknow}>
                                <Form.Group controlId="formName">
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        name="fullname"
                                        value={booknow.fullname
                                        }
                                        onChange={handleInputChangebooknow}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mt-3 mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={booknow.email}
                                        onChange={handleInputChangebooknow}

                                    />
                                </Form.Group>
                                <Form.Group controlId="formPhone">
                                    <Form.Control
                                        type="text"
                                        placeholder="Mobile"
                                        name="phone"
                                        value={booknow.phone}
                                        onChange={handleInputChangebooknow}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formComment" className="mt-3 mb-3">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="comment"
                                        placeholder="Comment"
                                        value={booknow.comment}
                                        onChange={handleInputChangebooknow}
                                    />
                                </Form.Group>
                                <div className="text-center" style={{ display: "flex", justifyContent: "center" }}>
                                    <Button
                                        variant="primary"
                                        className="mt-3"
                                        style={{ backgroundColor: "red", color: "white", border: "none" }}
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                            <ToastContainer />

                        </Modal.Body>
                    </Modal>

                    <Modal show={showTestDriveModal} onHide={handleCloseTestDriveModal}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ width: "100%", textAlign: "center" }}>Book a Test Drive</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formName">
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        name="fullname"
                                        value={formdata.fullname
                                        }
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mt-3 mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={formdata.email}
                                        onChange={handleInputChange}

                                    />
                                </Form.Group>
                                <Form.Group controlId="formPhone">
                                    <Form.Control
                                        type="text"
                                        placeholder="Mobile"
                                        name="phone"
                                        value={formdata.phone}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formDate" className="mt-3 mb-3">
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        value={formdata.date}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formComment" className="mt-3 mb-3">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="comment"
                                        placeholder="Comment"
                                        value={formdata.comment}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <div className="text-center" style={{ display: "flex", justifyContent: "center" }}>
                                    <Button
                                        variant="primary"
                                        className="mt-3"
                                        style={{ backgroundColor: "red", color: "white", border: "none" }}
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                            <ToastContainer />
                        </Modal.Body>
                    </Modal>

                    <Modal show={showRequestModal} onHide={handleCloseRequestModal}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ width: "100%", textAlign: "center" }}>Request a Call Back </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmitRequestcallback}>
                                <Form.Group controlId="formName">
                                    <Form.Control type="text" placeholder="Name" name='fullname' value={request.fullname} onChange={handleInputChangerequest} />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className='mt-3 mb-3'>
                                    <Form.Control type="email" placeholder="Email" name='email' value={request.email} onChange={handleInputChangerequest} />
                                </Form.Group>
                                <Form.Group controlId="formPhone">
                                    <Form.Control type="text" placeholder="Mobile" name='phone' value={request.phone} onChange={handleInputChangerequest} />
                                </Form.Group>
                                <div className='text-center' style={{ display: "flex", justifyContent: "center" }}>
                                    <Button variant="primary" className='mt-3' style={{ backgroundColor: "black", color: "white", border: "none" }} type="submit" >
                                        Submit
                                    </Button>

                                </div>

                            </Form>
                            <ToastContainer />

                        </Modal.Body>
                    </Modal>

                </>


            }

        </>
  )
}

export default BrandDetails