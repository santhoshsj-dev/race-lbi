import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import { MdMyLocation } from 'react-icons/md'

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'startingPointName' || name === 'endingPointName') {
            setFormData(prevData => ({
                ...prevData,
                title: `${prevData.startingPointName} to ${prevData.endingPointName}`
            }));
        }

        if (name === 'startingPointNE' || name === 'endingPointNE') {
            setFormData(prevData => ({
                ...prevData,
                [name === 'startingPointNE' ? 'startingPointLink' : 'endingPointLink']: generateGoogleMapsLink(value)
            }));
        }
    };


    // Function to generate Google Maps link based on coordinates
    const generateGoogleMapsLink = (coordinates) => {
        // Extract latitude and longitude values
        const regex = /N(\d+) (\d+\.\d+) E(\d+) (\d+\.\d+)/;
        const match = coordinates.match(regex);

        if (!match) {
            return 'Invalid coordinates';
        }

        const [, latDegrees, latMinutes, lngDegrees, lngMinutes] = match;
        // Convert degrees and minutes to decimal degrees
        const lat = parseFloat(latDegrees) + parseFloat(latMinutes) / 60;
        const lng = parseFloat(lngDegrees) + parseFloat(lngMinutes) / 60;
        // Construct the Google Maps link
        return `https://www.google.com/maps?q=${lat},${lng}`;
    };

    // Generate options for months (JAN to DEC)
    const months = Array.from({ length: 12 }, (_, i) => {
        const monthIndex = i + 1;
        const month = monthIndex < 10 ? `0${monthIndex}` : monthIndex.toString();
        return <option key={month} value={month}>{new Date(2000, i).toLocaleString('default', { month: 'long' })}</option>;
    });

    // Generate options for years (2015 to 2024)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => {
        const year = currentYear - i;
        return <option key={year} value={year}>{year}</option>;
    });

    // Function to handle opening the URL in a new tab/window
    const openUrl = (url) => {
        window.open(url, '_blank');
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
                            <Form.Control type="text" name="moduleNumber" value={formData.moduleNumber} onChange={handleChange} placeholder="Enter module number" required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" required disabled/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="startingPointName">
                            <Form.Label>Starting Point Name</Form.Label>
                            <Form.Control type="text" name="startingPointName" value={formData.startingPointName} onChange={handleChange} placeholder="Enter starting point name" required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="endingPointName">
                            <Form.Label>Ending Point Name</Form.Label>
                            <Form.Control type="text" name="endingPointName" value={formData.endingPointName} onChange={handleChange} placeholder="Enter ending point name" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="startingPointNE">
                            <Form.Label>Starting Point NE:</Form.Label>
                            <div className='add_reports_input'>
                                <Form.Control type="text" name="startingPointNE" value={formData.startingPointNE} onChange={handleChange} required />
                                <Button
                                    variant="primary"
                                    onClick={() => openUrl(formData.startingPointLink)}
                                    disabled={formData.startingPointLink === "Invalid coordinates" || formData.startingPointNE.trim() === ""}
                                >
                                    <MdMyLocation />
                                </Button>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="endingPointNE">
                            <Form.Label>Ending Point NE:</Form.Label>
                            <div className='add_reports_input'>
                                <Form.Control type="text" name="endingPointNE" value={formData.endingPointNE} onChange={handleChange} required />
                                <Button
                                    variant="primary"
                                    onClick={() => openUrl(formData.endingPointLink)}
                                    disabled={formData.endingPointLink === "Invalid coordinates" || formData.endingPointNE.trim() === ""}
                                >
                                    <MdMyLocation />
                                </Button>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="routes">
                    <Form.Label>Routes</Form.Label>
                    <Form.Control type="text" name="routes" value={formData.routes} onChange={handleChange} placeholder="Enter routes" required />
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
                            <Form.Select name="surveyMonth" value={formData.surveyMonth} onChange={handleChange} aria-label="Select survey month" required>
                                <option value="">Select survey month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="surveyYear">
                            <Form.Label>Survey Year</Form.Label>
                            <Form.Control type="text" name="surveyYear" value={formData.surveyYear} onChange={handleChange} placeholder="Enter survey year" required />
                        </Form.Group>
                    </Col><Col>
                        <Form.Group controlId="client">
                            <Form.Label>Client</Form.Label>
                            <Form.Control type="text" name="client" value={formData.client} onChange={handleChange} placeholder="Enter client" required />
                        </Form.Group>
                    </Col><Col>
                        <Form.Group controlId="enduser">
                            <Form.Label>End User</Form.Label>
                            <Form.Control type="text" name="enduser" value={formData.enduser} onChange={handleChange} placeholder="Enter end user" required />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="directory">
                    <Form.Label>Directory</Form.Label>
                    <Form.Control type="text" name="directory" value={formData.directory} onChange={handleChange} placeholder="Enter Directory" required />
                </Form.Group>

                <Form.Group controlId="startingPointLink" hidden>
                    <Form.Label>Starting Point Link</Form.Label>
                    <Form.Control type="text" name="startingPointLink" value={formData.startingPointLink} onChange={handleChange} placeholder="Enter starting point link" required />
                </Form.Group>
                <Form.Group controlId="endingPointLink" hidden>
                    <Form.Label>Ending Point Link</Form.Label>
                    <Form.Control type="text" name="endingPointLink" value={formData.endingPointLink} onChange={handleChange} placeholder="Enter ending point link" required />
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
