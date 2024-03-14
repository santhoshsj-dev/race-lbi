// ReportsForm.jsx
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const ReportsForm = ({ addReport }) => {
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
        enduser: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        addReport(formData);
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
            enduser: ''
        });
    };

    return (
        <Container>
            <h1 className="mt-4">Add Report</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="moduleNumber">
                    <Form.Label>Module Number</Form.Label>
                    <Form.Control type="text" name="moduleNumber" value={formData.moduleNumber} onChange={handleChange} placeholder="Enter module number" />
                </Form.Group>
                <Form.Group controlId="startingPointNE">
                    <Form.Label>Starting Point NE</Form.Label>
                    <Form.Control type="text" name="startingPointNE" value={formData.startingPointNE} onChange={handleChange} placeholder="Enter starting point NE" />
                </Form.Group>
                <Form.Group controlId="startingPointName">
                    <Form.Label>Starting Point Name</Form.Label>
                    <Form.Control type="text" name="startingPointName" value={formData.startingPointName} onChange={handleChange} placeholder="Enter starting point name" />
                </Form.Group>
                <Form.Group controlId="startingPointLink">
                    <Form.Label>Starting Point Link</Form.Label>
                    <Form.Control type="text" name="startingPointLink" value={formData.startingPointLink} onChange={handleChange} placeholder="Enter starting point link" />
                </Form.Group>
                <Form.Group controlId="endingPointNE">
                    <Form.Label>Ending Point NE</Form.Label>
                    <Form.Control type="text" name="endingPointNE" value={formData.endingPointNE} onChange={handleChange} placeholder="Enter ending point NE" />
                </Form.Group>
                <Form.Group controlId="endingPointName">
                    <Form.Label>Ending Point Name</Form.Label>
                    <Form.Control type="text" name="endingPointName" value={formData.endingPointName} onChange={handleChange} placeholder="Enter ending point name" />
                </Form.Group>
                <Form.Group controlId="endingPointLink">
                    <Form.Label>Ending Point Link</Form.Label>
                    <Form.Control type="text" name="endingPointLink" value={formData.endingPointLink} onChange={handleChange} placeholder="Enter ending point link" />
                </Form.Group>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" />
                </Form.Group>
                <Form.Group controlId="routes">
                    <Form.Label>Routes</Form.Label>
                    <Form.Control type="text" name="routes" value={formData.routes} onChange={handleChange} placeholder="Enter routes" />
                </Form.Group>
                <Form.Group controlId="recommendations">
                    <Form.Label>Recommendations</Form.Label>
                    <Form.Control type="text" name="recommendations" value={formData.recommendations} onChange={handleChange} placeholder="Enter recommendations" />
                </Form.Group>
                <Form.Group controlId="surveyMonth">
                    <Form.Label>Survey Month</Form.Label>
                    <Form.Control type="text" name="surveyMonth" value={formData.surveyMonth} onChange={handleChange} placeholder="Enter survey month" />
                </Form.Group>
                <Form.Group controlId="surveyYear">
                    <Form.Label>Survey Year</Form.Label>
                    <Form.Control type="text" name="surveyYear" value={formData.surveyYear} onChange={handleChange} placeholder="Enter survey year" />
                </Form.Group>
                <Form.Group controlId="client">
                    <Form.Label>Client</Form.Label>
                    <Form.Control type="text" name="client" value={formData.client} onChange={handleChange} placeholder="Enter client" />
                </Form.Group>
                <Form.Group controlId="enduser">
                    <Form.Label>End User</Form.Label>
                    <Form.Control type="text" name="enduser" value={formData.enduser} onChange={handleChange} placeholder="Enter end user" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Report
                </Button>
            </Form>
        </Container>
    );
}

export default ReportsForm;
