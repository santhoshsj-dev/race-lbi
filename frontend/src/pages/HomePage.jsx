import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import ReportsTable from '../components/ReportsTable';

function HomePage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + `api/reports`)
      .then(res => {
        setReports(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const deleteReport = id => {
    axios.delete(import.meta.env.VITE_BACKEND_URL + `api/reports/${id}`)
      .then(() => setReports(reports.filter(report => report._id !== id)))
      .catch(err => console.error(err));
  };

  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };

  // Filter reports based on search query
  const filteredReports = reports.filter(report => {
    return (
      report.moduleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.routes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.surveyMonth.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.surveyYear.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.enduser.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className='table_header'>
        <h1>Reports</h1>
        <Button variant='outline-dark' href='/add-reports'>ADD REPORTS</Button>
      </div>

      <Form.Group controlId="search" className='mb-3'>
        <Form.Control
          type="text"
          placeholder="Search reports..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </Form.Group>
      <ReportsTable reports={filteredReports} deleteReport={deleteReport} />
    </Container>
  );
}

export default HomePage;
