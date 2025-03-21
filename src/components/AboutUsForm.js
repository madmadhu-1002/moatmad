import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function TextControlsExample() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    comment: '',
    attachment: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('fullname', formData.fullname);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('comment', formData.comment);
    if (formData.attachment) {
      data.append('attachment', formData.attachment);
    }

    try {
      const response = await axios.post('https://admin.moatamad.com/api/storeWantToJoinOurTeam', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data) {
        toast.success(response.data.message)
        setFormData({
            fullname: '',
            email: '',
            phone: '',
            comment: '',
            attachment: null
          })
        // You can also handle success by showing a success message to the user
      } else {
        // Handle the error by showing an error message to the user
      }
    } catch (error) {
      toast.error(error.response.data.data.attachment[0])
      toast.error(error.response.data.data.email[0])
      toast.error(error.response.data.data.fullname[0])
      toast.error(error.response.data.data.phone[0])
      toast.error(error.response.data.data.attachment[1])


      


      // Handle the error by showing an error message to the user
    }
  };
  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formFullName">
        <Form.Control 
          type="text" 
          placeholder="Enter your full name" 
          name="fullname" 
          value={formData.fullname} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Control 
          type="email" 
          placeholder="name@example.com" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Control 
          type="tel" 
          placeholder="Enter your mobile number" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formComment">
        <Form.Control 
          as="textarea" 
          rows={3} 
          name="comment" 
          value={formData.comment} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFile">
        <Form.Control 
          type="file" 
          name="attachment" 
          onChange={handleChange} 
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <ToastContainer/>
    </>

  );
}

export default TextControlsExample;
