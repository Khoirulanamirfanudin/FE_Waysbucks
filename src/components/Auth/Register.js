import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState, } from 'react'
import { useMutation } from 'react-query';
import { API } from '../../config/api'; 
import { Alert } from 'react-bootstrap';





const Register = ({show,Hide, setModalRegisterShow,setModalLoginShow}) => {
  
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { fullname, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/register', body, config);
      if (response.data.status === 'success...') {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          fullname: '',
          email: '',
          password: '',
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });
  
    return(
        <>
        
        <Modal show={show} onHide={Hide} >

        <div className="form-group">
        
            <h1>
                Register
            </h1>
            {message && message}
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control  onChange={handleChange} type="email" placeholder="Enter email" name='email' value={email}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control onChange={handleChange} type="password" placeholder="Password" name='password' value={password} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFullName">
                    <Form.Control onChange={handleChange} type="text" placeholder="Full Name" name='fullname' value={fullname}/>
                </Form.Group>

                <Button onClick={() => {setModalRegisterShow(false); setModalLoginShow(true)}} variant="danger" type="submit">
                    Register
                </Button>

                <p>
                <Button onClick={() => {setModalRegisterShow(false); setModalLoginShow(true)}} variant="link">Already have an account? <span>Here</span></Button>
                </p>
            </Form>

         </div>    

        </Modal>

        
       
        </>
            
       
    );
}

export default Register