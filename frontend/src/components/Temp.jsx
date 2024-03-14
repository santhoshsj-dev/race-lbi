import React from 'react';
import { Table, Button } from 'react-bootstrap';

const Temp = ({ reports, deleteReport }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Module Number</th>
          <th>Starting Point NE</th>
          <th>Starting Point Name</th>
          <th>Starting Point Link</th>
          <th>Ending Point NE</th>
          <th>Ending Point Name</th>
          <th>Ending Point Link</th>
          <th>Title</th>
          <th>Routes</th>
          <th>Recommendations</th>
          <th>Survey Month</th>
          <th>Survey Year</th>
          <th>Client</th>
          <th>End User</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(reports) && reports.map(report => (
          <tr key={report._id}>
            <td>{report.moduleNumber}</td>
            <td>{report.startingPointNE}</td>
            <td>{report.startingPointName}</td>
            <td>{report.startingPointLink}</td>
            <td>{report.endingPointNE}</td>
            <td>{report.endingPointName}</td>
            <td>{report.endingPointLink}</td>
            <td>{report.title}</td>
            <td>{report.routes}</td>
            <td>{report.recommendations}</td>
            <td>{report.surveyMonth}</td>
            <td>{report.surveyYear}</td>
            <td>{report.client}</td>
            <td>{report.enduser}</td>
            <td>
              <Button variant="danger" onClick={() => deleteReport(report._id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Temp;
