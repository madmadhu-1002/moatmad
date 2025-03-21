"use client"

import { useState } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Career = ({jobs}) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        post_jobs_id: 0, // This will remain hidden and not shown on the form
        cv: null,
      });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: files ? files[0] : value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));
    
        try {
          const response = await axios.post('https://admin.moatamad.com/api/applyJob', formDataToSend, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          toast(response.data.data);
    
          setFormData({
            fullName: '',
            email: '',
            mobileNumber: '',
            cv: null,
          })
         
        } catch (error) {
    
          const errors = error.response?.data?.data; // Safely access nested data
          if (errors) {
            Object.values(errors).forEach(errorArray => {
              errorArray.forEach(errorMessage => {
                toast(errorMessage);
              });
            });
          } else {
            toast("An unexpected error occurred."); // Fallback error message
          }
    
        }
      }

  return (
    <Container>
              <ToastContainer />
      {jobs?.length === 0 ? (
        <>
              <h1 className='text-center mt-5' style={{fontSize:'24px'}}>Apply Job</h1>

        <Row style={{display:"flex",justifyContent:'center'}}>
        <Col lg={6} className='carrer-job-form mt-5 mb-5'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
             
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
             
            />
          </Form.Group>

          <Form.Group controlId="mobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
             
            />
          </Form.Group>

          <Form.Group controlId="cv">
            <Form.Label>Upload pdf only</Form.Label>
            <Form.Control
              type="file"
              name="cv"
              onChange={handleChange}
             
            />
          </Form.Group>

          <Button variant="primary" type="submit" className='mt-3'>
            Submit Application
          </Button>
        </Form>
        </Col>
        </Row>
        </>
      ) : (
        <>
         <h3 className='text-center mt-5'>Career Opportunities</h3>
       
        <Row>
          <Col lg={12}>
            <div className="table-responsive mt-4">
              <table className="table table-responsive table-striped table-bordered table-hover">
                <thead className="table-head">
                  <tr className="text-center">
                    <th>#</th>
                    <th>Job Code</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>No. of Vacancy</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {jobs?.map((job, index) => (
                    <tr key={job.id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-start">{job.job_code}</td>
                      <td className="text-start">{job.department.department_name}</td>
                      <td className="text-start">{job.position.position}</td>
                      <td className="text-center">{job.no_of_vacancy}</td>
                      <td className="text-center capitalize">{job.office_locations_id}</td>
                      <td className="text-center">
                        <a href={`/careers/${job.job_code}`}>
                          <button type="button" className="view-description-btn btn btn-primary">
                            View Description &amp; Apply
                          </button>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
        </>
      )}
    </Container>
  )
}

export default Career