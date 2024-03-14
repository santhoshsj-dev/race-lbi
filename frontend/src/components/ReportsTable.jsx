import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { AiFillDelete } from "react-icons/ai";

const ReportsTable = ({ reports, deleteReport }) => {
  const [showModal, setShowModal] = useState(false);
  const [reportIdToDelete, setReportIdToDelete] = useState(null);

  const handleDelete = () => {
    deleteReport(reportIdToDelete);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = (reportId) => {
    setReportIdToDelete(reportId);
    setShowModal(true);
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Module Number</th>
            <th>Starting Point NE</th>
            <th>Ending Point NE</th>
            <th>Title</th>
            <th>Routes</th>
            <th>Directory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reports) && reports.map(report => (
            <tr key={report._id}>
              <td>{report.moduleNumber}</td>
              <td>{report.startingPointNE}</td>
              <td>{report.endingPointNE}</td>
              <td>{report.title}</td>
              <td>{report.routes}</td>
              <td>{report.directory}</td>
              <td>
                <Link to={`/reports/${report._id}`} className="btn btn-outline-dark">View</Link>{" "}
                <Button variant='danger' className='delete_btn' onClick={() => handleShowModal(report._id)}><AiFillDelete/></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this report?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReportsTable;
