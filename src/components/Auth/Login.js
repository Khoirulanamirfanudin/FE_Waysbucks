import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import "../../CSS/Login.css"
import { API } from '../../config/api';

const Login = ({show,Hide, setModalRegisterShow,setModalLoginShow}) => {

  let navigate = useNavigate();


  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post('/login', body, config);

      // Checking process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data,
        });

        // Status check
        if (response.data.data.status === 'admin') {
          navigate('/complain-admin');
        } else {
          navigate('/');
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });
    
    return(
        <>
     
        <Modal show={show} onHide={Hide}>
        
        <div className="form-group">
        
            <h1>
                Login
            </h1>

            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name='email' value={email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control onChange={handleChange} type="password" placeholder="Password" name='password' value={password} />
                </Form.Group>

                <Button variant="danger" type="submit">
                    Login
                </Button>

                <p>
                <Button onClick={() => {setModalLoginShow(false); setModalRegisterShow(true)}} variant="link">Don't hava an account? Klick <span>Here</span></Button>
                </p>
            </Form>

         </div>    

        </Modal>
       
        </>
            
       
    );
}

export default Login