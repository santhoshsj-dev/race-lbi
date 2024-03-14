import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <>
      <div className="footer navBar-bg">
        <Container className='d-flex justify-content-between'>
          <span>
            &copy;<span id="year"> </span><span> Race Innovations Pvt. Ltd. All rights reserved.</span>   </span>
          <a className='btn btn-outline-dark' target='_blank' href='https://raceinnovations.in/'>Contact us</a>
        </Container></div>

    </>
  )
}

export default Footer
