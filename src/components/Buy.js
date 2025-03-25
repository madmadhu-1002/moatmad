"use client";

import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Range } from 'react-range';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { FaEye } from 'react-icons/fa';
import Link from "next/link";
import styles from '@/styles/Buy.module.css'
import Image from "next/image";

const Buy = ({buydata}) => {
    const router = useRouter();
    const [selectedBodyType, setSelectedBodyType] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [values, setValues] = useState([10, 200]);
  const [bodytypedata, setBodyTypeData] = useState([]);
  const [makedata, setMakeData] = useState([]);
  const [modeldata, setModelData] = useState([]);
  const [vechileyear, setVechileYear] = useState([]);
  const [minValue, setMinValue] = useState(15000);
  const [maxValue, setMaxValue] = useState(200000);
  const [searchpage, setSearchPage] = useState(null); // Initialize as null to clearly check if data is present
  const [loading, setLoading] = useState(false)
  const [bodytype, setBodyType] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('https://admin.moatamad.com/api/getVehicleBodyTypes')
      .then((response) => {
        setBodyTypeData(response.data);
      });

    axios.get('https://admin.moatamad.com/api/getVehicleMakes')
      .then((response) => {
        setMakeData(response.data);
      });


  }, []);

  useEffect(() => {
    if (selectedMake && selectedBodyType) {
      const fetchModels = async () => {
        try {
          const response = await axios.get(`https://admin.moatamad.com/api/getVehicleModelsByVehicleMakeAndBodyTypeID/${selectedBodyType}/${selectedMake}`);
          setModelData(response.data);
        } catch (error) {

        }
      };

      fetchModels();
    }
  }, [selectedBodyType, selectedMake]);

  useEffect(() => {
    if (selectedModel) {
      const fetchModels = async () => {
        try {
          const response = await axios.get(`https://admin.moatamad.com/api/getVehicleYearsByModelID/${selectedModel}`);
          setVechileYear(response.data);
        } catch (error) {
        }
      };

      fetchModels();
    }
  }, [selectedModel]);

  useEffect(() => {
    const fetchingBodytype = async () => {
      try {
        const response = await axios.get(`https://admin.moatamad.com/api/getVehicleMakesByBodyTypeID/${selectedBodyType}`);
        setBodyType(response.data);
      } catch (error) {
      }
    };

    if (selectedBodyType) {
      fetchingBodytype();
    }
  }, [selectedBodyType]);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'bodyType':
        setSelectedBodyType(value);
        break;
      case 'make':
        setSelectedMake(value);
        break;
      case 'model':
        setSelectedModel(value);
        break;
      case 'year':
        setSelectedYear(value);
        break;
      default:
        break;
    }
  };

  const handleRangeChange = (newValues) => {
    setMinValue(newValues[0]);
    setMaxValue(newValues[1]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://admin.moatamad.com/api/getVehicleBySearchParams', {
        car_body_type_id: selectedBodyType,
        car_make_id: selectedMake,
        car_model_id: selectedModel,
        year_id: selectedYear,
        min_price: minValue,
        max_price: maxValue,
      });

      // Store response data in state
      setSearchPage(response.data.data);
      router.push("/buy");

    } catch (error) {
    }
  };

  function formatCurrency(num) {
    if (typeof num === 'number') {
      return num.toLocaleString('en-US');
    } else {
      return 'Invalid input';
    }
  }
  const emiAmount = 1000; // Replace with your actual value
  const formattedAmount = emiAmount >= 1000 ? emiAmount.toLocaleString("en-US") : emiAmount.toFixed(0);
  return (
    <>
    {loading ?
        <div className='text-center mt-3' style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>  <ThreeDots className='text-center' /> </div> :
        <>

          <Container fluid>
            <Row className='search-field'>
              <Col lg={12} className={`${styles.formColLg-3} mb-5 p-0`}>
                <div className={`${styles.formColLg} ${styles.searchBox1}`}>
                  <h1>Quality Cars, Unbeatable Deals</h1>
                  
                  <Form style={{ width: "100%" }} onSubmit={handleSubmit} >
                    <Container fluid>
                      <Row style={{ height: '60px', display: "flex", justifyContent: 'center', padding: "0px 24px", alignItems: "center" }} className="g-2">
                        <Col lg={2} md={2} sm={2}>
                          <div className={styles.inputValues} style={{ position: 'relative' }}>
                            <Form.Control
                              as="select"
                              placeholder="Select Body Type"
                              style={{ paddingRight: '30px' }}
                              name="bodyType"
                              value={selectedBodyType}
                              onChange={handleSelectChange}
                            >
                              <option value="">Select Body Type</option>
                              {bodytypedata.map((item) => (
                                <option key={item.id} value={item.id}>{item.body_type_en}</option>
                              ))}
                            </Form.Control>
                            <span
                              className={styles.downArrow}
                              style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none'
                              }}
                            >
                              ▼
                            </span>
                          </div>
                        </Col>
                        <Col lg={2} md={2} sm={2}>
                          <div className={styles.inputValues} style={{ position: 'relative' }}>
                            <Form.Control
                              as="select"
                              placeholder="Select Make"
                              style={{ paddingRight: '30px' }}
                              name="make"
                              value={selectedMake}
                              onChange={handleSelectChange}
                            >
                              <option value="">Select Make</option>
                              {bodytype && bodytype.map((item) => (
                                <option key={item.id} value={item.car_make_id}>{item.car_make.make_en}</option>
                              ))}
                            </Form.Control>
                            <span
                              className={styles.downArrow}
                              style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none'
                              }}
                            >
                              ▼
                            </span>
                          </div>
                        </Col>
                        <Col lg={2} md={2} sm={2}>
                          <div className={styles.inputValues} style={{ position: 'relative' }}>
                            <Form.Control
                              as="select"
                              placeholder="Select Model"
                              style={{ paddingRight: '30px' }}
                              name="model"
                              value={selectedModel}
                              onChange={handleSelectChange}
                            >
                              <option value="">Select Model</option>
                              {modeldata.map((item) => (
                                <option key={item.id} value={item.id}>{item.model_en}</option>
                              ))}
                            </Form.Control>
                            <span
                              className={styles.downArrow}
                              style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none'
                              }}
                            >
                              ▼
                            </span>
                          </div>
                        </Col>
                        <Col lg={2} md={2} sm={2}>
                          <div className={styles.inputValues} style={{ position: 'relative' }}>
                            <Form.Control
                              as="select"
                              placeholder="Select Year"
                              style={{ paddingRight: '30px' }}
                              name="year"
                              value={selectedYear}
                              onChange={handleSelectChange}
                            >
                              <option value="">Select Year</option>
                              {vechileyear.map((item, index) => (
                                <option key={item.id || item.year || index} value={item.year}>{item.years.year}</option>
                              ))}
                            </Form.Control>
                            <span
                              className={styles.downArrow}
                              style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none'
                              }}
                            >
                              ▼
                            </span>
                          </div>
                        </Col>
                        <Col lg={2} md={2} sm={2}>
                          <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: '3%', marginBottom: '3%' }}>
                            <div className={`mb-2 ${styles.priceBar}`}>
                              <span style={{ fontSize: '12px', color: 'white' }}>AED {formatCurrency(minValue)}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <span style={{ fontSize: '12px', color: 'white' }}>AED {formatCurrency(maxValue)}</span>
                            </div>
                            <Range
                              step={1}
                              min={15000}
                              max={200000}
                              values={[minValue, maxValue]}
                              onChange={handleRangeChange}
                              renderTrack={({ props, children }) => (
                                <div
                                  {...props}
                                  style={{
                                    ...props.style,
                                    height: '2px',
                                    width: '100%',
                                    backgroundColor: '#4a4444',
                                  }}
                                >
                                  {children}
                                </div>
                              )}
                              renderThumb={({ props }) => {
                                const { key, ...restProps } = props; // Extract key and spread the rest
                                return (
                                    <div key={key} {...restProps} style={{ 
                                        ...restProps.style, 
                                        height: '10px', 
                                        width: '10px', 
                                        borderRadius: '50%', 
                                        backgroundColor: 'red' 
                                    }} />
                                );
                            }}
                            />
                          </div>
                        </Col>
                        <Col lg={2} md={2} sm={2} className='text-center'>
                          <div className={styles.serachBtnsHome}>
                            <Button type="submit">Search&nbsp;Vehicle</Button>
                          </div>                    </Col>
                      </Row>
                    </Container>
                  </Form>

                </div>
              </Col>
            </Row>

            {searchpage ? (


              <Col lg={12} className='' style={{ padding: "0px 27px" }}>

                <Row >

                  {searchpage && searchpage.map((item, index) => {

                    return (
                      <Col lg={3} className='mb-5' key={item.id || index}>
                        <Card as={Link} href={`/car-info/${item.slug}`} style={{ textDecoration: 'none', padding: '0px' }} >
                          <Card.Header style={{ padding: "0px" }} className={styles.productsCardHeader}>
                            <Image alt='car image' src={item.car_image} height={444} width={333} />
                            <h6 className={styles.availableH6}>available</h6>
                            <div className={styles.faEyeIconDiv}>
                              <FaEye className='fa-eye-icon' />
                            </div>
                          </Card.Header>
                          <div className={styles.brandNameDiv}>
                            <h6>{item.car_title_en}</h6>
                          </div>

                          <div style={{ display: "grid", alignItems: "center", padding: "0px 20px" }}>
                            <h6 className={`${styles.fullAmountPrice} text-center`} style={{ height: "40px", display: "flex", alignItems: "center", marginBottom: "0px", justifyContent: "center" }}>
                              <span style={{ fontSize: "12px" }}>AED</span>&nbsp;
                              <span style={{ fontSize: "16px", fontWeight: '500', color: "red" }}> {formatCurrency(item.price)} </span>
                            </h6>
                            <h6 className={`${styles.emiPrice} text-center`}>EMI : <span style={{ fontSize: "12px" }}>AED </span>
                              <span
                                className={styles.emiPrice} style={{ fontSize: "24px", fontWeight: "500", color: "red" }}>{Number(item.emi_amount) >= 1000 ? Number(item.emi_amount).toLocaleString("en-US") : Number(item.emi_amount).toFixed(0)}

                              </span>

                              <span style={{ fontSize: "12px" }}>/m</span>
                            </h6>
                          </div>
                          <div className={`${styles.infoWithIcon} mt-3`}>
                            <Row style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                              <Col lg={2} className={styles.indoKmsCol} style={{ padding: '0px', width: '20%' }}>
                                <Row>
                                  <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }} className='text-center'>
                                    <img src={'/assets/product-feture-icons/kms.png'} style={{ width: '30px' }} />
                                  </Col>
                                  <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }}>
                                    {/* <p>{item.kilometers}</p> */}
                                    <p>{item.kilometers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>

                                  </Col>
                                </Row>
                              </Col>
                              <Col lg={2} style={{ padding: '0px' }} >
                                <Row>
                                  <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }}>
                                    <img src='/assets/product-feture-icons/autogere.png' style={{ width: '30px' }} />
                                  </Col>
                                  <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }}>
                                    <p>{item.transmission_en}</p>
                                  </Col>
                                </Row>

                              </Col>
                              <Col lg={2} style={{ padding: '0px' }}>
                                <Row>
                                  <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }} >
                                    <img src='\assets\product-feture-icons\calender.png' style={{ width: '30px' }} />
                                  </Col>
                                  <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }}>
                                    <p>{item.year}</p>
                                  </Col>
                                </Row>
                              </Col>
                              <Col lg={2} style={{ padding: '0px' }}>
                                <Row>
                                  <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }} >
                                    <img src='/assets/product-feture-icons/engine.png' style={{ width: '30px' }} />
                                  </Col>
                                  <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }}>
                                    <p>{item.engine && item.engine.includes(',') ? item.engine.split(',')[1] : item.engine}</p>
                                  </Col>
                                </Row>
                              </Col>
                              <Col lg={2} style={{ padding: '0px' }}>
                                <Row>
                                  <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }} >
                                    <img src='/assets/product-feture-icons/globe.png' style={{ width: '30px' }} />
                                  </Col>
                                  <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }}>
                                    <p>{item.regional_specs_en}</p>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      </Col>

                    )
                  })
                  }
                </Row>
              </Col>
            ) :

              (
                <Col lg={12} className='' style={{ padding: "0px 22px" }}>

                  <Row >

                    {buydata && buydata.vehicles && buydata.vehicles.map((item, index) => {

                      return (
                        <Col lg={3} className='mb-5' key={item.id || index}>
                          <Card as={Link} href={`/car-info/${item.slug}`} style={{ textDecoration: 'none', padding: '0px' }} >
                            <Card.Header style={{ padding: "0px" }} className={styles.productsCardHeader}>
                              <img src={item.car_image} height={'100%'} width={'100%'} />
                              <h6 className={styles.availableH6}>available</h6>
                              <div className={styles.faEyeIconDiv}>
                                <FaEye className='fa-eye-icon' />
                              </div>
                            </Card.Header>
                            <div className={styles.brandNameDiv}>
                              <h6>{item.car_title_en}</h6>
                            </div>

                            <div style={{ display: "grid", alignItems: "center", padding: "0px 20px" }}>
                              <h6 className={`${styles.fullAmountPrice} text-center`} style={{ height: "40px", display: "flex", alignItems: "center", marginBottom: "0px", justifyContent: "center" }}>
                                <span style={{ fontSize: "12px" }}>AED</span>&nbsp;
                                <span style={{ fontSize: "16px", fontWeight: '500', color: "red" }}>{formatCurrency(item.price)}</span>
                              </h6>
                              <h6 className={`${styles.emiPrice} text-center`}>EMI : <span style={{ fontSize: "12px" }}>AED</span>
                                <span
                                  className={styles.emiPrice}
                                  style={{ fontSize: "24px", fontWeight: "500", color: "red" }}>&nbsp;

                                  {Number(item.emi_amount) >= 1000 ? Number(item.emi_amount).toLocaleString("en-US") : Number(item.emi_amount).toFixed(0)}
                                </span>

                                <span style={{ fontSize: "12px" }}>&nbsp;/m</span>
                              </h6>
                            </div>
                            <div className={`${styles.infoWithIcon} mt-3`}>
                              <Row style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Col lg={2} className={styles.indoKmsCol} style={{ padding: '0px', width: '20%' }}>
                                  <Row>
                                    <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }} className='text-center'>
                                      <img src={'/assets/product-feture-icons/kms.png'} style={{ width: '30px' }} />
                                    </Col>
                                    <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }}>
                                      <p>{item.kilometers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>

                                    </Col>
                                  </Row>
                                </Col>
                                <Col lg={2} style={{ padding: '0px' }} >
                                  <Row>
                                    <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }}>
                                      <img src='/assets/product-feture-icons/autogere.png' style={{ width: '30px' }} />
                                    </Col>
                                    <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }}>
                                      <p>{item.transmission_en}</p>
                                    </Col>
                                  </Row>

                                </Col>
                                <Col lg={2} style={{ padding: '0px' }}>
                                  <Row>
                                    <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }} >
                                      <img src='\assets\product-feture-icons\calender.png' style={{ width: '30px' }} />
                                    </Col>
                                    <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }}>
                                      <p>{item.year}</p>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col lg={2} style={{ padding: '0px' }}>
                                  <Row>
                                    <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }} >
                                      <img src='/assets/product-feture-icons/engine.png' style={{ width: '30px' }} />
                                    </Col>
                                    <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }}>
                                      <p>{item.engine && item.engine.includes(',') ? item.engine.split(',')[1] : item.engine}</p>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col lg={2} style={{ padding: '0px' }}>
                                  <Row>
                                    <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }} >
                                      <img src='/assets/product-feture-icons/globe.png' style={{ width: '30px' }} />
                                    </Col>
                                    <Col lg={12} style={{ padding: "0px", display: "flex", justifyContent: 'center' }}>
                                      <p>{item.regional_specs_en}</p>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        </Col>

                      )
                    })
                    }
                  </Row>
                </Col>
              )}
          </Container>
        </>
      }
    </>
  )
}

export default Buy