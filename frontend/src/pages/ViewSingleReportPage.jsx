import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ViewSingleReportPage = () => {
  const { id } = useParams(); // Get the report ID from the route parameter

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + `api/reports/${id}`)
      .then(res => {
        setReport(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!report) {
    return <div>Report not found.</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={12} className='d-flex justify-content-between align-content-center'>
          <h1 className="mt-4">View Report</h1>
          <span>
            <Button href='/'>Back</Button>
          </span>
        </Col>
      </Row>
      <p>Module Number: {report.moduleNumber}</p>
      <p>Starting Point NE: {report.startingPointNE}</p>
      <p>Starting Point Name: {report.startingPointName}</p>
      <p>Starting Point Link: {report.startingPointLink}</p>
      <p>Ending Point NE: {report.endingPointNE}</p>
      <p>Ending Point Name: {report.endingPointName}</p>
      <p>Ending Point Link: {report.endingPointLink}</p>
      <p>Title: {report.title}</p>
      <p>Recommendations: {report.recommendations}</p>
      <p>Survey Month: {report.surveyMonth}</p>
      <p>Survey Year: {report.surveyYear}</p>
      <p>Client: {report.client}</p>
      <p>End User: {report.enduser}</p>
      <p>Directory: {report.directory}</p>
      <p>Map Image Url: {report.mapImgUrl}</p>

      <h3>Other NE Points:</h3>
      {report.otherNEPoints.map((point, index) => (
        <div key={index}>
          <p>Point Name: {point.pointName}</p>
          <p>Point NE: {point.pointNE}</p>
          <p>Point Link: {point.pointLink}</p>
        </div>
      ))}

      {/* Display map image */}
      {report.mapImgUrl && (
        <div>
          <h3>Map Image:</h3>
          <img src={report.mapImgUrl} alt="Map" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </Container>
  );
};

export default ViewSingleReportPage;
