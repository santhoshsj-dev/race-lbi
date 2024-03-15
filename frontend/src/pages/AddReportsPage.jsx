import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
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
        recommendations: '',
        surveyMonth: '',
        surveyYear: '',
        client: '',
        enduser: '',
        directory: '',
        mapImgUrl: '',
        otherNEPoints: []
    });

    const handleChange = (e, index) => {
        const { name, value } = e.target;

        if (name.includes('pointName') || name.includes('pointNE') || name.includes('pointLink')) {
            const updatedOtherNEPoints = [...formData.otherNEPoints];
            const fieldName = name.split('.')[1]; // Extract field name from "otherNEPoints[index].fieldName"
            updatedOtherNEPoints[index][fieldName] = value;

            // Generate Google Maps link if pointNE changes
            if (fieldName === 'pointNE') {
                updatedOtherNEPoints[index]['pointLink'] = generateGoogleMapsLink(value);
            }

            setFormData(prevData => ({
                ...prevData,
                otherNEPoints: updatedOtherNEPoints
            }));
        } else {
            // Handle fields other than otherNEPoints
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));

            // Update the title if startingPointName or endingPointName changes
            if ((name === 'startingPointName' || name === 'endingPointName') && index === undefined) {
                setFormData(prevData => ({
                    ...prevData,
                    title: `${prevData.startingPointName} to ${prevData.endingPointName}`
                }));
            }

            // Generate Google Maps link if startingPointNE or endingPointNE changes
            if ((name === 'startingPointNE' || name === 'endingPointNE') && index === undefined) {
                setFormData(prevData => ({
                    ...prevData,
                    [name === 'startingPointNE' ? 'startingPointLink' : 'endingPointLink']: generateGoogleMapsLink(value)
                }));
            }
        }
    };


    const handleAddNEPoint = () => {
        setFormData(prevData => ({
            ...prevData,
            otherNEPoints: [...prevData.otherNEPoints, { pointName: '', pointNE: '', pointLink: '' }]
        }));
    };

    const handleRemoveNEPoint = (index) => {
        const updatedOtherNEPoints = [...formData.otherNEPoints];
        updatedOtherNEPoints.splice(index, 1);
        setFormData(prevData => ({
            ...prevData,
            otherNEPoints: updatedOtherNEPoints
        }));
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

    // Function to handle opening the URL in a new tab/window
    const openUrl = (url) => {
        window.open(url, '_blank');
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios.post(import.meta.env.VITE_BACKEND_URL + `api/reports`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
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
                    recommendations: '',
                    surveyMonth: '',
                    surveyYear: '',
                    client: '',
                    enduser: '',
                    directory: '',
                    mapImgUrl: '',
                    otherNEPoints: []
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
                <Row className='mb-3'>
                    <Col md={6}>
                        <Form.Group controlId="moduleNumber">
                            <Form.Label>Module Number</Form.Label>
                            <Form.Control type="text" name="moduleNumber" value={formData.moduleNumber} onChange={handleChange} placeholder="Enter module number" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" disabled />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
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
                <Row className='mb-3'>
                    <Col md={6}>
                        <Form.Group controlId="startingPointNE">
                            <Form.Label>Starting Point NE:</Form.Label>
                            <div className='add_reports_input'>
                                <Form.Control type="text" name="startingPointNE" value={formData.startingPointNE} onChange={handleChange} />
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
                                <Form.Control type="text" name="endingPointNE" value={formData.endingPointNE} onChange={handleChange} />
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

                <Card className='p-5 mb-3'>
                    <Form.Group controlId="otherNEPoints" className='d-flex flex-column align-content-center gap-2'>
                        <Form.Label>Other NE Points</Form.Label>
                        {formData.otherNEPoints.map((point, index) => (
                            <div key={index} className="d-flex justify-content-between gap-2 mb-2">
                                <Form.Control
                                    type="text"
                                    name={`otherNEPoints[${index}].pointName`}
                                    value={point.pointName}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Point Name"
                                    className="mr-2"
                                />
                                <Form.Control
                                    type="text"
                                    name={`otherNEPoints[${index}].pointNE`}
                                    value={point.pointNE}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Point NE"
                                    className="mr-2"
                                />
                                <Button
                                    variant="primary"
                                    onClick={() => openUrl(point.pointLink)}
                                    disabled={point.pointLink === "Invalid coordinates" || point.pointNE.trim() === ""}
                                >
                                    <MdMyLocation />
                                </Button>
                                <Button variant="danger" onClick={() => handleRemoveNEPoint(index)}>Remove</Button>
                            </div>
                        ))}
                        <Button variant="outline-dark" onClick={handleAddNEPoint}>Add Point</Button>
                    </Form.Group>

                </Card>

                <Form.Group controlId="recommendations" className='mb-3'>
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
                <Row className='mb-3'>
                    <Col>
                        <Form.Group controlId="surveyMonth">
                            <Form.Label>Survey Month</Form.Label>
                            <Form.Select name="surveyMonth" value={formData.surveyMonth} onChange={handleChange} aria-label="Select survey month">
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

                <Form.Group controlId="directory" className='mb-3'>
                    <Form.Label>Directory</Form.Label>
                    <Form.Control type="text" name="directory" value={formData.directory} onChange={handleChange} placeholder="Enter Directory" />
                </Form.Group>
                <Form.Group controlId="mapImgUrl" className='mb-3'>
                    <Form.Label>Map Image URL</Form.Label>
                    <Form.Control type="text" name="mapImgUrl" value={formData.mapImgUrl} onChange={handleChange} placeholder="Enter Map Image URL" />
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
