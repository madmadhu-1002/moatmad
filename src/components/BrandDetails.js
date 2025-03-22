"use client"

import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { FaMoneyBill } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart, registerables, ArcElement } from "chart.js";
import { MdOutlineDriveEta } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { RotatingLines } from 'react-loader-spinner';

Chart.register(...registerables);
Chart.register(ArcElement);
const currency = "AED";

const BrandDetails = ({ vehicledata }) => {
  const [iAmount, setIAmount] = useState(0);
  const [iRate, setIRate] = useState(4.09);
  const [finance, setFinance] = useState(false)
  const [pAmount, setPAmount] = useState(vehicledata?.VehicleEMIDetails?.price || 0)
  const [downPayment, setDownPayment] = useState(vehicledata.VehicleEMIDetails.down_payment_min_value || 0);
  const [piepAmount, setPiepAmount] = useState(vehicledata?.VehicleEMIDetails?.price || 0);
  const [tAmount, setTAmount] = useState(0);
  const [iTime, setITime] = useState(5);
  const [emi, setEmi] = useState(0);
  const [showBookNowModal, setShowBookNowModal] = useState(false);
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  const allVehicleImages = [
    ...vehicledata.vehicleGalleryByCategory[0].vehicle_images,
    ...vehicledata.vehicleGalleryByCategory[1].vehicle_images
  ];

  const imageInterior = vehicledata.vehicleGalleryByCategory[1].vehicle_images;

  const images = allVehicleImages && allVehicleImages.map(item => ({
    original: item.image,
    thumbnail: item.image,
  }));


  const images2 = imageInterior && imageInterior.map(item => ({
    original: item.image,
    thumbnail: item.image,
  }));

  useEffect(() => {
    setLoading(true);
    // Ensure this runs only in the browser
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);

    checkIsMobile(); // Set initial value
    window.addEventListener("resize", checkIsMobile);
    setLoading(false);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  const handleScroll = () => {
    if (window.scrollY > 610) {
      setShowStickyHeader(true);
    } else {
      setShowStickyHeader(false);
    }
  };
  const handleButtonClick = (e, targetId) => {
    e.preventDefault();
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 155, // Adjust the scroll position by subtracting 100 pixels
        behavior: 'smooth'
      });
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

 
  const handleChangeSliderPrincipalAmount = (event) => {
    const value = parseInt(event.target.value);
    setPiepAmount(value);
    setDownPayment(pAmount - value)

  };
  const handleChangeSliderTime = (event) => {
    const value = parseInt(event.target.value);
    setITime(value);
  };
  const handleChangeSliderDownPayment = (event) => {
    const value = parseInt(event.target.value);
    setDownPayment(value);
    setPiepAmount(pAmount - value);
  };
  const handleCalculate = () => {
    const loanAmount = pAmount - downPayment; // Adjusted principal amount
    const interestRate = (iRate) / 100; // Adding a fixed 4% to interest rate
    const totalInterest = loanAmount * interestRate * iTime; // Total interest for the loan period
    const totalAmount = loanAmount + totalInterest; // Total amount to be paid
    const emiValue = totalAmount / (iTime * 12); // EMI value
    setTAmount(Math.round(totalAmount)); // Set the total amount paid, rounded to nearest integer
    setIAmount(Math.round(totalInterest)); // Set the total interest paid
    setEmi(Math.round(emiValue)); // Set the monthly EMI, rounded to nearest integer
  };
  useEffect(() => {
    handleCalculate();
  }, [pAmount, iRate, iTime, downPayment]);

  const handleShowBookNowModal = () => setShowBookNowModal(true);
  const handleShowTestDriveModal = () => setShowTestDriveModal(true);
  const handleShowRequestModal = () => setShowRequestModal(true);

  const features = [
    { name: "Car Overview", id: '1' },
    { name: "Extra Features", id: "2" },
    { name: "EMI Calculator", id: "3" },
  ];

  function formatCurrency(num) {
    if (typeof num === 'number') {
      return num.toLocaleString('en-US');
    } else {
      return 'Invalid input';
    }
  }


  return (
    <>
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
                    thumbnailPosition='left'
                    showBullets={true}
                    autoPlay={true}
                    infinite={true} // Enable infinite looping of main images
                    slideInterval={2000} // Set the autoplay interval for the main images

                  />
                  : <ImageGallery
                    items={images}
                    showFullscreenButton={false}
                    showNav={false} // Enable navigation for looping
                    showPlayButton={false}
                    thumbnailPosition='left'
                    showBullets={true}
                    autoPlay={true} // Enable autoplay to keep it looping
                    infinite={false} // Enable infinite looping of images
                    slideInterval={2000}
                    thumbnailLoading="lazy" // or "eager"
                    slideOnThumbnailOver={true} // or false

                  />
                }
              </Col>
              <Col lg={4} md={4} className='small-box-fixed-postion'>
                <div className='subcontent-div'>
                  {/* <div>
                                        <h6 style={{ fontWeight: "300", fontSize: "14px", fontWeight: "700", color: "gray" }}>Ref No : {vehicledata && vehicledata.CarOverviewList.reference_no}</h6>
                                    </div> */}
                  <div >
                    <h6 style={{ fontSize: "20px", color: "red" }}>{vehicledata && vehicledata.CarOverviewList.car_title_en} {vehicledata && vehicledata.CarOverviewList.engine} - {vehicledata && vehicledata.CarOverviewList.year}</h6>
                  </div>
                  <div>
                    <h6 style={{ fontWeight: "400", display: "flex", justifyContent: "space-between", width: '70%' }}>
                      <p>{vehicledata && vehicledata.CarOverviewList.kilometers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} kms</p><span style={{ color: "red" }}>|</span><p>{vehicledata && vehicledata.CarOverviewList.fuel_en}</p><span style={{ color: "red" }}>|</span><p>{vehicledata && vehicledata.CarOverviewList.transmission_en}</p>
                    </h6>
                  </div>
                  <div>
                    <h6 style={{ fontWeight: "300", fontSize: "14px" }}><MdOutlineDriveEta color='green' /> Test Drive : Available</h6>
                  </div>
                  <div className='bottom-shadow'>
                    <h6 style={{ fontWeight: "300", fontSize: "14px" }}><IoLocationSharp color='red' /> #166 , Souq Al Haraj , Sharjah, UAE</h6>
                  </div>
                  <div className='aed-dev mt-4'>
                    <h6 style={{ fontSize: '14px', display: 'flex', alignItems: 'end' }}><span style={{ color: "black", fontSize: "12px" }}>AED</span>&nbsp;<span style={{ color: "red" }}>{vehicledata && formatCurrency(vehicledata.CarOverviewList.price)}</span></h6>
                    <h6 style={{ fontSize: '22px', display: "flex", alignItems: 'center' }}>
                      EMI :&nbsp;<span style={{ color: "red" }}>
                        <span style={{ color: "black", fontSize: "14px" }}>AED</span>   {vehicledata && Number(vehicledata.CarOverviewList.emi_amount) >= 1000 ? Number(vehicledata.CarOverviewList.emi_amount).toLocaleString("en-US") : Number(vehicledata.CarOverviewList.emi_amount).toFixed(0)}



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
                          <a key={item.id || index} style={{ textDecoration: "none", color: "white" }} href={`#${item.id}`} onClick={(e) => handleButtonClick(e, item.id)}>
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
                      {vehicledata ?
                        <Row >
                          <h4 className="mb-2">{vehicledata.CarOverviewTitle.category_title_en}</h4>
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
                                        <h6>{vehicledata.CarOverviewList.description_en}</h6>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                    <div className='first-and-main-div'>
                                      <div className='caroverview-icon-div'>
                                        <img src={vehicledata.CarOverviewList.body_condition_icon1_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                      </div>
                                      <div className='caroverview-feture-div'>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.body_type_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.body_type_en}</h6>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                    <div className='first-and-main-div mobile-border'>
                                      <div className='caroverview-icon-div'>
                                        <img src={vehicledata.CarOverviewList.fuel_icon_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                      </div>
                                      <div className='caroverview-feture-div'>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.fuel_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.fuel_en}</h6>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >


                                    <div className='first-and-main-div'>
                                      <div className='caroverview-icon-div'>
                                        <img src={vehicledata.CarOverviewList.regional_specs_icon1_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                      </div>
                                      <div className='caroverview-feture-div'>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.regional_specs_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.regional_specs_en}</h6>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                    <div className='first-and-main-div mobile-border'>
                                      <div className='caroverview-icon-div' style={{ border: "none" }}>
                                        <img src={vehicledata.CarOverviewList.body_condition_icon_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                      </div>
                                      <div className='caroverview-feture-div'>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.body_condition_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.body_condition_en}</h6>
                                      </div>
                                    </div>

                                  </Col> <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                    <div className='first-and-main-div'>
                                      <div className='caroverview-icon-div'>
                                        <img src={vehicledata.CarOverviewList.warranty_icon_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                      </div>
                                      <div className='caroverview-feture-div'>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.warranty_name_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.warranty_name_en}</h6>
                                      </div>
                                    </div>
                                  </Col> <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                    <div className='first-and-main-div mobile-border'>
                                      <div className='caroverview-icon-div'>
                                        <img src={vehicledata.CarOverviewList.door_icon_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                      </div>
                                      <div className='caroverview-feture-div'>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.door_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.door_count}</h6>
                                      </div>
                                    </div>
                                  </Col> <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                    <div className='first-and-main-div'>
                                      <div className='caroverview-icon-div'>
                                        <img src={vehicledata.CarOverviewList.transmission_icon1_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                      </div>
                                      <div className='caroverview-feture-div'>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.transmission_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.transmission_en}</h6>
                                      </div>
                                    </div>
                                  </Col> <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                    <div className='first-and-main-div mobile-border'>
                                      <div className='caroverview-icon-div'>
                                        <img src={vehicledata.CarOverviewList.cylinder_icon_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                      </div>
                                      <div className='caroverview-feture-div'>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.cylinder_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.cylinder}</h6>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col lg={2} sm={3} xs={3} className='small-box-fixed ' >
                                    <div className='first-and-main-div'>
                                      <div className='caroverview-icon-div' style={{ border: "none" }} >
                                        <img src={vehicledata.CarOverviewList.engine_icon1_file} width={'40px'} height={'40px'} style={{ padding: '5px' }} />
                                      </div>
                                      <div className='caroverview-feture-div'>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.engine_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.engine}</h6>
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
                        <h4 style={{ padding: "0px" }}>{vehicledata && vehicledata.ExtraFeaturesTitle.category_title_en}</h4>
                        <Col lg={12} className='extra-features'>
                          <Row >
                            {vehicledata && vehicledata.ExtraFeaturesList.map((item, index) => {
                              return (
                                <Col key={item.id || index} lg={4} className={`${item.newnames}`}
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
                        <h1 style={{ padding: "0px", fontSize: "24px" }} className="mb-2">EMI Calculator</h1>
                        <Col lg={12} className="emi-calculator">
                          <Row className="main-1st-row">
                            <Col md={6} className="main-1st-col" style={{ display: 'grid' }}>
                              <Row className="">
                                <Col md={12} className="emi-starting-rate">
                                  <h5>EMI starting from</h5>
                                  <h6><span> {vehicledata && Number(vehicledata.CarOverviewList.emi_amount) >= 1000 ? Number(vehicledata.CarOverviewList.emi_amount).toLocaleString("en-US") : Number(vehicledata.CarOverviewList.emi_amount).toFixed(0)}


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
                                            data: [vehicledata?.VehicleEMIDetails?.loan_amount_value || 0, iAmount]
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
                </Col>
              </Row>
            </Container>
          </Container>

        </>
      }

    </>
  )
}

export default BrandDetails