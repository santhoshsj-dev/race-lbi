// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import ReportsForm from '../components/ReportsForm';
import ReportsTable from '../components/ReportsTable';

function HomePage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://race-lbi.onrender.com/api/reports')
      .then(res => {
        setReports(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const addReport = formData => {
    axios.post('https://race-lbi.onrender.com/api/reports', formData)
      .then(res => {
        setReports([...reports, res.data]);
      })
      .catch(err => console.error(err));
  };

  const deleteReport = id => {
    axios.delete(`https://race-lbi.onrender.com/api/reports/${id}`)
      .then(() => setReports(reports.filter(report => report._id !== id)))
      .catch(err => console.error(err));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(import.meta.env.VITE_TEST_VAR) // "123"

  return (
    <Container>
      <ReportsForm addReport={addReport} />
      <ReportsTable reports={reports} deleteReport={deleteReport} />
    </Container>
  );
}

export default HomePage;
