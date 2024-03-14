import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const AddReportsPage = () => {
    const [formData, setFormData] = useState({
        moduleNumber: '',
        startingPointNE: '',
        startingPointName: '',
        startingPointLink: '',
        endingPointNE: '',
        endingPointName: '',
        endingPointLink: '',
        title: '',
        routes: '',
        recommendations: '',
        surveyMonth: '',
        surveyYear: '',
        client: '',
        enduser: '',
        directory: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(import.meta.env.VITE_BACKEND_URL + `api/reports`, formData)
            .then(() => {
                toast.success('Report added successfully!');
                setFormData({
                    moduleNumber: '',
                    startingPointNE: '',
                    startingPointName: '',
                    startingPointLink: '',
                    endingPointNE: '',
                    endingPointName: '',
                    endingPointLink: '',
                    title: '',
                    routes: '',
                    recommendations: '',
                    surveyMonth: '',
                    surveyYear: '',
                    client: '',
                    enduser: '',
                    directory: '' 
                });
            })
            .catch(error => {
                console.error('Error adding report:', error);
                toast.error('Error adding report. Please try again.');
            });
    };

    return (
        <Container>
            <Row>
                <Col md={12} className='d-flex justify-content-between align-content-center'>
                    <h1 className="mt-4">Add Report</h1>
                    <span>
                        <Button href='/'>Back</Button>
                    </span>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="moduleNumber">
                            <Form.Label>Module Number</Form.Label>
                            <Form.Control type="text" name="moduleNumber" value={formData.moduleNumber} onChange={handleChange} placeholder="Enter module number" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="startingPointName">
                            <Form.Label>Starting Point Name</Form.Label>
                            <Form.Control type="text" name="startingPointName" value={formData.startingPointName} onChange={handleChange} placeholder="Enter starting point name" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="endingPointName">
                            <Form.Label>Ending Point Name</Form.Label>
                            <Form.Control type="text" name="endingPointName" value={formData.endingPointName} onChange={handleChange} placeholder="Enter ending point name" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="startingPointNE">
                            <Form.Label>Starting Point NE</Form.Label>
                            <Form.Control type="text" name="startingPointNE" value={formData.startingPointNE} onChange={handleChange} placeholder="Enter starting point NE" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="endingPointNE">
                            <Form.Label>Ending Point NE</Form.Label>
                            <Form.Control type="text" name="endingPointNE" value={formData.endingPointNE} onChange={handleChange} placeholder="Enter ending point NE" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="routes">
                    <Form.Label>Routes</Form.Label>
                    <Form.Control type="text" name="routes" value={formData.routes} onChange={handleChange} placeholder="Enter routes" />
                </Form.Group>

                <Form.Group controlId="recommendations">
                    <Form.Label>Recommendations</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="recommendations"
                        value={formData.recommendations}
                        onChange={handleChange}
                        placeholder="Enter recommendations"
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId="surveyMonth">
                            <Form.Label>Survey Month</Form.Label>
                            <Form.Control type="text" name="surveyMonth" value={formData.surveyMonth} onChange={handleChange} placeholder="Enter survey month" />
                        </Form.Group>
                    </Col><Col>
                        <Form.Group controlId="surveyYear">
                            <Form.Label>Survey Year</Form.Label>
                            <Form.Control type="text" name="surveyYear" value={formData.surveyYear} onChange={handleChange} placeholder="Enter survey year" />
                        </Form.Group>
                    </Col><Col>
                        <Form.Group controlId="client">
                            <Form.Label>Client</Form.Label>
                            <Form.Control type="text" name="client" value={formData.client} onChange={handleChange} placeholder="Enter client" />
                        </Form.Group>
                    </Col><Col>
                        <Form.Group controlId="enduser">
                            <Form.Label>End User</Form.Label>
                            <Form.Control type="text" name="enduser" value={formData.enduser} onChange={handleChange} placeholder="Enter end user" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="directory">
                    <Form.Label>Directory</Form.Label>
                    <Form.Control type="text" name="directory" value={formData.directory} onChange={handleChange} placeholder="Enter Directory" />
                </Form.Group>

                <Form.Group controlId="startingPointLink" hidden>
                    <Form.Label>Starting Point Link</Form.Label>
                    <Form.Control type="text" name="startingPointLink" value={formData.startingPointLink} onChange={handleChange} placeholder="Enter starting point link" />
                </Form.Group>
                <Form.Group controlId="endingPointLink" hidden>
                    <Form.Label>Ending Point Link</Form.Label>
                    <Form.Control type="text" name="endingPointLink" value={formData.endingPointLink} onChange={handleChange} placeholder="Enter ending point link" />
                </Form.Group>

                <Button className='mt-3' variant="primary" type="submit">
                    Add Report
                </Button>
            </Form>
            <ToastContainer position="top-center" autoClose={3000} />
        </Container>
    );
}

export default AddReportsPage;
