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
import { toast, ToastContainer } from 'react-toastify';
import styles from '@/styles/BrandDetails.module.css'
import Image from 'next/image';

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
  const [request, setRequest] = useState({
    fullname: '',
    email: '',
    phone: '',

  })
  const [formdata, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    date: '',
    comment: ''

  });

  const [booknow, setBookNow] = useState({
    fullname: '',
    email: '',
    phone: '',
    comment: ''

  })

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

  const handleCloseBookNowModal = () => setShowBookNowModal(false);
  const handleCloseTestDriveModal = () => setShowTestDriveModal(false);
  const handleCloseRequestModal = () => setShowRequestModal(false);

  const handleInputChangebooknow = (e) => {
    const { name, value } = e.target;
    setBookNow(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChangerequest = (e) => {
    const { name, value } = e.target;
    setRequest(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitRequestcallback = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://admin.moatamad.com/api/storeRequestCallBack', {
        fullname: request.fullname,
        email: request.email,
        phone: request.phone,
        vehicle_name: vechiledata.CarOverviewList?.car_title_en, // Added optional chaining for safety
      });

      if (response) {
        toast.success(response.data.message, {
          onClose: () => setShowRequestModal(false),  // Close modal when toast is dismissed
          autoClose: 5000,  // Optional: Automatically close the toast after 5 seconds
        });
        // Reset the form state
        setRequest({
          fullname: '',
          email: '',
          phone: '',
          date: '',
        });

        // Close the modal
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        const errorData = error.response.data.data;

        // Display individual field errors if available
        if (errorData.fullname) toast.error(errorData.fullname[0]);
        if (errorData.email) toast.error(errorData.email[0]);
        if (errorData.phone) toast.error(errorData.phone[0]);
      } else {
        // General error handling (fallback in case no specific field errors)
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://admin.moatamad.com/api/storeBookTestDrive', {
        fullname: formdata.fullname,
        email: formdata.email,
        phone: formdata.phone,
        test_drive_date: formdata.date,
        comment: formdata.comment,
        vehicle_name: vechiledata.CarOverviewList?.car_title_en, // Optional chaining for safety
      });

      if (response) {
        toast.success(response.data.message, {
          onClose: () => setShowTestDriveModal(false),  // Close modal when toast is dismissed
          autoClose: 3000,  // Optional: Automatically close the toast after 5 seconds
        });
        // Clear the form
        setFormData({
          fullname: '',
          email: '',
          phone: '',
          date: '',
          comment: '',
        });

        // Close the modal after success
        setShowTestDriveModal(false);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        const errorData = error.response.data.data;

        // Display individual field errors if available
        if (errorData.fullname) toast.error(errorData.fullname[0]);
        if (errorData.email) toast.error(errorData.email[0]);
        if (errorData.phone) toast.error(errorData.phone[0]);
      } else {
        // Fallback for general errors
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  const handleSubmitBooknow = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://admin.moatamad.com/api/storeBookNow', {
        fullname: booknow.fullname,
        email: booknow.email,
        phone: booknow.phone,
        comment: booknow.comment,
        vehicle_name: vechiledata.CarOverviewList?.car_title_en, // Optional chaining for safety
      });

      if (response) {
        toast.success(response.data.message, {
          onClose: () => setShowBookNowModal(false),  // Close modal when toast is dismissed
          autoClose: 3000,  // Optional: Automatically close the toast after 5 seconds
        });
        // Reset the form
        setBookNow({
          fullname: '',
          email: '',
          phone: '',
          date: '',
          comment: '',
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        const errorData = error.response.data.data;
        // Display individual field errors if available
        if (errorData.fullname) toast.error(errorData.fullname[0]);
        if (errorData.email) toast.error(errorData.email[0]);
        if (errorData.phone) toast.error(errorData.phone[0]);
      } else {
        // Fallback for general errors
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

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
                <div className={styles.interior}>
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
                    thumbnailPosition='bottom'
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
                    thumbnailPosition='bottom'
                    showBullets={true}
                    autoPlay={true} // Enable autoplay to keep it looping
                    infinite={false} // Enable infinite looping of images
                    slideInterval={2000}
                    thumbnailLoading="lazy" // or "eager"
                    slideOnThumbnailOver={true} // or false

                  />
                }
              </Col>
              <Col lg={4} md={4} className={styles.smallBoxFixedPostion}>
                <div className={styles.subcontentDiv}>
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
                    <h6 style={{ fontWeight: "300", fontSize: "14px" }} className='d-flex align-items-center gap-2'><MdOutlineDriveEta color='green' /> Test Drive : Available</h6>
                  </div>
                  <div className={styles.bottomShadow}>
                    <h6 style={{ fontWeight: "300", fontSize: "14px" }} className='d-flex align-items-center gap-2'><IoLocationSharp color='red' /> #166 , Souq Al Haraj , Sharjah, UAE</h6>
                  </div>
                  <div className={`${styles.aedDev} mt-4`}>
                    <Row>
                      <Col sm={12}>
                        <h6 style={{ fontSize: '14px', display: 'flex', alignItems: 'end' }}><span style={{ color: "black", fontSize: "12px" }}>AED</span>&nbsp;<span style={{ color: "red" }}>{vehicledata && formatCurrency(vehicledata.CarOverviewList.price)}</span></h6>
                      </Col>
                      <Col >
                        <h6 style={{ fontSize: '20px', display: "flex", alignItems: 'center' }}>
                          EMI :&nbsp;<span style={{ color: "red" }}>
                            <span style={{ color: "black", fontSize: "14px" }}>AED</span>   {vehicledata && Number(vehicledata.CarOverviewList.emi_amount) >= 1000 ? Number(vehicledata.CarOverviewList.emi_amount).toLocaleString("en-US") : Number(vehicledata.CarOverviewList.emi_amount).toFixed(0)}



                            <span style={{ color: "black", fontSize: "10px" }}> per month</span>
                          </span></h6>
                      </Col>
                    </Row>




                  </div>
                  <Row className='g-3'>
                    <Col sm={12}>
                      <div style={{ marginTop: "8%" }} className={`{styles.bookATextDrive} mb-2`}>
                        <Button className={`${showBookNowModal ? 'active-book-now' : 'btn-dark'}`} style={{ width: "100%" }} onClick={handleShowBookNowModal}>
                          BOOK NOW
                        </Button>
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div className={styles.bookATestDrive}>
                        <Button className={`${showTestDriveModal ? 'book-btn' : 'btn-danger'} me-2`} onClick={handleShowTestDriveModal}>
                          BOOK A TEST DRIVE
                        </Button>
                        <Button onClick={() => { setFinance(true) }} className={`${finance ? 'active-finance' : 'btn-danger'}`} >
                          {features.map((item, index) => (
                            item.id === "3" ?
                              <a key={item.id || index} style={{ textDecoration: "none", color: "white" }} href={`#${item.id}`} onClick={(e) => handleButtonClick(e, item.id)}>
                                FINANCE
                              </a> : null
                          ))}
                        </Button>
                      </div>
                    </Col>
                    <Col>
                      <div className={`${styles.bookATextDrive} mt-2 mb-3`}>
                        <Button className={`${showRequestModal ? 'blue-btn request-btn ' : ' btn-success request-btn-active'}`} style={{ width: "100%", textTransform: "uppercase" }} onClick={handleShowRequestModal}>
                          Request a Call Back                </Button>
                      </div>
                    </Col>
                  </Row>



                </div>
              </Col>
            </Row>

            <Container fluid>
              <Row>
                <Col lg={8} md={8}>
                  <Container fluid className='mt-5'>
                    <Container fluid id="1" className={styles.carOverviewContainer} style={{ padding: "0px" }}>
                      {vehicledata ?
                        <Row >
                          <h4 className="mb-2">{vehicledata.CarOverviewTitle.category_title_en}</h4>
                          <Col lg={12} md={12} className={styles.carOverviewCol}>
                            <div className={styles.carOverViewDiv}>
                              <Col lg={12} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <Row style={{ display: "flex", justifyContent: 'center' }}>
                                  <Col lg={2} sm={3} xs={3} className={styles.smallBoxFixed} >
                                    <div className='first-and-main-div  mobile-border'>
                                      <div className={styles.carOverviewIconDiv}>
                                        <Image alt='microsoft image' src="/assets/car-overview/MicrosoftTeams-image (81).png" width={40} height={40} style={{ padding: '5px' }} />
                                      </div>
                                      <div className={styles.carOverviewFeatureDiv}>
                                        <h6 className='featers-main-haeding'>DESCRIPTION</h6>
                                        <h6>{vehicledata.CarOverviewList.description_en}</h6>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col lg={2} sm={3} xs={3} className={styles.smallBoxFixed} >
                                    <div className='first-and-main-div'>
                                      <div className={styles.carOverviewIconDiv}>
                                        <Image alt='body condition icon' src={vehicledata.CarOverviewList.body_condition_icon1_file} width={40} height={40} style={{ padding: '5px' }} />
                                      </div>
                                      <div className={styles.carOverviewFeatureDiv}>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.body_type_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.body_type_en}</h6>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col lg={2} sm={3} xs={3} className={styles.smallBoxFixed}  >
                                    <div className='first-and-main-div mobile-border'>
                                      <div className={styles.carOverviewIconDiv}>
                                        <Image alt='fuel icon' src={vehicledata.CarOverviewList.fuel_icon_file} width={40} height={40} style={{ padding: '5px' }} />
                                      </div>
                                      <div className={styles.carOverviewFeatureDiv}>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.fuel_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.fuel_en}</h6>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col lg={2} sm={3} xs={3} className={styles.smallBoxFixed} >


                                    <div className='first-and-main-div'>
                                      <div className={styles.carOverviewIconDiv}>
                                        <Image alt='regional specs' src={vehicledata.CarOverviewList.regional_specs_icon1_file} width={40} height={40} style={{ padding: '5px' }} />
                                      </div>
                                      <div className={styles.carOverviewFeatureDiv}>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.regional_specs_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.regional_specs_en}</h6>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col lg={2} sm={3} xs={3} className={styles.smallBoxFixed} >
                                    <div className='first-and-main-div mobile-border'>
                                      <div className={styles.carOverviewIconDiv} style={{ border: "none" }}>
                                        <Image alt='body condition icon' src={vehicledata.CarOverviewList.body_condition_icon_file} width={40} height={40} style={{ padding: '5px' }} />
                                      </div>
                                      <div className={styles.carOverviewFeatureDiv}>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.body_condition_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.body_condition_en}</h6>
                                      </div>
                                    </div>

                                  </Col> <Col lg={2} sm={3} xs={3} className={styles.smallBoxFixed} >
                                    <div className='first-and-main-div'>
                                      <div className={styles.carOverviewIconDiv}>
                                        <Image alt='warranty icon' src={vehicledata.CarOverviewList.warranty_icon_file} width={40} height={40} style={{ padding: '5px' }} />
                                      </div>
                                      <div className={styles.carOverviewFeatureDiv}>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.warranty_name_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.warranty_name_en}</h6>
                                      </div>
                                    </div>
                                  </Col> <Col lg={2} sm={3} xs={3} className={styles.smallBoxFixed} >
                                    <div className='first-and-main-div mobile-border'>
                                      <div className={styles.carOverviewIconDiv}>
                                        <Image alt='door icon' src={vehicledata.CarOverviewList.door_icon_file} width={40} height={40} style={{ padding: '5px' }} />
                                      </div>
                                      <div className={styles.carOverviewFeatureDiv}>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.door_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.door_count}</h6>
                                      </div>
                                    </div>
                                  </Col> <Col lg={2} sm={3} xs={3} className={styles.smallBoxFixed} >
                                    <div className='first-and-main-div'>
                                      <div className={styles.carOverviewIconDiv}>
                                        <Image alt='transmission icon' src={vehicledata.CarOverviewList.transmission_icon1_file} width={40} height={40} style={{ padding: '5px' }} />
                                      </div>
                                      <div className={styles.carOverviewFeatureDiv}>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.transmission_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.transmission_en}</h6>
                                      </div>
                                    </div>
                                  </Col> <Col lg={2} sm={3} xs={3} className={styles.smallBoxFixed} >
                                    <div className='first-and-main-div mobile-border'>
                                      <div className={styles.carOverviewIconDiv}>
                                        <Image alt='cylinder icon' src={vehicledata.CarOverviewList.cylinder_icon_file} width={40} height={40} style={{ padding: '5px' }} />
                                      </div>
                                      <div className={styles.carOverviewFeatureDiv}>
                                        <h6 className='featers-main-haeding'>{vehicledata.CarOverviewList.cylinder_label_en}</h6>
                                        <h6>{vehicledata.CarOverviewList.cylinder}</h6>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col lg={2} sm={3} xs={3} className={styles.smallBoxFixed} >
                                    <div className='first-and-main-div'>
                                      <div className={styles.carOverviewIconDiv} style={{ border: "none" }} >
                                        <Image alt='engine icon' src={vehicledata.CarOverviewList.engine_icon1_file} width={40} height={40} style={{ padding: '5px' }} />
                                      </div>
                                      <div className={styles.carOverviewFeatureDiv}>
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
                        <Col lg={12} className={styles.extraFeatures}>
                          <Row >
                            {vehicledata && vehicledata.ExtraFeaturesList.map((item, index) => {
                              return (
                                <Col key={item.id || index} lg={4} className={`${item.newnames}`}
                                >
                                  <div className={styles.extraFeaturesSecondDiv}>
                                    <p>{item.extra_feature_en}</p>
                                    <Image alt='cdn icon' src='https://cdn-icons-png.freepik.com/256/5290/5290058.png?ga=GA1.1.769605160.1678772043&semt=ais_hybrid' width={14} height={14} />
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
                        <Col lg={12} className={styles.emiCalculator}>
                          <Row className="main-1st-row">
                            <Col md={6} className={styles.main1stCol} style={{ display: 'grid' }}>
                              <Row className="">
                                <Col md={12} className={styles.emiStartingRate}>
                                  <h5>EMI starting from</h5>
                                  <h6><span> {vehicledata && Number(vehicledata.CarOverviewList.emi_amount) >= 1000 ? Number(vehicledata.CarOverviewList.emi_amount).toLocaleString("en-US") : Number(vehicledata.CarOverviewList.emi_amount).toFixed(0)}


                                  </span> per month</h6>
                                </Col>
                                <Col md={12} className={styles.pieChartCircle}>
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
                                  <div className={styles.smallCardMainDiv}>
                                    <div className={styles.smallCard}>
                                      <div className={styles.divOne}></div>&nbsp;
                                      <p>Principal Loan Amount</p>
                                    </div>
                                    <div>
                                      <p>{currency} {formatCurrency(pAmount - downPayment)}</p>
                                    </div>
                                  </div>

                                  <div className={`${styles.smallCardMainDiv} ${styles.secondDiv}`}>
                                    <div className={styles.smallCard}>
                                      <div className={styles.divTwo}></div>&nbsp;
                                      <p className="">Total Interest Payable</p>
                                    </div>
                                    <div>
                                      <p>{currency} {formatCurrency(iAmount)}</p>
                                    </div>
                                  </div>

                                  <div className={styles.smallCardMainDiv}>
                                    <div className={styles.smallCard}>
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
                            <Col md={6} className={styles.priceRangeMainCol}>
                              <div className={styles.mainPriceDiv}>
                                <div className={styles.emiLoanAmountCalculator}>
                                  <p>Loan Amount</p>
                                  <p>{formatCurrency(piepAmount)}</p>
                                </div>
                                <Form.Range
                                  value={piepAmount}
                                  min={0}
                                  max={pAmount}
                                  onChange={handleChangeSliderPrincipalAmount}
                                />
                                <div className={styles.emiLoanAmountCalculator}>
                                  <p>{currency} 0</p>
                                  <p> {currency} {pAmount}</p>
                                </div>

                                <div className={styles.emiLoanAmountCalculatorBelow}>
                                  <p>Duration of Loan</p>
                                  <p>{iTime} Year{iTime > 1 && "s"}</p>
                                </div>
                                <Form.Range
                                  value={iTime}
                                  min={1}
                                  max={5}
                                  onChange={handleChangeSliderTime}
                                />
                                <div className={styles.emiLoanAmountCalculatorBelow}>
                                  <p>1 Year</p>
                                  <p>5 Years</p>
                                </div>

                                <div className={styles.emiLoanAmountCalculator}>
                                  <p>Down Payment</p>
                                  <p>{formatCurrency(downPayment)}</p>
                                </div>
                                <Form.Range
                                  value={downPayment}
                                  min={0}
                                  max={pAmount}
                                  onChange={handleChangeSliderDownPayment}
                                />
                                <div className={styles.emiLoanAmountCalculatorBelow}>
                                  <p>{currency} 0</p>
                                  <p>{currency} {formatCurrency(pAmount)}</p>
                                </div>
                              </div>

                              <div className={styles.divContentBelow}>
                                <p className={styles.processPara}>Finance with MoatamadCars</p>
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