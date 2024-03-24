import React, { useState, useMemo, useEffect } from 'react';
import { Table, Button, Modal, Pagination, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";

const ReportsTable = ({ reports, deleteReport }) => {
  const [showModal, setShowModal] = useState(false);
  const [reportIdToDelete, setReportIdToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(5);
  const [selectedYear, setSelectedYear] = useState("");
  const [sortedReports, setSortedReports] = useState([]);

  // Update sorted reports whenever reports or selectedYear change
  useEffect(() => {
    let filteredReports = reports;
    if (selectedYear) {
      filteredReports = reports.filter(report => report.surveyYear === selectedYear);
    }
    setSortedReports(filteredReports.slice().reverse()); // Reverse a copy of the array
  }, [reports, selectedYear]);

  // Get current reports based on pagination
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = sortedReports.slice(indexOfFirstReport, indexOfLastReport);

  // Pagination configuration
  const maxPagesToShow = 5;
  const totalPageCount = Math.ceil(sortedReports.length / reportsPerPage);
  const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxPagesToShow / 2), totalPageCount - maxPagesToShow + 1));
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPageCount);

  // Handle page navigation
  const handlePrevious = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  const handleNext = () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPageCount));
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

  // Handle reports per page change
  const handleReportsPerPageChange = (e) => {
    setReportsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // Handle year filter change
  const handleYearFilterChange = (e) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1);
  };

  // Calculate unique years from reports for filter dropdown
  const uniqueYears = useMemo(() => Array.from(new Set(reports.map(report => report.surveyYear))), [reports]);

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
            <th>Directory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(currentReports) && currentReports.map(report => (
            <tr key={report._id}>
              <td>{report.moduleNumber}</td>
              <td>{report.startingPointNE}</td>
              <td>{report.endingPointNE}</td>
              <td>{report.title}</td>
              <td>{report.directory}</td>
              <td>
                <Link to={`/reports/${report._id}`} className="btn btn-outline-dark">View</Link>{" "}
                <Button variant='danger' className='delete_btn' onClick={() => handleShowModal(report._id)}><AiFillDelete /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Form.Select onChange={handleReportsPerPageChange} value={reportsPerPage}>
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="15">15 per page</option>
          </Form.Select>
        </div>

        <div className="dark-pagination">
          <Pagination>
            <Pagination.Prev onClick={handlePrevious} disabled={currentPage === 1} />
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <Pagination.Item
                key={startPage + index}
                active={startPage + index === currentPage}
                onClick={() => handlePageClick(startPage + index)}
              >
                {startPage + index}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={handleNext} disabled={currentPage === totalPageCount} />
          </Pagination>
        </div>

        <div>
          <Form.Select onChange={handleYearFilterChange} value={selectedYear}>
            <option value="">All Years</option>
            {uniqueYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Form.Select>
        </div>
      </div>

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
