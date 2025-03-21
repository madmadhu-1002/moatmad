"use client"; 

import { useState, useEffect } from 'react';
import { Accordion, Button, Col, Container, Form, Row } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import { Range } from 'react-range';
import axios from 'axios';
import { useRouter } from "next/navigation";
import Products from './Products';

const HomePage = ({homepage}) => {
    const router = useRouter();
    const [selectedBodyType, setSelectedBodyType] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [values, setValues] = useState([10, 200]);
  const [bodytypedata, setBodyTypeData] = useState();
  const [makedata, setMakeData] = useState();
  const [modeldata, setModelData] = useState();
  const [vechileyear, setVechileYear] = useState();
  const [minValue, setMinValue] = useState(15000);
  const [maxValue, setMaxValue] = useState(200000);
  const [error, setError] = useState(null);
  const [bodytype, setBodyType] = useState();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);

  function formatCurrency2(num) {
    if (typeof num === 'number') {
      return num.toLocaleString('en-US', {
        // minimumFractionDigits: 3,
        // maximumFractionDigits: 3
      });
    } else {
      return 'Invalid input';
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bodyTypeResponse, makeResponse, yearResponse] = await Promise.all([
          axios.get('https://admin.moatamad.com/api/getVehicleBodyTypes'),
          axios.get('https://admin.moatamad.com/api/getVehicleMakes'),
          // axios.get('https://admin.moatamad.com/api/getVehicleYears'),

        ]);

        setBodyTypeData(bodyTypeResponse.data);
        setMakeData(makeResponse.data);
        // setVechileYear(yearResponse.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [0]); // Empty dependency array means this effect runs only once

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

  useEffect(() => {
    if (selectedMake && selectedBodyType) {
      const fetchModels = async () => {
        try {
          const response = await axios.get(`https://admin.moatamad.com/api/getVehicleModelsByVehicleMakeAndBodyTypeID/${selectedBodyType}/${selectedMake}`);
          setModelData(response.data);
        } catch (error) {
          setError(error);
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
          setError(error);
        }
      };

      fetchModels();
    }
  }, [selectedModel]);

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
    console.log("hy")
    setLoading(true);
    try {
      const response = await axios.post('https://admin.moatamad.com/api/getVehicleBySearchParams', {
        car_body_type_id: selectedBodyType,
        car_make_id: selectedMake,
        car_model_id: selectedModel,
        year_id: selectedYear,
        min_price: minValue,
        max_price: maxValue,
      })

      // Store response data in state
      setResponseData(response.data);
      setLoading(false)
      console.log("hy")
      router.push("/searchvechile");


      // Navigate to the search vehicle component
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <Container fluid className='homepage-container'>
<h1>{loading}</h1>
        <Row >
          <Col lg={12} style={{ padding: '0px' }}>
            <div className='form-col-lg-3 '>
              <h6>Quality Cars, Unbeatable Deals</h6>
              <div>
                <Form onSubmit={handleSubmit}>
                  <Row style={{ height: '60px', display: "flex", justifyContent: 'center', padding: "0px 27px", alignItems: "center" }}>
                    <Col lg={2} md={2} sm={2}>
                      <div className='input-values' style={{ position: 'relative' }}>
                        <Form.Control
                          as="select"
                          placeholder="Select Body Type"
                          style={{ paddingRight: '30px' }}
                          name="bodyType"
                          value={selectedBodyType}
                          onChange={handleSelectChange}
                        >
                          <option value="">Select Body Type</option>
                          {bodytypedata && bodytypedata.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>{item.body_type_en}</option>

                            )
                          })}

                        </Form.Control>
                        <span
                          className="down-arrow"
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
                      <div className='input-values' style={{ position: 'relative' }}>
                        <Form.Control
                          as="select"
                          placeholder="Select Make"
                          style={{ paddingRight: '30px' }}
                          name="make"
                          value={selectedMake}
                          onChange={handleSelectChange}
                        >
                          <option value="">Select Make</option>
                          {bodytype && bodytype.map((item) => {
                            return (
                              <option key={item.id} value={item.car_make_id}>{item.car_make.make_en}</option>


                            )
                          })}

                        </Form.Control>
                        <span
                          className="down-arrow"
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
                      <div className='input-values' style={{ position: 'relative' }}>
                        <Form.Control
                          as="select"
                          placeholder="Select Model"
                          style={{ paddingRight: '30px' }}
                          name="model"
                          value={selectedModel}
                          onChange={handleSelectChange}
                        >
                          <option value="">Select Model</option>
                          {modeldata && modeldata.map((item) => {
                            return (


                              <option key={item.id} value={item.id}>{item.model_en}</option>
                            )
                          })}
                        </Form.Control>
                        <span
                          className="down-arrow"
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
                      <div className='input-values' style={{ position: 'relative' }}>
                        <Form.Control
                          as="select"
                          placeholder="Select Year"
                          style={{ paddingRight: '30px' }}
                          name="year"
                          value={selectedYear}
                          onChange={handleSelectChange}
                        >
                          <option value="">Select Year</option>
                          {vechileyear && vechileyear.map((item) => {
                            return (
                              <option key={item.id} value={item.year}>{item.years.year}</option>

                            )
                          })}
                        </Form.Control>
                        <span
                          className="down-arrow"
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
                      <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
                        <div className='mb-2 price-bar'>
                          <span style={{ fontSize: '12px', color: 'white' }}>AED {formatCurrency2(minValue)}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span style={{ fontSize: '12px', color: 'white' }}>AED {formatCurrency2(maxValue)}</span>
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
                          renderThumb={({ props }) => (
                            <div
                              {...props}
                              style={{
                                ...props.style,
                                height: '10px',
                                width: '10px',
                                borderRadius: '50%',
                                backgroundColor: 'white',
                              }}
                            />
                          )}
                        />
                      </div>
                    </Col>
                    <Col lg={2} md={2} sm={2} className='text-center' style={{ display: "flex", justifyContent: "center" }}>
                      <div className='serach-btns-home'>
                        <Button type="submit" >Search&nbsp;Vehicle</Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>

            <Carousel indicators={false}>
              {homepage && homepage.sliders.map((banners) => {
                return (


                  <Carousel.Item key={banners.id}>
                    <img src={banners.image} width={'100%'} />
                  </Carousel.Item>
                )

              })}

            </Carousel>
          </Col>
          
        </Row>

        {/* <Brandscarousel /> */}
        <Products homepage={homepage}/>
        
        


      </Container>
  )
}

export default HomePage