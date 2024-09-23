import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../../api/api'; // Ensure this path is correct
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await login(formData);
            console.log('Login Response: ', response); 
            if (response.status === 200) {
                const userData = response.data.user; // Assuming data contains user info
                console.log('User Data: ',userData)
                dispatch(setUser({
                    _id: userData._id,
                    name: userData.name || '',
                    email: userData.email,
                    role: userData.role || '',
                    auth: true 
                }));
                navigate('/dashboard');
            } else {
                setError(response.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setError(error.message || 'An unexpected error occurred. Please try again.');
        }
    };
    
    

    return (
        <div className='center-form'>
            <Form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <div className='error-message'>{error}</div>}
                <FormGroup controlId='formBasicEmail'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        name='email'
                        placeholder='Enter Email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </FormGroup>
                <FormGroup controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        name='password'
                        placeholder='Enter Password'
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </FormGroup>
                <Button type='submit' variant='dark' className='w-100'>
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;
