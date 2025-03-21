"use client"

import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import Link from 'next/link';
import styles from '@/styles/Compare.module.css'

const Compare = () => {
    const [selectMake, setSelectMake] = useState('');
  const [selectModels, setSelectModels] = useState('');
  const [allmodels, setAllModels] = useState('');
  const [selectedmakes, setSelectedMakes] = useState('');
  const [allvechile, setVechilDetails] = useState('');
  const [selectMake1, setSelectMake1] = useState('');
  const [selectModels1, setSelectModels1] = useState('');
  const [allmodels1, setAllModels1] = useState('');
  const [selectedmakes1, setSelectedMakes1] = useState('');
  const [allvechile1, setVechilDetails1] = useState('');
  const [selectMake2, setSelectMake2] = useState('');
  const [selectModels2, setSelectModels2] = useState('');
  const [allmodels2, setAllModels2] = useState('');
  const [selectedmakes2, setSelectedMakes2] = useState('');
  const [allvechile2, setVechilDetails2] = useState('');
  const [seo, setSeo] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);

    const fechingmakes = async () => {
      try {
        const response = await axios.get('https://admin.moatamad.com/api/getFirstVehicleMakes')
        setSelectMake(response.data);
        setSelectMake1(response.data);
        setSelectMake2(response.data);
      }
      catch {
      }
    }
    fechingmakes();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        if (selectMake == '') {
          const response = await axios.get('https://admin.moatamad.com/api/getFirstVehicleMakes')
          setSelectMake(response.data);
        }
        if (selectMake1 == '') {
          const response = await axios.get('https://admin.moatamad.com/api/getFirstVehicleMakes')
          setSelectMake1(response.data);
        }
        if (selectMake2 == '') {
          const response = await axios.get('https://admin.moatamad.com/api/getFirstVehicleMakes')
          setSelectMake2(response.data);
        }
      } catch (err) {
      }
    };

    fetchModels();
  }, [selectMake, selectMake1, selectMake2]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        if (selectModels) {
          const allmodelres = await axios.get(`https://admin.moatamad.com/api/getFirstVehicleModelsByVehicleId/${selectModels}`);
          setAllModels(allmodelres.data);
        }

        if (selectModels1) {
          const allmodelres1 = await axios.get(`https://admin.moatamad.com/api/getSecondVehicleModelsByVehicleId/${selectModels1}`);
          setAllModels1(allmodelres1.data);
        }

        if (selectModels2) {
          const allmodelres2 = await axios.get(`https://admin.moatamad.com/api/getThirdVehicleModelsByVehicleId/${selectModels2}`);
          setAllModels2(allmodelres2.data);
        }
      } catch (err) {
      }
    };

    fetchModels();
  }, [selectModels, selectModels1, selectModels2]);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        if (selectedmakes) {
          const responsedata = await axios.get(`https://admin.moatamad.com/api/getFirstVehicleDetailsByVehicleModelId/${selectedmakes}`);
          setVechilDetails(responsedata.data);
        }

        if (selectedmakes1) {
          const responsedata1 = await axios.get(`https://admin.moatamad.com/api/getSecondVehicleDetailsByVehicleModelId/${selectedmakes1}`);
          setVechilDetails1(responsedata1.data);
        }

        if (selectedmakes2) {
          const responsedata2 = await axios.get(`https://admin.moatamad.com/api/getThirdVehicleDetailsByVehicleModelId/${selectedmakes2}`);
          setVechilDetails2(responsedata2.data);
        }
      } catch (err) {
      }
    };

    fetchVehicleDetails();
  }, [selectedmakes, selectedmakes1, selectedmakes2]);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await axios.get('https://admin.moatamad.com/api/getComparePageDataBySlug/compare');
        const data = response.data.data;
        setSeo(data.seo);
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      }
    };

    fetchSeoData();
  }, []);

  const allvechileobject = allvechile && allvechile[0] || {};
  const allvechileobject1 = allvechile1 && allvechile1[0] || {};
  const allvechileobject2 = allvechile2 && allvechile2[0] || {};

  const handleselectmodels = (e) => setSelectModels(e.target.value);
  const handleselectmakes = (e) => setSelectedMakes(e.target.value);
  const handleselectmodels1 = (e) => setSelectModels1(e.target.value);
  const handleselectmakes1 = (e) => setSelectedMakes1(e.target.value);
  const handleselectmodels2 = (e) => setSelectModels2(e.target.value);
  const handleselectmakes2 = (e) => setSelectedMakes2(e.target.value);

  const renderColumnHeaders = () => (
    <tr>
      <th>Make / Model</th>
      <th>{allvechileobject.make_en} {allvechileobject.make_en && "/"}   {allvechileobject.model_en}</th>
      <th>{allvechileobject1.make_en}  {allvechileobject1.make_en && "/"} {allvechileobject1.model_en}</th>
      <th>{allvechileobject2.make_en}{allvechileobject2.make_en && "/"}  {allvechileobject2.model_en}</th>
    </tr>
  );

  const renderRow = (label, field, isImage = false) => (
    <tr key={field}>
      <td>{label}</td>
      <td>
        {isImage ? (
          allvechileobject[field] ? (
            <Link href={`/comporte-route/${allvechileobject.slug}`}>
              <img src={allvechileobject[field]} alt={label} style={{ maxWidth: '100px' }} />
            </Link>
          ) : ''
        ) : (
          allvechileobject[field] && !isNaN(allvechileobject[field]) && (field === 'kilometers' || field === 'emi_amount' || field === 'price') ?
            Number(allvechileobject[field]).toLocaleString('en-US') :
            allvechileobject[field] || ''
        )}
      </td>
      <td>
        {isImage ? (
          allvechileobject1[field] ? (
            <Link href={`/comporte-route/${allvechileobject1.slug}`}>
              <img src={allvechileobject1[field]} alt={label} style={{ maxWidth: '100px' }} />
            </Link>
          ) : ''
        ) : (
          allvechileobject1[field] && !isNaN(allvechileobject1[field]) && (field === 'kilometers' || field === 'emi_amount' || field === 'price') ?
            Number(allvechileobject1[field]).toLocaleString('en-US') :
            allvechileobject1[field] || ''
        )}
      </td>
      <td>
        {isImage ? (
          allvechileobject2[field] ? (
            <Link href={`/comporte-route/${allvechileobject2.slug}`}>
              <img src={allvechileobject2[field]} alt={label} style={{ maxWidth: '100px' }} />
            </Link>
          ) : ''
        ) : (
          allvechileobject2[field] && !isNaN(allvechileobject2[field]) && (field === 'kilometers' || field === 'emi_amount' || field === 'price') ?
            Number(allvechileobject2[field]).toLocaleString('en-US') :
            allvechileobject2[field] || ''
        )}
      </td>
    </tr>
  );

  const clearVehicleDetails = () => {
    setVechilDetails(''); // Reset to empty string or empty array
    setVechilDetails1('')
    setVechilDetails2('')
    setSelectMake('');
    setSelectMake1('');
    setSelectMake2('');
    setAllModels('')
    setAllModels1('')
    setAllModels2('')
    setSelectModels('')
    setSelectModels1('')
    setSelectModels2('')
    setSelectedMakes('')
    setSelectedMakes1('')
    setSelectedMakes2('')
  };
  return (
    <>
    <Container className={`mb-5 ${styles.compareTable}`}>
        <div className={`mt-5 ${styles.productsHeading}`}>
          <h3>Compare Cars</h3>
        </div>
        <Row className={styles.compareRow}>
          <Col lg={3} className={`${styles.compareClearCol} mb-3`} style={{ display: "flex", alignItems: "start" }}>
            <Button onClick={clearVehicleDetails}>
              Reset
            </Button>
          </Col>
          <Col lg={3} md={4} sm={4}>
            <Form>
              <Form.Control as="select" className='mb-3' onChange={handleselectmodels}>
                <option value="">Select Brand</option>
                {selectMake && selectMake.map((item, index) => (
                  <option key={index} value={item.car_make_id}>{item.make_en}</option>
                ))}
              </Form.Control>
              <Form.Control as="select" className=' mb-3 model-bootom' onChange={handleselectmakes}>
                <option value="">Select Model</option>
                {allmodels && allmodels.map((item, index) => (
                  <option key={index} value={item.vin_no} > {`${item.model_en} - ${item.reference_no}`}</option>
                ))}
              </Form.Control>
            </Form>
          </Col>
          <Col lg={3} md={4} sm={4}>
            <Form>
              <Form.Control as="select" className='mb-3' onChange={handleselectmodels1}>
                <option value="">Select Brand</option>
                {selectMake1 && selectMake1.map((item, index) => (
                  <option key={index} value={item.car_make_id}>{item.make_en}</option>
                ))}
              </Form.Control>
              <Form.Control as="select" className='mb-3 model-bottom' onChange={handleselectmakes1}>
                <option value="">Select Model</option>
                {allmodels1 && allmodels1.map((item, index) => (
                  <option key={index} value={item.vin_no}>
                    {`${item.model_en}  - ${item.reference_no}`}
                  </option>
                ))}
              </Form.Control>
            </Form>
          </Col>
          <Col lg={3} md={4} sm={4}>
            <Form>
              <Form.Control as="select" className='mb-3' onChange={handleselectmodels2}>
                <option value="">Select Brand</option>
                {selectMake2 && selectMake2.map((item, index) => (
                  <option key={index} value={item.car_make_id}>{item.make_en}</option>
                ))}
              </Form.Control>
              <Form.Control as="select" className='model-bootom' onChange={handleselectmakes2}>
                <option value="">Select Model</option>
                {allmodels2 && allmodels2.map((item, index) => (
                  <option key={index} value={item.vin_no}>{item.model_en} - {item.reference_no}</option>
                ))}
              </Form.Control>
            </Form>
          </Col>
        </Row>

        <div className="table-responsive">
          <Table striped bordered hover className={styles.compareTable}>
            <thead style={{ backgroundColor: "rgb(255, 154, 138)" }}>
              {renderColumnHeaders()}
            </thead>

            <tbody>
              {renderRow('Brand Image', 'car_image', true)}
              {renderRow('Ref. No.', 'reference_no')}
              {renderRow('Year', 'year')}
              {renderRow('Price', 'price')}
              {renderRow('Kilometer', 'kilometers')}
              {renderRow('Body', 'body_type_en')}
              {renderRow('Engine', 'engine')}
              {renderRow('Color', 'vehicle_color_en')}
              {renderRow('Transmission', 'transmission_en')}
              {renderRow('Description', 'description_en')}
              {renderRow('Fuel', 'fuel_en')}
              {renderRow('Doors', 'door_count')}
              {renderRow('Cylinders', 'cylinder')}
              {renderRow('Warranty', 'warranty_name_en')}
              {renderRow('Regional Spec', 'regional_specs_en')}
              {renderRow('Body Condition', 'body_condition_en')}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  )
}

export default Compare