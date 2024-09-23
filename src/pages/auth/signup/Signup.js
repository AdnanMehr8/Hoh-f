import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../../api/api';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
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
        setError(null); // Reset any previous errors
        try {
            const response = await signup(formData);
            if (response.status === 201) { // Check for successful creation
                navigate('/login');
            } else {
                setError(response.data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            setError(error.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setFormData({
                name: '',
                email: '',
                password: '',
                role: ''
            });
        }
    };
    

    return (
        <div className='center-form '>
            <Form onSubmit={handleSubmit}>
                <h1>Signup</h1>
                {error && <div className='error-message'>{error}</div>}
                <FormGroup controlId='formBasicEmail'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        name='email'
                        placeholder='Enter Email'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup controlId='formBasicName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        placeholder='Enter Name'
                        value={formData.name}
                        onChange={handleInputChange}
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
                    />
                </FormGroup>
                <FormGroup controlId='formBasicRole'>
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        type='text'
                        name='role'
                        placeholder='Enter Role'
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <Button type='submit' variant='dark' className='w-100'>
                    Signup
                </Button>
            </Form>
        </div>
    );
};

export default Signup;
