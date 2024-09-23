import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import './Dashboard.css'; // Import the new CSS

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error.message);
            }
        };
        fetchUsers();
    }, [navigate]);

    return (
        <Container className='dashboard-container'>
            <Row>
                <Col>
                    <h1 className='dashboard-title'>Dashboard</h1>
                    <Table className='dashboard-table' striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
